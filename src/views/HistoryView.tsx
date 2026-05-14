// src/views/HistoryView.tsx
import { useLanguage } from '../context/LanguageContext';
import { useHistory } from '../hooks/useHistory';

export default function HistoryView() {
  const { t } = useLanguage();
  const { history, clearHistory } = useHistory();

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Formato numérico universal (DD/MM/YYYY - HH:MM)
  const formatNumericDate = (isoString: string) => {
    const date = new Date(isoString);
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    const hs = date.getHours().toString().padStart(2, '0');
    const ms = date.getMinutes().toString().padStart(2, '0');
    return `${d}/${m}/${y} - ${hs}:${ms}`;
  };

  return (
    <div className="w-full flex flex-col flex-1 pb-margin-safe">

      
      {/* HEADER KRONOS STYLE */}

      <div className="space-y-1 md:space-y-2 border-l-2 md:border-l-4 border-primary pl-4 md:pl-8 mb-4">
          
          <h2 className="font-display-lg text-3xl md:text-4xl lg:text-5xl text-primary uppercase font-bold leading-tight md:leading-none">
          {t.nav?.history || 'HISTORIAL'}
          </h2>
          <div className="flex justify-between items-end"></div>
          <p className="font-label-caps text-on-surface-variant text-xs md:text-sm">
          {t.history?.subtitle || 'ÚLTIMOS 20 ENTRENAMIENTOS'}
          </p>
      
          {history.length > 0 && (
            <button 
              onClick={clearHistory} 
              className="text-error/70 hover:text-error text-[10px] font-label uppercase tracking-widest transition-colors flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px]">delete</span>
              {t.history?.clear || 'BORRAR TODO'}
            </button>
          )}
        </div>

     

      {history.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {history.map((log) => (
            <div 
              key={log.id} 
              className=" border border-outline-variant/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 group hover:border-primary/40 transition-all shadow-md"
            >
              {/* Lado Izquierdo: Fecha y Modo */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-primary">calendar_today</span>
                  <p className="font-label text-[12px] text-on-surface-variant font-bold tracking-widest">
                    {formatNumericDate(log.date)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-3xl font-black uppercase text-on-surface tracking-tight">
                    {log.mode}
                  </h3>
                  <span className="bg-[#1A1A1A] px-2 py-1 rounded-md font-label text-[10px] uppercase tracking-widest text-on-surface-variant border border-outline-variant/20">
                    {log.totalIntervals} {t.history?.intervals || 'INT'}
                  </span>
                </div>
              </div>
              
              {/* Lado Derecho: Duración */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between bg-[#1A1A1A] sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-none border-outline-variant/10">
                <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                  {t.history?.duration || 'DURACIÓN'}
                </p>
                <p 
                  className="font-display text-4xl font-black text-primary tracking-tighter" 
                  style={{ textShadow: '0 0 15px rgba(51,102,204,0.3)' }}
                >
                  {formatTime(log.elapsedTime)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/10 rounded-3xl opacity-60  min-h-[300px]">
          <span className="material-symbols-outlined text-[64px] mb-4 text-on-surface-variant/30">history_toggle_off</span>
          <p className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant font-bold">
            {t.history?.noLogs || 'SIN REGISTROS'}
          </p>
        </div>
      )}
    </div>
  );
}