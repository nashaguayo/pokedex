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
    const pokemonList = wrapper.findComponent({ name: 'PokemonList' });
    expect(pokemonList.exists()).toBe(true);
  });
});
