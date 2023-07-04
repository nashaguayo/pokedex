import pokemonApi from '@config/pokemonApi';
import { logError } from '@lib/logger';
import silouette from '@assets/pokemons/silouette.png';

export async function getPokemons(url) {
  try {
    const response = await pokemonApi.get(url ?? 'pokemon');
    return response.data;
  } catch (e) {
    logError(getPokemons.name, 'Unable to retrieve Pokemons', e);
    return [];
  }
}

export async function getPokemon(id) {
  try {
    const response = await pokemonApi.get(`pokemon/${id}`);
    return response.data;
  } catch (e) {
    logError(getPokemon.name, 'Unable to retrieve Pokemon', e);
    return {
      sprites: {
        front_default: silouette,
      },
    };
  }
}
