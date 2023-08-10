import { shallowMount } from '@vue/test-utils';
import PokemonSearchColors from '@/components/search/PokemonSearchColors';

jest.mock('@/components/search/PokemonSearchFilters.vue', () => ({
  name: 'PokemonSearchFilters',
  template: '<div class="mocked-pokemon-search-filters"></div>',
}));

jest.mock('@/store/mutations/colors', () => ({
  toggleFilter: jest.fn(),
}));

jest.mock('@/store/state/colors', () => ({
  state: {
    all: [],
    filter: '',
  },
}));

describe('PokemonSearchColors', () => {
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallowMount(PokemonSearchColors);
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders PokemonSearchFilters component', () => {
    expect(wrapper.find('pokemonsearchfilters-stub').exists()).toBe(true);
  });
});
