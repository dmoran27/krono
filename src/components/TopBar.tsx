import { useLanguage } from '../context/LanguageContext';

interface TopBarProps {
  onGoHome?: () => void;
}

export default function TopBar({ onGoHome }: TopBarProps) {
  const { t, toggleLanguage } = useLanguage();
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-safe h-touch-target-min bg-background border-b-2 border-primary-fixed">
      <h1 className="font-display-lg text-[32px] font-black tracking-tighter text-primary" onClick={onGoHome}>
        {t.home.appTitle}
      </h1>
      <div 
        className="flex items-center text-primary-fixed cursor-pointer transition-all active:scale-95" 
        onClick={toggleLanguage}
      >
        <span className="material-symbols-outlined text-[32px]">language</span>
      </div>
    </header>
  );
}