import { shallowMount } from '@vue/test-utils';
import CenteredColumn from '@components/ui/CenteredColumn.vue';

describe('CenteredColumn', () => {
  it('renders a div with the correct CSS classes', () => {
    const wrapper = shallowMount(CenteredColumn);
    const div = wrapper.find('div.centered-column');

    expect(div.exists()).toBe(true);
  });

  it('renders the slot content', () => {
    const slotContent = '<span>Example content</span>';
    const wrapper = shallowMount(CenteredColumn, {
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.html()).toContain(slotContent);
  });

  it('has the correct CSS styles', () => {
    const wrapper = shallowMount(CenteredColumn);
    const div = wrapper.find('div.centered-column');

    expect(div.classes()).toContain('centered-column');
  });
});
