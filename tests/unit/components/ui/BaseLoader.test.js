import { mount } from '@vue/test-utils';
import BaseLoader from '@/components/ui/BaseLoader.vue';

jest.mock('@/store/state/other', () => ({
  state: {
    isDarkModeEnabled: false,
  },
}));

describe('BaseLoader', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(BaseLoader, {
      propsData: {
        loading: false,
      },
      slots: {
        default: '<div>Slot content</div>',
      },
      stubs: ['FontAwesomeIcon'],
    });
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders the slot content when loading is false', () => {
    expect(wrapper.text()).toContain('Slot content');
    expect(wrapper.find('.spinner-icon').exists()).toBe(false);
  });

  it('renders the spinner icon when loading is true', async () => {
    await wrapper.setProps({ loading: true });
    expect(wrapper.find('.spinner-icon').exists()).toBe(true);
    expect(wrapper.find('.spinner-icon').classes()).toContain('fa-spin-pulse');
    expect(wrapper.find('.spinner-icon').attributes('size')).toBe('6x');
  });
});
