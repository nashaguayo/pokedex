import gameStore from '@/store/state/game';
import {
  getMysteryPokemon,
  setMysteryPokemon,
  setTriesLeft,
} from '@/lib/localStorage';
import { getNewRandomPokemon } from './random';

export async function getNewMysteryPokemon() {
  const newMysteryPokemon = await getNewRandomPokemon();
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
