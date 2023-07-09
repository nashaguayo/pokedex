import { shallowMount } from '@vue/test-utils';
import PokemonListCard from '@components/pokemons/PokemonListCard';

describe('PokemonListCard', () => {
  let wrapper;

  beforeEach(() => {
    const $router = {
      push: jest.fn(),
    };

    wrapper = shallowMount(PokemonListCard, {
      propsData: {
        name: 'pikachu',
        image: 'pokemon-image.png',
      },
      mocks: {
        $router,
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
    expect(image.attributes('src')).toBe('pokemon-image.png');
    expect(image.attributes('alt')).toBe('pokemon front default');
  });

  it('displays the correct pokemonName', () => {
    const span = wrapper.find('span');
    wrapper.setProps({
      pokemon: { sprites: { front_default: 'some-image.png' } },
    });
    expect(span.text()).toBe('pikachu');
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
});
