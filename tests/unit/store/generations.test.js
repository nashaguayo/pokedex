import {
  toggleFilter,
  clearFilters,
  getAll,
} from '@/store/mutations/generations';
import generations from '@/store/state/generations';
import * as generationsApi from '@/api/generations';

jest.mock('@/store/state/generations', () => ({
  setFilter: jest.fn(),
  getFilter: jest.fn(),
  setAll: jest.fn(),
  setPokemons: jest.fn(),
  getAll: jest.fn(),
  removeGenerationAt: jest.fn(),
}));

jest.mock('@/api/generations', () => ({
  getAllGenerations: jest.fn(),
  getPokemonsByGeneration: jest.fn(),
}));

const spySetFilter = jest.spyOn(generations, 'setFilter');
const spyGetFilter = jest.spyOn(generations, 'getFilter');
const spySetAll = jest.spyOn(generations, 'setAll');
const spySetPokemons = jest.spyOn(generations, 'setPokemons');
const spyGetAll = jest.spyOn(generations, 'getAll');
const spyRemoveGenerationAt = jest.spyOn(generations, 'removeGenerationAt');

const spyGetAllGenerations = jest.spyOn(generationsApi, 'getAllGenerations');
const spyGetPokemonsByGeneration = jest.spyOn(
  generationsApi,
  'getPokemonsByGeneration'
);

describe('toggleFilter', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should toggle the generation filter in the store', async () => {
    const generation = 'ii';
    spyGetFilter.mockReturnValueOnce('i');
    expect(spyGetFilter).not.toHaveBeenCalled();
    expect(spySetFilter).not.toHaveBeenCalled();
    toggleFilter(generation);
    expect(spyGetFilter).toHaveBeenCalled();
    expect(spySetFilter).toHaveBeenCalledWith(generation);
  });

  it('should remove filter when toggle is already active', async () => {
    const generation = 'i';
    spyGetFilter.mockReturnValueOnce(generation);
    expect(spyGetFilter).not.toHaveBeenCalled();
    expect(spySetFilter).not.toHaveBeenCalled();
    toggleFilter(generation);
    expect(spyGetFilter).toHaveBeenCalled();
    expect(spySetFilter).toHaveBeenCalledWith('');
  });
});

describe('clearFilters', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should clear filters in store', () => {
    expect(spySetFilter).not.toHaveBeenCalled();
    clearFilters();
    expect(spySetFilter).toHaveBeenCalledWith('');
  });
});

describe('getAll', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should get all pokemons per generation', async () => {
    const generations = ['i', 'ii', 'iii'];
    const pokemons1 = ['pikachu', 'charmander', 'squirtle'];
    const pokemons2 = [];
    const pokemons3 = ['bulbasaur', 'meteorite', 'pichu'];
    spyGetAllGenerations.mockResolvedValue(generations);
    spyGetAll.mockReturnValue(generations);
    spyGetPokemonsByGeneration
      .mockResolvedValueOnce(pokemons1)
      .mockResolvedValueOnce(pokemons2)
      .mockResolvedValueOnce(pokemons3);
    await getAll();
    expect(spyGetAllGenerations).toHaveBeenCalled();
    expect(spySetAll).toHaveBeenCalled();
    expect(spySetPokemons).toHaveBeenCalledTimes(2);

    expect(spySetPokemons.mock.calls[0][0]).toBe(generations[0]);
    expect(spySetPokemons.mock.calls[0][1]).toBe(pokemons1);
    expect(spySetPokemons.mock.calls[1][0]).toBe(generations[2]);
    expect(spySetPokemons.mock.calls[1][1]).toBe(pokemons3);
    expect(spyGetPokemonsByGeneration).toHaveBeenCalledTimes(
      generations.length
    );
    expect(spyRemoveGenerationAt).toHaveBeenCalledWith(1);
  });
});
