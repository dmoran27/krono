import { WorkoutInterval, TrainingMode } from '../types';

export function buildWorkoutSequence(mode: TrainingMode, config: any): WorkoutInterval[] {
  const sequence: WorkoutInterval[] = [];

  // 1. TIEMPO DE PREPARACIÓN 
  if (config.preparationTime && config.preparationTime > 0) {
    sequence.push({
      id: `prep-${Date.now()}`,
      name: 'PREPARACIÓN',
      duration: config.preparationTime,
      type: 'prep'
    });
  }

  // 2. MODO: AMRAP
  if (mode === 'amrap') {
    sequence.push({
      id: `work-amrap-${Date.now()}`,
      name: 'AMRAP',
      duration: config.timeCap * 60,
      type: 'work'
    });
  }

  // 3. MODO: FOR TIME
  if (mode === 'fortime') {
    sequence.push({
      id: `work-fortime-${Date.now()}`,
      name: 'FOR TIME',
      duration: config.timeCap * 60, 
      type: 'work',
      countUp: true
    });
  }

  // 4. MODO: EMOM
  if (mode === 'emom') {
    const rounds = config.rounds || 10;
    const everySeconds = 60; 
    const exercises = config.exercises || []; 

    // Memoria para rastrear qué lado toca en los ejercicios unilaterales
    const sideTracker: Record<string, 'L' | 'R'> = {};

    for (let i = 0; i < rounds; i++) {
      let exerciseName = `EMOM ${i + 1}/${rounds}`;
      let unilateralSide: 'L' | 'R' | null = null;

      if (exercises.length > 0) {
        const currentExercise = exercises[i % exercises.length];
        
        if (typeof currentExercise === 'string') {
          exerciseName = currentExercise;
        } else {
          exerciseName = currentExercise.name;
          if (currentExercise.unilateral) {
            const nextSide = sideTracker[exerciseName] === 'L' ? 'R' : 'L';
            sideTracker[exerciseName] = nextSide; 
            unilateralSide = nextSide; 
          }
        }
      }

      sequence.push({
        id: `work-emom-r${i + 1}-${Date.now()}`,
        name: exerciseName,
        duration: everySeconds,
        type: 'work',
        unilateral: unilateralSide, 
        roundInfo: `${i + 1}/${rounds}`
      });
    }
  }

  // 5. MODO: TABATA 
  if (mode === 'tabata') {
    const cycles = config.cycles || 8;
    const workTime = config.workTime || 20;
    const restTime = config.restTime || 10;
    
    const activeRest = config.activeRest?.trim() || ''; 
    const exercises = config.exercises || []; 

    const sideTracker: Record<string, 'L' | 'R'> = {};

    for (let i = 0; i < cycles; i++) {
      let exerciseName = 'TABATA'; 
      let unilateralSide: 'L' | 'R' | null = null;

      if (exercises.length > 0) {
        const currentExercise = exercises[i % exercises.length];
        
        if (typeof currentExercise === 'string') {
          exerciseName = currentExercise;
        } else {
          exerciseName = currentExercise.name;
          if (currentExercise.unilateral) {
            const nextSide = sideTracker[exerciseName] === 'L' ? 'R' : 'L';
            sideTracker[exerciseName] = nextSide;
            unilateralSide = nextSide;
          }
        }
      }

      sequence.push({
        id: `work-tabata-c${i + 1}-${Date.now()}`,
        name: exerciseName,
        duration: workTime,
        type: 'work',
        unilateral: unilateralSide,
        roundInfo: `${i + 1}/${cycles}`
      });

      if (i < cycles - 1) {
        sequence.push({
          id: `rest-tabata-c${i + 1}-${Date.now()}`,
          name: activeRest !== '' ? activeRest.toUpperCase() : 'DESCANSO',
          duration: restTime,
          type: 'rest',
          roundInfo: `${i + 1}/${cycles}`
        });
      }
    }
  }

  // 6. MODO: PACER 
  if (mode === 'pacer') {
   
    const exercises = config.exercises || []; 

    exercises.forEach((ex: any, exIndex: number) => {
      const reps = ex.reps || 10;
      const tempo = ex.tempo || 2; 
      const name = typeof ex === 'string' ? ex : (ex.name || 'EJERCICIO');

      for (let r = 0; r < reps; r++) {
        sequence.push({
          id: `work-pacer-${exIndex}-r${r + 1}-${Date.now()}`,
          name: name.toUpperCase(),
          duration: tempo, 
          type: 'work',
          customDisplay: `${r + 1}`
        });
      }
    });
  }

  // 7. MODO: PERSONALIZADO (Intervalos Libres)
  if (mode === 'custom') {
    const intervals = config.intervals || [];
    const sideTracker: Record<string, 'L' | 'R'> = {};

    intervals.forEach((interval: CustomInterval, index: number) => {
      let unilateralSide: 'L' | 'R' | null = null;
      const name = interval.name.trim() || (interval.type === 'rest' ? 'DESCANSO' : 'EJERCICIO');

     
      if (interval.unilateral) {
        const nextSide = sideTracker[name] === 'L' ? 'R' : 'L';
        sideTracker[name] = nextSide;
        unilateralSide = nextSide;
      }

      sequence.push({
        id: `custom-${index}-${Date.now()}`,
        name: name.toUpperCase(),
        duration: interval.duration,
        type: interval.type,
        unilateral: unilateralSide,
        roundInfo: `${index + 1}/${intervals.length}`
      });
    });
  }
  

  // 7. BLOQUE FINAL
  sequence.push({
    id: `finish-${Date.now()}`,
    name: 'WORKOUT FINISHED',
    duration: 0,
    type: 'finished'
  });

  return sequence;
}