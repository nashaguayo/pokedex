import { shallowMount } from '@vue/test-utils';
import CenteredColumn from '@components/ui/CenteredColumn.vue';

describe('CenteredColumn', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CenteredColumn);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders a div with the correct CSS classes', () => {
    const div = wrapper.find('div.centered-column');

    expect(div.exists()).toBe(true);
  });

  it('renders the slot content', () => {
    const slotContent = '<span>Example content</span>';
    wrapper = shallowMount(CenteredColumn, {
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.html()).toContain(slotContent);
  });

  it('has the correct CSS styles', () => {
    const div = wrapper.find('div.centered-column');

    expect(div.classes()).toContain('centered-column');
  });
});
