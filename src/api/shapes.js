import pokemonApi from '@/config/pokemonApi';
import { logError } from '@/lib/logger';

export async function getAllShapes() {
  try {
    const response = await pokemonApi.get(`pokemon-shape`);
    return response.data.results.map((shape) => shape.name);
  } catch (error) {
    logError(getAllShapes.name, 'Unable to retrieve all shapes', error);
  }
}

export async function getPokemonsByShape(shape) {
  try {
    const response = await pokemonApi.get(`pokemon-shape/${shape}`);
    return response.data.pokemon_species.map((p) => p.name) ?? [];
  } catch (error) {
    logError(
      getPokemonsByShape.name,
      'Unable to retrieve pokemons by shape',
      error
    );
  }
}
