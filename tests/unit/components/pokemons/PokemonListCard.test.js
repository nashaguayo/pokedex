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
    wrapper.setProps({
      pokemon: { sprites: { front_default: 'some-image.png' } },
    });
    expect(span.text()).toBe('???');
  });

  it('sets wasClicked to true when showPokemonInfo is called', () => {
    expect(wrapper.vm.wasClicked).toBe(false);
    wrapper.vm.showPokemonInfo();
    expect(wrapper.vm.wasClicked).toBe(true);
  });

  it('renders the pokemon image if the front_default sprite exists', async () => {
    wrapper.setData({
      pokemon: {
        sprites: {
          front_default: 'pokemon-image.png',
        },
      },
    });
    await wrapper.vm.$nextTick();
    const image = wrapper.find('.screen');
    expect(image.attributes('src')).toBe('pokemon-image.png');
  });

  it('renders the silouette image if the front_default sprite is empty', async () => {
    wrapper.setData({
      pokemon: {
        sprites: {
          front_default: '',
        },
      },
    });
    await wrapper.vm.$nextTick();
    const image = wrapper.find('.screen');
    expect(image.attributes('src')).toBe(wrapper.vm.silouette);
  });
});
