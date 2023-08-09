import { shallowMount } from '@vue/test-utils';
import OfflineView from '@/views/OfflineView.vue';

jest.mock('@/components/favorites/FavoritesCarousel.vue', () => ({
  name: 'FavoritesCarousel',
  template: '<div class="mocked-favorites-carousel"></div>',
}));

describe('OfflineView', () => {
  it('renders the BasePage component with correct title and content', () => {
    const wrapper = shallowMount(OfflineView, {
      mocks: { $t: (key) => key },
    });

    const basePage = wrapper.find('.offline-view');
    expect(basePage.exists()).toBe(true);

    const heading1 = basePage.find('h2');
    expect(heading1.exists()).toBe(true);
    expect(heading1.text()).toBe('offline.title');

    const heading2 = basePage.find('span');
    expect(heading2.exists()).toBe(true);
    expect(heading2.text()).toBe('offline.description');

    expect(wrapper.find('favoritescarousel-stub').exists()).toBeTruthy();
  });
});
