import { shallowMount } from '@vue/test-utils';
import PokemonItemEvolutions from '@components/pokemons/PokemonItemEvolutions.vue';
import { getPokemonEvolutions } from '@api/evolutions.js';

jest.mock('@components/ui/BaseChevron.vue', () => ({
  name: 'BaseChevron',
  template: '<div class="mocked-base-chevron"></div>',
}));

jest.mock('@components/ui/CenteredColumn.vue', () => ({
  name: 'CenteredColumn',
  template: '<div class="mocked-centered-column"></div>',
}));

jest.mock('@api/evolutions.js', () => ({
  getPokemonEvolutions: jest.fn(() =>
    Promise.resolve([
      { species: 1, image: 'image-1.png' },
      { species: 2, image: 'image-2.png' },
    ])
  ),
}));

describe('PokemonItemEvolutions', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallowMount(PokemonItemEvolutions, {
      propsData: {
        pokemonId: 1,
        pokemonName: 'pokemonId1',
      },
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

  it('fetches and sets the evolutions data', () => {
    expect(getPokemonEvolutions).toHaveBeenCalledWith(1);
    expect(wrapper.vm.evolutions).toEqual([
      { species: 1, image: 'image-1.png' },
      { species: 2, image: 'image-2.png' },
    ]);
  });
});
