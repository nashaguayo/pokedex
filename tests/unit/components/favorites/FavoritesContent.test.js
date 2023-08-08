import { mount } from '@vue/test-utils';
import FavoritesContent from '@/components/favorites/FavoritesContent.vue';

jest.mock('@/store/mutations/pokemon', () => ({
  getAllFavoritePokemons: jest.fn(),
}));

describe('FavoritesContent', () => {
  it('renders favorites correctly', () => {
    const wrapper = mount(FavoritesContent, {
      stubs: ['FavoritesContestItem'],
    });
    expect(wrapper.find('h1').text()).toBe('Favorites');
  });
});
