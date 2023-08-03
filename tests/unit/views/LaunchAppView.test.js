import { shallowMount } from '@vue/test-utils';
import LaunchAppView from '@/views/LaunchAppView.vue';

jest.mock('@/lib/localStorage', () => ({
  removeIsInstalled: jest.fn(),
}));

jest.mock('@/lib/helpers', () => ({
  isInstalled: jest.fn().mockResolvedValue(true),
}));

jest.mock('@/components/ui/BaseButton.vue', () => ({
  name: 'BaseButton',
  template: '<div class="mocked-base-button"></div>',
}));

jest.mock('@/components/ui/BaseLoader.vue', () => ({
  name: 'BaseLoader',
  template: '<div class="mocked-base-loader"></div>',
}));

describe('LaunchAppView', () => {
  it('renders the BasePage component with correct title and content', () => {
    const env = process.env;
    jest.resetModules();
    process.env = { ...env };

    const wrapper = shallowMount(LaunchAppView, {
      mocks: { $t: (key) => key },
    });

    const basePage = wrapper.find('.launch-app-view');
    expect(basePage.exists()).toBe(true);

    const heading1 = basePage.find('h2');
    expect(heading1.exists()).toBe(true);
    expect(heading1.text()).toBe('launchApp.title');

    expect(wrapper.find('basebutton-stub').exists()).toBeTruthy();
    expect(wrapper.find('basebutton-stub').text()).toBe('launchApp.button');
  });
});
