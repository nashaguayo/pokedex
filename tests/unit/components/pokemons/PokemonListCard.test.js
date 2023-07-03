import { shallowMount } from '@vue/test-utils';
import PokemonListCard from '@components/pokemons/PokemonListCard';

jest.mock('@api/pokemon', () => ({
  getPokemon: jest.fn().mockResolvedValue({
    sprites: {
      front_default: '',
    },
  }),
}));

describe('PokemonListCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonListCard, {
      propsData: {
        pokemonName: 'pikachu',
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the PokemonListCard component', () => {
    expect(wrapper.find('.pokemon-list-card').exists()).toBe(true);
  });

  it('displays the correct image source', () => {
    const image = wrapper.find('.screen');
    expect(image.attributes('src')).toBe('');
    expect(image.attributes('alt')).toBe('pokemon front default');
  });

  it('displays the correct pokemonName', () => {
    const span = wrapper.find('span');
    expect(span.text()).toBe('pikachu');
  });
});
