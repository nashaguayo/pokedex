import { shallowMount } from '@vue/test-utils';
import PokemonSearch from '@components/search/PokemonSearch';
import CenteredColumn from '@components/ui/CenteredColumn';
import store from '@lib/store';

jest.mock('@components/ui/BaseInput.vue', () => ({
  name: 'BaseInput',
  template: '<div class="mocked-base-input"></div>',
}));

jest.mock('@components/ui/BaseButton.vue', () => ({
  name: 'BaseButton',
  template: '<div class="mocked-base-button"></div>',
}));

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

    store.clearSearchResults = jest.fn();

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

  it('renders all components', () => {
    expect(wrapper.find('baseinput-stub').exists()).toBe(true);
    expect(wrapper.find('basebutton-stub').exists()).toBe(true);
  });

  it('displays search results', async () => {
    const resultElements = wrapper.findAll('span');
    expect(resultElements).toHaveLength(2);
  });

  it('sets the search term when input value changes', async () => {
    wrapper.vm.searchTerm = 'pikachu';
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.searchTerm).toBe('pikachu');
  });

  it('clears search results when search term length is less than 3', async () => {
    wrapper.setData({ searchTerm: 'pi' });
    await wrapper.vm.$nextTick();
    expect(store.clearSearchResults).toHaveBeenCalled();
  });

  it('searches pokemons when search term length is greater than or equal to 3', async () => {
    wrapper.setData({ searchTerm: 'pikachu' });
    await wrapper.vm.$nextTick();
    expect(store.searchPokemons).toHaveBeenCalledWith('pikachu');
  });

  it('navigates to pokemon page when a search result is clicked', async () => {
    const pokemon = 'Pikachu';
    const mockRouter = { push: jest.fn() };
    wrapper.vm.$router = mockRouter;

    await wrapper.find('.search-result').trigger('click');

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'pokemon',
      params: { id: pokemon },
    });
  });
});
