import { shallowMount } from '@vue/test-utils';
import LaunchAppView from '@/views/LaunchAppView.vue';

describe('LaunchAppView', () => {
  it('renders the BasePage component with correct title and content', () => {
    const wrapper = shallowMount(LaunchAppView, {
      mocks: { $t: (key) => key },
      stubs: ['BaseButton'],
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
