import { getAll } from '@/store/mutations/pokemons';
import * as pokemonApi from '@/api/pokemon';
import * as variations from '@/store/mutations/variations';
import pokemonsStore from '@/store/state/pokemons';
import store from '@/lib/store';

jest.mock('@/api/pokemon', () => ({
  getAllPokemons: jest.fn(),
}));

jest.mock('@/store/mutations/variations', () => ({
  setVariant: jest.fn(),
}));

jest.mock('@/store/state/pokemons', () => ({
  setAll: jest.fn(),
}));

jest.mock('@/lib/store', () => ({
  pokemonIsVariant: jest.fn(),
}));

const spyGetAllPokemonsApi = jest.spyOn(pokemonApi, 'getAllPokemons');
const spySetVariant = jest.spyOn(variations, 'setVariant');
const spySetAll = jest.spyOn(pokemonsStore, 'setAll');
const spyPokemonIsVariant = jest.spyOn(store, 'pokemonIsVariant');

describe('getAll', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should get all pokemon names and save them to the store', async () => {
    spyGetAllPokemonsApi.mockResolvedValue({
      results: [
        {
          name: 'pikachu',
          url: 'pokemon/1/',
        },
        {
          name: 'charmander',
          url: 'pokemon/2/',
        },
        {
          name: 'squirtle-gmax',
          url: 'pokemon/3/.png',
        },
        {
          name: 'squirtle',
          url: 'pokemon/4/',
        },
        {
          name: 'pikachu-rockstar',
          url: 'pokemon/5/',
        },
        {
          name: 'pikachu-popstar',
          url: 'pokemon/6/',
        },
      ],
    });
    spyPokemonIsVariant.mockResolvedValue(true);
    await getAll();
    expect(spyGetAllPokemonsApi).toHaveBeenCalled();
    expect(spyPokemonIsVariant).toHaveBeenCalledTimes(3);
    expect(spySetVariant).toHaveBeenCalledTimes(2);
    expect(spySetVariant.mock.calls[0][0]).toBe('pikachu');
    expect(spySetVariant.mock.calls[0][1]).toStrictEqual([
      'pikachu-rockstar',
      'pikachu-popstar',
    ]);
    expect(spySetVariant.mock.calls[1][0]).toBe('squirtle');
    expect(spySetVariant.mock.calls[1][1]).toStrictEqual(['squirtle-gmax']);
    expect(spySetAll).toHaveBeenCalledWith([
      { id: 1, name: 'pikachu' },
      { id: 2, name: 'charmander' },
      { id: 4, name: 'squirtle' },
    ]);
  });
});
