import { shallowMount } from '@vue/test-utils';
import PokemonItem from '@components/pokemons/PokemonItem.vue';

jest.mock('@components/ui/BaseButton.vue', () => ({
  name: 'BaseButton',
  template: '<div class="mocked-base-button"></div>',
}));

jest.mock('@components/ui/CenteredColumn.vue', () => ({
  name: 'CenteredColumn',
  template: '<div class="mocked-centered-column"></div>',
}));

jest.mock('@components/pokemons/PokemonItemHeader.vue', () => ({
  name: 'PokemonItemHeader',
  template: '<div class="mocked-pokemon-item-header"></div>',
}));

jest.mock('@components/pokemons/PokemonItemStat.vue', () => ({
  name: 'PokemonItemStat',
  template: '<div class="mocked-pokemon-item-stat"></div>',
}));

jest.mock('@components/pokemons/PokemonItemType.vue', () => ({
  name: 'PokemonItemType',
  template: '<div class="mocked-pokemon-item-type"></div>',
}));

jest.mock('@api/pokemon', () => ({
  getPokemon: jest.fn(),
}));

jest.mock('@lib/helpers', () => ({
  getPokemonPageBackgroundElement: jest.fn(() => ({
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    scrollTop: 0,
  })),
}));
describe('PokemonItem', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonItem, {
      mocks: {
        $route: {
          params: {
            id: 'pokemon-id',
          },
        },
      },
    });
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders its respective components', () => {
    expect(wrapper.find('basebutton-stub').exists()).toBe(true);
    expect(wrapper.find('centeredcolumn-stub').exists()).toBe(true);
    expect(wrapper.find('pokemonitemheader-stub').exists()).toBe(true);
    expect(wrapper.find('pokemonitemstat-stub').exists()).toBe(true);
    expect(wrapper.find('pokemonitemtype-stub').exists()).toBe(true);
  });
});
