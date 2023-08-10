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

jest.mock('@/components/ui/BaseLoader.vue', () => ({
  name: 'BaseLoader',
  template: '<div class="mocked-base-loader"></div>',
}));

jest.mock('@/store/state/other', () => ({
  state: {
    storeHasLoaded: true,
  },
}));

jest.mock('@/store/mutations/other', () => ({
  initializeStore: jest.fn(),
}));

describe('HomeView', () => {
  it('renders all components components', () => {
    const wrapper = shallowMount(HomeView, { mocks: { $t: (key) => key } });
    expect(wrapper.find('logoandbanner-stub').exists()).toBe(true);
    expect(wrapper.find('guesspokemon-stub').exists()).toBe(true);
    expect(wrapper.find('randompokemon-stub').exists()).toBe(true);
    expect(wrapper.find('baseloader-stub').exists()).toBe(true);
  });
});
