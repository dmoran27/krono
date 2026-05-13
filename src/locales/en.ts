import { Translations } from './types';

export const en: Translations = {
  common: {
    settings: "SETTINGS",
    return: "RETURN",
    reboot: "SYSTEM REBOOT",
  },
  home: {
    appTitle: "K R O N O",
    selectProtocol: "SELECT TRAINING PROTOCOL",
    configure: "Configure",
    protocol: "PROTOCOL",
    modes: {
      tabata: "TABATA",
      emom: "EMOM",
      amrap: "AMRAP",
      fortime: "FOR TIME",
      custom: "CUSTOM",
      pacer: "PACER",
    },
  },
  nav: {
    timer: "PROTOCOL",
    history: "HISTORY",
    settings:"SETTINGS"
  },
  config: {
    listIndexLabel: "SEQ",
    configuration: "CONFIGURATION",
    minutes: "MINUTES",
    seconds: "SECONDS",
    sequence: "EXERCISE SEQUENCE",
    addMinute: "ADD MINUTE",
    startWorkout: "START WORKOUT",
    min: "MIN",
    restPlaceholder: "REST",
    workTime: "WORK TIME",
    restTime: "REST TIME",
    rounds: "ROUNDS",
    timeCap: "TIME CAP",
    exercisesSequence: "EXERCISES (ROTATING)",
    addExercise: "ADD EXERCISE",
    activeRest: "ACTIVE REST (OPTIONAL)",
    activeRestPlaceholder: "EX: PLANK HOLD",
    preparationTime: "PREPARATION TIME",
    cycles: "CYCLES (TOTAL TABATAS)",
    cycleRest: "REST BETWEEN CYCLES",
    unilateralMode: "UNILATERAL MODE (ALTERNATE SIDES)",
    every: "EVERY (WINDOW)",
    roundsTotal: "TOTAL ROUNDS",
    alternatingExercises: "SEQUENCE (ALTERNATING PER ROUND)",
    RowActionGroup: "L/R",
    reps: "REPS",
    pace: "PACE (SEC/REP)",
    addInterval: "ADD INTERVAL",
    work: "WORK",
    rest: "REST",
    back: "BACK",
      edit: "EDIT WOD",
      cancel: "CANCEL"
    },
    workout: {
      finished: "WORKOUT COMPLETED",
      timeElapsed: "TOTAL TIME",
      side: "SIDE",
      left: "LEFT",
      right: "RIGHT",
      currentExercise: "CURRENT EXERCISE",
      next: "NEXT",
      resume: "RESUME",
      pause: "PAUSE",
      skip: "SKIP",
      prep: "PREPARATION",
      work: "WORK",
      rest: "REST"
    },
    footer: {
      brandName: "KRONO",
      copyright: "All rights reserved",
      version: "Version"
    },    
    protocols: {
      tabataDesc: "High-intensity interval training. 20 seconds work, 10 seconds rest. 8 rounds of technical precision.",
      emomDesc: "Every Minute on the Minute. Volume-based mastery.",
      amrapDesc: "As Many Rounds As Possible. Pushing the threshold.",
      fortimeDesc: "Complete the designated work as fast as possible.",
      pacerDesc: "Beat the target cadence. Sustained output.",
      customDesc: "Build complex interval sequences from scratch.",
      stats: {
        totalTime: "Total time",
        intensity: "Intensity",
        max: "MAX",
      }
    }
    
    
    
};