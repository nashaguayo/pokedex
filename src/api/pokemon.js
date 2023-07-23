import pokemonApi from '@/config/pokemonApi';
import { logError } from '@/lib/logger';

export async function getDataForPokemon(pokemonName) {
  try {
    const response = await pokemonApi.get(`pokemon/${pokemonName}`);
    const id = response.data.id;
    const image = response.data.sprites.front_default;
    const types = response.data.types.map((t) => t.type.name);
    return { id, image, types };
  } catch (error) {
    logError(
      getDataForPokemon.name,
      'Unable to retrieve data for pokemon',
      error
    );
  }
}

export async function getPokemons(url) {
  try {
    const response = await pokemonApi.get(
      url?.replace(process.env.VUE_APP_POKEAPI_URL, '') ?? 'pokemon'
    );
    return response.data;
  } catch (error) {
    logError(getPokemons.name, 'Unable to retrieve Pokemons', error);
  }
}

export async function getAllPokemons() {
  try {
    const count = (await pokemonApi.get('pokemon?limit=1')).data.count;
    const response = await pokemonApi.get(`pokemon?limit=${count}`);
    return response.data;
  } catch (error) {
    logError(getAllPokemons.name, 'Unable to retrieve all Pokemons', error);
  }
}

export async function getPokemon(id) {
  if (!id) {
    return;
  }
  try {
    const response = await pokemonApi.get(`pokemon/${id}`);
    return response.data;
  } catch (error) {
    logError(getPokemon.name, 'Unable to retrieve Pokemon', error);
  }
}

export async function getRandomPokemons(amount) {
  try {
    const response = await getPokemons('pokemon?limit=1');
    const randomPokemons = [];
    let n = 0;
    while (n < amount) {
      const randomPokemonId = Math.floor(Math.random() * response.count);
      const pokemon = await getPokemon(randomPokemonId);
      if (!pokemon) {
        continue;
      } else {
        n++;
      }
      randomPokemons.push(pokemon);
    }
    return randomPokemons;
  } catch (error) {
    logError(
      getRandomPokemons.name,
      'Unable to retrieve Random Pokemon',
      error
    );
  }
}

export async function getSpeciesData(url) {
  try {
    const response = await pokemonApi.get(url);
    const result = response.data.flavor_text_entries.filter(
      (flavorText) => flavorText.language.name === 'en'
    );
    const flavorTexts = result.map((text) =>
      text.flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ')
    );
    const flavorTextsWithoutRepetition = [...new Set(flavorTexts)];
    return {
      flavorTexts: flavorTextsWithoutRepetition ?? [],
      color: response.data.color?.name ?? '-',
      shape: response.data.shape?.name ?? '-',
      generation:
        response.data.generation?.name.replace('generation-', '') ?? '-',
    };
  } catch (error) {
    logError(
      getSpeciesData.name,
      'Unable to retrieve flavor texts or color',
      error
    );
  }
}
