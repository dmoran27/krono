export interface Translations {
  common: {
    settings: string;
    return: string;
    reboot: string;
  };
  home: {
    appTitle: string;
    selectProtocol: string;
    modes: Record<string, string>; 
  };
  nav: {
    timer: string;
    history: string;
    home:string;
  };
  config: {
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
  };
}