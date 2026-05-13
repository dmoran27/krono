import { useWorkoutTimer } from '../hooks/useWorkoutTimer';
import { useLanguage } from '../context/LanguageContext';
import { WorkoutInterval } from '../types';
import { useEffect, useRef } from 'react';

interface Props {
  sequence: WorkoutInterval[];
  mode: any;
  onCancel: () => void; 
  onEdit?: () => void;
  onFinish?: (elapsedTime: number, totalIntervals: number) => void;
}

export default function WorkoutView({ sequence, mode, onCancel, onEdit, onFinish }: Props) {
  const { t } = useLanguage();
  const { 
    currentInterval, 
    nextInterval, 
    progress, 
    isPaused, 
    isFinished,
    togglePause, 
    skipInterval 
  } = useWorkoutTimer(sequence);
  
  const hasSaved = useRef(false);

  useEffect(() => {
    if (isFinished && !hasSaved.current) {
      hasSaved.current = true;
      if (onFinish) {
        onFinish(progress.elapsedTime, progress.totalIntervals);
      }
    }
  }, [isFinished, progress.elapsedTime, progress.totalIntervals, onFinish]);

  if (!currentInterval) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
        <p className="text-primary font-label text-xs uppercase tracking-[0.3em]">
          {t.workout?.loading || 'CARGANDO SISTEMA...'}
        </p>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const circlePercentage = currentInterval.duration > 0 
    ? (currentInterval.remaining / currentInterval.duration) * 100 
    : 0;
  
  const globalProgressPercentage = (progress.currentIntervalIndex / progress.totalIntervals) * 100;

  const isEnding = currentInterval.remaining <= 5 && currentInterval.remaining > 0 && !currentInterval.countUp;

  const getThemeColor = () => {
    if (isEnding) return '#FF3B30'; 
    if (currentInterval.type === 'rest') return '#3366CC'; 
    if (currentInterval.type === 'prep') return '#FF9F0A'; 
    return '#32D74B'; 
  };
  
  const themeColor = getThemeColor();
  const isPassiveRest = currentInterval.name === 'DESCANSO' || currentInterval.name === (t.workout?.rest?.toUpperCase() || 'DESCANSO');

  return (
    <div className="fixed inset-0 z-[100] flex flex-col w-full bg-black text-white overflow-hidden">
      
      {/* Barra de Progreso Global Superior */}
      <div 
        className="absolute top-0 left-0 h-1.5 z-[60] transition-all duration-1000 ease-linear" 
        style={{ width: `${globalProgressPercentage}%`, backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}80` }}
      />

      <div className="flex flex-col items-center justify-center w-full h-full flex-1 p-6">
        
        {isFinished ? (
          /* =========================================
             PANTALLA DE FINALIZADO
          ========================================= */
          <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-8 text-center animate-in fade-in duration-700">
            <div className="relative flex justify-center items-center py-8 mb-4">
              <div className="absolute w-40 h-40 bg-primary rounded-full blur-[50px] opacity-30 animate-pulse"></div>
              <div className="absolute w-36 h-36 border-2 border-primary/20 border-dashed rounded-full animate-[spin_15s_linear_infinite]"></div>
              <div className="absolute w-28 h-28 border border-primary/10 rounded-full"></div>
              <span 
                className="relative material-symbols-outlined text-primary z-10" 
                style={{ fontSize: '110px', fontVariationSettings: "'FILL' 1, 'wght' 300", filter: 'drop-shadow(0 0 20px rgba(51,102,204,0.6))' }}
              >
                military_tech
              </span>
            </div>

            <div className="space-y-3 z-10">
              <h1 className="font-display text-4xl font-black text-white uppercase tracking-tighter">
                {t.workout?.finished || 'ENTRENAMIENTO COMPLETADO'}
              </h1>
              <p className="font-label text-xs uppercase tracking-[0.4em] text-primary font-bold">
                Misión Cumplida
              </p>
            </div>

            <div className="w-full bg-[#111111] border border-white/10 rounded-2xl py-8 px-4 flex flex-col items-center justify-center relative overflow-hidden shadow-lg z-10 mt-4">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
              <p className="font-label text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                {t.workout?.timeElapsed || 'TIEMPO TOTAL'}
              </p>
              <p className="font-display text-6xl font-bold text-primary tracking-tighter">
                {formatTime(progress.elapsedTime)}
              </p>
            </div>

            <button 
              onClick={onCancel}
              className="w-full h-16 mt-6 bg-primary text-white rounded-xl font-label text-sm uppercase font-bold tracking-widest active:scale-95 transition-all shadow-[0_0_15px_rgba(51,102,204,0.3)] z-10"
            >
              {t.config?.back || 'VOLVER AL INICIO'}
            </button>
          </div>
        ) : (
          /* =========================================
             PANTALLA DEL CRONÓMETRO
          ========================================= */
          <>
            <div className="text-center mb-10 w-full max-w-sm mt-4">
              <div className="inline-block bg-[#111111] border border-white/10 rounded-full px-4 py-1.5 mb-4">
                <p className="font-label text-[10px] uppercase font-bold tracking-[0.3em] text-white/60">
                  {currentInterval.type === 'work' 
                    ? (t.workout?.currentExercise || 'EJERCICIO ACTUAL')
                    : currentInterval.type === 'rest' && !isPassiveRest 
                      ? (t.workout?.activeRest || 'DESCANSO ACTIVO')
                      : (t.workout?.rest || 'RECUPERACIÓN')}
                </p>
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight transition-colors duration-300" style={{ color: themeColor }}>
                {currentInterval.type === 'work' && currentInterval.unilateral 
                  ? `${t.workout?.side || 'LADO'} ${currentInterval.unilateral === 'L' ? (t.workout?.left || 'IZQ') : (t.workout?.right || 'DER')} • ` 
                  : ''}
                {currentInterval.name || t.workout?.[currentInterval.type] || currentInterval.type}
              </h2>

              {currentInterval.roundInfo && (
                <p className="font-label text-xs uppercase font-bold tracking-widest text-white/50 mt-3">
                  {currentInterval.type === 'rest' 
                    ? (t.workout?.roundRest || 'DESCANSO DE RONDA') 
                    : (t.workout?.round || 'RONDA')} {currentInterval.roundInfo}
                </p>
              )}
            </div>

            <div className={`relative flex items-center justify-center w-full max-w-[340px] aspect-square mb-12 transition-transform duration-300 ${isEnding ? 'scale-105' : 'scale-100'}`}>
              <svg className="absolute inset-0 w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1.5" fill="transparent" className="text-white/10" />
                <circle cx="50" cy="50" r="48" stroke={themeColor} strokeWidth="8" fill="transparent" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - circlePercentage} className="transition-[stroke-dashoffset,stroke] duration-1000 ease-linear opacity-20" />
                <circle cx="50" cy="50" r="48" stroke={themeColor} strokeWidth="3" fill="transparent" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - circlePercentage} className="transition-[stroke-dashoffset,stroke] duration-1000 ease-linear" />
              </svg>

              <div className="absolute inset-[15px] rounded-full flex flex-col items-center justify-center z-10 bg-transparent">
                <span 
                  className={`font-display text-[80px] md:text-[100px] font-black leading-none tracking-tighter transition-colors duration-300 ${isEnding ? 'animate-pulse' : ''}`}
                  style={{ color: themeColor, textShadow: `0 0 15px ${themeColor}60` }}
                >
                  {currentInterval.customDisplay ? currentInterval.customDisplay : formatTime(currentInterval.countUp ? currentInterval.elapsed! : currentInterval.remaining)}
                </span>
              </div>
            </div>

            {/* SIGUIENTE INTERVALO */}
            <div className="w-full max-w-sm mb-auto h-16">
              {nextInterval && nextInterval.type !== 'finished' && (
                <div className="flex items-center justify-between bg-[#111111] border border-white/10 rounded-xl px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-white/40 text-[20px]">skip_next</span>
                    <span className="font-label text-[10px] uppercase font-bold tracking-widest text-white/50">
                      {t.workout?.next || 'SIGUIENTE'}
                    </span>
                  </div>
                  <span className="font-display text-lg font-bold text-white uppercase truncate max-w-[150px]">
                    {nextInterval.name || nextInterval.type}
                  </span>
                </div>
              )}
            </div>

            {/* CONTROLES PRINCIPALES (Pausa / Saltar) */}
            <div className="flex gap-4 w-full max-w-sm z-10 mt-6">
              <button 
                onClick={togglePause}
                className={`flex-1 h-16 rounded-xl font-label text-sm font-bold uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  isPaused 
                    ? 'bg-primary text-white shadow-[0_0_15px_rgba(51,102,204,0.3)]' 
                    : 'bg-[#111111] border border-white/10 text-white hover:border-white/30'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{isPaused ? 'play_arrow' : 'pause'}</span>
                {isPaused ? (t.workout?.resume || 'REANUDAR') : (t.workout?.pause || 'PAUSAR')}
              </button>
              
              <button 
                onClick={skipInterval}
                className="w-16 h-16 bg-[#111111] flex items-center justify-center rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined">fast_forward</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* =========================================
          BOTONES FLOTANTES (Editar y Cerrar)
      ========================================= */}
      {!isFinished && (
        <div className="absolute top-6 right-4 md:right-6 z-50 flex items-center gap-3">
          
          <button 
            onClick={onEdit || onCancel} 
            title={t.config?.edit || 'Editar WOD'}
            className="w-10 h-10 md:w-12 md:h-12 bg-[#1A1A1A]/80 rounded-full border border-white/10 text-white/60 flex items-center justify-center hover:text-white hover:bg-[#222] hover:border-white/30 active:scale-90 transition-all shadow-lg backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-[18px] md:text-[20px]" style={{ fontVariationSettings: "'wght' 300" }}>edit</span>
          </button>

          <button 
            onClick={onCancel} 
            title={t.config?.cancel || 'Finalizar WOD'}
            className="w-10 h-10 md:w-12 md:h-12 bg-[#1A1A1A]/80 rounded-full border border-white/10 text-white/60 flex items-center justify-center hover:text-[#FF3B30] hover:bg-[#FF3B30]/10 hover:border-[#FF3B30]/50 active:scale-90 transition-all shadow-lg backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-[18px] md:text-[20px]" style={{ fontVariationSettings: "'wght' 300" }}>close</span>
          </button>

        </div>
      )}
    </div>
  );
}