import other from '@/store/state/other';
import store from '@/lib/store';

export async function initializeStore() {
  if (!other.getStoreHasLoaded() && !other.getStoreIsLoading()) {
    other.setStoreIsLoading(true);
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
