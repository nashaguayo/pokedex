import { mount } from '@vue/test-utils';
import PokemonItemVariantsDropdown from '@/components/pokemon/PokemonItemVariantsDropdown.vue';

jest.mock('@/components/ui/BaseButton.vue', () => ({
  name: 'BaseButton',
  template: '<div class="mocked-base-button"></div>',
}));

describe('PokemonItemVariantsDropdown', () => {
  let wrapper;

  beforeEach(() => {
    const variants = ['Variant 1', 'Variant 2', 'Variant 3'];
    wrapper = mount(PokemonItemVariantsDropdown, {
      propsData: {
        variants,
      },
      stubs: ['BaseButton'],
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders base button correctly', () => {
    expect(wrapper.find('basebutton-stub').exists()).toBeTruthy();
    expect(wrapper.find('basebutton-stub').text()).toBe('Close');
  });

  it('renders the variants correctly', () => {
    const variantElements = wrapper.findAll('h2');
    expect(variantElements).toHaveLength(3);
    expect(variantElements.at(0).text()).toBe('Variant 1');
    expect(variantElements.at(1).text()).toBe('Variant 2');
    expect(variantElements.at(2).text()).toBe('Variant 3');
  });

  it('emits the displayVariant event when a variant is clicked', () => {
    const variantElements = wrapper.findAll('h2');
    variantElements.at(1).trigger('click');
    expect(wrapper.emitted('displayVariant')).toBeTruthy();
    expect(wrapper.emitted('displayVariant')[0][0]).toBe('Variant 2');
  });

  it('emits the close event when the close button is clicked', () => {
    wrapper.vm.close();
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
