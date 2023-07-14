import { shallowMount } from '@vue/test-utils';
import GeneralNavigation from '@/components/header/GeneralNavigation.vue';
import store from '@/lib/store';

jest.mock('@/lib/store', () => ({
  state: { isDarkModeEnabled: true },
  toggleDarkMode: jest.fn(),
}));

describe('GeneralNavigation', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(GeneralNavigation, {
      stubs: ['router-link', 'FontAwesomeIcon'],
    });
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('calls the toggleDarkMode method from the store when toggleTheme is called', () => {
    wrapper.vm.toggleTheme();
    expect(store.toggleDarkMode).toHaveBeenCalled();
  });
});
