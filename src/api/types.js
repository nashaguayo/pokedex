import pokemonApi from '@/config/pokemonApi';
import { logError } from '@/lib/logger';

export async function getAllTypes() {
  try {
    const response = await pokemonApi.get(`type`);
    return response.data.results.map((type) => type.name);
  } catch (error) {
    logError(getAllTypes.name, 'Unable to retrieve all types', error);
  }
}

export async function getPokemonsByType(type) {
  try {
    const response = await pokemonApi.get(`type/${type}`);
    return response.data.pokemon.map((p) => p.pokemon.name) ?? [];
  } catch (error) {
    logError(
      getPokemonsByType.name,
      'Unable to retrieve pokemons by type',
      error
    );
  }
}
