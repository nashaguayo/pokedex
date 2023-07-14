import { shallowMount } from '@vue/test-utils';
import PageNotFoundView from '@/views/PageNotFoundView.vue';
import CenteredColumn from '@/components/ui/CenteredColumn.vue';

describe('PageNotFoundView', () => {
  it('renders the BasePage component with correct title and content', () => {
    const wrapper = shallowMount(PageNotFoundView);

    const basePage = wrapper.findComponent(CenteredColumn);
    expect(basePage.exists()).toBe(true);

    const heading1 = basePage.find('h1');
    expect(heading1.exists()).toBe(true);
    expect(heading1.text()).toBe('404 Error');

    const heading2 = basePage.find('h2');
    expect(heading2.exists()).toBe(true);
    expect(heading2.text()).toBe('Page Not Found');

    const span = basePage.find('.page-not-found-text');
    expect(span.exists()).toBe(true);
    expect(span.text()).toBe("How did you get here? There's nothing to see!");
  });
});
