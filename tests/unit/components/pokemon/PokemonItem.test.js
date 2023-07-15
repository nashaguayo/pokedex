import { shallowMount } from '@vue/test-utils';
import PokemonItem from '@/components/pokemon/PokemonItem.vue';
import Vue from 'vue';

jest.mock('@/components/ui/BaseButton.vue', () => ({
  name: 'BaseButton',
  template: '<div class="mocked-base-button"></div>',
}));

jest.mock('@/components/ui/CenteredColumn.vue', () => ({
  name: 'CenteredColumn',
  template: '<div class="mocked-centered-column"></div>',
}));

jest.mock('@/components/pokemon/PokemonItemHeader.vue', () => ({
  name: 'PokemonItemHeader',
  template: '<div class="mocked-pokemon-item-header"></div>',
}));

jest.mock('@/components/pokemon/PokemonItemStats.vue', () => ({
  name: 'PokemonItemStats',
  template: '<div class="mocked-pokemon-item-stats"></div>',
}));

jest.mock('@/components/pokemon/PokemonItemType.vue', () => ({
  name: 'PokemonItemType',
  template: '<div class="mocked-pokemon-item-type"></div>',
}));

jest.mock('@/components/pokemon/PokemonItemEvolutions.vue', () => ({
  name: 'PokemonItemEvolutions',
  template: '<div class="mocked-pokemon-item-evolutions"></div>',
}));

jest.mock('@/components/pokemon/PokemonItemDescription.vue', () => ({
  name: 'PokemonItemDescription',
  template: '<div class="mocked-pokemon-item-description"></div>',
}));

jest.mock('@/lib/store', () => ({
  state: {
    pokemon: new Map([
      ['id', 1],
      ['name', 'pikachu'],
      ['image', 'pikachu.png'],
      [
        'stats',
        [
          { name: 'hp', value: '50' },
          { name: 'attack', value: '20' },
        ],
      ],
      ['types', ['fire']],
      ['evolutions', [{ name: 'pika', image: 'pika.png' }]],
    ]),
  },
  getPokemon: jest.fn(),
}));

jest.mock('@/lib/helpers', () => ({
  getPokemonPageBackgroundElement: jest.fn(() => ({
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    scrollTop: 0,
  })),
  capitalizeWord: jest.fn(),
}));

describe('PokemonItem', () => {
  let wrapper;

  beforeEach(() => {
    Vue.directive('observe-visibility', {});
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
    expect(wrapper.find('pokemonitemstats-stub').exists()).toBe(true);
    expect(wrapper.find('pokemonitemtype-stub').exists()).toBe(true);
    expect(wrapper.find('pokemonitemevolutions-stub').exists()).toBe(true);
    expect(wrapper.find('pokemonitemdescription-stub').exists()).toBe(true);
  });
});
