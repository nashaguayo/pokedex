import other from '@/store/state/other';
import {
  isDarkModeEnabled as isDarkModeEnabledInLS,
  toggleDarkMode as toggleDarkModeInLS,
} from '@/lib/localStorage';
import { getAll as getAllPokemons } from '@/store/mutations/pokemons';
import { getAll as getAllGenerations } from '@/store/mutations/generations';
import { getAll as getAllShapes } from '@/store/mutations/shapes';
import { getAll as getAllColors } from '@/store/mutations/colors';
import { getAll as getAllTypes } from '@/store/mutations/types';
import { getAll as getAllCharacteristicsDescriptions } from '@/store/mutations/characteristics';

export async function initializeStore() {
  if (!other.getStoreHasLoaded() && !other.getStoreIsLoading()) {
    other.setStoreIsLoading(true);
    if (isDarkModeEnabledInLS()) {
      other.toggleIsDarkModeEnabled();
    }
    await Promise.all([
      getAllPokemons(),
      getAllTypes(),
      getAllColors(),
      getAllShapes(),
      getAllGenerations(),
      getAllCharacteristicsDescriptions(),
    ]);
    other.setStoreIsLoading(false);
    other.setStoreHasLoaded(true);
  }
}

export function toggleDarkModeInStoreAndLocalStorage() {
  other.toggleIsDarkModeEnabled();
  toggleDarkModeInLS();
}
