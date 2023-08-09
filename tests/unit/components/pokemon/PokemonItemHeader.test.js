import { mount } from '@vue/test-utils';
import PokemonItemHeader from '@/components/pokemon/PokemonItemHeader.vue';

jest.mock('@/store/mutations/pokemon', () => ({
  isPokemonFavorited: jest.fn(),
  removePokemonFromFavorites: jest.fn(),
  savePokemonAsFavorite: jest.fn(),
}));

describe('PokemonItemHeader', () => {
  let wrapper;
  let header;

  beforeEach(() => {
    wrapper = mount(PokemonItemHeader, {
      propsData: {
        image: 'image-url',
        smallImage: 'small-image-url',
        name: 'Pikachu',
        topPosition: 0,
        habitat: 'rare',
      },
      attachTo: document.body,
      stubs: ['FontAwesomeIcon'],
    });

    header = wrapper.find('.pokemon-item-header');
    Object.defineProperty(header.element, 'offsetWidth', { value: 200 });
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
    wrapper.find('.pokemon-image').trigger('load');
    expect(wrapper.vm.locationHeight).toBe(200);
  });

  it('sets the location height and width when the component is mounted', () => {
    wrapper.vm.setLocationHeight();
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
    expect(wrapper.vm.locationHeight).toBe(200);
    expect(wrapper.vm.locationWidth).toBe(200);
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
        habitat: 'rare',
      },
      attachTo: document.body,
      stubs: ['FontAwesomeIcon'],
    });
    expect(wrapper.find('.pokemon-image').exists()).toBeFalsy();
    expect(wrapper.find('.small-pokemon-image').exists()).toBeTruthy();
  });
});
