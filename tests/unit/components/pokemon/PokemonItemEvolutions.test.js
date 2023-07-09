import { shallowMount } from '@vue/test-utils';
import PokemonItemEvolutions from '@components/pokemon/PokemonItemEvolutions.vue';

jest.mock('@components/ui/BaseChevron.vue', () => ({
  name: 'BaseChevron',
  template: '<div class="mocked-base-chevron"></div>',
}));

jest.mock('@components/ui/CenteredColumn.vue', () => ({
  name: 'CenteredColumn',
  template: '<div class="mocked-centered-column"></div>',
}));

describe('PokemonItemEvolutions', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallowMount(PokemonItemEvolutions, {
      propsData: {
        evolutions: [
          { name: 'pokemon1', image: 'pokemon1.png' },
          { name: 'pokemon2', image: 'pokemon2.png' },
        ],
        pokemonId: 1,
        pokemonName: 'pokemonId1',
      },
      stubs: ['router-link'],
    });

    await wrapper.vm.$nextTick();
  });

  afterEach(() => {
    wrapper.destroy();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders stub components', () => {
    expect(wrapper.find('centeredcolumn-stub').exists()).toBe(true);
    expect(wrapper.find('basechevron-stub').exists()).toBe(true);
  });
});
