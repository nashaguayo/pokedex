import other from '@/store/state/other';
import store from '@/lib/store';
import {
  isDarkModeEnabled as isDarkModeEnabledInLS,
  toggleDarkMode as toggleDarkModeInLS,
} from '@/lib/localStorage';

export async function initializeStore() {
  if (!other.getStoreHasLoaded() && !other.getStoreIsLoading()) {
    other.setStoreIsLoading(true);
    if (isDarkModeEnabledInLS()) {
      other.toggleIsDarkModeEnabled();
    }
    await Promise.all([
      store.getAllPokemons(),
      store.getAllTypes(),
      store.getAllColors(),
      store.getAllShapes(),
      store.getAllGenerations(),
      store.getAllCharacteristicsDescriptions(),
    ]);
    other.setStoreIsLoading(false);
    other.setStoreHasLoaded(true);
  }
}

export function toggleDarkModeInStoreAndLocalStorage() {
  other.toggleIsDarkModeEnabled();
  toggleDarkModeInLS();
}
