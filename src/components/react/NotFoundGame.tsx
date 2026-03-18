import { motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

// --- Constants ---
const CANVAS_W = 480;
const CANVAS_H = 320;
const TILE = 16;
const GRAVITY = 0.6;
const JUMP_FORCE = -10;
const MOVE_SPEED = 3;
const COLS = CANVAS_W / TILE; // 30
const ROWS = CANVAS_H / TILE; // 20

// Player dimensions
const PW = 14;
const PH = 16;

// --- Level map ---
// 0=empty, 1=platform, 2=spike(404), 3=door(goal), 4=coin(dot)
const LEVEL: number[][] = (() => {
  const m: number[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

  // Floor
  for (let x = 0; x < COLS; x++) m[ROWS - 1][x] = 1;

  // Platforms
  const platforms = [
    // Ground gaps (pits)
    [10, ROWS - 1], [11, ROWS - 1], // remove floor = pit
    [20, ROWS - 1], [21, ROWS - 1],
    // Floating platforms
    [5, 15], [6, 15], [7, 15], [8, 15],
    [13, 13], [14, 13], [15, 13], [16, 13],
    [2, 11], [3, 11], [4, 11],
    [8, 10], [9, 10], [10, 10],
    [14, 8], [15, 8], [16, 8], [17, 8],
    [21, 11], [22, 11], [23, 11], [24, 11],
    [25, 14], [26, 14], [27, 14],
    [19, 6], [20, 6], [21, 6], [22, 6],
    [26, 8], [27, 8], [28, 8],
  ];

  // Remove floor for pits
  m[ROWS - 1][10] = 0;
  m[ROWS - 1][11] = 0;
  m[ROWS - 1][20] = 0;
  m[ROWS - 1][21] = 0;

  // Add platforms
  for (const [x, y] of platforms) {
    if (y !== ROWS - 1) m[y][x] = 1;
  }

  // Spikes (404 obstacles) — on platforms
  m[ROWS - 2][9] = 2;
  m[ROWS - 2][19] = 2;
  m[12][14] = 2;
  m[9][9] = 2;
  m[7][16] = 2;
  m[10][23] = 2;
  m[7][27] = 2;

  // Coins (collectible dots)
  const coins = [
    [6, 14], [7, 14],
    [14, 12], [15, 12],
    [3, 10], [4, 10],
    [9, 9],
    [15, 7], [16, 7],
    [22, 10], [23, 10],
    [26, 13],
    [20, 5], [21, 5],
    [27, 7],
  ];
  for (const [x, y] of coins) m[y][x] = 4;

  // Door (goal) — top right area
  m[5][28] = 3;

  return m;
})();

// Count total coins
const TOTAL_COINS = LEVEL.flat().filter((c) => c === 4).length;

interface PlayerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  grounded: boolean;
  facingRight: boolean;
}

type GamePhase = 'intro' | 'playing' | 'dead' | 'won';

// --- Collision helpers ---
function isSolid(col: number, row: number): boolean {
  if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return false;
  return LEVEL[row][col] === 1;
}

function isSpike(col: number, row: number): boolean {
  if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return false;
  return LEVEL[row][col] === 2;
}

function collidesWithTile(
  x: number,
  y: number,
  w: number,
  h: number,
  check: (col: number, row: number) => boolean,
): boolean {
  const left = Math.floor(x / TILE);
  const right = Math.floor((x + w - 1) / TILE);
  const top = Math.floor(y / TILE);
  const bottom = Math.floor((y + h - 1) / TILE);

  for (let row = top; row <= bottom; row++) {
    for (let col = left; col <= right; col++) {
      if (check(col, row)) return true;
    }
  }
  return false;
}

// --- Player pixel art (8x8 simplified) ---
// Drawn via canvas for crispness
function drawPlayer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  facingRight: boolean,
  primary: string,
  accent: string,
) {
  // 8x10 pixel character
  const sprite = [
    '..PPPP..',
    '.PPPPPP.',
    '.PA..AP.',
    '.PPPPPP.',
    '..PPPP..',
    '.AAPPAA.',
    '..PPPP..',
    '..PPPP..',
    '.PP..PP.',
    '.PP..PP.',
  ];

  const px = 1.5; // pixel scale
  ctx.save();

  if (!facingRight) {
    ctx.translate(x + PW, y);
    ctx.scale(-1, 1);
    x = 0;
    y = 0;
  }

  sprite.forEach((row, ry) => {
    for (let rx = 0; rx < row.length; rx += 1) {
      const ch = row[rx];
      if (ch === '.') continue;
      ctx.fillStyle = ch === 'P' ? primary : accent;
      ctx.fillRect(
        (facingRight ? x : 0) + rx * px,
        (facingRight ? y : 0) + ry * px,
        px,
        px,
      );
    }
  });

  ctx.restore();
}

function NotFoundGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [coins, setCoins] = useState(0);
  const phaseRef = useRef<GamePhase>('intro');
  const coinsRef = useRef(0);
  const keysRef = useRef<Set<string>>(new Set());
  const playerRef = useRef<PlayerState>({
    x: 2 * TILE,
    y: (ROWS - 2) * TILE - PH,
    vx: 0,
    vy: 0,
    grounded: false,
    facingRight: true,
  });
  const collectedRef = useRef<Set<string>>(new Set());
  const rafRef = useRef<number>(0);
  const touchRef = useRef<{ left: boolean; right: boolean; jump: boolean }>({
    left: false,
    right: false,
    jump: false,
  });

  phaseRef.current = phase;
  coinsRef.current = coins;

  const resetPlayer = useCallback(() => {
    playerRef.current = {
      x: 2 * TILE,
      y: (ROWS - 2) * TILE - PH,
      vx: 0,
      vy: 0,
      grounded: false,
      facingRight: true,
    };
    collectedRef.current = new Set();
    setCoins(0);
  }, []);

  // Input handling
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      keysRef.current.add(e.code);

      if (phaseRef.current === 'intro' || phaseRef.current === 'dead') {
        if (
          e.code === 'Space' ||
          e.code === 'ArrowUp' ||
          e.code === 'KeyW'
        ) {
          e.preventDefault();
          if (phaseRef.current === 'dead') resetPlayer();
          setPhase('playing');
        }
      }
      if (
        e.code === 'Space' ||
        e.code === 'ArrowUp' ||
        e.code === 'ArrowDown' ||
        e.code === 'ArrowLeft' ||
        e.code === 'ArrowRight'
      ) {
        e.preventDefault();
      }
    }
    function onKeyUp(e: KeyboardEvent) {
      keysRef.current.delete(e.code);
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [resetPlayer]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Read CSS vars for theming
    const style = getComputedStyle(document.documentElement);
    const colorBg = style.getPropertyValue('--color-bg').trim() || '#000000';
    const colorPrimary =
      style.getPropertyValue('--color-primary').trim() || '#FFD700';
    const colorAccent =
      style.getPropertyValue('--color-accent').trim() || '#00FFFF';
    const colorSubtle =
      style.getPropertyValue('--color-bg-subtle').trim() || '#1a1a1a';

    function update() {
      if (phaseRef.current !== 'playing') return;

      const p = playerRef.current;
      const keys = keysRef.current;
      const touch = touchRef.current;

      // Horizontal input
      let dx = 0;
      if (keys.has('ArrowLeft') || keys.has('KeyA') || touch.left) dx -= 1;
      if (keys.has('ArrowRight') || keys.has('KeyD') || touch.right) dx += 1;

      p.vx = dx * MOVE_SPEED;
      if (dx !== 0) p.facingRight = dx > 0;

      // Jump
      if (
        (keys.has('ArrowUp') || keys.has('KeyW') || keys.has('Space') || touch.jump) &&
        p.grounded
      ) {
        p.vy = JUMP_FORCE;
        p.grounded = false;
      }

      // Gravity
      p.vy += GRAVITY;

      // Move X
      p.x += p.vx;
      if (collidesWithTile(p.x, p.y, PW, PH, isSolid)) {
        // Push back
        if (p.vx > 0) {
          p.x = Math.floor((p.x + PW) / TILE) * TILE - PW;
        } else {
          p.x = Math.ceil(p.x / TILE) * TILE;
        }
        p.vx = 0;
      }

      // Move Y
      p.y += p.vy;
      p.grounded = false;
      if (collidesWithTile(p.x, p.y, PW, PH, isSolid)) {
        if (p.vy > 0) {
          p.y = Math.floor((p.y + PH) / TILE) * TILE - PH;
          p.grounded = true;
        } else {
          p.y = Math.ceil(p.y / TILE) * TILE;
        }
        p.vy = 0;
      }

      // Bounds
      if (p.x < 0) p.x = 0;
      if (p.x > CANVAS_W - PW) p.x = CANVAS_W - PW;

      // Fall into pit
      if (p.y > CANVAS_H + TILE) {
        setPhase('dead');
        return;
      }

      // Spike collision
      if (collidesWithTile(p.x + 2, p.y + 2, PW - 4, PH - 4, isSpike)) {
        setPhase('dead');
        return;
      }

      // Coin collection
      const centerCol = Math.floor((p.x + PW / 2) / TILE);
      const centerRow = Math.floor((p.y + PH / 2) / TILE);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx2 = -1; dx2 <= 1; dx2++) {
          const cy = centerRow + dy;
          const cx = centerCol + dx2;
          if (
            cy >= 0 &&
            cy < ROWS &&
            cx >= 0 &&
            cx < COLS &&
            LEVEL[cy][cx] === 4
          ) {
            const key = `${cx},${cy}`;
            if (!collectedRef.current.has(key)) {
              collectedRef.current.add(key);
              setCoins((c) => c + 1);
            }
          }
        }
      }

      // Door collision
      const doorCol = Math.floor((p.x + PW / 2) / TILE);
      const doorRow = Math.floor((p.y + PH / 2) / TILE);
      if (
        doorRow >= 0 &&
        doorRow < ROWS &&
        doorCol >= 0 &&
        doorCol < COLS &&
        LEVEL[doorRow][doorCol] === 3
      ) {
        setPhase('won');
      }
    }

    function draw() {
      if (!ctx) return;

      // Clear
      ctx.fillStyle = colorBg;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Background grid (subtle)
      ctx.strokeStyle = colorSubtle;
      ctx.lineWidth = 0.5;
      for (let x = 0; x < CANVAS_W; x += TILE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_H);
        ctx.stroke();
      }
      for (let y = 0; y < CANVAS_H; y += TILE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_W, y);
        ctx.stroke();
      }

      // Tiles
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const tile = LEVEL[row][col];
          const tx = col * TILE;
          const ty = row * TILE;

          if (tile === 1) {
            // Platform
            ctx.fillStyle = colorPrimary;
            ctx.fillRect(tx, ty, TILE, TILE);
            // Inner shadow
            ctx.fillStyle = colorBg;
            ctx.fillRect(tx + 1, ty + 1, TILE - 2, TILE - 2);
            ctx.fillStyle = colorPrimary;
            ctx.fillRect(tx + 2, ty + 2, TILE - 4, TILE - 4);
          } else if (tile === 2) {
            // Spike — "404" text
            ctx.fillStyle = colorAccent;
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('404', tx + TILE / 2, ty + TILE - 3);
          } else if (tile === 3) {
            // Door
            ctx.fillStyle = colorAccent;
            ctx.fillRect(tx + 2, ty, TILE - 4, TILE);
            ctx.fillStyle = colorBg;
            ctx.fillRect(tx + 4, ty + 2, TILE - 8, TILE - 4);
            // Doorknob
            ctx.fillStyle = colorPrimary;
            ctx.fillRect(tx + TILE - 7, ty + TILE / 2 - 1, 2, 2);
          } else if (tile === 4) {
            // Coin (if not collected)
            const key = `${col},${row}`;
            if (!collectedRef.current.has(key)) {
              ctx.fillStyle = colorPrimary;
              ctx.beginPath();
              ctx.arc(tx + TILE / 2, ty + TILE / 2, 3, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Player
      if (phaseRef.current === 'playing' || phaseRef.current === 'intro') {
        const p = playerRef.current;
        drawPlayer(ctx, p.x, p.y, p.facingRight, colorPrimary, colorAccent);
      }

      // HUD
      ctx.fillStyle = colorPrimary;
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(
        `DOTS: ${coinsRef.current}/${TOTAL_COINS}`,
        8,
        14,
      );

      // Phase overlays
      if (phaseRef.current === 'intro') {
        ctx.fillStyle = colorBg + 'cc';
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        ctx.fillStyle = colorPrimary;
        ctx.font = '24px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('404', CANVAS_W / 2, CANVAS_H / 2 - 40);

        ctx.fillStyle = colorAccent;
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.fillText('PAGE NOT FOUND', CANVAS_W / 2, CANVAS_H / 2 - 15);

        ctx.fillStyle = colorPrimary;
        ctx.font = '7px "Press Start 2P", monospace';
        ctx.fillText(
          'Find the exit door!',
          CANVAS_W / 2,
          CANVAS_H / 2 + 15,
        );
        ctx.fillText(
          'Collect dots along the way',
          CANVAS_W / 2,
          CANVAS_H / 2 + 30,
        );

        ctx.fillStyle = colorAccent;
        ctx.font = '7px "Press Start 2P", monospace';
        ctx.fillText(
          'PRESS SPACE / W / ↑ TO START',
          CANVAS_W / 2,
          CANVAS_H / 2 + 60,
        );
      }

      if (phaseRef.current === 'dead') {
        ctx.fillStyle = colorBg + 'cc';
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        ctx.fillStyle = colorAccent;
        ctx.font = '16px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', CANVAS_W / 2, CANVAS_H / 2 - 10);

        ctx.fillStyle = colorPrimary;
        ctx.font = '7px "Press Start 2P", monospace';
        ctx.fillText(
          'PRESS SPACE TO RETRY',
          CANVAS_W / 2,
          CANVAS_H / 2 + 20,
        );
      }

      if (phaseRef.current === 'won') {
        ctx.fillStyle = colorBg + 'cc';
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        ctx.fillStyle = colorPrimary;
        ctx.font = '12px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PAGE FOUND!', CANVAS_W / 2, CANVAS_H / 2 - 20);

        ctx.fillStyle = colorAccent;
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.fillText(
          `${coinsRef.current}/${TOTAL_COINS} dots collected`,
          CANVAS_W / 2,
          CANVAS_H / 2 + 5,
        );

        ctx.fillStyle = colorPrimary;
        ctx.font = '7px "Press Start 2P", monospace';
        ctx.fillText(
          'Redirecting home...',
          CANVAS_W / 2,
          CANVAS_H / 2 + 30,
        );
      }
    }

    function loop() {
      update();
      draw();
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  // Redirect home after winning
  useEffect(() => {
    if (phase !== 'won') return;
    const timeout = setTimeout(() => {
      window.location.href = '/';
    }, 3000);
    return () => clearTimeout(timeout);
  }, [phase]);

  // Touch controls
  const handleTouch =
    (dir: 'left' | 'right' | 'jump', active: boolean) => () => {
      touchRef.current[dir] = active;
      if (active && (phaseRef.current === 'intro' || phaseRef.current === 'dead')) {
        if (dir === 'jump') {
          if (phaseRef.current === 'dead') resetPlayer();
          setPhase('playing');
        }
      }
    };

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-center gap-4 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Game canvas */}
      <div className="border-4 border-primary pixel-corner">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="block"
          style={{
            imageRendering: 'pixelated',
            width: '100%',
            maxWidth: `${CANVAS_W}px`,
          }}
        />
      </div>

      {/* Mobile touch controls */}
      <div className="flex gap-3 sm:hidden">
        <button
          className="pixel-text flex h-12 w-12 select-none items-center justify-center border-2 border-primary bg-bg text-lg text-primary active:bg-primary active:text-text-dark"
          onPointerDown={handleTouch('left', true)}
          onPointerUp={handleTouch('left', false)}
          onPointerLeave={handleTouch('left', false)}
        >
          ←
        </button>
        <button
          className="pixel-text flex h-12 w-16 select-none items-center justify-center border-2 border-accent bg-bg text-xs text-accent active:bg-accent active:text-text-dark"
          onPointerDown={handleTouch('jump', true)}
          onPointerUp={handleTouch('jump', false)}
          onPointerLeave={handleTouch('jump', false)}
        >
          JUMP
        </button>
        <button
          className="pixel-text flex h-12 w-12 select-none items-center justify-center border-2 border-primary bg-bg text-lg text-primary active:bg-primary active:text-text-dark"
          onPointerDown={handleTouch('right', true)}
          onPointerUp={handleTouch('right', false)}
          onPointerLeave={handleTouch('right', false)}
        >
          →
        </button>
      </div>

      {/* Controls hint (desktop) */}
      <div className="hidden flex-col items-center gap-1 sm:flex">
        <span className="pixel-text text-[7px] text-primary/50 sm:text-[8px]">
          WASD / ARROWS TO MOVE · SPACE TO JUMP
        </span>
      </div>

      {/* Home link */}
      <a
        href="/"
        className="pixel-text text-[8px] text-accent transition-colors hover:text-primary sm:text-xs"
      >
        ← BACK TO HOME
      </a>
    </motion.div>
  );
}

export { NotFoundGame };
