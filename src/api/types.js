import pokemonApi from '@/config/pokemonApi';
import { logError } from '@/lib/logger';

export async function getAllTypes() {
  try {
    const response = await pokemonApi.get(`type`);
    return response.data.results.map((type) => type.name);
  } catch (error) {
    logError(getAllTypes.name, 'Unable to retrieve pokemon types', error);
  }
}
