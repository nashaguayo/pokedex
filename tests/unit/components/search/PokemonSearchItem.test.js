import { shallowMount } from '@vue/test-utils';
import PokemonSearchItem from '@/components/search/PokemonSearchItem';

jest.mock('@/lib/localStorage', () => ({
  setRecentSearch: jest.fn(),
}));

jest.mock('@/lib/store', () => ({
  pokemonIsVariant: jest.fn().mockResolvedValue(true),
}));

describe('PokemonSearchItem', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonSearchItem, {
      propsData: {
        name: 'Pikachu',
        isDarkModeEnabled: false,
      },
      mocks: {
        $router: {
          push: jest.fn(),
        },
      },
      stubs: ['FontAwesomeIcon'],
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render the component', () => {
    expect(wrapper.find('.pokemon-search-item').exists()).toBe(true);
    expect(wrapper.find('.search-result').exists()).toBe(true);
    expect(wrapper.find('.icon').exists()).toBe(true);
  });
});
