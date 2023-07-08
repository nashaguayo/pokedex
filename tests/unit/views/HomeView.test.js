import { shallowMount } from '@vue/test-utils';
import HomeView from '@views/HomeView.vue';

jest.mock('@components/ui/CenteredColumn.vue', () => ({
  name: 'CenteredColumn',
  template: '<div class="mocked-centered-column"></div>',
}));

jest.mock('@components/home/LogoAndBanner.vue', () => ({
  name: 'LogoAndBanner',
  template: '<div class="mocked-logo-and-banner"></div>',
}));

jest.mock('@components/home/RandomPokemon.vue', () => ({
  name: 'RandomPokemon',
  template: '<div class="mocked-random-pokemon"></div>',
}));

describe('HomeView', () => {
  it('renders all components components', () => {
    const wrapper = shallowMount(HomeView);
    expect(wrapper.find('centeredcolumn-stub').exists()).toBe(true);
    expect(wrapper.find('logoandbanner-stub').exists()).toBe(true);
    expect(wrapper.find('randompokemon-stub').exists()).toBe(true);
  });
});
