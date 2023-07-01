import { shallowMount } from '@vue/test-utils';
import PageNotFoundView from '@views/PageNotFoundView.vue';
import BasePage from '@components/ui/BasePage.vue';

describe('PageNotFoundView', () => {
  it('renders the BasePage component with correct title and content', () => {
    const wrapper = shallowMount(PageNotFoundView);

    const basePage = wrapper.findComponent(BasePage);
    expect(basePage.exists()).toBe(true);
    expect(basePage.props('title')).toBe('404 Error');

    const heading = basePage.find('h2');
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('Page Not Found');

    const span = basePage.find('.page-not-found-text');
    expect(span.exists()).toBe(true);
    expect(span.text()).toBe("How did you get here? There's nothing to see!");
  });
});
