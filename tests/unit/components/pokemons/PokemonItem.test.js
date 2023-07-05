import { shallowMount } from '@vue/test-utils';
import PokemonItem from '@components/pokemons/PokemonItem.vue';
import { getPokemon } from '@api/pokemon';

jest.mock('@components/ui/BaseButton.vue', () => ({
  name: 'BaseButton',
  template: '<button></button>',
}));

jest.mock('@components/ui/CenteredColumn.vue', () => ({
  name: 'CenteredColumn',
  template: '<div></div>',
}));

jest.mock('@components/pokemons/PokemonItemHeader.vue', () => ({
  name: 'PokemonItemHeader',
  template: '<div></div>',
}));

jest.mock('@components/pokemons/PokemonItemStat.vue', () => ({
  name: 'PokemonItemStat',
  template: '<div></div>',
}));

jest.mock('@components/pokemons/PokemonItemType.vue', () => ({
  name: 'PokemonItemType',
  template: '<div></div>',
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
});
