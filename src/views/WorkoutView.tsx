import { useWorkoutTimer } from '../hooks/useWorkoutTimer';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';
import { WorkoutInterval } from '../types';
import { useEffect, useRef, useState } from 'react';

interface Props {
  sequence: WorkoutInterval[];
  mode: string | null;
  onCancel: () => void; 
  onEdit?: () => void;
  onFinish?: (elapsedTime: number, totalIntervals: number) => void;
}

export default function WorkoutView({ sequence, mode, onCancel, onEdit, onFinish }: Props) {
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
  const lastAnnouncedIndex = useRef(-1);
  const pacerRepCount = useRef(0);
  const [displayRepCount, setDisplayRepCount] = useState(0);
  const { t, language } = useLanguage();
  const isPacerMode = mode?.toLowerCase() === 'pacer';  
  const togglePauseRef = useRef(togglePause);

  const { settings } = useSound();
  const { voiceEnabled, beepsEnabled } = settings;

  togglePauseRef.current = togglePause;

  const speak = (text: string, onEndCallback?: () => void) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) {
      if (onEndCallback) setTimeout(onEndCallback, 1500);
      return;
    }
    
    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    

    utterance.lang = language === 'en' ? 'en-US' : 'es-ES';
    utterance.rate = 1.1;     
    utterance.pitch = 1;      
    
    if (onEndCallback) {
      utterance.onend = () => {
        onEndCallback();
      };
      utterance.onerror = () => {
        onEndCallback();
      };
    }
    
    window.speechSynthesis.speak(utterance);
  };

  const playBeep = (type: 'short' | 'long') => {
    if (!beepsEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      if (type === 'short') {
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(1200, audioCtx.currentTime); 
        
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(2400, audioCtx.currentTime); 

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15); 
        
        osc1.start(); osc2.start();
        osc1.stop(audioCtx.currentTime + 0.2); osc2.stop(audioCtx.currentTime + 0.2);
        
      } else {
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(1000, audioCtx.currentTime); 
        
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(2000, audioCtx.currentTime); 

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.6, audioCtx.currentTime + 0.02);
        gainNode.gain.setValueAtTime(0.6, audioCtx.currentTime + 0.6); 
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
        
        osc1.start(); osc2.start();
        osc1.stop(audioCtx.currentTime + 0.85); osc2.stop(audioCtx.currentTime + 0.85);
      }

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
    } catch (e) {
      console.warn('Audio API no soportada', e);
    }
  };

  // ==========================================
  // EFECTO 1: Controlador de Sonido y Voz (Pacer Perfecto)
  // ==========================================
  useEffect(() => {
    if (!currentInterval || isPaused) return;

    const { remaining, type, countUp, duration } = currentInterval;
    const currentIndex = progress.currentIntervalIndex;
    
    const isPacerWorkPhase = isPacerMode && type === 'work';

    if (lastAnnouncedIndex.current !== currentIndex) {
      lastAnnouncedIndex.current = currentIndex;

      if (type !== 'finished') {
        if (isPacerWorkPhase) {
          const prevInterval = currentIndex > 0 ? sequence[currentIndex - 1] : null;
          const isContinuedRep = prevInterval?.type === 'work' && prevInterval?.name === currentInterval.name;

          if (!isContinuedRep) {
            pacerRepCount.current = 1;
            setDisplayRepCount(1);
            
            togglePauseRef.current(); 
            speak(currentInterval.name || t.workout?.work, () => {
              togglePauseRef.current(); 
              speak("1");
            });
            
          } else {
            pacerRepCount.current += 1;
            setDisplayRepCount(pacerRepCount.current); 
            
            speak(pacerRepCount.current.toString());
          }
        } else {
          let textToSpeak = currentInterval.name || t.workout?.[(type || 'work') as keyof typeof t.workout] || type;
          if (currentInterval.unilateral) {
            const side = currentInterval.unilateral === 'L' ? t.workout?.leftFull : t.workout?.rightFull;
            textToSpeak += ` ${side}`;
          }
          speak(textToSpeak);
        }
      }
    }

    const isLongEnoughForCountdown = duration > 5;
    // Silencia la cuenta regresiva SOLO si estamos trabajando en Pacer
    if (!isPacerWorkPhase && isLongEnoughForCountdown && remaining <= 5 && remaining > 0 && !countUp) {
      playBeep('short');
    }

    if (remaining === 0) {
      const nextIsSameExercise = nextInterval?.type === 'work' && nextInterval?.name === currentInterval.name;
      
      if (isPacerWorkPhase && nextIsSameExercise) {
        // Silencio absoluto mientras cuenta las repeticiones
      } else {
        playBeep('long');
      }
    }

  }, [currentInterval?.remaining, isPaused, progress.currentIntervalIndex, isPacerMode, sequence]);

  // ==========================================
  // EFECTO 2: Guardado en el Historial
  // ==========================================
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
      <div className="fixed inset-0 z-[100] flex flex-col w-full bg-background text-on-surface transition-colors duration-300 overflow-hidden">
        <p className="text-primary font-label text-xs uppercase tracking-[0.3em]">
          {t.workout?.loading || 'CARGANDO SISTEMA...'}
        </p>
      </div>
    );
  }

  // 2. Variable para la UI
  const isPacerWorkUI = isPacerMode && currentInterval.type === 'work';

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
      <div className="fixed inset-0 z-[100] flex flex-col w-full bg-background text-on-surface transition-colors duration-300 overflow-hidden">
        
        <div 
          className="absolute top-0 left-0 h-1.5 z-[60] transition-all duration-1000 ease-linear" 
          style={{ width: `${globalProgressPercentage}%`, backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}80` }}
        />
  
        <div className="flex flex-col items-center justify-center w-full h-full flex-1 p-6 mt-12">
          
          {isFinished ? (
            <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-8 text-center animate-in fade-in duration-700">
              <div className="space-y-3 z-10">
                <h1 className="font-display text-4xl font-black uppercase tracking-tighter">
                  {t.workout?.finished || 'ENTRENAMIENTO COMPLETADO'}
                </h1>
                <p className="font-label text-xs uppercase tracking-[0.4em] text-primary font-bold">
                {t.workout?.missionAccomplished || 'Misión Cumplida'}
                  
                </p>
              </div>
  
              <div className="w-full bg-surface-container border border-outline-variant rounded-2xl py-8 px-4 flex flex-col items-center justify-center relative overflow-hidden shadow-lg z-10 mt-4">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                <p className="font-label text-xs uppercase tracking-[0.2em] opacity-60 mb-2">
                  {t.workout?.timeElapsed || 'TIEMPO TOTAL'}
                </p>
                <p className="font-display text-6xl font-bold text-primary tracking-tighter">
                  {formatTime(progress.elapsedTime)}
                </p>
              </div>
  
              <button 
                onClick={onCancel}
                className="w-full h-16 mt-6 bg-primary text-on-primary rounded-xl font-label text-sm uppercase font-bold tracking-widest active:scale-95 transition-all shadow-lg z-10"
              >
                {t.config?.back || 'VOLVER AL INICIO'}
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-10 w-full max-w-sm mt-4">
                <div className="inline-block bg-surface border border-outline-variant rounded-full px-4 py-1.5 mb-4 shadow-sm">
                  <p className="font-label text-[10px] uppercase font-bold tracking-[0.3em] opacity-70">
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
                  {currentInterval.name || t.workout?.[(currentInterval.type || 'work') as keyof typeof t.workout] || currentInterval.type}
                </h2>
  
                {currentInterval.roundInfo && (
                  <p className="font-label text-xs uppercase font-bold tracking-widest opacity-50 mt-3">
                    {currentInterval.type === 'rest' 
                      ? (t.workout?.roundRest || 'DESCANSO DE RONDA') 
                      : (t.workout?.round || 'RONDA')} {currentInterval.roundInfo}
                  </p>
                )}
              </div>
  
             <div className={`relative flex items-center justify-center w-full max-w-[340px] aspect-square mb-12 transition-transform duration-300 ${isEnding ? 'scale-105' : 'scale-100'}`}>
                <svg className="absolute inset-0 w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1.5" fill="transparent" className="opacity-10" />
                  
                  <circle 
                    cx="50" cy="50" r="48" 
                    stroke={themeColor} 
                    strokeWidth="8" 
                    fill="transparent" strokeLinecap="round" pathLength="100" strokeDasharray="100" 
                    strokeDashoffset={isPacerWorkUI ? 0 : 100 - circlePercentage}
                    className={`transition-all duration-1000 ease-linear opacity-20 ${isPacerWorkUI ? 'animate-[pulse_1s_ease-in-out_infinite]' : ''}`} 
                  />
                  
                  <circle 
                    cx="50" cy="50" r="48" 
                    stroke={themeColor} 
                    strokeWidth="3" 
                    fill="transparent" strokeLinecap="round" pathLength="100" strokeDasharray="100" 
                    strokeDashoffset={isPacerWorkUI ? 0 : 100 - circlePercentage}
                    className={`transition-all duration-1000 ease-linear ${isPacerWorkUI ? 'animate-[pulse_1s_ease-in-out_infinite]' : ''}`} 
                  />
                </svg>

                <div className="absolute inset-[15px] rounded-full flex flex-col items-center justify-center z-10 bg-transparent">
                <span 
                    className={`font-display font-black leading-none tracking-tighter transition-all duration-300 
                      ${isPacerWorkUI ? 'text-[120px] md:text-[140px] animate-[pulse_1s_ease-in-out_infinite]' : 'text-[80px] md:text-[100px]'}
                      ${isEnding && !isPacerWorkUI ? 'animate-pulse' : ''} 
                    `}
                    style={{ 
                      color: themeColor, 
                      textShadow: isEnding && !isPacerWorkUI ? `0 0 15px ${themeColor}60` : 'none',
                    }}
                  >
                    {/* AHORA USAMOS displayRepCount */}
                    {isPacerWorkUI 
                      ? displayRepCount 
                      : (currentInterval.customDisplay ? currentInterval.customDisplay : formatTime(currentInterval.countUp ? currentInterval.elapsed! : currentInterval.remaining))
                    }
                  </span>
                </div>
              </div>
  
              <div className="w-full max-w-sm mb-auto h-16 text-center">
                {nextInterval && nextInterval.type !== 'finished' && (
                  <button className="w-full flex items-center justify-between bg-surface-container border border-outline-variant rounded-xl px-5 py-3 shadow-sm w-100" onClick={skipInterval}>
                    <div className="flex items-center justify-center  opacity-70 hover:opacity-50 transition-all" >
                      <span className="material-symbols-outlined opacity-40 text-[20px]">skip_next</span>
                      <span className="font-label text-[10px] uppercase font-bold tracking-widest opacity-50">
                        {t.workout?.next || 'SIGUIENTE'}
                      </span>
                    </div>
                    {/* 3. Corrección de tipado TypeScript para nextInterval */}
                    <span className="font-display text-lg font-bold uppercase truncate max-w-[150px]">
                      {nextInterval.name || t.workout?.[(nextInterval.type || 'work') as keyof typeof t.workout] || nextInterval.type}
                    </span>
                  </button>
                )}
              </div>
  
              <div className="flex gap-4 w-full max-w-sm z-10 mt-6">
                <button 
                  onClick={togglePause}
                  className={`flex-1 h-16 rounded-xl font-label text-sm font-bold uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    isPaused 
                      ? 'bg-primary text-on-primary shadow-lg' 
                      : 'bg-surface border border-outline-variant hover:border-outline'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{isPaused ? 'play_arrow' : 'pause'}</span>
                  {isPaused ? (t.workout?.resume || 'REANUDAR') : (t.workout?.pause || 'PAUSAR')}
                </button>
                
                <button 
                  onClick={skipInterval}
                  className="w-16 h-16 bg-surface flex items-center justify-center rounded-xl border border-outline-variant opacity-70 hover:opacity-100 transition-all active:scale-95 shadow-sm"
                >
                  <span className="material-symbols-outlined">fast_forward</span>
                </button>
              </div>
            </>
          )}
        </div>
  
        {!isFinished && (
          <div className="absolute top-6 right-2 md:right-6 z-50 flex items-center gap-3">
            <button 
              onClick={onEdit || onCancel} 
              title={t.config?.edit || 'Editar WOD'}
              className="w-10 h-10 md:w-12 md:h-12 bg-surface/80 rounded-full border border-outline-variant opacity-70 hover:opacity-100 flex items-center justify-center active:scale-90 transition-all shadow-lg backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-[18px] md:text-[20px]" style={{ fontVariationSettings: "'wght' 300" }}>edit</span>
            </button>
  
            <button 
              onClick={onCancel} 
              title={t.config?.cancel || 'Finalizar WOD'}
              className="w-10 h-10 md:w-12 md:h-12 bg-surface/80 rounded-full border border-outline-variant opacity-70 hover:opacity-100 flex items-center justify-center active:scale-90 transition-all shadow-lg backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-[18px] md:text-[20px]" style={{ fontVariationSettings: "'wght' 300" }}>close</span>
            </button>
          </div>
        )}
      </div>
    );
}