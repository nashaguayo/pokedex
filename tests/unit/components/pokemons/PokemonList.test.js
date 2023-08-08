import { shallowMount } from '@vue/test-utils';
import PokemonList from '@/components/pokemons/PokemonList';

jest.mock('@/lib/helpers', () => ({
  scrollToTopOfBackgroundPage: jest.fn(),
}));

jest.mock('@/api/pokemon', () => ({
  getPokemons: jest.fn().mockResolvedValue({
    count: 1,
    results: [
      {
        sprites: {
          front_default: '',
        },
      },
    ],
  }),
}));

jest.mock('@/lib/helpers', () => ({
  scrollToTopOfBackgroundPage: jest.fn(),
  getPageBackgroundElement: jest.fn().mockReturnValue({
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }),
}));

jest.mock('@/components/favorites/FavoritesCarousel.vue', () => ({
  name: 'FavoritesCarousel',
  template: '<div class="mocked-favorites-carousel"></div>',
}));

jest.mock('@/components/pokemons/PokemonListCard.vue', () => ({
  name: 'PokemonListCard',
  template: '<div class="mocked-pokemon-list-card"></div>',
}));

jest.mock('@/components/ui/BaseLoader.vue', () => ({
  name: 'BaseLoader',
  template: '<div class="mocked-base-loader"></div>',
}));

jest.mock('@/store/state/pokemons', () => ({
  state: { pokemons: [{ name: 'pikachu' }] },
}));

jest.mock('@/store/mutations/scroll', () => ({
  getPokemons: jest.fn(),
  getMorePokemons: jest.fn().mockResolvedValue([{ name: 'bulbasaur' }]),
}));

describe('PokemonList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonList, {
      stubs: ['router-link', 'FontAwesomeIcon'],
      mocks: { $t: (key) => key },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('loads more pokemons when scrolled to the bottom of the list', async () => {
    const target = {
      scrollTop: 200,
      clientHeight: 200,
      scrollHeight: 400,
    };
    wrapper.vm.handleScroll({ target });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.loading).toBe(true);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.loading).toBe(false);
  });

  it('loads 21 pokemons when the resolution is right', async () => {
    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(900);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.amountOfPokemonsToLoadPerPage).toBe(21);
  });
});
