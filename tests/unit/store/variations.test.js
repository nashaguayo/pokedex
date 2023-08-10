import {
  getPokemonVariants,
  pokemonIsVariant,
  setVariant,
} from '@/store/mutations/variations';
import * as pokemonApi from '@/api/pokemon';
import variations from '@/store/state/variations';

jest.mock('@/store/state/variations', () => ({
  setVariant: jest.fn(),
  getAll: jest.fn(),
}));

jest.mock('@/api/pokemon', () => ({
  getPokemon: jest.fn(),
}));

const spySetVariant = jest.spyOn(variations, 'setVariant');
const spyGetAll = jest.spyOn(variations, 'getAll');

const spyGetPokemonApi = jest.spyOn(pokemonApi, 'getPokemon');

describe('setVariant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should set variant in store', () => {
    const name = 'pikachu';
    const variants = ['pikachu-rockstar', 'pikachu-popstar'];
    setVariant(name, variants);
    expect(spySetVariant).toHaveBeenCalledWith(name, variants);
  });
});

describe('getPokemonVariants', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should set variant in store', () => {
    const name = 'pikachu';
    const variants = ['pikachu-rockstar', 'pikachu-popstar'];
    const variantsMap = new Map([[name, variants]]);
    spyGetAll.mockReturnValue(variantsMap);
    expect(getPokemonVariants(name)).toBe(variantsMap.get(name));
    expect(spyGetAll).toHaveBeenCalled();
  });
});

describe('pokemonIsVariant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should decide if a pokemon is variant correctly', async () => {
    spyGetPokemonApi.mockResolvedValue(true);
    expect(await pokemonIsVariant('pikachu-rockstar')).toBeTruthy();
    expect(await pokemonIsVariant('pikachu')).toBeFalsy();
  });
});
