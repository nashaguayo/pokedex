import {
  toggleFilter,
  clearFilters,
  getAll,
  getPokemonsSize,
  searchPokemonsByColor,
} from '@/store/mutations/colors';
import colors from '@/store/state/colors';
import * as colorsApi from '@/api/colors';

jest.mock('@/store/state/colors', () => ({
  setFilter: jest.fn(),
  getFilter: jest.fn(),
  setAll: jest.fn(),
  getPokemons: jest.fn(),
  setPokemons: jest.fn(),
  getAll: jest.fn(),
  remove: jest.fn(),
  replaceTranslation: jest.fn(),
}));

jest.mock('@/api/colors', () => ({
  getAllColors: jest.fn(),
  getPokemonsByColor: jest.fn(),
}));

const spySetFilter = jest.spyOn(colors, 'setFilter');
const spyGetFilter = jest.spyOn(colors, 'getFilter');
const spySetAll = jest.spyOn(colors, 'setAll');
const spyGetPokemons = jest.spyOn(colors, 'getPokemons');
const spySetPokemons = jest.spyOn(colors, 'setPokemons');
const spyGetAll = jest.spyOn(colors, 'getAll');
const spyRemove = jest.spyOn(colors, 'remove');
const spyReplaceTranslation = jest.spyOn(colors, 'replaceTranslation');

const spyGetAllColors = jest.spyOn(colorsApi, 'getAllColors');
const spyGetPokemonsByColor = jest.spyOn(colorsApi, 'getPokemonsByColor');

describe('toggleFilter', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should toggle the color filter in the store', async () => {
    const color = 'blue';
    spyGetFilter.mockReturnValueOnce('i');
    expect(spyGetFilter).not.toHaveBeenCalled();
    expect(spySetFilter).not.toHaveBeenCalled();
    toggleFilter(color);
    expect(spyGetFilter).toHaveBeenCalled();
    expect(spySetFilter).toHaveBeenCalledWith(color);
  });

  it('should remove filter when toggle is already active', async () => {
    const color = 'yellow';
    spyGetFilter.mockReturnValueOnce(color);
    expect(spyGetFilter).not.toHaveBeenCalled();
    expect(spySetFilter).not.toHaveBeenCalled();
    toggleFilter(color);
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

  it('should get all pokemons per color', async () => {
    const colors = ['yellow', 'blue', 'red'];
    const pokemons1 = ['pikachu', 'charmander', 'squirtle'];
    const pokemons2 = [];
    const pokemons3 = ['bulbasaur', 'meteorite', 'pichu'];
    spyGetAllColors.mockResolvedValue(colors);
    spyGetAll.mockReturnValue(colors);
    spyGetPokemonsByColor
      .mockResolvedValueOnce({ name: 'yellow', pokemons: pokemons1 })
      .mockResolvedValueOnce({ name: 'blue', pokemons: pokemons2 })
      .mockResolvedValueOnce({ name: 'red', pokemons: pokemons3 });
    await getAll();
    expect(spyGetAllColors).toHaveBeenCalled();
    expect(spySetAll).toHaveBeenCalled();
    expect(spySetPokemons).toHaveBeenCalledTimes(2);
    expect(spyReplaceTranslation).toHaveBeenCalledTimes(2);

    expect(spySetPokemons.mock.calls[0][0]).toBe(colors[0]);
    expect(spySetPokemons.mock.calls[0][1]).toBe(pokemons1);
    expect(spySetPokemons.mock.calls[1][0]).toBe(colors[2]);
    expect(spySetPokemons.mock.calls[1][1]).toBe(pokemons3);
    expect(spyGetPokemonsByColor).toHaveBeenCalledTimes(colors.length);
    expect(spyRemove).toHaveBeenCalledWith('blue');
  });
});

describe('getPokemonsSize', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should get all pokemons by color size', () => {
    const pokemonsByColor = new Map([
      [
        'yellow',
        ['pikachu', 'squirtle'],
        ['blue', ['charmander', 'bulbasaur']],
      ],
    ]);
    spyGetPokemons.mockReturnValue(pokemonsByColor);
    const result = getPokemonsSize();
    expect(result).toBe(pokemonsByColor.size);
  });

  it('should get all pokemons by color size when its zero', () => {
    const pokemonsByColor = new Map();
    spyGetPokemons.mockReturnValue(pokemonsByColor);
    const result = getPokemonsSize();
    expect(result).toBe(pokemonsByColor.size);
  });

  it('should return the right pokemons for the right color', () => {
    const pokemonsByColor = new Map([
      ['yellow', ['pikachu', 'squirtle']],
      ['blue', ['charmander', 'bulbasaur']],
    ]);
    const filter = 'yellow';
    spyGetPokemons.mockReturnValue(pokemonsByColor);
    spyGetFilter.mockReturnValue(filter);
    const result = searchPokemonsByColor('pik');
    expect(result).toStrictEqual(['pikachu']);
  });

  it('should return empty string when it cant find any pokemons', () => {
    const pokemonsByColor = new Map([
      ['yellow', ['pikachu', 'squirtle']],
      ['blue', ['charmander', 'bulbasaur']],
    ]);
    const filter = 'blue';
    spyGetPokemons.mockReturnValue(pokemonsByColor);
    spyGetFilter.mockReturnValue(filter);
    const result = searchPokemonsByColor('asd');
    expect(result).toStrictEqual([]);
  });
});
