import gameStore from '@/store/state/game';
import store from '@/lib/store';
import {
  getMysteryPokemon,
  setMysteryPokemon,
  setTriesLeft,
} from '@/lib/localStorage';

export async function getNewMysteryPokemon() {
  const newMysteryPokemon = await store.getNewRandomPokemon();
  gameStore.setMysteryPokemon(newMysteryPokemon.name, newMysteryPokemon.image);
  setMysteryPokemon(newMysteryPokemon);
  setTriesLeft(3);
}

export function setMysteryPokemonFromLS() {
  const mysteryPokemon = getMysteryPokemon();
  if (mysteryPokemon) {
    gameStore.setMysteryPokemon(mysteryPokemon.name, mysteryPokemon.image);
    return true;
  }
  return false;
}
