import { shallowMount } from '@vue/test-utils';
import PokemonSearchGenerations from '@/components/search/PokemonSearchGenerations';

jest.mock('@/components/search/PokemonSearchFilters.vue', () => ({
  name: 'PokemonSearchFilters',
  template: '<div class="mocked-pokemon-search-filters"></div>',
}));

jest.mock('@/store/state/generations', () => ({
  state: {
    all: [],
    filter: '',
  },
}));

jest.mock('@/store/mutations/generations', () => ({
  toggleFilter: jest.fn(),
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
