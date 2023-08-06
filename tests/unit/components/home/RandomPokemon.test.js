import { shallowMount } from '@vue/test-utils';
import RandomPokemon from '@/components/home/RandomPokemon.vue';

jest.mock('@/api/pokemon', () => ({
  getRandomPokemons: jest
    .fn()
    .mockResolvedValue([
      { name: 'Pikachu', sprites: { front_default: 'pikachu.png' } },
    ]),
}));

jest.mock('@/lib/store', () => ({
  getRandomPokemons: jest.fn(),
  getNewRandomPokemon: jest.fn(),
}));

jest.mock('@/store/state/random', () => ({
  state: {
    pokemons: [
      { name: 'pikachu', image: 'pikachu.png' },
      { name: 'charizard', image: 'charizard.png' },
    ],
  },
}));

jest.mock('@/store/mutations/random', () => ({
  getRandomPokemons: jest.fn(),
  getNewRandomPokemon: jest.fn(),
}));

jest.mock('@/store/state/other', () => ({
  state: {
    storeHasLoaded: true,
  },
}));

describe('RandomPokemon', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RandomPokemon, {
      stubs: ['router-link'],
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('should call getNewRandomPokemon every 5 seconds', async () => {
    const getNewRandomPokemonSpy = jest.spyOn(
      wrapper.vm,
      'getNewRandomPokemon'
    );
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await wrapper.vm.$nextTick();
    expect(getNewRandomPokemonSpy).toHaveBeenCalledTimes(1);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    expect(getNewRandomPokemonSpy).toHaveBeenCalledTimes(2);
  }, 11000);
});
