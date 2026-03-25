import { useState, useEffect } from "react";

const STORAGE_KEY = 'myExercises';

export function useLocalExercises() {
  const [exercises, setExercises] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));
  }, [exercises]);

  // Create new — user fills in all fields from scratch
  function createExercise(formData) {
    const newExercise = {
      ...formData,
      id: crypto.randomUUID(),
      createdBy: 'local',
      createdAt: new Date().toISOString(),
    };
    setExercises(prev => [...prev, newExercise]);
  }

  // Copy from DB — takes existing exercise, strips DB id, saves locally
  function copyFromLibrary(exercise) {
    const copy = {
      ...exercise,
      id: crypto.randomUUID(),
      createdBy: 'local',
      copiedFrom: exercise._id,
      createdAt: new Date().toISOString(),
    };
    setExercises(prev => [...prev, copy]);
  }

  function updateExercise(id, updatedData) {
    setExercises(prev =>
      prev.map(ex => ex.id === id ? { ...ex, ...updatedData } : ex)
    );
  }

  function deleteExercise(id) {
    setExercises(prev => prev.filter(ex => ex.id !== id));
  }

  return { exercises, createExercise, copyFromLibrary, updateExercise, deleteExercise };
}
