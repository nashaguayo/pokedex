import pokemonApi from '@config/pokemonApi';
import { logError } from '@lib/logger';

export async function getPokemonEvolutions(pokemonId) {
  try {
    const speciesResponse = await pokemonApi.get(
      `/pokemon-species/${pokemonId}`
    );
    const speciesData = speciesResponse.data;
    const evolutionChainResponse = await pokemonApi.get(
      speciesData.evolution_chain.url
    );
    const evolutionChainData = evolutionChainResponse.data;

    const evolutions = [];
    let chain = evolutionChainData.chain;

    const initialPokemonResponse = await pokemonApi.get(
      `/pokemon/${pokemonId}`
    );
    const initialPokemonData = initialPokemonResponse.data;

    const initialPokemon = {
      species: chain.species.name,
      image: initialPokemonData.sprites.front_default,
    };
    evolutions.push(initialPokemon);

    while (chain['evolves_to'].length > 0) {
      const evolutionDetails = chain.evolves_to[0].evolution_details;
      if (evolutionDetails.length > 0) {
        const speciesName = chain.evolves_to[0].species.name;
        const speciesId = chain.evolves_to[0].species.url
          .split('/')
          .slice(-2, -1)[0];
        const evolutionPokemonResponse = await pokemonApi.get(
          `/pokemon/${speciesId}`
        );
        const evolutionPokemonData = evolutionPokemonResponse.data;
        const image = evolutionPokemonData.sprites.front_default;

        const evolution = {
          species: speciesName,
          image: image,
        };
        evolutions.push(evolution);
      }

      chain = chain.evolves_to[0];
    }

    return evolutions;
  } catch (error) {
    logError(
      getPokemonEvolutions.name,
      'Unable to retrieve evolutions for Pokemon',
      error
    );
  }
}
