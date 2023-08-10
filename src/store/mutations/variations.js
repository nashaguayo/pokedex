import variations from '@/store/state/variations';
import { getPokemon as getPokemonApi } from '@/api/pokemon';

export function setVariant(name, variants) {
  variations.setVariant(name, variants);
}

export function getPokemonVariants(name) {
  return variations.getAll().get(name);
}

export async function pokemonIsVariant(name) {
  return name.includes('-') && !!(await getPokemonApi(name.split('-')[0]));
}
