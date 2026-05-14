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

export interface TabataSettings {
  preparationTime: number;
  workTime: number;       
  restTime: number;       
  cycles: number;         
  activeRest: string;     
  exercises: Exercise[];  
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
  timePerRep: number; 
  unilateral: boolean;
}

export interface PaceSettings {
  preparationTime: number;
  exercises: PaceExercise[];
}

export type CustomIntervalType = 'work' | 'rest';

export interface CustomInterval {
  name: string;
  duration: number; 
  type: CustomIntervalType;
  unilateral: boolean;
}

export interface CustomSettings {
  preparationTime: number;
  rounds: number;
  intervals: CustomInterval[];
}

export type WorkoutState = 'idle' | 'preparing' | 'work' | 'rest' | 'finished' | 'paused';

export interface ActiveInterval {
  name: string;        
  duration: number;    
  remaining: number;   
  type: 'work' | 'rest' | 'prep' | 'finished' ;
  unilateral?: 'L' | 'R' | null;
  color?: string;      
  elapsed?: number;  
  countUp?: boolean; 
  roundInfo?: string;
  customDisplay?: string;
}

export interface WorkoutProgress {
  currentIntervalIndex: number;
  totalIntervals: number;
  currentRound: number;
  totalRounds: number;
  elapsedTime: number; 
}

export interface WorkoutInterval {
  id: string;
  name: string;      
  duration: number;  
  type: 'prep' | 'work' | 'rest' | 'finished';
  unilateral?: 'L' | 'R' | null;
  countUp?: boolean; 
  roundInfo?: string;
  customDisplay?: string;
}

export interface WorkoutHistoryEntry {
  id: string;
  date: string;
  mode: TrainingMode | 'CUSTOM'; 
  elapsedTime: number;
  totalIntervals: number;
}