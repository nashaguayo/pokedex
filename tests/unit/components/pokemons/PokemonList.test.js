import { shallowMount } from '@vue/test-utils';
import PokemonList from '@components/pokemons/PokemonList';

jest.mock('@lib/helpers', () => ({
  scrollToTopOfBackgroundPage: jest.fn(),
}));

jest.mock('@api/pokemon', () => ({
  getPokemons: jest.fn().mockImplementation(() => {
    return {
      count: 1,
      results: [
        {
          sprites: {
            front_default: '',
          },
        },
      ],
    };
  }),
}));

jest.mock('@lib/helpers', () => ({
  scrollToTopOfBackgroundPage: jest.fn(),
  getPageBackgroundElement: jest.fn().mockReturnValue({
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }),
}));

jest.mock('@components/pokemons/PokemonListCard.vue', () => ({
  name: 'PokemonListCard',
  template: '<div class="mocked-pokemon-list-card"></div>',
}));

jest.mock('@components/ui/BaseLoader.vue', () => ({
  name: 'BaseLoader',
  template: '<div class="mocked-base-loader"></div>',
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
});
