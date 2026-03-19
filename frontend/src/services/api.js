const API_BASE_URL = 'https://intervalflow-api.onrender.com/api';

export async function getAllExercises(filters = {}) {
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

    const json = await response.json();
    return json.data;

  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
}

export async function getExerciseById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/exercises/${id}`);

    if (!response.ok) {
      throw new Error(`Exercise not found`);
    }

    const json = await response.json();
    return json.data;

  } catch (error) {
    console.error('Error fetching exercise:', error);
    throw error;
  }
}
