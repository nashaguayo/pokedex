import { shallowMount } from '@vue/test-utils';
import GuessPokemon from '@/components/home/GuessPokemon.vue';

jest.mock('@/components/ui/BaseInput', () => ({
  name: 'BaseInput',
  template: '<div class="mock-base-input"></div>',
}));

jest.mock('@/lib/store', () => ({
  state: {
    storeHasLoaded: true,
    game: { name: 'pikachu', image: 'pikachu.png' },
  },
  getNewMysteryPokemon: jest.fn(),
  setNewMysteryPokemon: jest.fn(),
}));

jest.mock('@/lib/localStorage', () => ({
  getGuessesInARow: jest.fn(),
  getMysteryPokemon: jest.fn(),
  getTriesLeft: jest.fn(),
  setGuessesInARow: jest.fn(),
  setMysteryPokemon: jest.fn(),
  setTriesLeft: jest.fn(),
}));

describe('GuessPokemon', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(GuessPokemon, { stubs: ['FontAwesomeIcon'] });
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

  it("should send player's guess when clicking send button", () => {
    const spy = jest.spyOn(document.body, 'dispatchEvent');
    wrapper = shallowMount(GuessPokemon, {
      stubs: ['FontAwesomeIcon'],
      propsData: { playersGuess: 'pikachu' },
    });
    wrapper.vm.sendPlayersGuess();
    expect(spy).toHaveBeenCalled();
  });

  it('computes the image property correctly', () => {
    expect(wrapper.vm.image).toBe('pikachu.png');
  });

  it('should win the game when the correct Pokémon name is guessed and get a new pokemon', async () => {
    const spy = jest.spyOn(wrapper.vm, 'getNewMysteryPokemon');
    wrapper.vm.setPlayersGuess('pikachu');
    expect(wrapper.vm.gameResultsText).toBe('You won!');
    expect(wrapper.vm.hasWon).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 6000));
    expect(spy).toHaveBeenCalled();
  }, 7000);

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
    expect(wrapper.vm.triesLeftText).toBe(
      'You have <strong>3 TRIES</strong> left'
    );
    wrapper.vm.setPlayersGuess('charmander');
    expect(wrapper.vm.triesLeftText).toBe(
      'You have <strong>2 TRIES</strong> left'
    );
    wrapper.vm.setPlayersGuess('bulbasaur');
    expect(wrapper.vm.triesLeftText).toBe(
      'You have <strong>1 TRY</strong> left'
    );
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

  it('should update timer count when winning', async () => {
    wrapper.vm.setPlayersGuess('pikachu');
    expect(wrapper.vm.triesLeftText).toBe('Getting new Pokemon in 5...');
    await new Promise((resolve) => setTimeout(resolve, 1001));
    expect(wrapper.vm.triesLeftText).toBe('Getting new Pokemon in 4...');
    await new Promise((resolve) => setTimeout(resolve, 1001));
    expect(wrapper.vm.triesLeftText).toBe('Getting new Pokemon in 3...');
    await new Promise((resolve) => setTimeout(resolve, 1001));
    expect(wrapper.vm.triesLeftText).toBe('Getting new Pokemon in 2...');
    await new Promise((resolve) => setTimeout(resolve, 1001));
    expect(wrapper.vm.triesLeftText).toBe('Getting new Pokemon in 1...');
    await new Promise((resolve) => setTimeout(resolve, 1001));
    wrapper.vm.setPlayersGuess('');
    expect(wrapper.vm.triesLeftText).toBe(
      'You have <strong>3 TRIES</strong> left'
    );
  }, 6000);

  it('should have the correct amount of stars when less than 5 guesses in a row', async () => {
    wrapper.vm.guessesInARow = 4;
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.bronzeStars).toBe(4);
    expect(wrapper.vm.silverStars).toBe(0);
    expect(wrapper.vm.goldStars).toBe(0);
  });

  it('should have the correct amount of stars when less than 25 guesses in a row', async () => {
    wrapper.vm.guessesInARow = 24;
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.bronzeStars).toBe(4);
    expect(wrapper.vm.silverStars).toBe(4);
    expect(wrapper.vm.goldStars).toBe(0);
  });

  it('should have the correct amount of stars when more than 25 guesses in a row', async () => {
    wrapper.vm.guessesInARow = 124;
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.bronzeStars).toBe(4);
    expect(wrapper.vm.silverStars).toBe(4);
    expect(wrapper.vm.goldStars).toBe(4);
  });

  it('should reset everything after losing', async () => {
    wrapper.vm.setPlayersGuess('charmander');
    wrapper.vm.setPlayersGuess('bulbasaur');
    wrapper.vm.setPlayersGuess('squirtle');
    wrapper.vm.getNewMysteryPokemonAndRefreshGuessesInARow();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.tries).toBe(3);
    expect(wrapper.vm.guessesInARow).toBe(0);
    expect(wrapper.vm.bronzeStars).toBe(0);
    expect(wrapper.vm.silverStars).toBe(0);
    expect(wrapper.vm.goldStars).toBe(0);
  }, 6000);

  it('should reset everything after winning', async () => {
    wrapper.vm.setPlayersGuess('charmander');
    wrapper.vm.setPlayersGuess('pikachu');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.tries).toBe(3);
    expect(wrapper.vm.guessesInARow).toBe(1);
    expect(wrapper.vm.bronzeStars).toBe(1);
    expect(wrapper.vm.silverStars).toBe(0);
    expect(wrapper.vm.goldStars).toBe(0);
  }, 6000);
});
