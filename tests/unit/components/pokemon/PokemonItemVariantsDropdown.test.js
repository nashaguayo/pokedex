import { mount } from '@vue/test-utils';
import PokemonItemVariantsDropdown from '@/components/pokemon/PokemonItemVariantsDropdown.vue';
import BaseButton from '@/components/ui/BaseButton';

jest.mock('@/components/ui/BaseButton', () => ({
  name: 'BaseButton',
  template: '<button @click="onClickHandler"><slot /></button>',
}));

describe('PokemonItemVariantsDropdown', () => {
  let wrapper;

  beforeEach(() => {
    BaseButton.methods = {
      onClickHandler: jest.fn(),
    };

    const variants = ['Variant 1', 'Variant 2', 'Variant 3'];
    wrapper = mount(PokemonItemVariantsDropdown, {
      propsData: {
        variants,
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
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
