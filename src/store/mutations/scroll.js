import {
  getDataForPokemon as getDataForPokemonApi,
  getPokemons as getPokemonsApi,
  getDataForPokemon as getDataForPokemonApi,
} from '@/api/pokemon';
import scroll from '@/store/state/scroll';

async function getPokemonListCardData(pokemon) {
  const name = pokemon.name;
  const { id, image, types } = await getDataForPokemonApi(name);
  return { id, name, image, types };
}

export async function getPokemons(url, limit) {
  const response = await getPokemonsApi(url, limit);
  const results = await Promise.all(
    response.results.map((pokemon) => getPokemonListCardData(pokemon))
  );
  scroll.setPokemons(results);
  scroll.setNextUrl(response.next);
}

export async function getMorePokemons(limit) {
  if (scroll.getIsLoading()) {
    return;
  }

  scroll.setIsLoading(true);
  const response = await getPokemonsApi(scroll.getNextUrl(), limit);
  if (!response) {
    return;
  }
  const results = await Promise.all(
    response.results.map((pokemon) => this.getPokemonListCardData(pokemon))
  );

  scroll.setPokemons([...scroll.getPokemons(), ...results]);
  scroll.setNextUrl(response.next);
  scroll.setIsLoading(false);
}

export async function clearPokemonListAndRefresh() {
  scroll.setPokemons([]);
  await getPokemons();
}
