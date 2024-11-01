import { API_KEY, API_ENDPOINT } from '../../config/api.config';

export async function fetchRecipes(query = '') {
  try {
    const response = await fetch(`${API_ENDPOINT}?apiKey=${API_KEY}&${query}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}