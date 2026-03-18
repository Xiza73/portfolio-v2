import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-[#FFD700] bg-[#000000] py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-3 h-3 bg-[#FFD700]" />
          <div className="w-3 h-3 bg-[#00FFFF]" />
          <div className="w-3 h-3 bg-[#FFD700]" />
        </div>
        
        <p className="pixel-text text-[#FFD700] text-sm flex items-center justify-center gap-2">
          CODED WITH <Heart size={16} className="text-[#00FFFF] fill-[#00FFFF]" /> BY DEVELOPER
        </p>
        
        <p className="pixel-text text-[#00FFFF] text-xs mt-2">
          © {currentYear} ALL_RIGHTS_RESERVED
        </p>
      </div>
    </footer>
  );
}
