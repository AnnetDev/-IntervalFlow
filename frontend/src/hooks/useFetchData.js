import { useState, useEffect } from 'react';
const API_BASE_URL = 'https://intervalflow-api.onrender.com/api';


export function useFetchData(filters = {}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setError(null);
      try {
        const params = new URLSearchParams();

        if (filters.difficulty) params.append('difficulty', filters.difficulty);
        if (filters.muscleGroup) params.append('muscleGroup', filters.muscleGroup);
        if (filters.equipment) params.append('equipment', filters.equipment);

        const queryString = params.toString();
        const url = `${API_BASE_URL}/exercises${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.data);

      } catch (err) {
        console.error('Error fetching exercises:', err);
        setError('Failed to load exercises. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [filters.difficulty, filters.muscleGroup, filters.equipment]);
  return { data, isLoading, error }
}

export function useGetExerciseById(id) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getExerciseById() {
      try {
        const response = await fetch(`${API_BASE_URL}/exercises/${id}`);

        if (!response.ok) {
          throw new Error(`Exercise not found`);
        }

        const result = await response.json();
        setData(result);

      } catch (error) {
        console.error('Error fetching exercise:', error);
        throw error;
      } finally {
        setIsLoading(false);

      }
    }
    getExerciseById();
  }, [id]);
  return { data, isLoading }
}