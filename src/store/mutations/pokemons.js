import { getAllPokemons as getAllPokemonsApi } from '@/api/pokemon';
import { pokemonIsVariant, setVariant } from '@/store/mutations/variations';
import pokemonsStore from '@/store/state/pokemons';

export async function getAll() {
  const allPokemons = (await getAllPokemonsApi()).results;
  const allPokemonsWithHyphens = allPokemons.map((pokemon) => ({
    id: Number(
      pokemon.url
        .replace(process.env.VUE_APP_POKEAPI_URL, '')
        .replace('pokemon/', '')
        .replace('/', '')
    ),
    name: pokemon.name,
  }));

  const pokemons = [];
  const variations = [];
  await Promise.all(
    allPokemonsWithHyphens.map(async (pokemon) => {
      if (!pokemon.name.includes('-')) {
        pokemons.push(pokemon);
      } else if (await pokemonIsVariant(pokemon.name)) {
        variations.push(pokemon);
      } else {
        pokemons.push(pokemon);
      }
    })
  );

  pokemons.forEach((pokemon) => {
    const variantsForPokemon = variations.filter((v) =>
      v.name.includes(pokemon.name)
    );
    if (variantsForPokemon.length) {
      setVariant(
        pokemon.name,
        variantsForPokemon.map((p) => p.name)
      );
    }
  });

  pokemonsStore.setAll(pokemons);
}

export function getAllPokemons() {
  return pokemonsStore.getAll();
}
