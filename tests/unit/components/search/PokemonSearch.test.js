import { shallowMount } from '@vue/test-utils';
import PokemonSearch from '@components/search/PokemonSearch';
import CenteredColumn from '@components/ui/CenteredColumn';
import store from '@lib/store';

jest.mock('@lib/store', () => ({
  searchPokemons: jest.fn(),
  state: {
    searchResults: ['Pikachu', 'Charizard'],
  },
}));

describe('PokemonSearch', () => {
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallowMount(PokemonSearch, {
      components: {
        CenteredColumn,
      },
      stubs: ['FontAwesomeIcon'],
    });
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('updates searchTerm on input change', async () => {
    const input = wrapper.find('input');
    const searchTerm = 'Pikachu';
    await input.setValue(searchTerm);
    expect(wrapper.vm.searchTerm).toBe(searchTerm);
    expect(store.searchPokemons).toHaveBeenCalledWith(searchTerm);
  });

  it('displays search results', async () => {
    const resultElements = wrapper.findAll('span');
    expect(resultElements).toHaveLength(2);
  });
});
