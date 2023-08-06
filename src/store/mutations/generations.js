import generations from '@/store/state/generations';
import {
  getAllGenerations as getAllGenerationsApi,
  getPokemonsByGeneration as getPokemonsByGenerationApi,
} from '@/api/generations';

export function toggleFilter(generation) {
  generations.setFilter(
    generations.getFilter() === generation ? '' : generation
  );
}

export function clearFilters() {
  generations.setFilter('');
}

export async function getAll() {
  const allGenerations = await getAllGenerationsApi();
  generations.setAll(allGenerations);
  await Promise.all(
    allGenerations.map(async (generation) => {
      const pokemons = await getPokemonsByGenerationApi(generation);
      if (pokemons.length) {
        generations.setPokemons(generation, pokemons);
        return;
      }
      generations.remove(generation);
    })
  );
}

export function getPokemonsSize() {
  return generations.getPokemons().size;
}

export function searchPokemonsByGeneration(searchTermLowerCase) {
  return generations
    .getPokemons()
    .get(generations.getFilter())
    .filter((pokemon) => pokemon.includes(searchTermLowerCase));
}

export function thereIsAFilterActive() {
  return generations.getFilter() !== '';
}
