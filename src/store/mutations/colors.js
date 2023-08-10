import colors from '@/store/state/colors';
import {
  getAllColors as getAllColorsApi,
  getPokemonsByColor as getPokemonsByColorApi,
} from '@/api/colors';

export function toggleFilter(color) {
  colors.setFilter(colors.getFilter() === color ? '' : color);
}

export function clearFilters() {
  colors.setFilter('');
}

export async function getAll() {
  const allColors = await getAllColorsApi();
  colors.setAll(allColors);
  await Promise.all(
    allColors.map(async (color) => {
      const { name, pokemons } = await getPokemonsByColorApi(color);
      if (pokemons.length) {
        colors.setPokemons(name, pokemons);
        colors.replaceTranslation(color, name);
        return;
      }
      colors.remove(color);
    })
  );
}

export function getPokemonsSize() {
  return colors.getPokemons().size;
}

export function searchPokemonsByColor(searchTermLowerCase) {
  return colors
    .getPokemons()
    .get(colors.getFilter())
    .filter((pokemon) => pokemon.includes(searchTermLowerCase));
}

export function thereIsAFilterActive() {
  return colors.getFilter() !== '';
}
