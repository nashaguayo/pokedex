import { getPokemonVariants, setVariant } from '@/store/mutations/variations';
import variations from '@/store/state/variations';

jest.mock('@/store/state/variations', () => ({
  setVariant: jest.fn(),
  getAll: jest.fn(),
}));

const spySetVariant = jest.spyOn(variations, 'setVariant');
const spyGetAll = jest.spyOn(variations, 'getAll');

describe('setVariant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should set variant in store', () => {
    const name = 'pikachu';
    const variants = ['pikachu-rockstar', 'pikachu-popstar'];
    setVariant(name, variants);
    expect(spySetVariant).toHaveBeenCalledWith(name, variants);
  });
});

describe('getPokemonVariants', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should set variant in store', () => {
    const name = 'pikachu';
    const variants = ['pikachu-rockstar', 'pikachu-popstar'];
    const variantsMap = new Map([[name, variants]]);
    spyGetAll.mockReturnValue(variantsMap);
    expect(getPokemonVariants(name)).toBe(variantsMap.get(name));
    expect(spyGetAll).toHaveBeenCalled();
  });
});
