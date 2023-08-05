import {
  toggleFilter,
  clearFilters,
  getAll,
  getPokemonsSize,
  searchPokemonsByShape,
} from '@/store/mutations/shapes';
import shapes from '@/store/state/shapes';
import * as shapesApi from '@/api/shapes';

jest.mock('@/store/state/shapes', () => ({
  setFilter: jest.fn(),
  getFilter: jest.fn(),
  setAll: jest.fn(),
  getPokemons: jest.fn(),
  setPokemons: jest.fn(),
  getAll: jest.fn(),
  removeShapeAt: jest.fn(),
}));

jest.mock('@/api/shapes', () => ({
  getAllShapes: jest.fn(),
  getPokemonsByShape: jest.fn(),
}));

const spySetFilter = jest.spyOn(shapes, 'setFilter');
const spyGetFilter = jest.spyOn(shapes, 'getFilter');
const spySetAll = jest.spyOn(shapes, 'setAll');
const spyGetPokemons = jest.spyOn(shapes, 'getPokemons');
const spySetPokemons = jest.spyOn(shapes, 'setPokemons');
const spyGetAll = jest.spyOn(shapes, 'getAll');
const spyRemoveShapeAt = jest.spyOn(shapes, 'removeShapeAt');

const spyGetAllShapes = jest.spyOn(shapesApi, 'getAllShapes');
const spyGetPokemonsByShape = jest.spyOn(shapesApi, 'getPokemonsByShape');

describe('toggleFilter', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should toggle the shape filter in the store', async () => {
    const shape = 'ii';
    spyGetFilter.mockReturnValueOnce('i');
    expect(spyGetFilter).not.toHaveBeenCalled();
    expect(spySetFilter).not.toHaveBeenCalled();
    toggleFilter(shape);
    expect(spyGetFilter).toHaveBeenCalled();
    expect(spySetFilter).toHaveBeenCalledWith(shape);
  });

  it('should remove filter when toggle is already active', async () => {
    const shape = 'i';
    spyGetFilter.mockReturnValueOnce(shape);
    expect(spyGetFilter).not.toHaveBeenCalled();
    expect(spySetFilter).not.toHaveBeenCalled();
    toggleFilter(shape);
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

  it('should get all pokemons per shape', async () => {
    const shapes = ['i', 'ii', 'iii'];
    const pokemons1 = ['pikachu', 'charmander', 'squirtle'];
    const pokemons2 = [];
    const pokemons3 = ['bulbasaur', 'meteorite', 'pichu'];
    spyGetAllShapes.mockResolvedValue(shapes);
    spyGetAll.mockReturnValue(shapes);
    spyGetPokemonsByShape
      .mockResolvedValueOnce(pokemons1)
      .mockResolvedValueOnce(pokemons2)
      .mockResolvedValueOnce(pokemons3);
    await getAll();
    expect(spyGetAllShapes).toHaveBeenCalled();
    expect(spySetAll).toHaveBeenCalled();
    expect(spySetPokemons).toHaveBeenCalledTimes(2);

    expect(spySetPokemons.mock.calls[0][0]).toBe(shapes[0]);
    expect(spySetPokemons.mock.calls[0][1]).toBe(pokemons1);
    expect(spySetPokemons.mock.calls[1][0]).toBe(shapes[2]);
    expect(spySetPokemons.mock.calls[1][1]).toBe(pokemons3);
    expect(spyGetPokemonsByShape).toHaveBeenCalledTimes(shapes.length);
    expect(spyRemoveShapeAt).toHaveBeenCalledWith(1);
  });
});

describe('getPokemonsSize', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should get all pokemons by shape size', () => {
    const pokemonsByShape = new Map([
      ['i', ['pikachu', 'squirtle'], ['ii', ['charmander', 'bulbasaur']]],
    ]);
    spyGetPokemons.mockReturnValue(pokemonsByShape);
    const result = getPokemonsSize();
    expect(result).toBe(pokemonsByShape.size);
  });

  it('should get all pokemons by shape size when its zero', () => {
    const pokemonsByShape = new Map();
    spyGetPokemons.mockReturnValue(pokemonsByShape);
    const result = getPokemonsSize();
    expect(result).toBe(pokemonsByShape.size);
  });

  it('should return the right pokemons for the right shape', () => {
    const pokemonsByShape = new Map([
      ['ii', ['pikachu', 'squirtle'], ['i', ['charmander', 'bulbasaur']]],
    ]);
    const filter = 'ii';
    spyGetPokemons.mockReturnValue(pokemonsByShape);
    spyGetFilter.mockReturnValue(filter);
    const result = searchPokemonsByShape('pik');
    expect(result).toStrictEqual(['pikachu']);
  });

  it('should return empty string when it cant find any pokemons', () => {
    const pokemonsByShape = new Map([
      ['ii', ['pikachu', 'squirtle'], ['i', ['charmander', 'bulbasaur']]],
    ]);
    const filter = 'ii';
    spyGetPokemons.mockReturnValue(pokemonsByShape);
    spyGetFilter.mockReturnValue(filter);
    const result = searchPokemonsByShape('asd');
    expect(result).toStrictEqual([]);
  });
});
