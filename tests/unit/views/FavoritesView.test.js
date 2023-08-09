import { shallowMount } from '@vue/test-utils';
import FavoritesView from '@/views/FavoritesView.vue';

jest.mock('@/components/favorites/FavoritesContent.vue', () => ({
  name: 'FavoritesContent',
  template: '<div class="mocked-favorites-content"></div>',
}));

describe('FavoritesView', () => {
  it('renders the BasePage component with correct title and content', () => {
    const wrapper = shallowMount(FavoritesView);

    const basePage = wrapper.find('.favorites-view');
    expect(basePage.exists()).toBe(true);

    expect(wrapper.find('favoritescontent-stub').exists()).toBeTruthy();
  });
});
