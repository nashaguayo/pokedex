import pokemonApi from '@/config/pokemonApi';
import { getLanguage } from '@/lib/localStorage';
import { logError } from '@/lib/logger';

export async function getAllTypes() {
  try {
    const response = await pokemonApi.get(`type`);
    return response.data.results.map((type) => type.name);
  } catch (error) {
    logError(getAllTypes.name, 'Unable to retrieve all types', error);
  }
}

export async function getPokemonsByType(type) {
  try {
    const response = await pokemonApi.get(`type/${type}`);
    return {
      name:
        response.data.names.filter(
          (language) => language.language.name === getLanguage()
        )[0]?.name ??
        response.data.names.filter(
          (language) =>
            language.language.name === process.env.VUE_APP_FALLBACK_LOCALE
        )[0].name,
      pokemons: response.data.pokemon.map((p) => p.pokemon.name) ?? [],
    };
  } catch (error) {
    logError(
      getPokemonsByType.name,
      `Unable to retrieve pokemons by type ${type}`,
      error
    );
  }
}

export async function getPokemonTypeTranslation(type) {
  try {
    const response = await pokemonApi.get(`type/${type}`);
    return (
      response.data.names.filter(
        (language) => language.language.name === getLanguage()
      )[0]?.name ??
      response.data.names.filter(
        (language) =>
          language.language.name === process.env.VUE_APP_FALLBACK_LOCALE
      )[0].name
    );
  } catch (error) {
    logError(
      getPokemonTypeTranslation.name,
      `Unable to retrieve translation for type ${type}`,
      error
    );
  }
}
