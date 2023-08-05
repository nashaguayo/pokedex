import gameStore from '@/store/state/game';
import store from '@/lib/store';
import * as localStorage from '@/lib/localStorage';
import {
  getNewMysteryPokemon,
  setMysteryPokemonFromLS,
} from '@/store/mutations/game';

jest.mock('@/lib/localStorage', () => ({
  getMysteryPokemon: jest.fn(),
  setMysteryPokemon: jest.fn(),
  setTriesLeft: jest.fn(),
}));

jest.mock('@/lib/store', () => ({
  getNewRandomPokemon: jest.fn(),
}));

jest.mock('@/store/state/game', () => ({
  setMysteryPokemon: jest.fn(),
}));

describe('getNewMysteryPokemon', () => {
  it('should call the required methods with the correct arguments', async () => {
    const newRandomPokemon = {
      name: 'Pikachu',
      image: 'pikachu.png',
    };
    const spyGetNewRandomPokemon = jest
      .spyOn(store, 'getNewRandomPokemon')
      .mockResolvedValue(newRandomPokemon);
    const spySetMysteryPokemon = jest.spyOn(gameStore, 'setMysteryPokemon');
    const spySetMysteryPokemonLS = jest.spyOn(
      localStorage,
      'setMysteryPokemon'
    );
    const spySetTriesLeft = jest.spyOn(localStorage, 'setTriesLeft');
    await getNewMysteryPokemon();
    expect(spyGetNewRandomPokemon).toHaveBeenCalledTimes(1);
    expect(spySetMysteryPokemon).toHaveBeenCalledWith(
      newRandomPokemon.name,
      newRandomPokemon.image
    );
    expect(spySetMysteryPokemonLS).toHaveBeenCalledWith(newRandomPokemon);
    expect(spySetTriesLeft).toHaveBeenCalledWith(3);
  });
});

describe('setMysteryPokemonFromLS', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should call the required methods when mysteryPokemon is present in local storage', () => {
    const mysteryPokemon = {
      name: 'Charizard',
      image: 'charizard.png',
    };
    const spyGetMysteryPokemon = jest
      .spyOn(localStorage, 'getMysteryPokemon')
      .mockReturnValue(mysteryPokemon);
    const spySetMysteryPokemon = jest.spyOn(gameStore, 'setMysteryPokemon');
    const result = setMysteryPokemonFromLS();
    expect(result).toBeTruthy();
    expect(spyGetMysteryPokemon).toHaveBeenCalledTimes(1);
    expect(spySetMysteryPokemon).toHaveBeenCalledWith(
      mysteryPokemon.name,
      mysteryPokemon.image
    );
  });

  it('should return false when mysteryPokemon is not present in local storage', () => {
    const spyGetMysteryPokemon = jest
      .spyOn(localStorage, 'getMysteryPokemon')
      .mockReturnValue(undefined);
    const spySetMysteryPokemon = jest.spyOn(gameStore, 'setMysteryPokemon');
    const result = setMysteryPokemonFromLS();
    expect(result).toBeFalsy();
    expect(spyGetMysteryPokemon).toHaveBeenCalledTimes(1);
    expect(spySetMysteryPokemon).not.toHaveBeenCalled();
  });
});
