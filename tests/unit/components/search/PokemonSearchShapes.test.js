import { shallowMount } from '@vue/test-utils';
import PokemonSearchShapes from '@/components/search/PokemonSearchShapes';

jest.mock('@/components/search/PokemonSearchFilters.vue', () => ({
  name: 'PokemonSearchFilters',
  template: '<div class="mocked-pokemon-search-filters"></div>',
}));

jest.mock('@/lib/store', () => ({
  toggleShapeFilter: jest.fn(),
  state: {
    allShapes: [],
    search: {
      shapes: [],
    },
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
