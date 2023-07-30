import pokemonApi from '@/config/pokemonApi';
import { getLanguage } from '@/lib/localStorage';
import { logError } from '@/lib/logger';

export async function getPokemonStatTranslation(stat) {
  try {
    const response = await pokemonApi.get(`stat/${stat}`);
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
      getPokemonStatTranslation.name,
      `Unable to retrieve translation for stat ${stat}`,
      error
    );
  }
}
