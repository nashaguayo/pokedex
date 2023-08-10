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

jest.mock('@/components/search/PokemonSearchColors.vue', () => ({
  name: 'PokemonSearchColors',
  template: '<div class="mocked-pokemon-search-colors"></div>',
}));

jest.mock('@/components/search/PokemonSearchShapes.vue', () => ({
  name: 'PokemonSearchShapes',
  template: '<div class="mocked-pokemon-search-shapes"></div>',
}));

jest.mock('@/components/search/PokemonSearchGenerations.vue', () => ({
  name: 'PokemonSearchGenerations',
  template: '<div class="mocked-pokemon-search-generations"></div>',
}));

jest.mock('@/components/search/PokemonSearchItem.vue', () => ({
  name: 'PokemonSearchItem',
  template: '<div class="mocked-pokemon-search-item"></div>',
}));

jest.mock('@/store/mutations/other', () => ({
  initializeStore: jest.fn(),
}));

jest.mock('@/store/mutations/colors', () => ({
  clearFilters: jest.fn(),
}));

jest.mock('@/store/mutations/shapes', () => ({
  clearFilters: jest.fn(),
}));

jest.mock('@/store/mutations/generations', () => ({
  clearFilters: jest.fn(),
}));

jest.mock('@/store/mutations/types', () => ({
  clearFilters: jest.fn(),
}));

jest.mock('@/store/mutations/search', () => ({
  searchPokemons: jest.fn(),
  clearSearchResults: jest.fn(),
  clearFilters: jest.fn(),
}));

jest.mock('@/store/state/other', () => ({
  state: {
    storeHasLoaded: true,
    isDarkModeEnabled: false,
  },
}));

jest.mock('@/store/state/generations', () => ({
  state: {
    filter: '',
  },
}));

jest.mock('@/store/state/shapes', () => ({
  state: {
    filter: '',
  },
}));

jest.mock('@/store/state/colors', () => ({
  state: {
    filter: '',
  },
}));

jest.mock('@/store/state/types', () => ({
  state: {
    filters: [],
  },
}));

jest.mock('@/store/state/search', () => ({
  state: {
    results: ['Pikachu', 'Charizard'],
    isSearching: false,
  },
}));

describe('PokemonSearch', () => {
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallowMount(PokemonSearch, {
      stubs: ['FontAwesomeIcon'],
      mocks: { $t: (key) => key },
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
    const resultElements = wrapper.findAll('pokemonsearchitem-stub');
    expect(resultElements).toHaveLength(2);
  });

  it('sets the search term when input value changes', async () => {
    wrapper.vm.searchTerm = 'pikachu';
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.searchTerm).toBe('pikachu');
  });

  it('should toggle between filters', () => {
    expect(wrapper.vm.displayTypes).toBe(false);
    expect(wrapper.vm.displayColors).toBe(false);
    expect(wrapper.vm.displayShapes).toBe(false);
    expect(wrapper.vm.displayGenerations).toBe(false);
    wrapper.vm.toggleDisplayTypes();
    expect(wrapper.vm.displayTypes).toBe(true);
    expect(wrapper.vm.displayColors).toBe(false);
    expect(wrapper.vm.displayShapes).toBe(false);
    expect(wrapper.vm.displayGenerations).toBe(false);
    wrapper.vm.toggleDisplayColors();
    expect(wrapper.vm.displayTypes).toBe(false);
    expect(wrapper.vm.displayColors).toBe(true);
    expect(wrapper.vm.displayShapes).toBe(false);
    expect(wrapper.vm.displayGenerations).toBe(false);
    wrapper.vm.toggleDisplayShapes();
    expect(wrapper.vm.displayTypes).toBe(false);
    expect(wrapper.vm.displayColors).toBe(false);
    expect(wrapper.vm.displayShapes).toBe(true);
    expect(wrapper.vm.displayGenerations).toBe(false);
    wrapper.vm.toggleDisplayGenerations();
    expect(wrapper.vm.displayTypes).toBe(false);
    expect(wrapper.vm.displayColors).toBe(false);
    expect(wrapper.vm.displayShapes).toBe(false);
    expect(wrapper.vm.displayGenerations).toBe(true);
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
    expect(wrapper.vm.displayShapes).toBe(false);
    expect(wrapper.vm.displayGenerations).toBe(false);
    expect(wrapper.vm.filteringTypes).toEqual([]);
    expect(wrapper.vm.filteringColor).toEqual('');
    expect(wrapper.vm.filteringShape).toEqual('');
    expect(wrapper.vm.filteringGeneration).toEqual('');
  });

  it('toggles the display of types when "Show Types" or "Hide Types" button is clicked', async () => {
    expect(wrapper.vm.displayTypes).toBe(false);
    wrapper.vm.toggleDisplayTypes();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.displayTypes).toBe(true);
    wrapper.vm.toggleDisplayTypes();
    await wrapper.find('.button[variant=true][small=true]').trigger('click');
    expect(wrapper.vm.displayTypes).toBe(false);
  });

  it('toggles the display of colors when "Show Colors" or "Hide Colors" button is clicked', async () => {
    expect(wrapper.vm.displayColors).toBe(false);
    wrapper.vm.toggleDisplayColors();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.displayColors).toBe(true);
    wrapper.vm.toggleDisplayColors();
    await wrapper.find('.button[variant=true][small=true]').trigger('click');
    expect(wrapper.vm.displayColors).toBe(false);
  });

  it('toggles the display of shapes when "Show Shapes" or "Hide Shapes" button is clicked', async () => {
    expect(wrapper.vm.displayShapes).toBe(false);
    wrapper.vm.toggleDisplayShapes();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.displayShapes).toBe(true);
    wrapper.vm.toggleDisplayShapes();
    await wrapper.find('.button[variant=true][small=true]').trigger('click');
    expect(wrapper.vm.displayShapes).toBe(false);
  });

  it('toggles the display of generations when "Show Generations" or "Hide Generations" button is clicked', async () => {
    expect(wrapper.vm.displayGenerations).toBe(false);
    wrapper.vm.toggleDisplayGenerations();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.displayGenerations).toBe(true);
    wrapper.vm.toggleDisplayGenerations();
    await wrapper.find('.button[variant=true][small=true]').trigger('click');
    expect(wrapper.vm.displayGenerations).toBe(false);
  });
});
