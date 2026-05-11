export type TrainingMode = 'home' | 'tabata' | 'emom' | 'amrap' | 'fortime' | 'custom' | 'pacer';

export interface ViewProps {
  onSelectMode: (mode: TrainingMode) => void;
}

export interface MenuButtonProps {
  mode: TrainingMode;
  icon: string;
  label: string;
  onClick: () => void;
}

export interface Exercise {
  name: string;
  unilateral: boolean;
}

export interface TabataCycle {
  workTime: number;
  restTime: number;
  rounds: number;
  exercises: Exercise[];
  unilateralMode: boolean;
  activeRest: string; 
}

export interface TabataSettings {
  preparationTime: number;
  cycles: number;          
  cycleRestTime: number;   
  cycleConfigs: TabataCycle[]; 
}

export interface EmomSettings {
  preparationTime: number;
  workWindow: number;
  rounds: number;  
  exercises: Exercise[];
}

export interface AmrapSettings {
  preparationTime: number; 
  timeCap: number;
}

export interface ForTimeSettings {
  preparationTime: number; 
  timeCap: number;         
}


export interface PaceExercise {
  name: string;
  reps: number;
  timePerRep: number; // Segundos que dura CADA repetición
  unilateral: boolean;
}

export interface PaceSettings {
  preparationTime: number;
  exercises: PaceExercise[];
}

export type CustomIntervalType = 'work' | 'rest';

export interface CustomInterval {
  name: string;
  duration: number; // en segundos
  type: CustomIntervalType;
  unilateral: boolean;
}

export interface CustomSettings {
  preparationTime: number;
  rounds: number; // Cantidad de veces que se repite la secuencia completa
  intervals: CustomInterval[];
}