import { shallowMount } from '@vue/test-utils';
import GuessPokemon from '@/components/home/GuessPokemon.vue';

jest.mock('@/components/ui/BaseInput', () => ({
  name: 'BaseInput',
  template: '<div class="mock-base-input"></div>',
}));

jest.mock('@/lib/store', () => ({
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

  it('computes the image property correctly', () => {
    expect(wrapper.vm.image).toBe('pikachu.png');
  });

  it('should win the game when the correct Pokémon name is guessed', () => {
    wrapper.vm.setPlayersGuess('pikachu');
    expect(wrapper.vm.gameResultsText).toBe('You won!');
    expect(wrapper.vm.hasWon).toBe(true);
  });

  it('should lose the game when running out of tries', () => {
    wrapper.vm.setPlayersGuess('charmander');
    expect(wrapper.vm.gameResultsText).toBe("That's not it...");
    wrapper.vm.setPlayersGuess('bulbasaur');
    expect(wrapper.vm.gameResultsText).toBe("That's not it...");
    wrapper.vm.setPlayersGuess('squirtle');
    expect(wrapper.vm.gameResultsText).toBe('You Lost!');
    expect(wrapper.vm.hasLost).toBe(true);
  });

  it("should tell you how many tries you've got left", () => {
    expect(wrapper.vm.triesLeftText).toBe('You have 3 tries left');
    wrapper.vm.setPlayersGuess('charmander');
    expect(wrapper.vm.triesLeftText).toBe('You have 2 tries left');
    wrapper.vm.setPlayersGuess('bulbasaur');
    expect(wrapper.vm.triesLeftText).toBe('You have 1 try left');
    wrapper.vm.setPlayersGuess('squirtle');
    expect(wrapper.vm.triesLeftText).toBe('Pokemon was pikachu');
  });

  it('should change button text when winning', async () => {
    expect(wrapper.vm.baseButtonText).toBe('I Give Up!');
    wrapper.vm.setPlayersGuess('pikachu');
    expect(wrapper.vm.baseButtonText).toBe('New Pokemon!');
  });

  it('should change button text when losing', async () => {
    expect(wrapper.vm.baseButtonText).toBe('I Give Up!');
    wrapper.vm.setPlayersGuess('charmander');
    wrapper.vm.setPlayersGuess('bulbasaur');
    wrapper.vm.setPlayersGuess('squirtle');
    expect(wrapper.vm.baseButtonText).toBe('New Pokemon!');
  });
});
