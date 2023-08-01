import { shallowMount } from '@vue/test-utils';
import PokemonItemEvolutions from '@/components/pokemon/PokemonItemEvolutions.vue';

jest.mock('@/components/ui/BaseChevron.vue', () => ({
  name: 'BaseChevron',
  template: '<div class="mocked-base-chevron"></div>',
}));

describe('PokemonItemEvolutions', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallowMount(PokemonItemEvolutions, {
      propsData: {
        evolutions: [
          { species: 'pokemon1', image: 'pokemon1.png' },
          { species: 'pokemon2', image: 'pokemon2.png' },
        ],
        pokemonId: 1,
        pokemonName: 'pokemon1',
      },
      stubs: ['router-link'],
      mocks: { $t: (key) => key },
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
    expect(wrapper.find('basechevron-stub').exists()).toBe(true);
  });

  it('correctly displays the first evolution species and image', () => {
    expect(wrapper.find('.evolution span').text()).toBe('pokemon1');
  });

  it('disables the previous evolution button when viewing the first evolution', () => {
    expect(
      wrapper.findAll('basechevron-stub').at(0).attributes().disabled
    ).toBe('true');
    expect(
      wrapper.findAll('basechevron-stub').at(1).attributes().disabled
    ).toBeFalsy();
  });

  it('disables the next evolution button when viewing the last evolution', () => {
    wrapper = shallowMount(PokemonItemEvolutions, {
      propsData: {
        evolutions: [
          { species: 'pokemon1', image: 'pokemon1.png' },
          { species: 'pokemon2', image: 'pokemon2.png' },
        ],
        pokemonId: 2,
        pokemonName: 'pokemon2',
      },
      stubs: ['router-link'],
      mocks: { $t: (key) => key },
    });
    expect(
      wrapper.findAll('basechevron-stub').at(0).attributes().disabled
    ).toBeFalsy();
    expect(
      wrapper.findAll('basechevron-stub').at(1).attributes().disabled
    ).toBe('true');
  });

  it('updates the displayed evolution species and image when clicking next', async () => {
    wrapper.vm.getNextEvolution();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.evolution span').text()).toBe('pokemon2');
  });

  it('enables the previous evolution button when clicking next', async () => {
    wrapper.vm.getNextEvolution();
    await wrapper.vm.$nextTick();
    expect(
      wrapper.findAll('basechevron-stub').at(0).attributes().disabled
    ).toBeFalsy();
    expect(
      wrapper.findAll('basechevron-stub').at(1).attributes().disabled
    ).toBe('true');
  });

  it('enables the next evolution button when clicking previous', async () => {
    wrapper = shallowMount(PokemonItemEvolutions, {
      propsData: {
        evolutions: [
          { species: 'pokemon1', image: 'pokemon1.png' },
          { species: 'pokemon2', image: 'pokemon2.png' },
        ],
        pokemonId: 2,
        pokemonName: 'pokemon2',
      },
      stubs: ['router-link'],
      mocks: { $t: (key) => key },
    });
    wrapper.vm.getPreviousEvolution();
    await wrapper.vm.$nextTick();
    expect(
      wrapper.findAll('basechevron-stub').at(0).attributes().disabled
    ).toBe('true');
    expect(
      wrapper.findAll('basechevron-stub').at(1).attributes().disabled
    ).toBeFalsy();
  });

  it('displays no evolutions message when none are found', () => {
    wrapper = shallowMount(PokemonItemEvolutions, {
      propsData: {
        evolutions: [],
        pokemonId: 2,
        pokemonName: 'pokemon2',
      },
      stubs: ['router-link'],
      mocks: { $t: (key) => key },
    });
    const noEvolutions = wrapper.find('.no-evolutions');
    expect(noEvolutions.exists).toBeTruthy();
    expect(noEvolutions.text()).toBe('pokemon.evolutions.none');
  });
});
