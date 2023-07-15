import pokemonApi from '@/config/pokemonApi';
import { logError } from '@/lib/logger';

export async function getAllCharacteristicsDescriptions() {
  try {
    const oneResult = await pokemonApi.get(`/characteristic?limit=1`);
    const allResults = await pokemonApi.get(
      `/characteristic?limit=${oneResult.data.count}`
    );
    const fleshedOutResults = await Promise.all(
      allResults.data.results.map(async (result) => {
        return {
          key: result.url,
          value: await getCharacteristicDescription(result.url),
        };
      })
    );
    const result = new Map();
    fleshedOutResults.forEach((r) => {
      result.set(r.value.name, [
        ...(result.get(r.value.name) ?? []),
        {
          description: r.value.description,
          possibleValues: r.value.possibleValues,
        },
      ]);
    });
    return result;
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
    return {
      name: results.data.highest_stat.name,
      description: filteredResult[0].description,
      possibleValues: results.data.possible_values,
    };
  } catch (error) {
    logError(
      getCharacteristicDescription.name,
      'Unable to get characteristic description',
      error
    );
  }
}
