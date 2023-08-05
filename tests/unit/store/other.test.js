import {
  initializeStore,
  toggleDarkModeInStoreAndLocalStorage,
} from '@/store/mutations/other';
import other from '@/store/state/other';
import * as generations from '@/store/mutations/generations';
import * as shapes from '@/store/mutations/shapes';
import * as colors from '@/store/mutations/colors';
import store from '@/lib/store';
import * as localStorage from '@/lib/localStorage';

jest.mock('@/store/state/other', () => ({
  getStoreHasLoaded: jest.fn(),
  setStoreHasLoaded: jest.fn(),
  getStoreIsLoading: jest.fn(),
  setStoreIsLoading: jest.fn(),
  toggleIsDarkModeEnabled: jest.fn(),
}));

jest.mock('@/store/mutations/shapes', () => ({
  getAll: jest.fn(),
}));

jest.mock('@/store/mutations/generations', () => ({
  getAll: jest.fn(),
}));

jest.mock('@/store/mutations/colors', () => ({
  getAll: jest.fn(),
}));

jest.mock('@/lib/store', () => ({
  getAllPokemons: jest.fn(),
  getAllTypes: jest.fn(),
  getAllColors: jest.fn(),
  getAllCharacteristicsDescriptions: jest.fn(),
}));

jest.mock('@/lib/localStorage', () => ({
  isDarkModeEnabled: jest.fn(),
  toggleDarkMode: jest.fn(),
}));

const spyGetStoreHasLoaded = jest.spyOn(other, 'getStoreHasLoaded');
const spySetStoreHasLoaded = jest.spyOn(other, 'setStoreHasLoaded');
const spyGetStoreIsLoading = jest.spyOn(other, 'getStoreIsLoading');
const spySetStoreIsLoading = jest.spyOn(other, 'setStoreIsLoading');
const spyToggleIsDarkModeEnabled = jest.spyOn(other, 'toggleIsDarkModeEnabled');

const spyGetAllColors = jest.spyOn(colors, 'getAll');
const spyGetAllShapes = jest.spyOn(shapes, 'getAll');
const spyGetAllGenerations = jest.spyOn(generations, 'getAll');

const spyGetAllPokemons = jest.spyOn(store, 'getAllPokemons');
const spyGetAllTypes = jest.spyOn(store, 'getAllTypes');
const spyGetAllCharacteristicsDescriptions = jest.spyOn(
  store,
  'getAllCharacteristicsDescriptions'
);

const spyIsDarkModeEnabled = jest.spyOn(localStorage, 'isDarkModeEnabled');
const spyToggleDarkMode = jest.spyOn(localStorage, 'toggleDarkMode');

describe('initializeStore', () => {
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
    expect(spyIsDarkModeEnabled).not.toHaveBeenCalled();
    expect(spyToggleIsDarkModeEnabled).not.toHaveBeenCalled();
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
    spyIsDarkModeEnabled.mockReturnValue(true);
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
    expect(spyIsDarkModeEnabled).toHaveBeenCalled();
    expect(spyToggleIsDarkModeEnabled).toHaveBeenCalled();
  });

  it('should not change theme when initializing store if it is not activated in local storage', async () => {
    spyGetStoreHasLoaded.mockReturnValueOnce(false);
    spyGetStoreIsLoading.mockReturnValueOnce(false);
    spyGetAllPokemons.mockResolvedValueOnce([]);
    spyGetAllTypes.mockResolvedValueOnce([]);
    spyGetAllColors.mockResolvedValueOnce([]);
    spyGetAllShapes.mockResolvedValueOnce([]);
    spyGetAllGenerations.mockResolvedValueOnce([]);
    spyGetAllCharacteristicsDescriptions.mockResolvedValueOnce([]);
    spyIsDarkModeEnabled.mockReturnValue(false);
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
    expect(spyIsDarkModeEnabled).toHaveBeenCalled();
    expect(spyToggleIsDarkModeEnabled).not.toHaveBeenCalled();
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
    expect(spyIsDarkModeEnabled).not.toHaveBeenCalled();
    expect(spyToggleIsDarkModeEnabled).not.toHaveBeenCalled();
  });
});

describe('toggleDarkModeInStoreAndLocalStorage', () => {
  it('should toggle dark mode in both store and local storage', async () => {
    toggleDarkModeInStoreAndLocalStorage();
    expect(spyToggleIsDarkModeEnabled).toHaveBeenCalled();
    expect(spyToggleDarkMode).toHaveBeenCalled();
  });
});
