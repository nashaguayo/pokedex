import pokemonApi from '@/config/pokemonApi';
import { getLanguage } from '@/lib/localStorage';
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
    return {
      name:
        response.data.names.filter(
          (language) => language.language.name === getLanguage()
        )[0]?.name ??
        response.data.names.filter(
          (language) =>
            language.language.name === process.env.VUE_APP_FALLBACK_LOCALE
        )[0]?.name,
      pokemons: response.data.pokemon_species.map((p) => p.name) ?? [],
    };
  } catch (error) {
    logError(
      getPokemonsByShape.name,
      `Unable to retrieve pokemons by shape ${shape}`,
      error
    );
  }
}

export async function getPokemonShapeTranslation(shape) {
  try {
    const response = await pokemonApi.get(`pokemon-shape/${shape}`);
    return (
      response.data.names.filter(
        (language) => language.language.name === getLanguage()
      )[0]?.name ??
      response.data.names.filter(
        (language) =>
          language.language.name === process.env.VUE_APP_FALLBACK_LOCALE
      )[0]?.name
    );
  } catch (error) {
    logError(
      getPokemonShapeTranslation.name,
      `Unable to retrieve translation for shape ${shape}`,
      error
    );
  }
}
