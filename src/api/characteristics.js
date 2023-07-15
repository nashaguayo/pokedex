import pokemonApi from '@/config/pokemonApi';
import { logError } from '@/lib/logger';

export async function getAllCharacteristicsDescriptions() {
  try {
    const oneResult = await pokemonApi.get(`/characteristic?limit=1`);
    const results = await pokemonApi.get(
      `/characteristic?limit=${oneResult.data.count}`
    );
    return await Promise.all(
      results.data.results.map((result) =>
        getCharacteristicDescription(result.url)
      )
    );
  } catch (error) {
    logError(
      getAllCharacteristicsDescriptions.name,
      'Unable to retrieve all characteristic descriptions',
      error
    );
  }
}

export async function getCharacteristicDescription(characteristicUrl) {
  try {
    const results = await pokemonApi.get(
      characteristicUrl.replace(process.env.VUE_APP_POKEAPI_URL, '')
    );
    // TODO: Create constant for language
    const filteredResult = results.data.descriptions.filter(
      (description) => description.language.name == 'en'
    );
    return filteredResult[0].description;
  } catch (error) {
    logError(
      getCharacteristicDescription.name,
      'Unable to get characteristic description',
      error
    );
  }
}
