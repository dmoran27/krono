import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Translations } from '../locales/types';
import { es } from '../locales/es';
import { en } from '../locales/en';

type Language = 'es' | 'en';

interface LanguageContextProps {
  language: Language;
  t: Translations; 
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('kronos_language');
    return (savedLang as Language) || 'es';
  });

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLang = prev === 'es' ? 'en' : 'es';
      localStorage.setItem('kronos_language', newLang); 
      return newLang;
    });
  };

  const t = language === 'es' ? es : en;

  // ==========================================
  // EFECTO DINÁMICO PARA ACTUALIZAR META TAGS
  // ==========================================
  useEffect(() => {
    // 1. Cambia el idioma base del HTML
    document.documentElement.lang = language;
    
    // 2. Cambia el Título de la pestaña
    document.title = t.meta.title;

    // 3. Función auxiliar para actualizar los metatags de forma limpia
    const updateMetaTag = (selector: string, content: string) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute('content', content);
      }
    };

    // 4. Actualizamos las etiquetas leyendo desde nuestro archivo de traducción
    updateMetaTag('meta[name="description"]', t.meta.description);
    
    updateMetaTag('meta[property="og:title"]', t.meta.ogTitle);
    updateMetaTag('meta[property="og:description"]', t.meta.ogDescription);
    
    updateMetaTag('meta[name="twitter:title"]', t.meta.title); 
    updateMetaTag('meta[name="twitter:description"]', t.meta.twitterDescription);
    
  }, [language, t]); // Se ejecuta cada vez que 'language' cambia

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de un LanguageProvider');
  }
  return context;
}