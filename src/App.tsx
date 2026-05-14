import { useState } from 'react';
import MainLayout from './components/MainLayout';
import HomeView from './views/HomeView';
import HistoryView from './views/HistoryView';
import SettingsView from './views/SettingsView';
import ConfigView from './views/ConfigView';
import WorkoutView from './views/WorkoutView';
import { TrainingMode, WorkoutInterval} from './types';
import { buildWorkoutSequence } from './utils/workoutBuilder';

// 1. IMPORTA TU HOOK DE HISTORIAL
import { useHistory } from './hooks/useHistory'; 

type AppScreen = 'home' | 'history' | 'settings' | 'config' | 'workout';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  
  // 2. EXTRAE LA FUNCIÓN DE GUARDADO
  const { saveWorkout } = useHistory();

  const [selectedMode, setSelectedMode] = useState<TrainingMode | null>(null);
  const [workoutSequence, setWorkoutSequence] = useState<WorkoutInterval[]>([]);
  const [savedConfig, setSavedConfig] = useState<any>(null);

  // ==========================================
  // MANEJADORES DE NAVEGACIÓN
  // ==========================================

  const handleSelectMode = (mode: TrainingMode) => {
    setSelectedMode(mode);
    setSavedConfig(null);
    setCurrentScreen('config'); 
  };

  const handleStartWorkout = (configData: any) => {
    if (!selectedMode) return;
    setSavedConfig(configData);
    const generatedSequence = buildWorkoutSequence(selectedMode, configData);
    setWorkoutSequence(generatedSequence);
    setCurrentScreen('workout'); 
  };

  const handleCancelWorkout = () => {
    setSavedConfig(null);
    setSelectedMode(null);
    setCurrentScreen('home');
  };

  const handleEditWorkout = () => {
    setCurrentScreen('config'); 
  };

  // 3. CREA EL MANEJADOR PARA GUARDAR EL ENTRENAMIENTO
  const handleFinishWorkout = (elapsedTime: number, totalIntervals: number) => {
    if (!selectedMode) return;
    
    // Asumiendo que tu hook useHistory maneja el id y la fecha internamente
    saveWorkout({
      mode: selectedMode,
      elapsedTime,
      totalIntervals
    });
  };

  // ==========================================
  // LÓGICA DE RENDERIZADO
  // ==========================================

  const renderView = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeView onSelectMode={handleSelectMode} />;
      case 'history':
        return <HistoryView />;
      case 'settings':
        return <SettingsView />;
      case 'config':
        return selectedMode ? (
          <ConfigView 
            mode={selectedMode} 
            onStart={handleStartWorkout}
            initialData={savedConfig}   
          />
        ) : null;
      case 'workout':
        return (
          <WorkoutView 
            mode={selectedMode} 
            sequence={workoutSequence} 
            onCancel={handleCancelWorkout}
            onEdit={handleEditWorkout} 
            onFinish={handleFinishWorkout} // 4. PÁSALE LA PROP AQUÍ
          />
        );
      default:
        return <HomeView onSelectMode={handleSelectMode} />;
    }
  };

  const getActiveTab = () => {
    if (['home', 'config', 'workout'].includes(currentScreen)) return 'modes';
    return currentScreen as 'history' | 'settings' | 'modes';
  };

  return (
    <MainLayout 
      activeTab={getActiveTab()} 
      onNavigate={(screen) => setCurrentScreen(screen as AppScreen)}
    >
      {renderView()}
    </MainLayout>
  );
}