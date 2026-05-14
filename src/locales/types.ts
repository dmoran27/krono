export interface Translations {
  common: {
    settings: string;
    return: string;
    reboot: string;
  };
  home: {
    appTitle: string;
    selectProtocol: string;
    protocol: string;
    configure: string;
    modes: Record<string, string>; 
  };
  nav: {
    timer: string;
    history: string;
    settings:string;
  };
  config: {
    listIndexLabel: string;
    configuration: string;
    minutes: string;
    seconds: string;
    sequence: string;
    addMinute: string;
    startWorkout: string;
    min: string;
    restPlaceholder: string;
    workTime: string;
    restTime: string;
    rounds: string;
    timeCap: string;
    exercisesSequence: string;
    addExercise: string;
    activeRest: string;
    activeRestPlaceholder: string;
    preparationTime: string;
    cycles: string;
    cycleRest: string;
    unilateralMode: string;
    every: string;
    roundsTotal: string;
    alternatingExercises: string;
    RowActionGroup: string;
    reps: string;
    pace: string;
    addInterval: string;
    work: string;
    rest: string;
    back: string;
    edit: string;
    cancel: string;
    delete: string;
  },
  workout: {
    finished: string;
    timeElapsed: string;
    side: string;
    missionAccomplished:string;
    left: string;
    leftFull: string; 
    preparation: string;
    exercise: string;
    rightFull: string;
    right: string;
    currentExercise: string;
    next: string;
    resume: string;
    pause: string;
    skip: string;
    prep: string;
    work: string;
    rest: string;
    loading: string;
    activeRest: string;
    roundRest: string;
    round: string;
  },
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    twitterDescription: string;
  },
  footer: {
    brandName: string;
    copyright: string;
    version: string;
  },
  settings:{
    langLabel: string;
    audioGroup: string;
    voiceLabel: string;
    on: string;
    off: string;
    beepsLabel: string;
    dataGroup: string;
    dataDesc: string;
    confirmClear: string;
    clearAll: string;
    status: string;
    subtitle: string;
    appearanceGroup: string;
    themeLabel:string;
    dark:string;
    light:string;
  },
  history:{
    subtitle: string;
    clear: string;
    intervals: string;
    duration: string;
    noLogs: string;
  },
  protocols:{
    tabataDesc: string;
    emomDesc: string;
    amrapDesc: string;
    fortimeDesc: string;
    pacerDesc: string;
    customDesc: string;
    stats: {
      totalTime: string;
      intensity: string;
      max: string;
    }
  }
}