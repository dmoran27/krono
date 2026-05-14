import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';


interface TopBarProps {
    activeTab?: 'history' | 'modes' | 'settings'; 
  onNavigate?: (screen: string) => void;
}

export default function TopBar({activeTab, onNavigate }: TopBarProps) {
  const { t, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { settings, toggleMasterMute } = useSound();
  const { voiceEnabled, beepsEnabled } = settings;

  
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-outline-variant px-6 md:px-10 py-4 md:py-6 bg-background/90 backdrop-blur-md sticky top-0 z-50">
      
      <h1 
        className="font-display text-[32px] font-black tracking-tighter text-primary cursor-pointer select-none uppercase" 
        onClick={() => onNavigate?.('home')}
      >
        {t.home.appTitle}
      </h1>

      {/* NAVEGACIÓN Y ACCIONES (Desktop) */}
      <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
        <nav className="flex items-center gap-10 mr-4">
        <button 
            onClick={() => onNavigate?.('home')}
            className={`text-xs font-bold tracking-[0.2em] hover:text-primary transition-colors uppercase ${activeTab === 'modes' ? 'text-primary ' : 'text-on-surface-variant'}`}
          >
            {t.nav.timer}
          </button>
          <button 
            onClick={() => onNavigate?.('history')}
            className={`text-xs font-bold tracking-[0.2em] hover:text-primary transition-colors uppercase ${activeTab === 'history' ? 'text-primary ' : 'text-on-surface-variant'}`}
          >
            {t.nav.history}
          </button>
          <button 
            onClick={() => onNavigate?.('settings')}
            className={`text-xs font-bold tracking-[0.2em] hover:text-primary transition-colors uppercase ${activeTab === 'history' ? 'text-primary ' : 'text-on-surface-variant'}`}
          >
            {t.nav.settings}
          </button>
          
        </nav>

        {/* ACCIONES GLOBALES */}
        <div className="flex items-center gap-4 border-l border-outline-variant pl-8">
          
          {/* Selector de Idioma */}
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-lg 
                       text-on-surface-variant hover:text-primary transition-colors active:scale-90" 
            onClick={toggleLanguage}
            title="Toggle Language"
          >
            <span className="material-symbols-outlined text-[28px]">language</span>
          </button>

          {/* Control de Sonido */}
          <button
            onClick={toggleMasterMute} // Error 2: Se llamaba a onToggle en lugar de toggleSound
            className="flex items-center justify-center w-10 h-10 rounded-lg 
                       text-on-surface-variant hover:text-primary transition-colors active:scale-90"
          >
            <span className="material-symbols-outlined">
              {(voiceEnabled || beepsEnabled) ? 'volume_up' : 'volume_off'}
            </span>
          </button>

          {/* Toggle de Tema  */}
          <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center w-10 h-10 rounded-lg 
                       text-on-surface-variant hover:text-primary cursor-pointer transition-all active:scale-95 group"
            aria-label="Toggle Theme"
          >
            <span className={`material-symbols-outlined absolute transition-all duration-300 
                              ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90 scale-50'}`}>
              light_mode
            </span>

            <span className={`material-symbols-outlined absolute transition-all duration-300 
                              ${theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90 scale-50'}`}>
              dark_mode
            </span>
          </button>
        </div>
      </div>


    </header>
  );
}