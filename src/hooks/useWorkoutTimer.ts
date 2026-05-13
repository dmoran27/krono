import { useState, useEffect, useCallback } from 'react';
import { WorkoutInterval, ActiveInterval, WorkoutProgress } from '../types';

export function useWorkoutTimer(sequence: WorkoutInterval[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(sequence.length > 0 ? sequence[0].duration : 0);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const nextInterval = useCallback(() => {
    if (currentIndex < sequence.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setTimeLeft(sequence[nextIdx].duration);
    }
  }, [currentIndex, sequence]);

  useEffect(() => {
    if (isPaused || sequence.length === 0) return;

    const currentBlock = sequence[currentIndex];
    
    if (currentBlock.type === 'finished') return;

    if (timeLeft === 0) {
      nextInterval();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused, currentIndex, sequence, nextInterval]);

  const togglePause = () => setIsPaused((prev) => !prev);
  
  const skipInterval = () => {
    if (sequence[currentIndex].type !== 'finished') {
      nextInterval();
    }
  };

  const currentSequenceBlock = sequence[currentIndex] || null;
  const nextSequenceBlock = sequence[currentIndex + 1] || null;
  const isFinished = currentSequenceBlock?.type === 'finished';
  const currentIntervalElapsedTime = currentSequenceBlock 
    ? currentSequenceBlock.duration - timeLeft 
    : 0;

  const currentInterval: ActiveInterval | null = currentSequenceBlock ? {
    name: currentSequenceBlock.name,
    duration: currentSequenceBlock.duration,
    elapsed: currentIntervalElapsedTime, 
    remaining: timeLeft,
    type: currentSequenceBlock.type,
    unilateral: currentSequenceBlock.unilateral,
    countUp: currentSequenceBlock.countUp, 
    roundInfo: currentSequenceBlock.roundInfo,
    customDisplay: currentSequenceBlock.customDisplay,
  } : null;

  const progress: WorkoutProgress = {
    currentIntervalIndex: currentIndex,
    totalIntervals: sequence.length,
    currentRound: 1,
    totalRounds: 1,
    elapsedTime: elapsedTime
  };

  return {
    currentInterval,
    nextInterval: nextSequenceBlock,
    progress,
    isPaused,
    isFinished, 
    togglePause,
    skipInterval
  };
}