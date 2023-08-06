import * as pokemonApi from '@/api/pokemon';
import * as evolutionsApi from '@/api/evolutions';
import * as colorsApi from '@/api/colors';
import * as shapesApi from '@/api/shapes';
import * as habitatApi from '@/api/habitat';
import * as statsApi from '@/api/stats';
import * as typesApi from '@/api/types';
import * as characteristics from '@/store/mutations/characteristics';
import * as variations from '@/store/mutations/variations';
import pokemonStore from '@/store/state/pokemon';
import { clearPokemon, getPokemon } from '@/store/mutations/pokemon';

jest.mock('@/api/pokemon', () => ({
  getPokemon: jest.fn(),
  getSpeciesData: jest.fn(),
}));

jest.mock('@/api/evolutions', () => ({
  getPokemonEvolutions: jest.fn(),
}));

jest.mock('@/api/colors', () => ({
  getPokemonColorTranslation: jest.fn(),
}));

jest.mock('@/api/shapes', () => ({
  getPokemonShapeTranslation: jest.fn(),
}));

jest.mock('@/api/habitat', () => ({
  getPokemonHabitatTranslation: jest.fn(),
}));

jest.mock('@/api/stats', () => ({
  getPokemonStatTranslation: jest.fn(),
}));

jest.mock('@/api/types', () => ({
  getPokemonTypeTranslation: jest.fn(),
}));

jest.mock('@/store/mutations/characteristics', () => ({
  getAllCharacteristics: jest.fn(),
}));

jest.mock('@/store/mutations/variations', () => ({
  getPokemonVariants: jest.fn(),
}));

jest.mock('@/store/state/pokemon', () => ({
  hasVisitedPokemon: jest.fn(),
  setVisited: jest.fn(),
}));

const spyHasVisitedPokemon = jest.spyOn(pokemonStore, 'hasVisitedPokemon');
const spySetVisited = jest.spyOn(pokemonStore, 'setVisited');

const spyGetPokemonApi = jest.spyOn(pokemonApi, 'getPokemon');
const spyGetSpeciesDataApi = jest.spyOn(pokemonApi, 'getSpeciesData');

const spyGetPokemonEvolutionsApi = jest.spyOn(
  evolutionsApi,
  'getPokemonEvolutions'
);

const spyGetPokemonColorTranslationApi = jest.spyOn(
  colorsApi,
  'getPokemonColorTranslation'
);

const spyGetPokemonShapeTranslationApi = jest.spyOn(
  shapesApi,
  'getPokemonShapeTranslation'
);

const spyGetPokemonHabitatTranslationApi = jest.spyOn(
  habitatApi,
  'getPokemonHabitatTranslation'
);

const spyGetPokemonStatsTranslationApi = jest.spyOn(
  statsApi,
  'getPokemonStatTranslation'
);

const spyGetPokemonTypeTranslationApi = jest.spyOn(
  typesApi,
  'getPokemonTypeTranslation'
);

const spyGetAllCharacteristics = jest.spyOn(
  characteristics,
  'getAllCharacteristics'
);

const spyGetPokemonVariants = jest.spyOn(variations, 'getPokemonVariants');

describe('getPokemon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should getPokemon from pokeapi if not present in store', async () => {
    const pokemon1 = {
      id: '1',
      name: 'pikachu',
      weight: 67,
      height: 15,
      species: {
        url: 'some-url.com',
      },
      stats: [
        {
          stat: {
            name: 'hp',
          },
          base_stat: 52,
        },
        {
          stat: {
            name: 'attack',
          },
          base_stat: 80,
        },
      ],
      sprites: {
        front_default: 'image.png',
        other: {
          dream_world: {
            front_default: 'another-image.png',
          },
        },
      },
      types: [
        {
          type: {
            name: 'type1',
          },
        },
        {
          type: {
            name: 'type2',
          },
        },
      ],
    };
    const pokemon2 = {
      name: 'pikachu-rockstar',
      sprites: { front_default: 'pikachu-rockstar.png' },
    };
    const pokemon3 = {
      name: 'pikachu-rockstar',
      sprites: { front_default: 'pikachu-rockstar.png' },
    };
    const evolutions = ['pikachu', 'charmander', 'squirtle'];
    const speciesData = {
      flavorTexts: [],
      color: 'red',
      shape: 'blob',
      generation: 'i',
      habitat: 'forest',
    };
    const characteristics = new Map([
      ['hp', [{ possibleValues: [50], description: 'description1' }]],
      ['attack', [{ possibleValues: [20], description: 'description2' }]],
    ]);
    const variants = [
      { name: 'pikachu-rockstar', sprites: { front_default: 'image1.png' } },
      { name: 'pikachu-popstar', sprites: { front_default: 'image2.png' } },
    ];
    spyHasVisitedPokemon.mockReturnValue(false);
    spyGetPokemonApi
      .mockResolvedValueOnce(pokemon1)
      .mockResolvedValueOnce(pokemon2)
      .mockResolvedValueOnce(pokemon3);
    spyGetPokemonEvolutionsApi.mockResolvedValue(evolutions);
    spyGetSpeciesDataApi.mockResolvedValue(speciesData);
    spyGetPokemonStatsTranslationApi.mockImplementation((key) => key);
    spyGetAllCharacteristics.mockReturnValue(characteristics);
    spyGetPokemonVariants.mockResolvedValueOnce(variants).mockResolvedValue([]);
    spyGetPokemonApi
      .mockResolvedValueOnce(variants[0])
      .mockResolvedValueOnce(variants[1]);
    spyGetPokemonTypeTranslationApi.mockImplementation((key) => key);
    spyGetPokemonColorTranslationApi.mockImplementation((key) => key);
    spyGetPokemonShapeTranslationApi.mockImplementation((key) => key);
    spyGetPokemonHabitatTranslationApi.mockImplementation((key) => key);
    await getPokemon('pikachu');
    expect(spySetVisited).toHaveBeenCalledWith('pikachu', {
      characteristic: '',
      color: { name: 'red', translated: 'red' },
      evolutions: ['pikachu', 'charmander', 'squirtle'],
      flavorTexts: [],
      generation: 'i',
      habitat: { name: 'forest', translated: 'forest' },
      height: 15,
      id: '1',
      image: 'another-image.png',
      name: 'pikachu',
      shape: 'blob',
      smallImage: 'image.png',
      stats: [
        { name: 'hp', value: 52 },
        { name: 'attack', value: 80 },
      ],
      types: [
        { name: 'type1', translated: 'type1' },
        { name: 'type2', translated: 'type2' },
      ],
      variants: [
        { image: 'pikachu-rockstar.png', name: 'rockstar' },
        { image: 'pikachu-rockstar.png', name: 'rockstar' },
      ],
      weight: 67,
    });
  });
});

describe('clearPokemon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should clear visited pokemons in store', () => {
    clearPokemon();
    expect(spySetVisited).toHaveBeenCalledWith(new Map());
  });
});
