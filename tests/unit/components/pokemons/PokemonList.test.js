import { shallowMount } from '@vue/test-utils';
import PokemonList from '@components/pokemons/PokemonList.vue';

const MOCK_POKEMONS = [
  { name: 'pikachu', name: 'bulbasaur', name: 'charmander' },
];

jest.mock('@lib/pokemon', () => ({
  getPokemons: jest.fn().mockImplementation(() => {
    return {
      results: MOCK_POKEMONS,
    };
  }),
}));

jest.mock('@components/pokemons/PokemonListCard.vue', () => ({
  name: 'PokemonListCard',
  template: '<div class="mocked-pokemon-list-card"></div>',
}));

describe('PokemonList', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallowMount(PokemonList);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('fetches and renders the list of pokemons', () => {
    expect(wrapper.vm.pokemons).toEqual(MOCK_POKEMONS);
  });
});
