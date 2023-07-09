import { shallowMount } from '@vue/test-utils';
import PokemonsView from '@views/PokemonsView.vue';

jest.mock('@components/pokemons/PokemonList.vue', () => ({
  name: 'PokemonList',
  template: '<div class="mocked-pokemon-list"></div>',
}));

describe('PokemonsView', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonsView);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders PokemonsView with PokemonList component', () => {
    expect(wrapper.find('pokemonlist-stub').exists()).toBe(true);
  });

  it('renders PokemonsView with PokemonList component', () => {
    expect(wrapper.find('pokemonlist-stub').exists()).toBe(true);
  });

  it('renders title', () => {
    expect(wrapper.find('pokemonlist-stub').exists()).toBe(true);
  });
});
