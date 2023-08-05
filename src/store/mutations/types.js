import types from '@/store/state/types';
import {
  getAllTypes as getAllTypesApi,
  getPokemonsByType as getPokemonsByTypeApi,
} from '@/api/types';

export function toggleFilter(type) {
  if (types.getFilters().includes(type)) {
    types.removeFilter(type);
    return;
  }
  types.addFilter(type);
}

export function clearFilters() {
  types.clearFilters();
}

export async function getAll() {
  const allTypes = await getAllTypesApi();
  types.setAll(allTypes);
  await Promise.all(
    allTypes.map(async (type) => {
      const { name, pokemons } = await getPokemonsByTypeApi(type);
      if (pokemons.length) {
        types.setPokemonsByType(name, pokemons);
        types.replaceTranslation(type, name);
        return;
      }
      types.remove(type);
    })
  );
}

export function getPokemonsSize() {
  return types.getPokemons().size;
}

export function searchPokemonsByTypes(searchTermLowerCase) {
  let repeatedResults = [];
  types.getFilters().forEach((type) => {
    const filteredPokemonNamesByType = types
      .getPokemons()
      .get(type)
      .filter((pokemon) => pokemon.includes(searchTermLowerCase));
    repeatedResults = [...repeatedResults, ...filteredPokemonNamesByType];
  });

  if (types.getFilters().length === 1) {
    return repeatedResults;
  }

  const namesCount = {};
  repeatedResults.forEach(function (name) {
    namesCount[name] = (namesCount[name] ?? 0) + 1;
  });

  const filteredResults = Object.entries(namesCount).filter(
    (nameCount) => nameCount[1] === types.getFilters().length
  );

  return filteredResults.map((nameCount) => nameCount[0]);
}
