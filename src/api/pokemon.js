import pokemonApi from '@config/pokemonApi';
import { logError } from '@lib/logger';

export async function getPokemonsInfo(url) {
  try {
    const response = await pokemonApi.get(
      url?.replace(process.env.VUE_APP_POKEAPI_URL, '') ?? 'pokemon'
    );
    return response.data;
  } catch (e) {
    logError(this.function.name, 'Unable to retrieve Pokemons', e);
  }
}

export async function getAmountOfPokemons() {
  try {
    const response = await pokemonApi.get('pokemon');
    return response.data.count;
  } catch (e) {
    logError(this.function.name, 'Unable to retrieve Pokemon count', e);
  }
}

export async function getPokemon(id) {
  try {
    const response = await pokemonApi.get(`pokemon/${id}`);
    return response.data;
  } catch (e) {
    logError(this.function.name, 'Unable to retrieve Pokemon', e);
  }
}
