import { shallowMount } from '@vue/test-utils';
import RandomPokemon from '@components/home/RandomPokemon.vue';

jest.mock('@api/pokemon', () => ({
  getRandomPokemons: jest
    .fn()
    .mockResolvedValue([
      { name: 'Pikachu', sprites: { front_default: 'pikachu.png' } },
    ]),
}));

jest.mock('@lib/store', () => ({
  state: {
    randomPokemons: [
      { name: 'pikachu', image: 'pikachu.png' },
      { name: 'charizard', image: 'charizard.png' },
    ],
  },
  getRandomPokemons: jest.fn(),
}));

jest.mock(
  '@css/media-queries.scss?vue&type=style&index=0&lang=scss&module=1',
  () => ({
    firstBreak: '1px',
    secondBreak: 'px',
    thirdBreak: 'px',
    fourthBreak: 'px',
    fifthBreak: 'px',
  })
);

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

  it('should set the randomPokemons data and loading to false', async () => {
    await wrapper.vm.getRandomPokemons();
    expect(wrapper.vm.randomPokemons.length).toBeGreaterThan(0);
    expect(wrapper.vm.loading).toBe(false);
  });

  it('should set the randomPokemons data and loading to false', async () => {
    await wrapper.vm.getRandomPokemons();
    expect(wrapper.vm.randomPokemons.length).toBeGreaterThan(0);
    expect(wrapper.vm.loading).toBe(false);
  });
});
