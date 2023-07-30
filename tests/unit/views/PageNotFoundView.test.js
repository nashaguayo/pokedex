import { shallowMount } from '@vue/test-utils';
import PageNotFoundView from '@/views/PageNotFoundView.vue';

jest.mock('@/lib/store', () => ({
  state: {
    store: {
      isDarkmodeEnabled: false,
    },
  },
}));

describe('PageNotFoundView', () => {
  it('renders the BasePage component with correct title and content', () => {
    const wrapper = shallowMount(PageNotFoundView, {
      mocks: { $t: (key) => key },
    });

    const basePage = wrapper.find('.page-not-found-view');
    expect(basePage.exists()).toBe(true);

    const heading1 = basePage.find('h1');
    expect(heading1.exists()).toBe(true);
    expect(heading1.text()).toBe('error.title');

    const heading2 = basePage.find('h2');
    expect(heading2.exists()).toBe(true);
    expect(heading2.text()).toBe('error.subtitle');

    const span = basePage.find('.page-not-found-text');
    expect(span.exists()).toBe(true);
    expect(span.text()).toBe('error.description');

    const img = basePage.find('img');
    expect(img.exists()).toBe(true);
  });
});
