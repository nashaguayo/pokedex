import { shallowMount } from '@vue/test-utils';
import BasePage from '@components/ui/BasePage.vue';

describe('BasePage', () => {
  it('renders the default title when no title prop is provided', () => {
    const wrapper = shallowMount(BasePage);
    expect(wrapper.find('h1').text()).toBe('Pokemon');
  });

  it('renders the provided title when title prop is provided', () => {
    const title = 'Custom Title';
    const wrapper = shallowMount(BasePage, {
      propsData: {
        title,
      },
    });
    expect(wrapper.find('h1').text()).toBe(title);
  });

  it('renders the header slot content', () => {
    const slotContent = '<div class="custom-header">Header Content</div>';
    const wrapper = shallowMount(BasePage, {
      slots: {
        header: slotContent,
      },
    });
    expect(wrapper.find('.custom-header').exists()).toBe(true);
    expect(wrapper.find('.custom-header').text()).toBe('Header Content');
  });

  it('renders the content slot content', () => {
    const slotContent = '<div class="custom-content">Content</div>';
    const wrapper = shallowMount(BasePage, {
      slots: {
        content: slotContent,
      },
    });
    expect(wrapper.find('.custom-content').exists()).toBe(true);
    expect(wrapper.find('.custom-content').text()).toBe('Content');
  });

  it('renders the footer slot content', () => {
    const slotContent = '<div class="custom-footer">Footer Content</div>';
    const wrapper = shallowMount(BasePage, {
      slots: {
        footer: slotContent,
      },
    });
    expect(wrapper.find('.custom-footer').exists()).toBe(true);
    expect(wrapper.find('.custom-footer').text()).toBe('Footer Content');
  });
});
