import axios from 'axios';
import { API_KEY, API_ENDPOINT } from '../../config/api.config';

export async function obtenerPlatosBusqueda(query) {
  try {
    const response = await axios.get(`${API_ENDPOINT}`, {
      params: {
        apiKey: API_KEY,
        query: query,
        addRecipeInformation: true,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return []; 
  }
}
