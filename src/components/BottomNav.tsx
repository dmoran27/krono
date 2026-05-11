import { useLanguage } from '../context/LanguageContext';

interface BottomNavProps {
  onGoHome?: () => void;
}

export default function BottomNav({ onGoHome }: BottomNavProps) {
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center h-[80px] bg-background border-t-2 border-primary">
      <button 
        onClick={onGoHome}
        className="flex flex-col items-center justify-center text-primary w-full h-full transition-none active:bg-primary active:text-background hover:bg-primary/10"
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
        <span className="font-label-caps text-[10px] mt-1 tracking-widest">MODES</span>
      </button>
      
      <button className="flex flex-col items-center justify-center text-primary w-full h-full transition-none active:bg-primary active:text-background hover:bg-primary/10">
        <span className="material-symbols-outlined">timer</span>
        <span className="font-label-caps text-[10px] mt-1 tracking-widest">{t.nav.timer}</span>
      </button>
      
      <button className="flex flex-col items-center justify-center text-primary w-full h-full transition-none active:bg-primary active:text-background hover:bg-primary/10 opacity-50">
        <span className="material-symbols-outlined">history</span>
        <span className="font-label-caps text-[10px] mt-1 tracking-widest">{t.nav.history}</span>
      </button>

      <button className="flex flex-col items-center justify-center text-primary w-full h-full transition-none active:bg-primary active:text-background hover:bg-primary/10 opacity-50">
        <span className="material-symbols-outlined">person</span>
        <span className="font-label-caps text-[10px] mt-1 tracking-widest">PROFILE</span>
      </button>
    </nav>
  );
}