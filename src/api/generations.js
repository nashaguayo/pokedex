import pokemonApi from '@/config/pokemonApi';
import { logError } from '@/lib/logger';

export async function getAllGenerations() {
  try {
    const response = await pokemonApi.get(`generation`);
    return response.data.results.map((generation) =>
      generation.name.replace('generation-', '')
    );
  } catch (error) {
    logError(
      getAllGenerations.name,
      'Unable to retrieve all generations',
      error
    );
  }
}

export async function getPokemonsByGeneration(generation) {
  try {
    const response = await pokemonApi.get(
      `generation/generation-${generation}`
    );
    return response.data.pokemon_species.map((p) => p.name) ?? [];
  } catch (error) {
    logError(
      getPokemonsByGeneration.name,
      `Unable to retrieve pokemons by generation ${generation}`,
      error
    );
  }
}
