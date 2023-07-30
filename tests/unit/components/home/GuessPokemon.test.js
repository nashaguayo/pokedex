import { shallowMount } from '@vue/test-utils';
import GuessPokemon from '@/components/home/GuessPokemon.vue';
import en from '@/locales/en';

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
    wrapper = shallowMount(GuessPokemon, {
      stubs: ['FontAwesomeIcon'],
      mocks: {
        $t: (key) => key,
      },
    });
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
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
      mocks: {
        $t: (key) => key,
      },
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
    expect(wrapper.vm.hasWon).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 6000));
    expect(spy).toHaveBeenCalled();
  }, 7000);

  it('should lose the game when running out of tries', () => {
    wrapper.vm.setPlayersGuess('charmander');
    wrapper.vm.setPlayersGuess('bulbasaur');
    wrapper.vm.setPlayersGuess('squirtle');
    expect(wrapper.vm.hasLost).toBe(true);
  });

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
