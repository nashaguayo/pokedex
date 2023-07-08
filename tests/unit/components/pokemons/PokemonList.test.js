import { shallowMount } from '@vue/test-utils';
import PokemonList from '@components/pokemons/PokemonList';

jest.mock('@lib/helpers', () => ({
  scrollToTopOfBackgroundPage: jest.fn(),
}));

jest.mock('@api/pokemon', () => ({
  getPokemons: jest.fn().mockImplementation(() => {
    return {
      count: 1,
      results: [
        {
          sprites: {
            front_default: '',
          },
        },
      ],
    };
  }),
}));

jest.mock('@components/pokemons/PokemonListCard.vue', () => ({
  name: 'PokemonListCard',
  template: '<div class="mocked-pokemon-list-card"></div>',
}));

jest.mock('@components/ui/BaseButton.vue', () => ({
  name: 'BaseButton',
  template: '<div class="mocked-base-button"></div>',
}));

describe('PokemonList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonList);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the PokemonCard component', () => {
    expect(wrapper.find('pokemonlistcard-stub').exists()).toBe(true);
  });

  it('renders the BaseButton component', () => {
    expect(wrapper.find('basebutton-stub').exists()).toBe(true);
  });
});
