import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

// 15x15 maze: 0=dot, 1=wall, 2=empty, 3=power pellet, 4=tunnel
const MAZE_TEMPLATE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 1, 1, 2, 1, 1, 0, 0, 1, 1, 1],
  [4, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 4],
  [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const MAZE_WIDTH = 15;
const MAZE_HEIGHT = 15;
const PACMAN_START = { x: 7, y: 7 };
const GHOST_STARTS = [
  { x: 6, y: 6 },
  { x: 8, y: 6 },
];

// Map both arrow keys and WASD to directions
const KEY_TO_DIR: Record<string, Position> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  KeyW: { x: 0, y: -1 },
  KeyS: { x: 0, y: 1 },
  KeyA: { x: -1, y: 0 },
  KeyD: { x: 1, y: 0 },
};

const MOVEMENT_KEYS = new Set(Object.keys(KEY_TO_DIR));

interface Position {
  x: number;
  y: number;
}

interface Ghost {
  pos: Position;
  dir: Position;
  scared: boolean;
}

type GameState = 'waiting' | 'playing' | 'won' | 'lost';

function createMaze(): number[][] {
  return MAZE_TEMPLATE.map((row) => [...row]);
}

function countDots(maze: number[][]): number {
  return maze.flat().filter((c) => c === 0 || c === 3).length;
}

function canMove(maze: number[][], x: number, y: number): boolean {
  if (y < 0 || y >= MAZE_HEIGHT) return false;
  // Allow wrapping through tunnels (out of horizontal bounds)
  if (x < 0 || x >= MAZE_WIDTH) return true;
  return maze[y][x] !== 1;
}

function wrapPosition(pos: Position): Position {
  let { x, y } = pos;
  if (x < 0) x = MAZE_WIDTH - 1;
  else if (x >= MAZE_WIDTH) x = 0;
  return { x, y };
}

function getValidDirections(maze: number[][], pos: Position): Position[] {
  const dirs = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ];
  return dirs.filter((d) => canMove(maze, pos.x + d.x, pos.y + d.y));
}

function moveGhost(maze: number[][], ghost: Ghost, target: Position): Ghost {
  const valid = getValidDirections(maze, ghost.pos);
  if (valid.length === 0) return ghost;

  // Avoid reversing direction unless it's the only option
  const reverse = { x: -ghost.dir.x, y: -ghost.dir.y };
  const preferred = valid.filter(
    (d) => !(d.x === reverse.x && d.y === reverse.y),
  );
  const choices = preferred.length > 0 ? preferred : valid;

  let best = choices[0];

  if (ghost.scared) {
    // Flee: pick direction that maximizes distance from target
    let worstDist = -1;
    for (const d of choices) {
      const np = wrapPosition({ x: ghost.pos.x + d.x, y: ghost.pos.y + d.y });
      const dist = Math.abs(np.x - target.x) + Math.abs(np.y - target.y);
      if (dist > worstDist) {
        worstDist = dist;
        best = d;
      }
    }
  } else {
    // Chase: pick direction closest to target (with jitter)
    let bestDist = Infinity;
    for (const d of choices) {
      const np = wrapPosition({ x: ghost.pos.x + d.x, y: ghost.pos.y + d.y });
      const dist = Math.abs(np.x - target.x) + Math.abs(np.y - target.y);
      const jitter = Math.random() * 3;
      if (dist + jitter < bestDist) {
        bestDist = dist + jitter;
        best = d;
      }
    }
  }

  const newPos = wrapPosition({
    x: ghost.pos.x + best.x,
    y: ghost.pos.y + best.y,
  });

  return { ...ghost, pos: newPos, dir: best };
}

function PacManGame({ onClose }: { onClose: () => void }) {
  const [maze, setMaze] = useState(createMaze);
  const [pacman, setPacman] = useState<Position>({ ...PACMAN_START });
  const [ghosts, setGhosts] = useState<Ghost[]>(
    GHOST_STARTS.map((pos) => ({
      pos: { ...pos },
      dir: { x: 0, y: -1 },
      scared: false,
    })),
  );
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [totalDots] = useState(() => countDots(createMaze()));
  const nextDirRef = useRef<Position | null>(null);
  const currentDirRef = useRef<Position>({ x: 0, y: 0 });
  const scaredTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const gameStateRef = useRef<GameState>('waiting');
  const pacmanRef = useRef<Position>({ ...PACMAN_START });
  gameStateRef.current = gameState;
  pacmanRef.current = pacman;

  // Keyboard controls
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      const dir = KEY_TO_DIR[e.code];
      if (dir) {
        e.preventDefault();
        nextDirRef.current = dir;
        // Start game on first movement input
        if (gameStateRef.current === 'waiting') {
          setGameState('playing');
        }
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Touch/swipe controls for mobile
  useEffect(() => {
    function handleTouchStart(e: TouchEvent) {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }

    function handleTouchEnd(e: TouchEvent) {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      const minSwipe = 20;

      let dir: Position | null = null;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipe) {
        dir = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
      } else if (Math.abs(dy) > minSwipe) {
        dir = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
      }

      if (dir) {
        nextDirRef.current = dir;
        if (gameStateRef.current === 'waiting') {
          setGameState('playing');
        }
      }
      touchStartRef.current = null;
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Game loop — only runs when 'playing'
  // Moves pacman and ghosts synchronously, then checks collisions including position swaps
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      const prevPacman = pacmanRef.current;

      // --- Compute new pacman position ---
      const nextInput = nextDirRef.current;
      let dir = currentDirRef.current;

      if (nextInput && canMove(maze, prevPacman.x + nextInput.x, prevPacman.y + nextInput.y)) {
        dir = nextInput;
        currentDirRef.current = dir;
        nextDirRef.current = null;
      }

      const rawX = prevPacman.x + dir.x;
      const rawY = prevPacman.y + dir.y;
      const newPacman = canMove(maze, rawX, rawY)
        ? wrapPosition({ x: rawX, y: rawY })
        : prevPacman;

      // --- Eat dot or power pellet ---
      let atepower = false;
      if (
        newPacman.x >= 0 && newPacman.x < MAZE_WIDTH &&
        newPacman.y >= 0 && newPacman.y < MAZE_HEIGHT
      ) {
        const cell = maze[newPacman.y][newPacman.x];
        if (cell === 0) {
          setScore((s) => s + 10);
          setMaze((m) => {
            const copy = m.map((r) => [...r]);
            copy[newPacman.y][newPacman.x] = 2;
            return copy;
          });
        } else if (cell === 3) {
          setScore((s) => s + 50);
          setMaze((m) => {
            const copy = m.map((r) => [...r]);
            copy[newPacman.y][newPacman.x] = 2;
            return copy;
          });
          atepower = true;
        }
      }

      // --- Compute new ghost positions ---
      setGhosts((prevGhosts) => {
        const newGhosts = prevGhosts.map((ghost) =>
          moveGhost(maze, ghost, prevPacman),
        );

        // --- Collision detection (same position OR position swap) ---
        for (let i = 0; i < newGhosts.length; i++) {
          const gOld = prevGhosts[i].pos;
          const gNew = newGhosts[i].pos;
          const scared = atepower || newGhosts[i].scared;

          const samePos =
            gNew.x === newPacman.x && gNew.y === newPacman.y;
          const swapped =
            gNew.x === prevPacman.x &&
            gNew.y === prevPacman.y &&
            newPacman.x === gOld.x &&
            newPacman.y === gOld.y;

          if (samePos || swapped) {
            if (scared) {
              newGhosts[i] = {
                ...newGhosts[i],
                pos: { ...GHOST_STARTS[0] },
                scared: false,
              };
              setScore((s) => s + 200);
            } else {
              setGameState('lost');
              return newGhosts;
            }
          }
        }

        // Apply scared state from power pellet
        if (atepower) {
          if (scaredTimerRef.current) clearTimeout(scaredTimerRef.current);
          scaredTimerRef.current = setTimeout(() => {
            setGhosts((gs) => gs.map((g) => ({ ...g, scared: false })));
          }, 5000);
          return newGhosts.map((g) => ({ ...g, scared: true }));
        }

        return newGhosts;
      });

      setPacman(newPacman);

      // --- Win condition ---
      const remaining = maze.flat().filter((c) => c === 0 || c === 3).length;
      // Account for the dot we may have just eaten (maze state not yet updated in this closure)
      const justAte = (
        newPacman.x !== prevPacman.x || newPacman.y !== prevPacman.y
      ) && maze[newPacman.y]?.[newPacman.x] === 0 || maze[newPacman.y]?.[newPacman.x] === 3;
      const adjusted = justAte ? remaining - 1 : remaining;
      if (adjusted <= 0) {
        setGameState('won');
      }
    }, 200);

    return () => clearInterval(interval);
  }, [maze, gameState]);

  // Cleanup scared timer
  useEffect(() => {
    return () => {
      if (scaredTimerRef.current) clearTimeout(scaredTimerRef.current);
    };
  }, []);

  function restart() {
    setMaze(createMaze());
    setPacman({ ...PACMAN_START });
    setGhosts(
      GHOST_STARTS.map((pos) => ({
        pos: { ...pos },
        dir: { x: 0, y: -1 },
        scared: false,
      })),
    );
    setScore(0);
    setGameState('waiting');
    nextDirRef.current = null;
    currentDirRef.current = { x: 0, y: 0 };
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ isolation: 'isolate' }}
    >
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        {/* Header */}
        <div className="flex w-full items-center justify-between px-1">
          <span className="pixel-text text-[8px] text-primary sm:text-[10px]">
            SCORE: {score}
          </span>
          <span className="pixel-text text-[8px] text-accent sm:text-[10px]">
            {totalDots - maze.flat().filter((c) => c === 0 || c === 3).length}/
            {totalDots}
          </span>
        </div>

        {/* Game board */}
        <div
          className="relative border-4 border-primary pixel-corner"
          style={{ touchAction: 'none' }}
        >
          <div
            className="grid gap-0"
            style={{ gridTemplateColumns: `repeat(${MAZE_WIDTH}, 1fr)` }}
          >
            {maze.map((row, y) =>
              row.map((cell, x) => {
                const isPacman = pacman.x === x && pacman.y === y;
                const ghost = ghosts.find(
                  (g) => g.pos.x === x && g.pos.y === y,
                );
                const isTunnel = cell === 4;

                return (
                  <div
                    key={`${x}-${y}`}
                    className={`flex aspect-square w-[18px] items-center justify-center sm:w-[22px] md:w-[26px] ${
                      cell === 1
                        ? 'bg-primary/20'
                        : isTunnel
                          ? 'bg-bg-subtle/30'
                          : 'bg-bg'
                    }`}
                  >
                    {isPacman && (
                      <div className="h-[70%] w-[70%] rounded-full bg-primary" />
                    )}
                    {ghost && !isPacman && (
                      <div
                        className={`h-[70%] w-[70%] rounded-t-full ${
                          ghost.scared ? 'bg-accent/50' : 'bg-accent'
                        }`}
                      />
                    )}
                    {!isPacman && !ghost && cell === 0 && (
                      <div className="h-[25%] w-[25%] rounded-full bg-primary/70" />
                    )}
                    {!isPacman && !ghost && cell === 3 && (
                      <div className="h-[50%] w-[50%] animate-pulse rounded-full bg-accent" />
                    )}
                  </div>
                );
              }),
            )}
          </div>

          {/* "READY" overlay before game starts */}
          {gameState === 'waiting' && (
            <div className="absolute inset-0 flex items-center justify-center bg-bg/70">
              <span className="pixel-text animate-pulse text-sm text-primary sm:text-base">
                READY?
              </span>
            </div>
          )}
        </div>

        {/* Game over / win */}
        {(gameState === 'won' || gameState === 'lost') && (
          <div className="flex flex-col items-center gap-3">
            <span className="pixel-text text-sm text-primary sm:text-base">
              {gameState === 'won' ? 'YOU WIN!' : 'GAME OVER'}
            </span>
            <div className="flex gap-3">
              <button
                onClick={restart}
                className="pixel-text bg-primary px-4 py-2 text-[8px] text-text-dark transition-colors hover:bg-accent pixel-corner sm:text-[10px]"
              >
                RETRY
              </button>
              <button
                onClick={onClose}
                className="pixel-text border-2 border-primary px-4 py-2 text-[8px] text-primary transition-colors hover:bg-primary hover:text-text-dark pixel-corner sm:text-[10px]"
              >
                EXIT
              </button>
            </div>
          </div>
        )}

        {/* Controls hint */}
        {(gameState === 'waiting' || gameState === 'playing') && (
          <div className="flex flex-col items-center gap-1">
            <span className="pixel-text text-[7px] text-primary/50 sm:text-[8px]">
              WASD / ARROWS / SWIPE
            </span>
            <span className="pixel-text text-[7px] text-primary/50 sm:text-[8px]">
              ESC TO EXIT
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export { PacManGame };
