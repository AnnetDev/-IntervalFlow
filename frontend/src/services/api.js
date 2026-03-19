const API_BASE_URL = 'https://intervalflow-api.onrender.com/api';

export function getAllExercises() {
  return fetch(`${API_BASE_URL}/exercises`)
    .then(response => {
      if (!response.ok) { throw new Error(response.status) }
      return response.json();
    })
    .then(json => json.data)
    .catch(error => console.error('Error fetching exercises:', error));

}

