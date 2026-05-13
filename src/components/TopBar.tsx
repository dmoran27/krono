import { useState } from 'react'; // Error 1: Faltaba el import
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface TopBarProps {
  onGoHome?: () => void;
    activeTab?: 'history' | 'modes' | 'settings'; 
  onNavigate ?: "";
}

export default function TopBar({activeTab, onNavigate, onGoHome }: TopBarProps) {
  const { t, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMuted, setIsMuted] = useState(false);
  
  const toggleSound = () => setIsMuted(!isMuted);

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-outline-variant px-6 md:px-10 py-4 md:py-6 bg-background/90 backdrop-blur-md sticky top-0 z-50">
      
      <h1 
        className="font-display text-[32px] font-black tracking-tighter text-primary cursor-pointer select-none uppercase" 
        onClick={onGoHome}
      >
        {t.home.appTitle}
      </h1>

      {/* NAVEGACIÓN Y ACCIONES (Desktop) */}
      <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
        <nav className="flex items-center gap-10 mr-4">
        <button 
            onClick={() => onNavigate('home')}
            className={`text-xs font-bold tracking-[0.2em] hover:text-primary transition-colors uppercase ${activeTab === 'modes' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant'}`}
          >
            {t.nav.timer}
          </button>
          <button 
            onClick={() => onNavigate('history')}
            className={`text-xs font-bold tracking-[0.2em] hover:text-primary transition-colors uppercase ${activeTab === 'history' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant'}`}
          >
            {t.nav.history}
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
            onClick={toggleSound} // Error 2: Se llamaba a onToggle en lugar de toggleSound
            className="flex items-center justify-center w-10 h-10 rounded-lg 
                       text-on-surface-variant hover:text-primary transition-colors active:scale-90"
          >
            <span className="material-symbols-outlined text-[28px]">
              {isMuted ? 'volume_off' : 'volume_up'}
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