import { shallowMount } from '@vue/test-utils';
import LogoAndBanner from '@components/home/LogoAndBanner.vue';

jest.mock('@components/ui/BaseHeader.vue', () => ({
  name: 'BaseHeader',
  template: '<div class="mocked-header"></div>',
}));

describe('LogoAndBanner', () => {
  it('renders the header component', () => {
    const wrapper = shallowMount(LogoAndBanner);
    expect(wrapper.find('baseheader-stub').exists()).toBe(true);
  });

  it('renders the component with the given props', () => {
    const subtitle = 'Welcome to the Pokedex';
    const wrapper = shallowMount(LogoAndBanner, {
      propsData: { subtitle },
    });
    expect(wrapper.find('h1').text()).toBe(subtitle);
    expect(wrapper.find('.logo-image').exists()).toBe(true);
    expect(wrapper.find('.banner').exists()).toBe(true);
  });

  it('renders the banner image on larger screens', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query.includes('min-width-second-break'),
    }));
    const wrapper = shallowMount(LogoAndBanner);
    expect(wrapper.find('.banner').exists()).toBe(true);
  });
});
