import { shallowMount } from '@vue/test-utils';
import PokemonList from '@/components/pokemons/PokemonList';
import store from '@/lib/store';

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

jest.mock('@/components/pokemons/PokemonListCard.vue', () => ({
  name: 'PokemonListCard',
  template: '<div class="mocked-pokemon-list-card"></div>',
}));

jest.mock('@/components/ui/BaseLoader.vue', () => ({
  name: 'BaseLoader',
  template: '<div class="mocked-base-loader"></div>',
}));

jest.mock('@/lib/store', () => ({
  state: { scroll: { pokemons: [{ name: 'pikachu' }] } },
  getPokemons: jest.fn(),
  getMorePokemons: jest.fn().mockResolvedValue([{ name: 'bulbasaur' }]),
}));

describe('PokemonList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonList, {
      stubs: ['router-link', 'FontAwesomeIcon'],
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the PokemonCard component', () => {
    expect(wrapper.find('pokemonlistcard-stub').exists()).toBe(true);
  });

  it('renders the BaseLoader component', () => {
    expect(wrapper.find('baseloader-stub').exists()).toBe(true);
  });

  it('displays the list of pokemons after data is fetched', async () => {
    await wrapper.vm.$nextTick();
    const pokemonCards = wrapper.findAll('pokemonlistcard-stub');
    expect(pokemonCards.length).toBe(1);
    expect(pokemonCards.at(0).attributes().name).toBe('pikachu');
  });

  it('displays an error message when there are no pokemons', async () => {
    store.state.scroll.pokemons = [];
    wrapper = shallowMount(PokemonList, {
      store,
      stubs: ['router-link', 'FontAwesomeIcon'],
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('h2').text()).toBe('Something went wrong!');
    expect(wrapper.find('p').text()).toBe('No pokemons to display.');
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
    expect(store.getMorePokemons).toHaveBeenCalled();
    expect(wrapper.vm.loading).toBe(false);
  });
});
