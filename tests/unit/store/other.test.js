import { initializeStore } from '@/store/mutations/other';
import other from '@/store/state/other';
import store from '@/lib/store';

jest.mock('@/store/state/other', () => ({
  getStoreHasLoaded: jest.fn(),
  setStoreHasLoaded: jest.fn(),
  getStoreIsLoading: jest.fn(),
  setStoreIsLoading: jest.fn(),
}));

jest.mock('@/lib/store', () => ({
  getAllPokemons: jest.fn(),
  getAllTypes: jest.fn(),
  getAllColors: jest.fn(),
  getAllShapes: jest.fn(),
  getAllGenerations: jest.fn(),
  getAllCharacteristicsDescriptions: jest.fn(),
}));

describe('initializeStore', () => {
  const spyGetStoreHasLoaded = jest.spyOn(other, 'getStoreHasLoaded');
  const spySetStoreHasLoaded = jest.spyOn(other, 'setStoreHasLoaded');
  const spyGetStoreIsLoading = jest.spyOn(other, 'getStoreIsLoading');
  const spySetStoreIsLoading = jest.spyOn(other, 'setStoreIsLoading');

  const spyGetAllPokemons = jest.spyOn(store, 'getAllPokemons');
  const spyGetAllTypes = jest.spyOn(store, 'getAllTypes');
  const spyGetAllColors = jest.spyOn(store, 'getAllColors');
  const spyGetAllShapes = jest.spyOn(store, 'getAllShapes');
  const spyGetAllGenerations = jest.spyOn(store, 'getAllGenerations');
  const spyGetAllCharacteristicsDescriptions = jest.spyOn(
    store,
    'getAllCharacteristicsDescriptions'
  );

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should not call the store functions if the store has already loaded', async () => {
    spyGetStoreHasLoaded.mockReturnValueOnce(true);
    await initializeStore();
    expect(spyGetStoreHasLoaded).toHaveBeenCalled();
    expect(spySetStoreIsLoading).not.toHaveBeenCalled();
    expect(spyGetAllPokemons).not.toHaveBeenCalled();
    expect(spyGetAllTypes).not.toHaveBeenCalled();
    expect(spyGetAllColors).not.toHaveBeenCalled();
    expect(spyGetAllShapes).not.toHaveBeenCalled();
    expect(spyGetAllGenerations).not.toHaveBeenCalled();
    expect(spyGetAllCharacteristicsDescriptions).not.toHaveBeenCalled();
    expect(spySetStoreHasLoaded).not.toHaveBeenCalled();
  });

  it('should call the store functions and set loading state correctly if the store has not loaded', async () => {
    spyGetStoreHasLoaded.mockReturnValueOnce(false);
    spyGetStoreIsLoading.mockReturnValueOnce(false);
    spyGetAllPokemons.mockResolvedValueOnce([]);
    spyGetAllTypes.mockResolvedValueOnce([]);
    spyGetAllColors.mockResolvedValueOnce([]);
    spyGetAllShapes.mockResolvedValueOnce([]);
    spyGetAllGenerations.mockResolvedValueOnce([]);
    spyGetAllCharacteristicsDescriptions.mockResolvedValueOnce([]);
    await initializeStore();
    expect(spyGetStoreHasLoaded).toHaveBeenCalled();
    expect(spyGetStoreIsLoading).toHaveBeenCalled();
    expect(spySetStoreIsLoading).toHaveBeenCalled();
    expect(spyGetAllPokemons).toHaveBeenCalled();
    expect(spyGetAllTypes).toHaveBeenCalled();
    expect(spyGetAllColors).toHaveBeenCalled();
    expect(spyGetAllShapes).toHaveBeenCalled();
    expect(spyGetAllGenerations).toHaveBeenCalled();
    expect(spyGetAllCharacteristicsDescriptions).toHaveBeenCalled();
    expect(spySetStoreIsLoading).toHaveBeenCalledWith(false);
    expect(spySetStoreHasLoaded).toHaveBeenCalledWith(true);
  });

  it('should not call the store functions if the store is already loading', async () => {
    spyGetStoreHasLoaded.mockReturnValueOnce(false);
    spyGetStoreIsLoading.mockReturnValueOnce(true);
    await initializeStore();
    expect(spySetStoreIsLoading).not.toHaveBeenCalled();
    expect(spySetStoreHasLoaded).not.toHaveBeenCalled();
    expect(spyGetAllPokemons).not.toHaveBeenCalled();
    expect(spyGetAllTypes).not.toHaveBeenCalled();
    expect(spyGetAllColors).not.toHaveBeenCalled();
    expect(spyGetAllShapes).not.toHaveBeenCalled();
    expect(spyGetAllGenerations).not.toHaveBeenCalled();
    expect(spyGetAllCharacteristicsDescriptions).not.toHaveBeenCalled();
  });
});
