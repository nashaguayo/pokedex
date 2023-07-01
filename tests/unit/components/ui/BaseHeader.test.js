import { shallowMount } from '@vue/test-utils';
import BaseHeader from '@components/ui/BaseHeader.vue';

describe('BaseHeader', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BaseHeader);
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
