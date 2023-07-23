import pokemonApi from '@/config/pokemonApi';
import { logError } from '@/lib/logger';

export async function getAllColors() {
  try {
    const response = await pokemonApi.get(`pokemon-color`);
    return response.data.results.map((color) => color.name);
  } catch (error) {
    logError(getAllColors.name, 'Unable to retrieve all colors', error);
  }
}

export async function getPokemonsByColor(color) {
  try {
    const response = await pokemonApi.get(`pokemon-color/${color}`);
    return response.data.pokemon_species.map((p) => p.name) ?? [];
  } catch (error) {
    logError(
      getPokemonsByColor.name,
      'Unable to retrieve pokemons by color',
      error
    );
  }
}
