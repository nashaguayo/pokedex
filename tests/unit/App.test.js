import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import store from '@/lib/store';

jest.mock('@/components/ui/BaseHeader.vue', () => ({
  name: 'BaseHeader',
  template: '<div class="mocked-base-header"></div>',
}));

jest.mock('@/components/ui/BaseFooter.vue', () => ({
  name: 'BaseFooter',
  template: '<div class="mocked-base-footer"></div>',
}));

jest.mock('@/lib/store', () => ({
  state: {
    isDarkModeEnabled: false,
  },
  getAllPokemons: jest.fn().mockResolvedValue(),
  getAllTypes: jest.fn().mockResolvedValue(),
  getAllCharacteristicsDescriptions: jest.fn().mockResolvedValue(),
}));

describe('App', () => {
  let wrapper;
  const $route = {
    fullPath: '/some-route',
    meta: {
      header: true,
      footer: true,
    },
  };

  beforeEach(() => {
    wrapper = shallowMount(App, {
      mocks: {
        $route,
      },
      stubs: ['router-view'],
    });
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('should call store methods on created hook', async () => {
    const getAllPokemonsSpy = jest.spyOn(store, 'getAllPokemons');
    const getAllTypesSpy = jest.spyOn(store, 'getAllTypes');
    const getAllCharacteristicsDescriptionsSpy = jest.spyOn(
      store,
      'getAllCharacteristicsDescriptions'
    );
    wrapper = shallowMount(App, {
      store,
      mocks: {
        $route,
      },
      stubs: ['router-view'],
    });
    expect(getAllPokemonsSpy).toHaveBeenCalled();
    expect(getAllTypesSpy).toHaveBeenCalled();
    expect(getAllCharacteristicsDescriptionsSpy).toHaveBeenCalled();
  });

  it('should set the theme based on isDarkModeEnabled', async () => {
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    await wrapper.vm.setTheme(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should compute displayHeader and displayFooter correctly', () => {
    expect(wrapper.vm.displayHeader).toBe(true);
    expect(wrapper.vm.displayFooter).toBe(true);
    wrapper.vm.$route.meta.header = false;
    wrapper.vm.$route.meta.footer = false;
    expect(wrapper.vm.displayHeader).toBe(false);
    expect(wrapper.vm.displayFooter).toBe(false);
  });
});
