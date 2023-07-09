import { shallowMount } from '@vue/test-utils';
import GuessPokemon from '@components/home/GuessPokemon.vue';

jest.mock('@components/ui/BaseInput', () => ({
  name: 'BaseInput',
  template: '<div class="mock-base-input"></div>',
}));

jest.mock('@lib/store', () => ({
  state: { game: { name: 'pikachu', image: 'pikachu.png' } },
  getNewMysteryPokemon: jest.fn(),
}));

describe('GuessPokemon', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(GuessPokemon);
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.game-results').text()).toBe('Guess the Pokemon!');
    expect(wrapper.find('baseinput-stub').exists()).toBe(true);
  });

  it('updates playersGuess when setPlayersGuess is called', () => {
    const playersGuess = 'Pikachu';
    wrapper.vm.setPlayersGuess(playersGuess);
    expect(wrapper.vm.playersGuess).toBe(playersGuess);
  });
});
