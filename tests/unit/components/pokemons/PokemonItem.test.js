import { mount } from '@vue/test-utils';
import PokemonItem from '@components/pokemons/PokemonItem.vue';

jest.mock('@api/pokemon', () => ({
  getPokemon: jest.fn().mockResolvedValue({
    name: 'Pikachu',
    sprites: {
      other: {
        dream_world: {
          front_default: 'image-url',
        },
      },
    },
    stats: [
      { stat: { name: 'stat1' }, base_stat: 10 },
      { stat: { name: 'stat2' }, base_stat: 20 },
    ],
    types: ['electric'],
  }),
}));

describe('PokemonItem', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(PokemonItem, {
      mocks: {
        $route: {
          params: { id: 'pikachu' },
        },
        $router: {
          back: jest.fn(),
        },
      },
      stubs: {
        PokemonItemType: true,
        PokemonItemStat: true,
        PokemonItemHeader: true,
        BaseButton: true,
      },
    });

    await wrapper.vm.$nextTick();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders all respective components', () => {
    expect(wrapper.findComponent({ name: 'PokemonItemType' }).exists()).toBe(
      true
    );
    expect(wrapper.findComponent({ name: 'PokemonItemStat' }).exists()).toBe(
      true
    );
    expect(wrapper.findComponent({ name: 'PokemonItemHeader' }).exists()).toBe(
      true
    );
    expect(wrapper.findComponent({ name: 'BaseButton' }).exists()).toBe(true);
  });

  it('calls getPokemon method and sets data properties correctly in created()', () => {
    expect(wrapper.vm.pokemon).toEqual({
      name: 'Pikachu',
      sprites: {
        other: {
          dream_world: {
            front_default: 'image-url',
          },
        },
      },
      stats: [
        { stat: { name: 'stat1' }, base_stat: 10 },
        { stat: { name: 'stat2' }, base_stat: 20 },
      ],
      types: ['electric'],
    });

    expect(wrapper.vm.pokemonStats).toEqual([
      { name: 'stat1', value: 10 },
      { name: 'stat2', value: 20 },
    ]);

    expect(wrapper.vm.pokemonImage).toBe('image-url');

    expect(wrapper.vm.pokemonTypes).toEqual(['electric']);
  });

  it('sets the capitalized pokemon name and updates document title in getCapitalizedPokemonName()', () => {
    expect(wrapper.vm.pokemonName).toBe('Pikachu');
    expect(document.title).toBe('Pokedex - Pikachu');
  });
});
