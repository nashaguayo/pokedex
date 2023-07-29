import { shallowMount } from '@vue/test-utils';
import PokemonSearchItem from '@/components/search/PokemonSearchItem';

jest.mock('@/lib/localStorage', () => ({
  setRecentSearch: jest.fn(),
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

  it('should call setRecentSearch and navigate to Pokemon page on click', () => {
    wrapper.find('.pokemon-search-item').trigger('click');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'pokemon',
      params: { id: 'Pikachu' },
    });
  });
});
