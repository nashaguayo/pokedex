import { shallowMount } from '@vue/test-utils';
import BasePage from '@components/ui/BasePage.vue';

jest.mock('@components/ui/BaseHeader.vue', () => ({
  name: 'BaseHeader',
  template: '<div class="mocked-header"></div>',
}));

jest.mock('@components/ui/ScrollToTop.vue', () => ({
  name: 'ScrollToTop',
  template: '<div class="mocked-scroll-to-top"></div>',
}));

jest.mock('@components/ui/BaseFooter.vue', () => ({
  name: 'BaseFooter',
  template: '<div class="mocked-footer"></div>',
}));

describe('BasePage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BasePage);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the default title when no title prop is provided', () => {
    expect(wrapper.find('h1').text()).toBe('Pokemon');
  });

  it('renders the BaseHeader component in the header slot', () => {
    expect(wrapper.find('baseheader-stub').exists()).toBe(true);
  });

  it('renders the ScrollToTop component', () => {
    expect(wrapper.find('scrolltotop-stub').exists()).toBe(true);
  });

  it('renders the BaseFooter component in the footer slot', () => {
    expect(wrapper.find('basefooter-stub').exists()).toBe(true);
  });

  it('renders the provided title when title prop is provided', () => {
    const title = 'Custom Title';
    wrapper = shallowMount(BasePage, {
      propsData: {
        title,
      },
    });
    expect(wrapper.find('h1').text()).toBe(title);
  });

  it('renders the header slot content', () => {
    const slotContent = '<div class="custom-header">Header Content</div>';
    wrapper = shallowMount(BasePage, {
      slots: {
        header: slotContent,
      },
    });
    expect(wrapper.find('.custom-header').exists()).toBe(true);
    expect(wrapper.find('.custom-header').text()).toBe('Header Content');
  });

  it('renders the content slot content', () => {
    const slotContent = '<div class="custom-content">Content</div>';
    wrapper = shallowMount(BasePage, {
      slots: {
        content: slotContent,
      },
    });
    expect(wrapper.find('.custom-content').exists()).toBe(true);
    expect(wrapper.find('.custom-content').text()).toBe('Content');
  });

  it('renders the footer slot content', () => {
    const slotContent = '<div class="custom-footer">Footer Content</div>';
    wrapper = shallowMount(BasePage, {
      slots: {
        footer: slotContent,
      },
    });
    expect(wrapper.find('.custom-footer').exists()).toBe(true);
    expect(wrapper.find('.custom-footer').text()).toBe('Footer Content');
  });
});
