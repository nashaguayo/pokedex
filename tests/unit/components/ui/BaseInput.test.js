import { shallowMount } from '@vue/test-utils';
import BaseInput from '@components/ui/BaseInput.vue';

describe('BaseInput', () => {
  let wrapper;

  beforeEach(() => {
    const FontAwesomeIconStub = {
      template: '<div class="font-awesome-icon"></div>',
    };

    wrapper = shallowMount(BaseInput, {
      propsData: {
        label: 'Username',
        icon: 'user',
        name: 'username',
        type: 'text',
      },
      stubs: {
        FontAwesomeIcon: FontAwesomeIconStub,
      },
    });
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders label and input correctly', () => {
    expect(wrapper.find('label').text()).toBe('Username');
    expect(wrapper.find('.font-awesome-icon').exists()).toBe(true);
    expect(wrapper.find('input').attributes('id')).toBe('username');
    expect(wrapper.find('input').attributes('name')).toBe('username');
    expect(wrapper.find('input').attributes('type')).toBe('text');
  });
});
