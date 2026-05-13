import { useLanguage } from '../context/LanguageContext';

interface BottomNavProps {
  onGoHome?: () => void;
  activeTab?: 'history' | 'modes' | 'settings'; 
  onNavigate ?: "";
}


export default function BottomNav({ activeTab, onNavigate, onGoHome  }: BottomNavProps) {
  const { t } = useLanguage();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-[80px] bg-background/95 backdrop-blur-md border-t border-outline-variant">
      <button onClick={() => onNavigate('home')} className={`flex flex-col items-center justify-center w-full h-full relative ${activeTab === 'timer' ? 'text-primary' : 'text-on-surface-variant'}`}>
        {activeTab === 'modes' && <div className="absolute inset-0 bg-primary/5"></div>}
        <span className="material-symbols-outlined text-[24px]">timer</span>
        <span className="font-bold text-[9px] tracking-widest mt-1 uppercase">{t.nav.timer}</span>
        {activeTab === 'modes' && <div className="absolute top-0 w-1/2 h-[2px] bg-primary rounded-b-full"></div>}
      </button>
      
      <button onClick={() => onNavigate('history')} className={`flex flex-col items-center justify-center w-full h-full relative ${activeTab === 'history' ? 'text-primary' : 'text-on-surface-variant'}`}>
        {activeTab === 'history' && <div className="absolute inset-0 bg-primary/5"></div>}
        <span className="material-symbols-outlined text-[24px]">history</span>
        <span className="font-bold text-[9px] tracking-widest mt-1 uppercase">{t.nav.history}</span>
        {activeTab === 'history' && <div className="absolute top-0 w-1/2 h-[2px] bg-primary rounded-b-full"></div>}
      </button>
      
      <button onClick={() => onNavigate('settings')} className={`flex flex-col items-center justify-center w-full h-full relative ${activeTab === 'modes' ? 'text-primary' : 'text-on-surface-variant'}`}>
        {activeTab === 'settings' && <div className="absolute inset-0 bg-primary/5"></div>}
        <span className="material-symbols-outlined text-[24px]">settings</span>
        <span className="font-bold text-[9px] tracking-widest mt-1 uppercase">{t.nav.settings}</span>
        {activeTab === 'settings' && <div className="absolute top-0 w-1/2 h-[2px] bg-primary rounded-b-full"></div>}
      </button>
      
    </nav>

  );
}