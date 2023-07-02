import pokemonApi from '@config/pokemonApi';
import { logError } from '@lib/logger';

export async function getPokemons() {
  try {
    const response = await pokemonApi.get('pokemon');
    return response.data;
  } catch (e) {
    logError(this.function.name, e);
  }
}

export async function getAmountOfPokemons() {
  try {
    const response = await pokemonApi.get('pokemon');
    return response.data.count;
  } catch (e) {
    logError(this.function.name, e);
  }
}
