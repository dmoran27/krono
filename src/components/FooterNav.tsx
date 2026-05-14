import { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import changelogRaw from '../../CHANGELOG.md?raw'; 

export default function FooterNav() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const currentVersion = useMemo(() => {
    try {
      const match = changelogRaw.match(/##\s+\[?v?(\d+\.\d+\.\d+)\]?/i);
      return match ? match[1] : '0.0.0';
    } catch (e) {
      return 'Unknown';
    }
  }, []);

  return (
    <footer className="hidden md:flex border-t border-outline bg-surface-container-lowest py-8 px-10 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center w-full">
        
        <div className="flex items-center gap-4">
          <div className="h-px w-8 bg-primary/50"></div>
          <span className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">
            © {currentYear} {t.footer.brandName}. <span className="text-primary ml-2 animate-pulse">●</span> {t.footer.copyright}
            
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="font-numeric-data text-[10px] text-surface-variant uppercase tracking-widest">
            {t.footer.version}: {currentVersion}
          </span>
        </div>

      </div>
    </footer>
  );
}