import { shallowMount } from '@vue/test-utils';
import PokemonSearchGenerations from '@/components/search/PokemonSearchGenerations';

jest.mock('@/components/search/PokemonSearchFilters.vue', () => ({
  name: 'PokemonSearchFilters',
  template: '<div class="mocked-pokemon-search-filters"></div>',
}));

jest.mock('@/lib/store', () => ({
  toggleGenerationFilter: jest.fn(),
  state: {
    search: {
      generations: [],
    },
  },
}));

jest.mock('@/store/state/generations', () => ({
  state: {
    all: [],
  },
}));

describe('PokemonSearchGenerations', () => {
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallowMount(PokemonSearchGenerations);
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders PokemonSearchFilters component', () => {
    expect(wrapper.find('pokemonsearchfilters-stub').exists()).toBe(true);
  });
});
