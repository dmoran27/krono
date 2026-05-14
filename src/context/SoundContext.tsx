import React, { createContext, useContext, useState, useEffect } from 'react';

interface SoundSettings {
  voiceEnabled: boolean;
  beepsEnabled: boolean;
}

interface SoundContextType {
  settings: SoundSettings;
  toggleVoice: () => void;
  toggleBeeps: () => void;
  toggleMasterMute: () => void; // Para el botón rápido en la pantalla de entrenamiento
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // Inicializamos leyendo de localStorage
  const [settings, setSettings] = useState<SoundSettings>(() => {
    const saved = localStorage.getItem('kronos_sound_prefs');
    return saved ? JSON.parse(saved) : { voiceEnabled: true, beepsEnabled: true };
  });

  // Guardamos en localStorage cada vez que cambien los ajustes
  useEffect(() => {
    localStorage.setItem('kronos_sound_prefs', JSON.stringify(settings));
  }, [settings]);

  // Funciones para la pantalla de Ajustes (individuales)
  const toggleVoice = () => setSettings(prev => ({ ...prev, voiceEnabled: !prev.voiceEnabled }));
  const toggleBeeps = () => setSettings(prev => ({ ...prev, beepsEnabled: !prev.beepsEnabled }));

  // Función para la pantalla de Entrenamiento (botón de pánico)
  const toggleMasterMute = () => {
    setSettings(prev => {
      // Si alguno de los dos está encendido, apagamos TODO.
      if (prev.voiceEnabled || prev.beepsEnabled) {
        return { voiceEnabled: false, beepsEnabled: false };
      }
      // Si todo estaba apagado, encendemos TODO.
      return { voiceEnabled: true, beepsEnabled: true };
    });
  };

  return (
    <SoundContext.Provider value={{ settings, toggleVoice, toggleBeeps, toggleMasterMute }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound debe usarse dentro de un SoundProvider');
  }
  return context;
}