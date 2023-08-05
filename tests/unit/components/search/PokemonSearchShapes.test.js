import { shallowMount } from '@vue/test-utils';
import PokemonSearchShapes from '@/components/search/PokemonSearchShapes';

jest.mock('@/components/search/PokemonSearchFilters.vue', () => ({
  name: 'PokemonSearchFilters',
  template: '<div class="mocked-pokemon-search-filters"></div>',
}));

jest.mock('@/store/mutations/shapes', () => ({
  toggleFilter: jest.fn(),
}));

jest.mock('@/store/state/shapes', () => ({
  state: {
    all: [],
    filter: '',
  },
}));

describe('PokemonSearchShapes', () => {
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallowMount(PokemonSearchShapes);
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders PokemonSearchFilters component', () => {
    expect(wrapper.find('pokemonsearchfilters-stub').exists()).toBe(true);
  });
});
