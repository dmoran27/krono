import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';

export default function SettingsView() {
  const { t, toggleLanguage, language } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const { settings, toggleVoice, toggleBeeps } = useSound();
  const { voiceEnabled, beepsEnabled } = settings;

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-500">

      <div className="space-y-1 md:space-y-2 border-l-2 md:border-l-4 border-primary pl-4 md:pl-8 mb-4">
          
          <h2 className="font-display-lg text-3xl md:text-4xl lg:text-5xl text-primary uppercase font-bold leading-tight md:leading-none">
          {t.nav?.settings || 'CONFIGURACIÓN'}
          </h2>
          <p className="font-label-caps text-on-surface-variant text-xs md:text-sm">
          {t.settings?.subtitle || 'PARÁMETROS DEL SISTEMA'}
          </p>
      
          </div>
      <section className="space-y-6">
        
        {/* SECCIÓN 1: APARIENCIA Y LENGUAJE */}
        <div className="bg-surface border-t border-outline-variant/10 p-6 space-y-6 shadow-sm">
          <h3 className="font-label text-xs font-bold text-primary uppercase tracking-widest">
            {t.settings?.appearanceGroup || 'APARIENCIA Y LENGUAJE'}
          </h3>
          
          {/* Switch de Tema */}
          <div className="flex justify-between items-center">
            <span className="font-body text-on-surface">{t.settings?.themeLabel || 'Tema visual'}</span>
            <button 
              onClick={toggleTheme} 
              className="bg-surface-container px-4 py-2 border-t border-outline-variant/10 text-[10px] font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all active:scale-95"
            >
              {theme === 'dark' ? (t.settings?.dark || 'MODO OSCURO') : (t.settings?.light || 'MODO CLARO')}
            </button>
          </div>

          {/* Switch de Idioma */}
          <div className="flex justify-between items-center">
            <span className="font-body text-on-surface">{t.settings?.langLabel || 'Idioma del sistema'}</span>
            <button 
              onClick={toggleLanguage} 
              className="bg-surface-container px-4 py-2 border-t border-outline-variant/10 text-[10px] font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all active:scale-95"
            >
              {language === 'en' ? 'ENGLISH' : 'ESPAÑOL'}
            </button>
          </div>
        </div>

        {/* SECCIÓN 2: CONFIGURACIÓN DE AUDIO (NUEVA) */}
        <div className="bg-surface border-t border-outline-variant/10 p-6 space-y-6 shadow-sm">
          <h3 className="font-label text-xs font-bold text-primary uppercase tracking-widest">
            {t.settings?.audioGroup || 'PREFERENCIAS DE AUDIO'}
          </h3>
          
          {/* Toggle Voz */}
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <span className="font-body text-on-surface block">{t.settings?.voiceLabel || 'Anuncios de voz'}</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-tight">TTS: ES-ES / 1.1x</span>
            </div>
            <button 
              onClick={toggleVoice} 
              className={`px-6 py-2 border text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 ${
                voiceEnabled 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'bg-surface-container border-outline-variant text-on-surface-variant'
              }`}
            >
              {voiceEnabled ? (t.settings?.on || 'ON') : (t.settings?.off || 'OFF')}
            </button>
          </div>

          {/* Toggle Beeps */}
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <span className="font-body text-on-surface block">{t.settings?.beepsLabel || 'Señales acústicas'}</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-tight">Digital Beeps / 1000Hz</span>
            </div>
            <button 
              onClick={toggleBeeps} 
              className={`px-6 py-2 border text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 ${
                beepsEnabled 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'bg-surface-container border-outline-variant text-on-surface-variant'
              }`}
            >
              {beepsEnabled ? (t.settings?.on || 'ON') : (t.settings?.off || 'OFF')}
            </button>
          </div>
        </div>

        {/* SECCIÓN 3: GESTIÓN DE DATOS */}
        <div className="bg-surface border-t border-outline-variant/10 p-6 space-y-6">
          <h3 className="font-label text-xs font-bold text-primary uppercase tracking-widest">
            {t.settings?.dataGroup || 'GESTIÓN DE DATOS LOCALES'}
          </h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            {t.settings?.dataDesc || 'Los entrenamientos se guardan en el almacenamiento local de tu navegador. Si borras los datos, perderás tu historial de WODs.'}
          </p>
          <div className="flex gap-4">
            <button 
              className="flex-1 border border-error/30 text-error/70 hover:bg-error/5 hover:border-error py-3 font-label text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-all"
              onClick={() => {
                if(confirm(t.settings?.confirmClear || '¿BORRAR TODO EL HISTORIAL?')) {
                   localStorage.clear();
                   window.location.reload();
                }
              }}
            >
              {t.settings?.clearAll || 'BORRAR TODO EL HISTORIAL'}
            </button>
          </div>
        </div>

        {/* FOOTER: SYSTEM STATUS */}
        <div className="flex justify-between items-center opacity-40 px-2">
          <span className="font-label text-[10px] uppercase tracking-[0.2em]">KRONOS ENGINE V3.0</span>
          <span className="font-label text-[10px] text-primary font-bold uppercase tracking-widest">
            {t.settings?.status || 'READY OFFLINE'}
          </span>
        </div>
      </section>
    </div>
  );
}