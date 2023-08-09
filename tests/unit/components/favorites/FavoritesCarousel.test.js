import { mount } from '@vue/test-utils';
import FavoritesCarousel from '@/components/favorites/FavoritesCarousel.vue';

jest.mock('@/store/mutations/pokemon', () => ({
  getAllFavoritePokemons: jest
    .fn()
    .mockReturnValue([{ name: 'pikachu', id: 0, image: 'pikachu.url' }]),
}));

describe('FavoritesCarousel', () => {
  let wrapper;
  let goToPageMock;
  let goToMyFavoritesMock;

  beforeEach(() => {
    goToPageMock = jest.fn();
    goToMyFavoritesMock = jest.fn();

    wrapper = mount(FavoritesCarousel, {
      mocks: {
        $router: {
          push: goToPageMock,
        },
      },
    });

    wrapper.vm.$refs.favorites = {
      offsetWidth: 500,
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('should navigate to a Pokemon page when goToPage method is called', async () => {
    await wrapper.vm.goToPage('pikachu');
    expect(goToPageMock).toHaveBeenCalledWith({
      name: 'pokemon',
      params: { id: 'pikachu' },
    });
  });
});
