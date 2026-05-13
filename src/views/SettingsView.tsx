import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function SettingsView() {
  const { t, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
      <div className="w-full space-y-10">
        <header className="border-l-4 border-primary pl-6">
          <h2 className="font-display text-4xl text-primary uppercase font-bold italic">
            {t.nav.settings || 'SETTINGS'}
          </h2>
          <p className="font-label text-on-surface-variant tracking-widest text-xs uppercase">
            System configuration
          </p>
        </header>

        <section className="space-y-6">
          {/* APARIENCIA */}
          <div className="bg-surface border border-outline-variant p-6 space-y-6">
            <h3 className="font-label text-xs font-bold text-primary uppercase tracking-widest">Appearance & Lang</h3>
            
            <div className="flex justify-between items-center">
              <span className="font-body text-on-surface">Color Theme</span>
              <button onClick={toggleTheme} className="bg-surface-container px-4 py-2 border border-outline-variant text-xs font-bold uppercase tracking-widest hover:border-primary transition-all">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-body text-on-surface">Language</span>
              <button onClick={toggleLanguage} className="bg-surface-container px-4 py-2 border border-outline-variant text-xs font-bold uppercase tracking-widest hover:border-primary transition-all">
                Change to {t.lang === 'es' ? 'English' : 'Español'}
              </button>
            </div>
          </div>

          {/* GESTIÓN DE DATOS (Flex de Ingeniería) */}
          <div className="bg-surface border border-outline-variant p-6 space-y-6">
            <h3 className="font-label text-xs font-bold text-primary uppercase tracking-widest">Data Management</h3>
            <p className="font-body text-sm text-on-surface-variant">
              KRONOS uses local storage. Export your data to keep a backup.
            </p>
            <div className="flex gap-4">
              <button className="flex-1 bg-primary text-white py-3 font-label text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-transform">
                Export JSON
              </button>
              <button className="flex-1 border border-outline-variant py-3 font-label text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-transform">
                Clear All
              </button>
            </div>
          </div>

          {/* STATUS */}
          <div className="flex justify-between items-center opacity-40 px-2">
            <span className="font-label text-[10px] uppercase tracking-widest">System Status</span>
            <span className="font-label text-[10px] text-primary font-bold uppercase">Ready Offline (PWA)</span>
          </div>
        </section>
      </div>
  );
}