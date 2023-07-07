import pokemonApi from '@config/pokemonApi';
import { logError } from '@lib/logger';

export async function getPokemons(url) {
  try {
    const response = await pokemonApi.get(url ?? 'pokemon');
    return response.data;
  } catch (error) {
    logError(getPokemons.name, 'Unable to retrieve Pokemons', error);
  }
}

export async function getPokemon(id) {
  try {
    const response = await pokemonApi.get(`pokemon/${id}`);
    return response.data;
  } catch (error) {
    logError(getPokemon.name, 'Unable to retrieve Pokemon', error);
  }
}

export async function getRandomPokemon() {
  try {
    const response = await getPokemons();
    const randomPokemonId = Math.floor(Math.random() * response.count);
    return await getPokemon(randomPokemonId);
  } catch (error) {
    logError(getRandomPokemon.name, 'Unable to retrieve Random Pokemon', error);
  }
}
