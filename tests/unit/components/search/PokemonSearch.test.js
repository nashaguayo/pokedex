import { shallowMount } from '@vue/test-utils';
import PokemonSearch from '@/components/search/PokemonSearch';

jest.mock('@/components/ui/BaseInput.vue', () => ({
  name: 'BaseInput',
  template: '<div class="mocked-base-input"></div>',
}));

jest.mock('@/components/ui/BaseButton.vue', () => ({
  name: 'BaseButton',
  template: '<div class="mocked-base-button"></div>',
}));

jest.mock('@/components/search/PokemonSearchTypes.vue', () => ({
  name: 'PokemonSearchTypes',
  template: '<div class="mocked-pokemon-search-types"></div>',
}));

jest.mock('@/lib/store', () => ({
  searchPokemons: jest.fn(),
  clearSearchResults: jest.fn(),
  clearFilters: jest.fn(),
  clearTypeFilters: jest.fn(),
  clearColorFilters: jest.fn(),
  state: {
    search: {
      results: ['Pikachu', 'Charizard'],
      isSearchingPokemon: false,
      types: [],
      colors: [],
    },
  },
}));

describe('PokemonSearch', () => {
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallowMount(PokemonSearch, {
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

  it('should toggle between filters', () => {
    expect(wrapper.vm.displayTypes).toBe(false);
    expect(wrapper.vm.displayColors).toBe(false);
    wrapper.vm.toggleDisplayTypes();
    expect(wrapper.vm.displayTypes).toBe(true);
    expect(wrapper.vm.displayColors).toBe(false);
    wrapper.vm.toggleDisplayColors();
    expect(wrapper.vm.displayTypes).toBe(false);
    expect(wrapper.vm.displayColors).toBe(true);
    wrapper.vm.toggleDisplayTypes();
    expect(wrapper.vm.displayTypes).toBe(true);
    expect(wrapper.vm.displayColors).toBe(false);
  });

  it('clears search results and filters when "Clear Search" button is clicked', async () => {
    wrapper.vm.setSearchTerm('pikachu');
    wrapper.vm.toggleDisplayTypes();
    expect(wrapper.vm.reset).toBe(false);
    expect(wrapper.vm.displayTypes).toBe(true);
    expect(wrapper.vm.filteringTypes).toEqual([]);
    const spy = jest.spyOn(wrapper.vm, 'clearSearch');
    await wrapper.vm.clearSearch();
    await wrapper.vm.$nextTick();
    expect(spy).toHaveBeenCalled();
    expect(wrapper.vm.reset).toBe(true);
    expect(wrapper.vm.displayTypes).toBe(false);
    expect(wrapper.vm.displayColors).toBe(false);
    expect(wrapper.vm.filteringTypes).toEqual([]);
    expect(wrapper.vm.filteringColors).toEqual([]);
  });

  it('toggles the display of types when "Show Types" or "Hide Types" button is clicked', async () => {
    expect(wrapper.vm.displayTypesText).toBe('Show Types');
    expect(wrapper.vm.displayTypes).toBe(false);
    wrapper.vm.toggleDisplayTypes();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.displayTypesText).toBe('Hide Types');
    expect(wrapper.vm.displayTypes).toBe(true);
    wrapper.vm.toggleDisplayTypes();
    await wrapper.find('.button[variant=true][small=true]').trigger('click');
    expect(wrapper.vm.displayTypesText).toBe('Show Types');
    expect(wrapper.vm.displayTypes).toBe(false);
  });

  it('toggles the display of colors when "Show Colors" or "Hide Colors" button is clicked', async () => {
    expect(wrapper.vm.displayColorsText).toBe('Show Colors');
    expect(wrapper.vm.displayColors).toBe(false);
    wrapper.vm.toggleDisplayColors();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.displayColorsText).toBe('Hide Colors');
    expect(wrapper.vm.displayColors).toBe(true);
    wrapper.vm.toggleDisplayColors();
    await wrapper.find('.button[variant=true][small=true]').trigger('click');
    expect(wrapper.vm.displayColorsText).toBe('Show Colors');
    expect(wrapper.vm.displayColors).toBe(false);
  });
});
