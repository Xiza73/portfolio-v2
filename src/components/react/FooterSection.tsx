import { AnimatePresence } from 'motion/react';
import { useCallback, useState } from 'react';

import { ArcadeCredits } from '@/components/react/ArcadeCredits';
import { useTranslation } from '@/hooks/useTranslation';

function FooterSection() {
  const { t } = useTranslation();
  const footer = t.footer;
  const currentYear = new Date().getFullYear();
  const [showCredits, setShowCredits] = useState(false);
  const closeCredits = useCallback(() => setShowCredits(false), []);

  return (
    <>
      <footer className="border-t-4 border-primary bg-bg px-4 py-6 sm:py-8" role="contentinfo">
        <div className="mx-auto max-w-6xl text-center">
          {/* Pixel dots */}
          <div className="mb-3 flex items-center justify-center gap-2 sm:mb-4">
            <div className="h-2 w-2 bg-primary sm:h-3 sm:w-3"></div>
            <div className="h-2 w-2 bg-accent sm:h-3 sm:w-3"></div>
            <div className="h-2 w-2 bg-primary sm:h-3 sm:w-3"></div>
          </div>

          <p className="pixel-text flex items-center justify-center gap-1.5 text-[10px] text-primary sm:gap-2 sm:text-xs md:text-sm">
            {footer.coded_with}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3 w-3 text-accent sm:h-4 sm:w-4"
              aria-label="love"
              role="img"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            {footer.by}
          </p>

          <button
            onClick={() => setShowCredits(true)}
            className="pixel-text mt-1.5 cursor-default text-[8px] text-accent sm:mt-2 sm:text-xs"
          >
            &copy; {currentYear} {footer.rights}
          </button>
        </div>
      </footer>

      <AnimatePresence>
        {showCredits && <ArcadeCredits onClose={closeCredits} />}
      </AnimatePresence>
    </>
  );
}

export { FooterSection };
