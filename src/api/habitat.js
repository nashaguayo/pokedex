import pokemonApi from '@/config/pokemonApi';
import { getLanguage } from '@/lib/localStorage';
import { logError } from '@/lib/logger';

export async function getPokemonHabitatTranslation(habitat) {
  try {
    const response = await pokemonApi.get(`pokemon-habitat/${habitat}`);
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
      getPokemonHabitatTranslation.name,
      `Unable to retrieve translation for color ${habitat}`,
      error
    );
  }
}
