import shapes from '@/store/state/shapes';
import {
  getAllShapes as getAllShapesApi,
  getPokemonsByShape as getPokemonsByShapeApi,
} from '@/api/shapes';

export function toggleFilter(shape) {
  shapes.setFilter(shapes.getFilter() === shape ? '' : shape);
}

export function clearFilters() {
  shapes.setFilter('');
}

export async function getAll() {
  const allShapes = await getAllShapesApi();
  shapes.setAll(allShapes);
  await Promise.all(
    allShapes.map(async (shape) => {
      const { name, pokemons } = await getPokemonsByShapeApi(shape);
      if (pokemons.length) {
        shapes.setPokemons(name, pokemons);
        shapes.replaceTranslation(shape, name);
        return;
      }
      shapes.remove(shape);
    })
  );
}

export function getPokemonsSize() {
  return shapes.getPokemons().size;
}

export function searchPokemonsByShape(searchTermLowerCase) {
  return shapes
    .getPokemons()
    .get(shapes.getFilter())
    .filter((pokemon) => pokemon.includes(searchTermLowerCase));
}

export function thereIsAFilterActive() {
  return shapes.getFilter() !== '';
}
