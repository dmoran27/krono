import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
    <ThemeProvider>
    <SoundProvider>
      <App />
      </SoundProvider>
    </ThemeProvider>
    </LanguageProvider>
  </StrictMode>,
);