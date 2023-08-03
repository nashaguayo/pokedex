import { shallowMount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';

jest.mock('@/components/home/LogoAndBanner.vue', () => ({
  name: 'LogoAndBanner',
  template: '<div class="mocked-logo-and-banner"></div>',
}));

jest.mock('@/components/home/GuessPokemon.vue', () => ({
  name: 'GuessPokemon',
  template: '<div class="mocked-guess-pokemon"></div>',
}));

jest.mock('@/components/home/RandomPokemon.vue', () => ({
  name: 'RandomPokemon',
  template: '<div class="mocked-random-pokemon"></div>',
}));

jest.mock('@/lib/store', () => ({
  state: {
    storeHasLoaded: true,
  },
  initializeStore: jest.fn().mockResolvedValue(),
}));

describe('HomeView', () => {
  it('renders all components components', () => {
    const wrapper = shallowMount(HomeView, { mocks: { $t: (key) => key } });
    expect(wrapper.find('logoandbanner-stub').exists()).toBe(true);
    expect(wrapper.find('guesspokemon-stub').exists()).toBe(true);
    expect(wrapper.find('randompokemon-stub').exists()).toBe(true);
  });
});
