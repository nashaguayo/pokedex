import { shallowMount } from '@vue/test-utils';
import HomeView from '@views/HomeView.vue';

describe('HomeView', () => {
  it('renders BasePage with LogoAndBanner and RandomPokemon components', () => {
    const wrapper = shallowMount(HomeView);

    const basePage = wrapper.findComponent({ name: 'BasePage' });
    expect(basePage.exists()).toBe(true);

    const logoAndBanner = basePage.findComponent({ name: 'LogoAndBanner' });
    expect(logoAndBanner.exists()).toBe(true);

    const randomPokemon = basePage.findComponent({ name: 'RandomPokemon' });
    expect(randomPokemon.exists()).toBe(true);
  });
});
