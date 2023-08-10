import { shallowMount } from '@vue/test-utils';
import PokemonsView from '@/views/PokemonsView.vue';

jest.mock('@/components/pokemons/PokemonList.vue', () => ({
  name: 'PokemonList',
  template: '<div class="mocked-pokemon-list"></div>',
}));

jest.mock('@/components/favorites/FavoritesCarousel.vue', () => ({
  name: 'FavoritesCarousel',
  template: '<div class="mocked-favorites-carousel"></div>',
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
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('pokemonlist-stub').exists()).toBe(true);
    expect(wrapper.find('favoritescarousel-stub').exists()).toBe(true);
  });
});
