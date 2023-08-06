import {
  getPokemon as getPokemonApi,
  getSpeciesData as getSpeciesDataApi,
} from '@/api/pokemon';
import { getPokemonEvolutions as getPokemonEvolutionsApi } from '@/api/evolutions';
import { getPokemonColorTranslation as getPokemonColorTranslationApi } from '@/api/colors';
import { getPokemonShapeTranslation as getPokemonShapeTranslationApi } from '@/api/shapes';
import { getPokemonHabitatTranslation as getPokemonHabitatTranslationApi } from '@/api/habitat';
import { getPokemonStatTranslation as getPokemonStatTranslationApi } from '@/api/stats';
import { getPokemonTypeTranslation as getPokemonTypeTranslationApi } from '@/api/types';
import { getAllCharacteristics } from '@/store/mutations/characteristics';
import { getPokemonVariants } from '@/store/mutations/variations';
import pokemonStore from '@/store/state/pokemon';

export async function getPokemon(pokemonId) {
  if (pokemonStore.hasVisitedPokemon(pokemonId)) {
    return;
  }

  const pokemon = await getPokemonApi(pokemonId);

  const evolutions = await getPokemonEvolutionsApi(pokemonId);
  const { flavorTexts, color, shape, generation, habitat } = pokemon.species.url
    ? await getSpeciesDataApi(pokemon.species.url)
    : [];
  let highestStatName = '';
  let highestStatValue = 0;
  const stats = await Promise.all(
    pokemon.stats.map(async (s) => {
      if (s.base_stat > highestStatValue) {
        highestStatName = s.stat.name;
        highestStatValue = s.base_stat;
      }
      return {
        name: await getPokemonStatTranslationApi(s.stat.name),
        value: s.base_stat,
      };
    })
  );
  let characteristic = '';
  (getAllCharacteristics().get(highestStatName) ?? []).map((c) => {
    if (c.possibleValues.includes(Math.floor(highestStatValue / 5))) {
      characteristic = c.description;
    }
  });
  const variants = [];
  await Promise.all(
    getPokemonVariants(pokemonId)?.map(async (pokemon) => {
      const { name, sprites } = await getPokemonApi(pokemon);
      if (sprites.front_default) {
        variants.push({
          name: name.replace(`${pokemonId}-`, '').replace('-', ' '),
          image: sprites.front_default,
        });
      }
    }) ?? []
  );
  const image = pokemon.sprites.other.dream_world.front_default;
  const smallImage = pokemon.sprites.front_default;
  const types = await Promise.all(
    pokemon.types.map(async (t) => ({
      name: t.type.name,
      translated: await getPokemonTypeTranslationApi(t.type.name),
    }))
  );
  const name = pokemon.name;
  const id = pokemon.id;
  const height = pokemon.height;
  const weight = pokemon.weight;

  pokemonStore.setVisited(name, {
    id,
    name,
    image,
    smallImage,
    stats,
    types,
    evolutions,
    flavorTexts,
    characteristic,
    height,
    weight,
    color: {
      name: color,
      translated: await getPokemonColorTranslationApi(color),
    },
    shape: await getPokemonShapeTranslationApi(shape),
    generation,
    habitat: {
      name: habitat,
      translated: await getPokemonHabitatTranslationApi(habitat),
    },
    variants,
  });
}
