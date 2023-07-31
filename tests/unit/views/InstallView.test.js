import { shallowMount } from '@vue/test-utils';
import InstallView from '@/views/InstallView.vue';

jest.mock('@/lib/store', () => ({
  state: {
    store: {
      isDarkmodeEnabled: false,
    },
  },
}));

jest.mock('@/components/ui/BaseButton.vue', () => ({
  name: 'BaseButton',
  template: '<div class="mocked-base-button"></div>',
}));

describe('InstallView', () => {
  it('renders the InstallView component with correct title and content', () => {
    const wrapper = shallowMount(InstallView, {
      mocks: { $t: (key) => key },
    });

    const basePage = wrapper.find('.install-view');
    expect(basePage.exists()).toBe(true);

    const heading1 = basePage.find('h1');
    expect(heading1.exists()).toBe(true);
    expect(heading1.text()).toBe('install.title');

    const heading2 = basePage.find('span');
    expect(heading2.exists()).toBe(true);
    expect(heading2.text()).toBe('install.description');

    expect(wrapper.find('basebutton-stub').exists()).toBeTruthy();

    const span = basePage.find('img');
    expect(span.exists()).toBe(true);
  });
});
