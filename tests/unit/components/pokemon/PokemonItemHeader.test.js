import { mount } from '@vue/test-utils';
import PokemonItemHeader from '@/components/pokemon/PokemonItemHeader.vue';

describe('PokemonItemHeader', () => {
  let wrapper;
  let image;

  beforeEach(() => {
    wrapper = mount(PokemonItemHeader, {
      propsData: {
        image: 'image-url',
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
});
