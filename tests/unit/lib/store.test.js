import store from '@/lib/store';

jest.mock('@/api/pokemon', () => ({
  getPokemon: jest.fn().mockResolvedValue({
    id: 1,
    name: 'pikachu',
    species: { url: 'pikachu.com' },
    stats: [],
    sprites: {
      front_default: 'front-default-image.png',
      other: {
        dream_world: { front_default: 'other-front-default-image.png' },
      },
    },
    types: [],
    height: 4,
    weight: 60,
  }),
  getPokemons: jest.fn().mockResolvedValue({
    next: 'next.com',
    results: [
      { name: 'pikachu' },
      { name: 'charmander' },
      { name: 'squirtle' },
    ],
  }),
  getAllPokemons: jest.fn().mockResolvedValue({
    results: [
      { name: 'pikachu', url: 'pokemon/1/' },
      { name: 'charmander', url: 'pokemon/2/' },
      { name: 'squirtle', url: 'pokemon/3/' },
    ],
  }),
  getDataForPokemon: jest.fn().mockResolvedValue({
    id: 1,
    name: 'pikachu',
    image: 'pikachu.png',
    types: ['electric'],
  }),
  getSpeciesData: jest.fn().mockResolvedValue({
    flavorTexts: ['Text 1', 'Text 2'],
    color: 'yellow',
    shape: 'quadruped',
    generation: 'i',
    habitat: 'forest',
  }),
}));

jest.mock('@/api/evolutions', () => ({
  getPokemonEvolutions: jest
    .fn()
    .mockResolvedValue(['pichu', 'pikachu', 'raichu']),
}));

jest.mock('@/api/types', () => ({
  getAllTypes: jest.fn().mockResolvedValue([]),
  getPokemonsByType: jest.fn(),
}));

jest.mock('@/api/colors', () => ({
  getAllColors: jest.fn().mockResolvedValue([]),
  getPokemonsByColor: jest.fn(),
}));

jest.mock('@/api/shapes', () => ({
  getAllShapes: jest.fn().mockResolvedValue([]),
  getPokemonsByShape: jest.fn(),
}));

jest.mock('@/api/generations', () => ({
  getAllGenerations: jest.fn().mockResolvedValue([]),
  getPokemonsByGeneration: jest.fn(),
}));

jest.mock('@/api/characteristics', () => ({
  getAllCharacteristicsDescriptions: jest.fn(),
}));

jest.mock('@/lib/localStorage', () => ({
  isDarkModeEnabled: jest.fn(),
  toggleDarkMode: jest.fn(),
}));

describe('store', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads the store when initializeStore method is called', async () => {
    const spyGetAllPokemons = jest.spyOn(store, 'getAllPokemons');
    const spyGetAllTypes = jest.spyOn(store, 'getAllTypes');
    const spyGetAllColors = jest.spyOn(store, 'getAllColors');
    const spyGetAllShapes = jest.spyOn(store, 'getAllShapes');
    const spyGetAllGenerations = jest.spyOn(store, 'getAllGenerations');
    const spyGetAllCharacteristicsDescriptions = jest.spyOn(
      store,
      'getAllCharacteristicsDescriptions'
    );
    expect(store.state.storeHasLoaded).toBeFalsy();
    await store.initializeStore();
    expect(spyGetAllPokemons).toHaveBeenCalled();
    expect(spyGetAllTypes).toHaveBeenCalled();
    expect(spyGetAllColors).toHaveBeenCalled();
    expect(spyGetAllShapes).toHaveBeenCalled();
    expect(spyGetAllGenerations).toHaveBeenCalled();
    expect(spyGetAllCharacteristicsDescriptions).toHaveBeenCalled();
    expect(store.state.storeHasLoaded).toBeTruthy();
  });

  it('gets pokemon list card data correctly', async () => {
    const pokemon = { name: 'pikachu' };
    const { id, name, image, types } = await store.getPokemonListCardData(
      pokemon
    );
    expect(id).toBe(1);
    expect(name).toBe(pokemon.name);
    expect(image).toBe('pikachu.png');
    expect(types).toStrictEqual(['electric']);
  });

  it('gets pokemons correctly', async () => {
    const url = 'some-url.com';
    const spyGetPokemonListCardData = jest
      .spyOn(store, 'getPokemonListCardData')
      .mockResolvedValue({});
    await store.getPokemons(url);
    expect(spyGetPokemonListCardData).toHaveBeenCalledTimes(3);
    expect(spyGetPokemonListCardData).toHaveBeenCalledWith({ name: 'pikachu' });
    expect(spyGetPokemonListCardData).toHaveBeenCalledWith({
      name: 'charmander',
    });
    expect(spyGetPokemonListCardData).toHaveBeenCalledWith({
      name: 'squirtle',
    });
    expect(store.state.scroll.pokemons).toStrictEqual([{}, {}, {}]);
    expect(store.state.scroll.nextUrl).toBe('next.com');
  });

  it('gets all pokemons correctly', async () => {
    await store.getAllPokemons();
    expect(store.state.allPokemons).toStrictEqual([
      { id: 1, name: 'pikachu' },
      { id: 2, name: 'charmander' },
      { id: 3, name: 'squirtle' },
    ]);
    expect(store.state.isLoadingAllPokemons).toBeFalsy();
  });

  it('gets more pokemons correctly', async () => {
    const spyGetPokemonListCardData = jest
      .spyOn(store, 'getPokemonListCardData')
      .mockResolvedValue({});
    await store.getMorePokemons();
    expect(spyGetPokemonListCardData).toHaveBeenCalledTimes(3);
    expect(spyGetPokemonListCardData).toHaveBeenCalledWith({ name: 'pikachu' });
    expect(spyGetPokemonListCardData).toHaveBeenCalledWith({
      name: 'charmander',
    });
    expect(spyGetPokemonListCardData).toHaveBeenCalledWith({
      name: 'squirtle',
    });
    expect(store.state.scroll.pokemons).toStrictEqual([{}, {}, {}, {}, {}, {}]);
    expect(store.state.scroll.nextUrl).toBe('next.com');
    expect(store.state.isLoadingMorePokemons).toBeFalsy();
  });

  it('gets pokemon correctly', async () => {
    store.state.allCharacteristics = new Map([['hp', ['Characteristic 1']]]);
    const pokemonId = 'pikachu';
    await store.getPokemon(pokemonId);
    expect(store.state.pokemon.get('pikachu')).toStrictEqual({
      id: 1,
      name: 'pikachu',
      image: 'other-front-default-image.png',
      smallImage: 'front-default-image.png',
      stats: [],
      types: [],
      evolutions: ['pichu', 'pikachu', 'raichu'],
      flavorTexts: ['Text 1', 'Text 2'],
      characteristic: '',
      height: 4,
      weight: 60,
      color: 'yellow',
      shape: 'quadruped',
      generation: 'i',
      habitat: 'forest',
    });
    expect(store.state.pokemon.size).toBe(1);
  });
});
