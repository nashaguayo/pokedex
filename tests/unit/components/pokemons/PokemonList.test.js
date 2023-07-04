import { shallowMount } from '@vue/test-utils';
import PokemonList from '@components/pokemons/PokemonList';

jest.mock('@lib/helpers', () => ({
  scrollToTopOfBackgroundPage: jest.fn(),
}));

jest.mock('@api/pokemon', () => ({
  getPokemonsInfo: jest.fn().mockImplementation(() => {
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

  it('calls getPokemons method with previousUrl when getPreviousPage is called', async () => {
    const previousUrl = 'previous-url';
    wrapper.setData({ previousUrl });
    wrapper.vm.getPokemons = jest.fn();
    await wrapper.vm.getPreviousPage();
    expect(wrapper.vm.getPokemons).toHaveBeenCalledWith(previousUrl);
  });

  it('calls getPokemons method with nextUrl when getNextPage is called', async () => {
    const nextUrl = 'next-url';
    wrapper.setData({ nextUrl });
    wrapper.vm.getPokemons = jest.fn();
    await wrapper.vm.getNextPage();
    expect(wrapper.vm.getPokemons).toHaveBeenCalledWith(nextUrl);
  });
});
