import random from '@/store/state/random';
import { getDataForPokemon as getDataForPokemonApi } from '@/api/pokemon';
import { getAllPokemons } from '@/store/mutations/pokemons';

export async function getRandomPokemons(amountOfRandomPokemons) {
  random.clearPokemons();
  await Promise.all(
    [...Array(amountOfRandomPokemons)].map(async () => {
      random.add(await getNewRandomPokemon());
    })
  );
}

export async function getNewRandomPokemon(addToRandomPokemon = false) {
  let newRandomPokemon = {};
  do {
    const allPokemons = getAllPokemons();
    const index = Math.floor(Math.random() * allPokemons.length);
    const name = allPokemons[index].name;
    const { image } = await getDataForPokemonApi(name);
    newRandomPokemon = { name, image };
  } while (
    pokemonIsAlreadyInRandomPokemons(newRandomPokemon.name) ||
    !newRandomPokemon.image
  );

  if (addToRandomPokemon) {
    random.popPokemon();
    random.unshift(newRandomPokemon);
    return;
  }

  return newRandomPokemon;
}

export function pokemonIsAlreadyInRandomPokemons(pokemonName) {
  const repeatedPokemon = random
    .getPokemons()
    .filter((randomPokemon) => randomPokemon.name === pokemonName);
  return !!repeatedPokemon.length;
}
