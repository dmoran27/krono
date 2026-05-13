import { useState } from 'react';
import MainLayout from './components/MainLayout';
import HomeView from './views/HomeView';
import HistoryView from './views/HistoryView';
import SettingsView from './views/SettingsView';
import ConfigView from './views/ConfigView';
import WorkoutView from './views/WorkoutView';
import { useHistory } from './hooks/useHistory';

import { TrainingMode, WorkoutInterval, ScreenState } from './types';
import { buildWorkoutSequence } from './utils/workoutBuilder';

type AppScreen = 'home' | 'history' | 'settings' | 'config' | 'workout';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  
  const [selectedMode, setSelectedMode] = useState<TrainingMode | null>(null);
  const [workoutSequence, setWorkoutSequence] = useState<WorkoutInterval[]>([]);
  
  const [savedConfig, setSavedConfig] = useState<any>(null);
  const { saveWorkout } = useHistory();

  const handleWorkoutFinish = (elapsedTime: number, totalIntervals: number) => {
    saveWorkout({
      mode: selectedMode || 'CUSTOM',
      elapsedTime,
      totalIntervals
    });
  };

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

  const handleGoHome = () => {
    setCurrentScreen('home');
    setSelectedMode(null);
    setWorkoutSequence([]);
  };

  const handleEditWorkout = () => {
    setCurrentScreen('config'); 
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
          initialData={savedConfig}   />
        ) : null;
      case 'workout':
        return (
          <WorkoutView 
          sequence={workoutSequence} 
          mode={selectedMode}
          onCancel={handleCancelWorkout}
          onEdit={handleEditWorkout} 
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
      onNavigate={setCurrentScreen}
      onGoHome={handleGoHome}
    >
      {renderView()}
    </MainLayout>
  );
}