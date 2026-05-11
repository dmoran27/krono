import { useState } from 'react';
import HomeView from './views/HomeView';
import ConfigView from './views/ConfigView';
import MainLayout from './components/MainLayout';
import { TrainingMode } from './types';

function App() {
  const [currentView, setCurrentView] = useState<TrainingMode>('home');

  const renderView = () => {
    if (currentView === 'home') {
      return <HomeView onSelectMode={setCurrentView} />;
    }

    return (
      <ConfigView 
        mode={currentView} 
        onStart={(config) => console.log('Iniciando con:', config)} 
      />
    );
  };

  return (
    <MainLayout onGoHome={() => setCurrentView('home')}>
      {renderView()}
    </MainLayout>
  );
}

export default App;