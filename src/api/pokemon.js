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

export async function getPokemonEvolutions(pokemonId) {
  const pokemonSpeciesUrl = `/pokemon-species/${pokemonId}`;

  try {
    const speciesResponse = await pokemonApi.get(pokemonSpeciesUrl);
    const speciesData = speciesResponse.data;

    const evolutionChainUrl = speciesData['evolution_chain']['url'];
    const evolutionChainResponse = await pokemonApi.get(evolutionChainUrl);
    const evolutionChainData = evolutionChainResponse.data;

    const evolutions = [];
    let chain = evolutionChainData['chain'];

    // Include the initial Pokémon in the list of evolutions
    const initialPokemonName = chain['species']['name'];
    evolutions.push(initialPokemonName);

    while (chain['evolves_to'].length > 0) {
      const evolutionDetails = chain['evolves_to'][0]['evolution_details'];
      if (evolutionDetails.length > 0) {
        const speciesName = chain['evolves_to'][0]['species']['name'];
        evolutions.push(speciesName);
      }

      chain = chain['evolves_to'][0];
    }

    return evolutions;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}
