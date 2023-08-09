import { mount } from '@vue/test-utils';
import FavoritesContent from '@/components/favorites/FavoritesContent.vue';

jest.mock('@/store/mutations/pokemon', () => ({
  getAllFavoritePokemons: jest.fn(),
}));

jest.mock('@/components/ui/BaseInput.vue', () => ({
  name: 'BaseInput',
  template: '<div class="mocked-base-input"></div>',
}));

jest.mock('@/store/mutations/variations', () => ({
  pokemonIsVariant: jest.fn(),
}));

describe('FavoritesContent', () => {
  it('renders favorites correctly', () => {
    const wrapper = mount(FavoritesContent, {
      stubs: ['FavoritesContestItem', 'BaseInput'],
      mocks: {
        $t: (key) => key,
      },
    });
    expect(wrapper.find('h1').text()).toBe('favorites.title');
  });
});
