import { shallowMount } from '@vue/test-utils';
import PokemonItem from '@components/pokemon/PokemonItem.vue';

jest.mock('@components/ui/BaseButton.vue', () => ({
  name: 'BaseButton',
  template: '<div class="mocked-base-button"></div>',
}));

jest.mock('@components/ui/CenteredColumn.vue', () => ({
  name: 'CenteredColumn',
  template: '<div class="mocked-centered-column"></div>',
}));

jest.mock('@components/pokemon/PokemonItemHeader.vue', () => ({
  name: 'PokemonItemHeader',
  template: '<div class="mocked-pokemon-item-header"></div>',
}));

jest.mock('@components/pokemon/PokemonItemStat.vue', () => ({
  name: 'PokemonItemStat',
  template: '<div class="mocked-pokemon-item-stat"></div>',
}));

jest.mock('@components/pokemon/PokemonItemType.vue', () => ({
  name: 'PokemonItemType',
  template: '<div class="mocked-pokemon-item-type"></div>',
}));

jest.mock('@components/pokemon/PokemonItemEvolutions.vue', () => ({
  name: 'PokemonItemEvolutions',
  template: '<div class="mocked-pokemon-item-evolutions"></div>',
}));

jest.mock(
  '@css/media-queries.scss?vue&type=style&index=0&lang=scss&module=1',
  () => ({
    firstBreak: '1px',
    secondBreak: 'px',
    thirdBreak: 'px',
    fourthBreak: 'px',
    fifthBreak: 'px',
  })
);

jest.mock('@api/pokemon', () => ({
  getPokemon: jest.fn(() =>
    Promise.resolve({
      name: 'Charizard',
      sprites: {
        other: {
          dream_world: {
            front_default: 'charizard.png',
          },
        },
      },
      stats: [
        {
          stat: { name: 'hp' },
          base_stat: 78,
        },
        {
          stat: { name: 'attack' },
          base_stat: 84,
        },
      ],
      types: [{ type: { name: 'fire' } }, { type: { name: 'flying' } }],
    })
  ),
}));

jest.mock('@lib/store', () => ({
  state: {
    pokemon: new Map([
      ['id', 1],
      ['name', 'pikachu'],
      ['image', 'pikachu.png'],
      ['stats', [{ name: 'hp', value: '50' }]],
      ['types', ['fire']],
      ['evolutions', [{ name: 'pika', image: 'pika.png' }]],
    ]),
  },
  getPokemon: jest.fn(),
}));

jest.mock('@lib/helpers', () => ({
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
    expect(wrapper.find('pokemonitemevolutions-stub').exists()).toBe(true);
  });
});
