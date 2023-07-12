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
        types: ['fire'],
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

  it('displays the correct pokemon name', () => {
    const span = wrapper.find('span');
    expect(span.text()).toBe('pikachu');
  });

  it('displays the correct pokemon type', () => {
    const span = wrapper.find('.type');
    expect(span.text()).toBe('fire');
  });

  it('sets wasClicked to true when showPokemonInfo is called', () => {
    expect(wrapper.vm.wasClicked).toBe(false);
    wrapper.vm.showPokemonInfo();
    expect(wrapper.vm.wasClicked).toBe(true);
  });
});
