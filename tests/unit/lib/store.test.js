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
  getAllTypes: jest.fn().mockResolvedValue(['electric', 'fighting']),
  getPokemonsByType: jest.fn().mockResolvedValue(['pikachu']),
}));

jest.mock('@/api/colors', () => ({
  getAllColors: jest.fn().mockResolvedValue(['yellow', 'blue']),
  getPokemonsByColor: jest.fn().mockResolvedValue(['pikachu']),
}));

jest.mock('@/api/shapes', () => ({
  getAllShapes: jest.fn().mockResolvedValue(['quadruped', 'humanoid']),
  getPokemonsByShape: jest.fn().mockResolvedValue(['pikachu']),
}));

jest.mock('@/api/generations', () => ({
  getAllGenerations: jest.fn().mockResolvedValue(['i', 'ii']),
  getPokemonsByGeneration: jest.fn().mockResolvedValue(['pikachu']),
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
    spyGetAllPokemons.mockRestore();
    spyGetAllTypes.mockRestore();
    spyGetAllColors.mockRestore();
    spyGetAllShapes.mockRestore();
    spyGetAllGenerations.mockRestore();
    spyGetAllCharacteristicsDescriptions.mockRestore();
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

  it('gets the correct amount of random pokemons', async () => {
    const amountOfRandomPokemons = 5;
    const spyGetNewRandomPokemon = jest
      .spyOn(store, 'getNewRandomPokemon')
      .mockResolvedValue({});
    await store.getRandomPokemons(amountOfRandomPokemons);
    expect(spyGetNewRandomPokemon).toHaveBeenCalledTimes(
      amountOfRandomPokemons
    );
    expect(store.state.randomPokemons.length).toBe(amountOfRandomPokemons);
    spyGetNewRandomPokemon.mockRestore();
  });

  it('gets a new random pokemon', async () => {
    const spyPokemonIsAlreadyInRandomPokemons = jest
      .spyOn(store, 'pokemonIsAlreadyInRandomPokemons')
      .mockReturnValue(false);
    store.state.allPokemons = [{ name: 'pikachu' }];
    const newRandomPokemon = await store.getNewRandomPokemon();
    expect(spyPokemonIsAlreadyInRandomPokemons).toHaveBeenCalledTimes(1);
    expect(newRandomPokemon).toStrictEqual({
      name: 'pikachu',
      image: 'pikachu.png',
    });
  });

  it('gets a new random pokemon and adds it to randomPokemon', async () => {
    const spyPokemonIsAlreadyInRandomPokemons = jest
      .spyOn(store, 'pokemonIsAlreadyInRandomPokemons')
      .mockReturnValue(false);
    store.state.randomPokemons = [];
    store.state.allPokemons = [{ name: 'pikachu' }];
    await store.getNewRandomPokemon(true);
    expect(spyPokemonIsAlreadyInRandomPokemons).toHaveBeenCalledTimes(1);
    expect(store.state.randomPokemons).toStrictEqual([
      { image: 'pikachu.png', name: 'pikachu' },
    ]);
    spyPokemonIsAlreadyInRandomPokemons.mockRestore();
  });

  it('defines if a pokemon is already in random pokemons correctly', () => {
    store.state.randomPokemons = [{ name: 'pikachu', image: 'pikachu.png' }];
    expect(store.pokemonIsAlreadyInRandomPokemons('pikachu')).toBeTruthy();
    expect(store.pokemonIsAlreadyInRandomPokemons('charmander')).toBeFalsy();
  });

  it("doesn't search again when there's already a search underway", async () => {
    const spySearchPokemonsByType = jest.spyOn(store, 'searchPokemonsByType');
    const spySearchPokemonsByColor = jest.spyOn(store, 'searchPokemonsByColor');
    const spySearchPokemonsByShape = jest.spyOn(store, 'searchPokemonsByShape');
    const spySearchPokemonsByGeneration = jest.spyOn(
      store,
      'searchPokemonsByGeneration'
    );
    const spySearchPokemonsJustByTerm = jest.spyOn(
      store,
      'searchPokemonJustByTerm'
    );
    store.state.search.isSearchingPokemon = true;
    await store.searchPokemons('');
    expect(store.state.search.isSearchingPokemon).toBeTruthy();
    expect(spySearchPokemonsByType).not.toHaveBeenCalled();
    expect(spySearchPokemonsByColor).not.toHaveBeenCalled();
    expect(spySearchPokemonsByShape).not.toHaveBeenCalled();
    expect(spySearchPokemonsByGeneration).not.toHaveBeenCalled();
    expect(spySearchPokemonsJustByTerm).not.toHaveBeenCalled();
    spySearchPokemonsByType.mockRestore();
    spySearchPokemonsByColor.mockRestore();
    spySearchPokemonsByShape.mockRestore();
    spySearchPokemonsByGeneration.mockRestore();
    spySearchPokemonsJustByTerm.mockRestore();
    store.state.search.isSearchingPokemon = false;
  });

  it('calls correctly search by type', async () => {
    const spySearchPokemonsByType = jest.spyOn(store, 'searchPokemonsByType');
    const spySearchPokemonsByColor = jest.spyOn(store, 'searchPokemonsByColor');
    const spySearchPokemonsByShape = jest.spyOn(store, 'searchPokemonsByShape');
    const spySearchPokemonsByGeneration = jest.spyOn(
      store,
      'searchPokemonsByGeneration'
    );
    const spySearchPokemonsJustByTerm = jest.spyOn(
      store,
      'searchPokemonJustByTerm'
    );
    store.state.allPokemons = [{ name: 'pikachu' }];
    store.state.pokemonsByType = new Map([['electric', ['pikachu']]]);
    store.state.pokemonsByColor = new Map([['yellow', ['pikachu']]]);
    store.state.pokemonsByShape = new Map([['quadruped', ['pikachu']]]);
    store.state.pokemonsByGeneration = new Map([['i', ['pikachu']]]);
    store.state.search.types = ['electric'];
    await store.searchPokemons('pik');
    expect(store.state.search.isSearchingPokemon).toBeFalsy();
    expect(spySearchPokemonsByType).toHaveBeenCalled();
    expect(spySearchPokemonsByType).toHaveBeenCalledWith('pik');
    expect(spySearchPokemonsByColor).not.toHaveBeenCalled();
    expect(spySearchPokemonsByShape).not.toHaveBeenCalled();
    expect(spySearchPokemonsByGeneration).not.toHaveBeenCalled();
    expect(spySearchPokemonsJustByTerm).not.toHaveBeenCalled();
    spySearchPokemonsByType.mockRestore();
    spySearchPokemonsByColor.mockRestore();
    spySearchPokemonsByShape.mockRestore();
    spySearchPokemonsByGeneration.mockRestore();
    spySearchPokemonsJustByTerm.mockRestore();
    store.state.search.types = [];
    store.state.allPokemons = [];
  });

  it('calls correctly search by color', async () => {
    const spySearchPokemonsByType = jest.spyOn(store, 'searchPokemonsByType');
    const spySearchPokemonsByColor = jest.spyOn(store, 'searchPokemonsByColor');
    const spySearchPokemonsByShape = jest.spyOn(store, 'searchPokemonsByShape');
    const spySearchPokemonsByGeneration = jest.spyOn(
      store,
      'searchPokemonsByGeneration'
    );
    const spySearchPokemonsJustByTerm = jest.spyOn(
      store,
      'searchPokemonJustByTerm'
    );
    store.state.allPokemons = [{ name: 'pikachu' }];
    store.state.pokemonsByType = new Map([['electric', ['pikachu']]]);
    store.state.pokemonsByColor = new Map([['yellow', ['pikachu']]]);
    store.state.pokemonsByShape = new Map([['quadruped', ['pikachu']]]);
    store.state.pokemonsByGeneration = new Map([['i', ['pikachu']]]);
    store.state.search.color = 'yellow';
    await store.searchPokemons('pik');
    expect(store.state.search.isSearchingPokemon).toBeFalsy();
    expect(spySearchPokemonsByType).not.toHaveBeenCalled();
    expect(spySearchPokemonsByColor).toHaveBeenCalled();
    expect(spySearchPokemonsByColor).toHaveBeenCalledWith('pik');
    expect(spySearchPokemonsByShape).not.toHaveBeenCalled();
    expect(spySearchPokemonsByGeneration).not.toHaveBeenCalled();
    expect(spySearchPokemonsJustByTerm).not.toHaveBeenCalled();
    spySearchPokemonsByType.mockRestore();
    spySearchPokemonsByColor.mockRestore();
    spySearchPokemonsByShape.mockRestore();
    spySearchPokemonsByGeneration.mockRestore();
    spySearchPokemonsJustByTerm.mockRestore();
    store.state.search.color = '';
    store.state.allPokemons = [];
  });

  it('calls correctly search by shape', async () => {
    const spySearchPokemonsByType = jest.spyOn(store, 'searchPokemonsByType');
    const spySearchPokemonsByColor = jest.spyOn(store, 'searchPokemonsByColor');
    const spySearchPokemonsByShape = jest.spyOn(store, 'searchPokemonsByShape');
    const spySearchPokemonsByGeneration = jest.spyOn(
      store,
      'searchPokemonsByGeneration'
    );
    const spySearchPokemonsJustByTerm = jest.spyOn(
      store,
      'searchPokemonJustByTerm'
    );
    store.state.allPokemons = [{ name: 'pikachu' }];
    store.state.pokemonsByType = new Map([['electric', ['pikachu']]]);
    store.state.pokemonsByColor = new Map([['yellow', ['pikachu']]]);
    store.state.pokemonsByShape = new Map([['quadruped', ['pikachu']]]);
    store.state.pokemonsByGeneration = new Map([['i', ['pikachu']]]);
    store.state.search.shape = 'quadruped';
    await store.searchPokemons('pik');
    expect(store.state.search.isSearchingPokemon).toBeFalsy();
    expect(spySearchPokemonsByType).not.toHaveBeenCalled();
    expect(spySearchPokemonsByColor).not.toHaveBeenCalled();
    expect(spySearchPokemonsByShape).toHaveBeenCalled();
    expect(spySearchPokemonsByShape).toHaveBeenCalledWith('pik');
    expect(spySearchPokemonsByGeneration).not.toHaveBeenCalled();
    expect(spySearchPokemonsJustByTerm).not.toHaveBeenCalled();
    spySearchPokemonsByType.mockRestore();
    spySearchPokemonsByColor.mockRestore();
    spySearchPokemonsByShape.mockRestore();
    spySearchPokemonsByGeneration.mockRestore();
    spySearchPokemonsJustByTerm.mockRestore();
    store.state.search.shape = '';
    store.state.allPokemons = [];
  });

  it('calls correctly search by generation', async () => {
    const spySearchPokemonsByType = jest.spyOn(store, 'searchPokemonsByType');
    const spySearchPokemonsByColor = jest.spyOn(store, 'searchPokemonsByColor');
    const spySearchPokemonsByShape = jest.spyOn(store, 'searchPokemonsByShape');
    const spySearchPokemonsByGeneration = jest.spyOn(
      store,
      'searchPokemonsByGeneration'
    );
    const spySearchPokemonsJustByTerm = jest.spyOn(
      store,
      'searchPokemonJustByTerm'
    );
    store.state.allPokemons = [{ name: 'pikachu' }];
    store.state.pokemonsByType = new Map([['electric', ['pikachu']]]);
    store.state.pokemonsByColor = new Map([['yellow', ['pikachu']]]);
    store.state.pokemonsByShape = new Map([['quadruped', ['pikachu']]]);
    store.state.pokemonsByGeneration = new Map([['i', ['pikachu']]]);
    store.state.search.generation = 'i';
    await store.searchPokemons('pik');
    expect(store.state.search.isSearchingPokemon).toBeFalsy();
    expect(spySearchPokemonsByType).not.toHaveBeenCalled();
    expect(spySearchPokemonsByColor).not.toHaveBeenCalled();
    expect(spySearchPokemonsByShape).not.toHaveBeenCalled();
    expect(spySearchPokemonsByGeneration).toHaveBeenCalled();
    expect(spySearchPokemonsByGeneration).toHaveBeenCalledWith('pik');
    expect(spySearchPokemonsJustByTerm).not.toHaveBeenCalled();
    spySearchPokemonsByType.mockRestore();
    spySearchPokemonsByColor.mockRestore();
    spySearchPokemonsByShape.mockRestore();
    spySearchPokemonsByGeneration.mockRestore();
    spySearchPokemonsJustByTerm.mockRestore();
    store.state.search.generation = '';
    store.state.allPokemons = [];
  });

  it('calls correctly search just by term', async () => {
    const spySearchPokemonsByType = jest.spyOn(store, 'searchPokemonsByType');
    const spySearchPokemonsByColor = jest.spyOn(store, 'searchPokemonsByColor');
    const spySearchPokemonsByShape = jest.spyOn(store, 'searchPokemonsByShape');
    const spySearchPokemonsByGeneration = jest.spyOn(
      store,
      'searchPokemonsByGeneration'
    );
    const spySearchPokemonsJustByTerm = jest.spyOn(
      store,
      'searchPokemonJustByTerm'
    );
    store.state.allPokemons = [{ name: 'pikachu' }];
    store.state.pokemonsByType = new Map([['electric', ['pikachu']]]);
    store.state.pokemonsByColor = new Map([['yellow', ['pikachu']]]);
    store.state.pokemonsByShape = new Map([['quadruped', ['pikachu']]]);
    store.state.pokemonsByGeneration = new Map([['i', ['pikachu']]]);
    await store.searchPokemons('pik');
    expect(store.state.search.isSearchingPokemon).toBeFalsy();
    expect(spySearchPokemonsByType).not.toHaveBeenCalled();
    expect(spySearchPokemonsByColor).not.toHaveBeenCalled();
    expect(spySearchPokemonsByShape).not.toHaveBeenCalled();
    expect(spySearchPokemonsByGeneration).not.toHaveBeenCalled();
    expect(spySearchPokemonsJustByTerm).toHaveBeenCalled();
    expect(spySearchPokemonsJustByTerm).toHaveBeenCalledWith('pik');
    spySearchPokemonsByType.mockRestore();
    spySearchPokemonsByColor.mockRestore();
    spySearchPokemonsByShape.mockRestore();
    spySearchPokemonsByGeneration.mockRestore();
    spySearchPokemonsJustByTerm.mockRestore();
    store.state.allPokemons = [];
  });

  it('searches correctly just by term', () => {
    store.state.allPokemons = [
      { name: 'pikachu' },
      { name: 'charmander' },
      { name: 'squirtle' },
    ];
    store.searchPokemonJustByTerm('pik');
    expect(store.state.search.results).toStrictEqual(['pikachu']);
    store.state.search.results = [];
  });

  it('searches correctly by type', () => {
    store.state.search.types = ['electric'];
    store.searchPokemonsByType('pik');
    expect(store.state.search.results).toStrictEqual(['pikachu']);
    store.state.search.results = [];
  });

  it('searches correctly by color', () => {
    store.state.search.color = 'yellow';
    store.searchPokemonsByType('pik');
    expect(store.state.search.results).toStrictEqual(['pikachu']);
    store.state.search.results = [];
  });

  it('searches correctly by shape', () => {
    store.state.search.shape = 'quadruped';
    store.searchPokemonsByType('pik');
    expect(store.state.search.results).toStrictEqual(['pikachu']);
    store.state.search.results = [];
  });

  it('searches correctly by generation', () => {
    store.state.search.generation = 'i';
    store.searchPokemonsByType('pik');
    expect(store.state.search.results).toStrictEqual(['pikachu']);
    store.state.search.results = [];
  });

  it('clears search results', () => {
    store.state.search.results = ['pikachu'];
    store.clearSearchResults();
    expect(store.state.search.results).toStrictEqual([]);
  });

  it('gets new mystery pokemon correctly', async () => {
    const spyGetNewRandomPokemon = jest
      .spyOn(store, 'getNewRandomPokemon')
      .mockResolvedValue({ name: 'pikachu', image: 'pikachu.png' });
    expect(store.state.game).toStrictEqual({ image: '', name: '' });
    await store.getNewMysteryPokemon();
    expect(spyGetNewRandomPokemon).toHaveBeenCalled();
    spyGetNewRandomPokemon.mockRestore();
    expect(store.state.game).toStrictEqual({
      name: 'pikachu',
      image: 'pikachu.png',
    });
  });

  it('gets all types correctly', async () => {
    store.state.allTypes = [];
    store.state.pokemonsByType = new Map([]);
    expect(store.state.allTypes).toStrictEqual([]);
    await store.getAllTypes();
    expect(store.state.allTypes).toStrictEqual(['electric', 'fighting']);
    expect(store.state.pokemonsByType).toStrictEqual(
      new Map([
        ['electric', ['pikachu']],
        ['fighting', ['pikachu']],
      ])
    );
  });

  it('gets all colors correctly', async () => {
    store.state.allColors = [];
    store.state.pokemonsByColor = new Map([]);
    expect(store.state.allColors).toStrictEqual([]);
    await store.getAllColors();
    expect(store.state.allColors).toStrictEqual(['yellow', 'blue']);
    expect(store.state.pokemonsByColor).toStrictEqual(
      new Map([
        ['yellow', ['pikachu']],
        ['blue', ['pikachu']],
      ])
    );
  });

  it('gets all shapes correctly', async () => {
    store.state.allShapes = [];
    store.state.pokemonsByShape = new Map([]);
    expect(store.state.allShapes).toStrictEqual([]);
    await store.getAllShapes();
    expect(store.state.allShapes).toStrictEqual(['quadruped', 'humanoid']);
    expect(store.state.pokemonsByShape).toStrictEqual(
      new Map([
        ['quadruped', ['pikachu']],
        ['humanoid', ['pikachu']],
      ])
    );
  });

  it('gets all generations correctly', async () => {
    store.state.allGenerations = [];
    store.state.pokemonsByGeneration = new Map([]);
    expect(store.state.allGenerations).toStrictEqual([]);
    await store.getAllGenerations();
    expect(store.state.allGenerations).toStrictEqual(['i', 'ii']);
    expect(store.state.pokemonsByGeneration).toStrictEqual(
      new Map([
        ['i', ['pikachu']],
        ['ii', ['pikachu']],
      ])
    );
  });
});
