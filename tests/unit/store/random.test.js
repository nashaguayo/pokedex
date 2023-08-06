import {
  getNewRandomPokemon,
  getRandomPokemons,
  pokemonIsAlreadyInRandomPokemons,
} from '@/store/mutations/random';
import random from '@/store/state/random';
import store from '@/lib/store';
import * as pokemonApi from '@/api/pokemon';

jest.mock('@/store/state/random', () => ({
  clearPokemons: jest.fn(),
  getPokemons: jest.fn(),
  popPokemon: jest.fn(),
  unshift: jest.fn(),
  add: jest.fn(),
}));

jest.mock('@/lib/store', () => ({
  getAllPokemonsReplace: jest.fn(),
}));

jest.mock('@/api/pokemon', () => ({
  getDataForPokemon: jest.fn(),
}));

const spyClearPokemons = jest.spyOn(random, 'clearPokemons');
const spyGetPokemons = jest.spyOn(random, 'getPokemons');
const spyPopPokemon = jest.spyOn(random, 'popPokemon');
const spyUnshift = jest.spyOn(random, 'unshift');
const spyAdd = jest.spyOn(random, 'add');

const spyGetAllPokemonsReplace = jest.spyOn(store, 'getAllPokemonsReplace');

const spyGetDataForPokemon = jest.spyOn(pokemonApi, 'getDataForPokemon');

describe('getNewRandomPokemon', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should get the correct amount of random pokemons', async () => {
    spyGetAllPokemonsReplace.mockReturnValue([
      { name: 'pikachu', image: 'pikachu.png' },
      { name: 'charmander', image: 'charmander.png' },
    ]);
    spyGetDataForPokemon.mockReturnValue({ image: 'pikachu.png' });
    spyGetPokemons.mockReturnValue(['jigglypuff']);
    expect(spyClearPokemons).not.toHaveBeenCalled();
    await getRandomPokemons(5);
    expect(spyClearPokemons).toHaveBeenCalled();
    expect(spyAdd).toHaveBeenCalledTimes(5);
  });
});

describe('getNewRandomPokemon', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should get the correct amount of pokemons', async () => {
    spyGetAllPokemonsReplace.mockReturnValue([
      { name: 'pikachu', image: 'pikachu.png' },
    ]);
    spyGetDataForPokemon.mockReturnValue({ image: 'pikachu.png' });
    spyGetPokemons.mockReturnValue(['jigglypuff']);
    const result = await getNewRandomPokemon();
    expect(spyGetAllPokemonsReplace).toHaveBeenCalled();
    expect(spyGetDataForPokemon).toHaveBeenCalled();
    expect(result).toStrictEqual({ name: 'pikachu', image: 'pikachu.png' });
    expect(spyPopPokemon).not.toHaveBeenCalled();
    expect(spyUnshift).not.toHaveBeenCalled();
  });

  it('should replace pokemons with a new one', async () => {
    spyGetAllPokemonsReplace.mockReturnValue([
      { name: 'pikachu', image: 'pikachu.png' },
      { name: 'charmander', image: 'charmander.png' },
      { name: 'squirtle', image: 'squirtle.png' },
      { name: 'charizard', image: 'charizard.png' },
      { name: 'raichu', image: 'raichu.png' },
    ]);
    spyGetDataForPokemon.mockResolvedValueOnce({ image: 'pikachu.png' });
    spyGetPokemons.mockReturnValueOnce(['jigglypuff']);
    const result = await getNewRandomPokemon(true);
    expect(spyGetAllPokemonsReplace).toHaveBeenCalled();
    expect(spyGetDataForPokemon).toHaveBeenCalled();
    expect(spyPopPokemon).toHaveBeenCalled();
    expect(spyUnshift).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('never replaces pokemon with one that is already present', async () => {
    const repeatedPokemon = { name: 'jigglypuff', image: 'jigglypuff.png' };
    spyGetAllPokemonsReplace
      .mockReturnValueOnce([repeatedPokemon])
      .mockReturnValueOnce([
        { name: 'pikachu', image: 'pikachu.png' },
        { name: 'charmander', image: 'charmander.png' },
        { name: 'squirtle', image: 'squirtle.png' },
        { name: 'charizard', image: 'charizard.png' },
        { name: 'raichu', image: 'raichu.png' },
      ]);
    spyGetDataForPokemon
      .mockResolvedValueOnce({ image: 'jigglypuff.png' })
      .mockResolvedValueOnce({ image: 'pikachu.png' });
    spyGetPokemons.mockReturnValue([repeatedPokemon]);
    const result = await getNewRandomPokemon();
    expect(spyGetAllPokemonsReplace).toHaveBeenCalledTimes(2);
    expect(spyGetDataForPokemon).toHaveBeenCalledTimes(2);
    expect(spyPopPokemon).not.toHaveBeenCalled();
    expect(spyUnshift).not.toHaveBeenCalled();
    expect(result.image).toStrictEqual('pikachu.png');
  });
});

describe('pokemonIsAlreadyInRandomPokemons', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should decide correctly if a pokemon is in random pokemons already or not', () => {
    spyGetPokemons.mockReturnValue([
      { name: 'pikachu', image: 'pikachu.png' },
      { name: 'charizard', image: 'charizard.png' },
    ]);
    expect(pokemonIsAlreadyInRandomPokemons('pikachu')).toBeTruthy();
    expect(pokemonIsAlreadyInRandomPokemons('balbusaur')).toBeFalsy();
    expect(spyGetPokemons).toHaveBeenCalledTimes(2);
  });
});
