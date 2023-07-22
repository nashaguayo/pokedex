import { shallowMount } from '@vue/test-utils';
import PokemonListCard from '@/components/pokemons/PokemonListCard';

describe('PokemonListCard', () => {
  let wrapper;

  beforeEach(() => {
    const $router = {
      push: jest.fn(),
    };

    wrapper = shallowMount(PokemonListCard, {
      propsData: {
        id: 1,
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

  it('displays the correct id', () => {
    const span = wrapper.find('.id');
    expect(span.text()).toBe('#1');
  });

  it('displays the correct pokemon name', () => {
    const span = wrapper.find('.name');
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

  it('redirects to pokemon page when clicked', async () => {
    const spy = jest.spyOn(wrapper.vm.$router, 'push');
    await wrapper.trigger('click');
    expect(spy).toHaveBeenLastCalledWith({
      name: 'pokemon',
      params: { id: 'pikachu' },
    });
  });

  it('applies the "shrink-animation" class when wasClicked is true', async () => {
    expect(wrapper.find('.shrink-animation').exists()).toBe(false);
    wrapper.setData({ wasClicked: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.shrink-animation').exists()).toBe(true);
  });

  it('sets wasClicked to false when onAnimationEnd is called', async () => {
    wrapper.setData({ wasClicked: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.wasClicked).toBe(true);
    wrapper.vm.onAnimationEnd();
    expect(wrapper.vm.wasClicked).toBe(false);
  });
});
