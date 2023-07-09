import { shallowMount } from '@vue/test-utils';
import PokemonSearch from '@components/search/PokemonSearch';
import CenteredColumn from '@components/ui/CenteredColumn';

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
});
