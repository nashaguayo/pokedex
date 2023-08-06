import * as pokemonApi from '@/api/pokemon';
import {
  clearPokemonListAndRefresh,
  getMorePokemons,
  getPokemonListCardData,
  getPokemons,
} from '@/store/mutations/scroll';
import scroll from '@/store/state/scroll';

jest.mock('@/api/pokemon', () => ({
  getDataForPokemon: jest.fn(),
  getPokemons: jest.fn(),
  getDataForPokemon: jest.fn(),
}));

jest.mock('@/store/state/scroll', () => ({
  setIsLoading: jest.fn(),
  setPokemons: jest.fn(),
  setNextUrl: jest.fn(),
  getIsLoading: jest.fn(),
  getPokemons: jest.fn(),
  getNextUrl: jest.fn(),
}));

const spyGetDataForPokemonApi = jest.spyOn(pokemonApi, 'getDataForPokemon');
const spyGetPokemonsApi = jest.spyOn(pokemonApi, 'getPokemons');

const spySetIsLoading = jest.spyOn(scroll, 'setIsLoading');
const spySetPokemons = jest.spyOn(scroll, 'setPokemons');
const spySetNextUrl = jest.spyOn(scroll, 'setNextUrl');
const spyGetIsLoading = jest.spyOn(scroll, 'getIsLoading');
const spyGetPokemons = jest.spyOn(scroll, 'getPokemons');
const spyGetNextUrl = jest.spyOn(scroll, 'getNextUrl');

describe('getPokemonListCardData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should get pokemon list card data', async () => {
    const pokemonData = {
      id: 0,
      name: 'pikachu',
      image: 'pikachu-image.png',
      types: [],
    };
    spyGetDataForPokemonApi.mockResolvedValue(pokemonData);
    expect(await getPokemonListCardData({ name: 'pikachu' })).toStrictEqual(
      pokemonData
    );
  });
});

describe('getPokemons', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should get pokemons', async () => {
    const pokemonData = {
      id: 0,
      name: 'pikachu',
      image: 'pikachu-image.png',
      types: [],
    };
    spyGetDataForPokemonApi.mockResolvedValue(pokemonData);
    spyGetPokemonsApi.mockResolvedValue({
      next: 'next-url.com',
      results: [{ name: 'pikachu' }],
    });
    await getPokemons();
    expect(spySetPokemons).toHaveBeenCalledWith([
      { id: 0, image: 'pikachu-image.png', name: 'pikachu', types: [] },
    ]);
  });
});

describe('getMorePokemons', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('shouldnt get more pokemons if its already loading', async () => {
    spyGetIsLoading.mockReturnValue(true);
    await getMorePokemons();
    expect(spyGetIsLoading).toHaveBeenCalled();
    expect(spySetIsLoading).not.toHaveBeenCalled();
  });

  it('should get more pokemons', async () => {
    spyGetIsLoading.mockReturnValue(false);
    spyGetPokemonsApi.mockResolvedValue({
      next: 'next-url.com',
      results: [
        {
          name: 'pikachu',
          results: [{ name: 'pikachu' }],
        },
      ],
    });
    spyGetDataForPokemonApi.mockResolvedValue({
      id: 0,
      name: 'pikachu',
      image: 'pikachu-image.png',
      types: [],
    });
    spyGetPokemons.mockReturnValue([]);
    spyGetNextUrl.mockReturnValue('next-url.com');
    await getMorePokemons(20);
    expect(spySetPokemons).toHaveBeenCalledWith([
      {
        id: 0,
        name: 'pikachu',
        image: 'pikachu-image.png',
        types: [],
      },
    ]);
    expect(spySetNextUrl).toHaveBeenCalledWith('next-url.com');
    expect(spySetIsLoading).toHaveBeenCalledTimes(2);
    expect(spySetIsLoading.mock.calls[0][0]).toBeTruthy();
    expect(spySetIsLoading.mock.calls[1][0]).toBeFalsy();
  });
});

describe('clearPokemonListAndRefresh', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should clear pokemon list and refresh', async () => {
    const pokemonData = {
      id: 0,
      name: 'pikachu',
      image: 'pikachu-image.png',
      types: [],
    };
    spyGetDataForPokemonApi.mockResolvedValue(pokemonData);
    spyGetPokemonsApi.mockResolvedValue({
      next: 'next-url.com',
      results: [{ name: 'pikachu' }],
    });
    await clearPokemonListAndRefresh();
    expect(spySetPokemons).toHaveBeenCalledWith([
      {
        id: 0,
        image: 'pikachu-image.png',
        name: 'pikachu',
        types: [],
      },
    ]);
    expect(spyGetDataForPokemonApi).toHaveBeenCalled();
    expect(spySetNextUrl).toHaveBeenCalledWith('next-url.com');
  });
});
