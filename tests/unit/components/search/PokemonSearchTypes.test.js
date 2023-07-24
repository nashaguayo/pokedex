import { shallowMount } from '@vue/test-utils';
import PokemonSearchTypes from '@/components/search/PokemonSearchTypes';

jest.mock('@/components/search/PokemonSearchFilters.vue', () => ({
  name: 'PokemonSearchFilters',
  template: '<div class="mocked-pokemon-search-filters"></div>',
}));

jest.mock('@/lib/store', () => ({
  toggleTypeFilter: jest.fn(),
  state: {
    allTypes: [],
    search: {
      types: [],
    },
  },
}));

describe('PokemonSearchTypes', () => {
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallowMount(PokemonSearchTypes);
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders PokemonSearchFilters component', () => {
    expect(wrapper.find('pokemonsearchfilters-stub').exists()).toBe(true);
  });
});
