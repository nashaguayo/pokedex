import { shallowMount } from '@vue/test-utils';
import RandomPokemon from '@components/home/RandomPokemon.vue';

jest.mock('@api/pokemon', () => ({
  getRandomPokemons: jest
    .fn()
    .mockResolvedValue([
      { name: 'Pikachu', sprites: { front_default: 'pikachu.png' } },
    ]),
}));

describe('RandomPokemon', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RandomPokemon);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('navigates to the Pokemon page when a Pokemon is clicked', async () => {
    const mockRouter = {
      push: jest.fn(),
    };
    wrapper.vm.$router = mockRouter;

    await wrapper.vm.goToPokemonPage('Pikachu');

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'pokemon',
      params: { id: 'Pikachu' },
    });
  });
});
