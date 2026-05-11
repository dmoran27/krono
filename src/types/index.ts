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

export interface TabataCycle {
  workTime: number;
  restTime: number;
  rounds: number;
  exercises: string[];
  unilateralMode: boolean;
  activeRest: string; 
}

export interface TabataSettings {
  preparationTime: number;
  cycles: number;          
  cycleRestTime: number;   
  cycleConfigs: TabataCycle[]; 
}

