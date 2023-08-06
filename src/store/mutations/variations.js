import variations from '@/store/state/variations';

export function setVariant(name, variants) {
  variations.setVariant(name, variants);
}

export function getPokemonVariants(name) {
  return variations.getAll().get(name);
}
