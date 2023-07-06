import pokemonApi from '@config/pokemonApi';
import { logError } from '@lib/logger';

export async function getPokemonEvolutions(pokemonId) {
  try {
    const speciesResponse = await pokemonApi.get(
      `/pokemon-species/${pokemonId}`
    );
    const evolutionChainResponse = await pokemonApi.get(
      speciesResponse.data.evolution_chain.url
    );
    const initialPokemonResponse = await pokemonApi.get(
      `/pokemon/${pokemonId}`
    );

    const evolutions = [];
    const initialPokemon = {
      species: speciesResponse.data.name,
      image: initialPokemonResponse.data.sprites.front_default,
    };
    evolutions.push(initialPokemon);

    let chain = evolutionChainResponse.data.chain;

    while (chain.evolves_to.length > 0) {
      const evolutionDetails = chain.evolves_to[0].evolution_details;

      if (evolutionDetails.length > 0) {
        const speciesId = chain.evolves_to[0].species.url
          .split('/')
          .slice(-2, -1)[0];
        const evolutionPokemonResponse = await pokemonApi.get(
          `/pokemon/${speciesId}`
        );
        const evolution = {
          species: chain.evolves_to[0].species.name,
          image: evolutionPokemonResponse.data.sprites.front_default,
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
