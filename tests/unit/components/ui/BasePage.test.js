import { shallowMount } from '@vue/test-utils';
import BasePage from '@components/ui/BasePage.vue';

describe('BasePage', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(BasePage);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the CenteredColumn component', () => {
    const wrapper = shallowMount(BasePage);
    expect(wrapper.findComponent({ name: 'CenteredColumn' }).exists()).toBe(
      true
    );
  });

  it('renders the header slot content', () => {
    const headerContent = '<h1>Header Slot Content</h1>';
    const wrapper = shallowMount(BasePage, {
      slots: {
        header: headerContent,
      },
    });
    expect(wrapper.find('.header').html()).toContain(headerContent);
  });

  it('renders the content slot content', () => {
    const contentContent = '<p>Content Slot Content</p>';
    const wrapper = shallowMount(BasePage, {
      slots: {
        content: contentContent,
      },
    });
    expect(wrapper.find('.content').html()).toContain(contentContent);
  });

  it('renders the footer slot content', () => {
    const footerContent = '<p>Footer Slot Content</p>';
    const wrapper = shallowMount(BasePage, {
      slots: {
        footer: footerContent,
      },
    });
    expect(wrapper.find('.footer').html()).toContain(footerContent);
  });
});
