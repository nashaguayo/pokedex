import { shallowMount } from '@vue/test-utils';
import GeneralNavigation from '@components/header/GeneralNavigation.vue';

jest.mock('@lib/localStorage', () => ({
  toggleDarkMode: jest.fn(),
  isDarkModeEnabled: jest.fn().mockImplementation(() => false),
}));

describe('GeneralNavigation', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(GeneralNavigation, {
      stubs: ['router-link', 'FontAwesomeIcon'],
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('should initialize with isDarkModeEnabled set to false', () => {
    expect(wrapper.vm.isDarkModeEnabled).toBe(false);
  });

  it('should toggle isDarkModeEnabled when toggleTheme method is called', () => {
    wrapper.vm.toggleTheme();
    expect(wrapper.vm.isDarkModeEnabled).toBe(true);

    wrapper.vm.toggleTheme();
    expect(wrapper.vm.isDarkModeEnabled).toBe(false);
  });

  it('should update data-theme attribute when isDarkModeEnabled changes', async () => {
    const lightTheme = 'light';
    const darkTheme = 'dark';

    expect(document.documentElement.getAttribute('data-theme')).toBe(
      lightTheme
    );

    wrapper.vm.toggleTheme();
    await wrapper.vm.$nextTick();
    expect(document.documentElement.getAttribute('data-theme')).toBe(darkTheme);

    wrapper.vm.toggleTheme();
    await wrapper.vm.$nextTick();
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      lightTheme
    );
  });
});
