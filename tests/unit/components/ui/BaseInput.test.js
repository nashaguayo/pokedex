import { shallowMount } from '@vue/test-utils';
import BaseInput from '@/components/ui/BaseInput.vue';

jest.mock('@/store/state/other', () => ({
  state: {
    isDarkModeEnabled: false,
  },
}));

describe('BaseInput', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BaseInput, {
      propsData: {
        type: 'text',
        name: 'inputField',
        placeholder: 'Type here',
        model: '',
        icon: 'fa-search',
        label: 'label',
      },
      stubs: ['FontAwesomeIcon'],
    });
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders the input field with the provided props', () => {
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.props('type')).toBe('text');
    expect(wrapper.props('name')).toBe('inputField');
    expect(wrapper.props('placeholder')).toBe('Type here');
    expect(wrapper.props('model')).toBe('');
    expect(wrapper.props('icon')).toBe('fa-search');
    expect(wrapper.props('label')).toBe('label');
  });

  it('emits inputValueChanged event when the input value changes', () => {
    const inputValue = 'Hello, World!';
    wrapper.find('input').setValue(inputValue);
    expect(wrapper.emitted('inputValueChanged')).toBeTruthy();
    expect(wrapper.emitted('inputValueChanged')[0][0]).toBe(inputValue);
  });
});
