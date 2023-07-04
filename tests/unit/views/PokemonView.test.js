import { shallowMount } from '@vue/test-utils';
import PokemonView from '@views/PokemonView.vue';

jest.mock('@components/pokemons/PokemonItem.vue', () => ({
  name: 'PokemonItem',
  template: '<div class="mocked-pokemon-item"></div>',
}));

describe('PokemonView', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonView);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders PokemonsView with PokemonList component', () => {
    const pokemonList = wrapper.findComponent({ name: 'PokemonItem' });
    expect(pokemonList.exists()).toBe(true);
  });
});
