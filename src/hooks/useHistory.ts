import { useState, useEffect } from 'react';
import { WorkoutHistoryEntry } from '../types';

const STORAGE_KEY = 'kronos_workout_history';
const MAX_RECORDS = 20;

export function useHistory() {
  const [history, setHistory] = useState<WorkoutHistoryEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Error parseando el historial de KRONOS', e);
      }
    }
  }, []);

  const saveWorkout = (entry: Omit<WorkoutHistoryEntry, 'id' | 'date'>) => {
    const newEntry: WorkoutHistoryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toISOString(), 
    };

   
    const updatedHistory = [newEntry, ...history].slice(0, MAX_RECORDS);
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { history, saveWorkout, clearHistory };
}