import { mount } from '@vue/test-utils';
import PokemonItemHeader from '@/components/pokemon/PokemonItemHeader.vue';

describe('PokemonItemHeader', () => {
  let wrapper;
  let image;

  beforeEach(() => {
    wrapper = mount(PokemonItemHeader, {
      propsData: {
        image: 'image-url',
        smallImage: 'small-image-url',
        name: 'Pikachu',
        topPosition: 0,
      },
      attachTo: document.body,
    });

    image = wrapper.find('.pokemon-image');
    Object.defineProperty(image.element, 'offsetHeight', { value: 200 });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the component with the correct props', () => {
    expect(wrapper.props('image')).toBe('image-url');
    expect(wrapper.props('name')).toBe('Pikachu');
  });

  it('sets the location height on pokemon image load', () => {
    expect(wrapper.vm.locationHeight).toBe(0);
    image.trigger('load');
    expect(wrapper.vm.locationHeight).toBe(200);
  });

  it('sets the location height and width when the component is mounted', () => {
    Object.defineProperty(wrapper.vm.$refs.image, 'offsetHeight', {
      value: 200,
    });
    Object.defineProperty(wrapper.vm.$refs.pokemonItemHeader, 'offsetWidth', {
      value: 100,
    });
    wrapper.vm.setLocationHeight();
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
    expect(wrapper.vm.locationHeight).toBe(200);
    expect(wrapper.vm.locationWidth).toBe(100);
  });

  it('sets the location height on window resize', async () => {
    Object.defineProperty(wrapper.vm.$refs.image, 'offsetHeight', {
      value: 200,
    });
    Object.defineProperty(wrapper.vm.$refs.pokemonItemHeader, 'offsetWidth', {
      value: 100,
    });
    wrapper.vm.setLocationHeight();
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.locationHeight).toBe(200);
    expect(wrapper.vm.locationWidth).toBe(100);
  });

  it('loads the big image when image is present', () => {
    expect(wrapper.find('.pokemon-image').exists()).toBeTruthy();
    expect(wrapper.find('.small-pokemon-image').exists()).toBeFalsy();
  });

  it('loads the small image when no image is present', () => {
    wrapper = mount(PokemonItemHeader, {
      propsData: {
        smallImage: 'small-image-url',
        name: 'Pikachu',
        topPosition: 0,
      },
      attachTo: document.body,
    });
    expect(wrapper.find('.pokemon-image').exists()).toBeFalsy();
    expect(wrapper.find('.small-pokemon-image').exists()).toBeTruthy();
  });
});
