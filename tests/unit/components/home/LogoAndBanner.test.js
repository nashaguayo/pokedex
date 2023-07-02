import { shallowMount } from '@vue/test-utils';
import LogoAndBanner from '@components/home/LogoAndBanner.vue';

jest.mock('@components/ui/BaseHeader.vue', () => ({
  name: 'BaseHeader',
  template: '<div class="mocked-header"></div>',
}));

describe('LogoAndBanner', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(LogoAndBanner);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the header component', () => {
    expect(wrapper.find('baseheader-stub').exists()).toBe(true);
  });

  it('renders the component with the given props', () => {
    const subtitle = 'Welcome to the Pokedex';
    wrapper = shallowMount(LogoAndBanner, {
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
    expect(wrapper.find('.banner').exists()).toBe(true);
  });
});
