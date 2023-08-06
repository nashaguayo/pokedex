import characteristics from '@/store/state/characteristics';
import * as characteristicsApi from '@/api/characteristics';
import {
  getAll,
  getAllCharacteristics,
} from '@/store/mutations/characteristics';

jest.mock('@/store/state/characteristics', () => ({
  setAll: jest.fn(),
  getAll: jest.fn(),
}));

jest.mock('@/api/characteristics', () => ({
  getAllCharacteristicsDescriptions: jest.fn(),
}));

const spyGetAllCharacteristics = jest.spyOn(characteristics, 'getAll');
const spySetAllCharacteristics = jest.spyOn(characteristics, 'setAll');

const spyGetAllCharacteristicsDescriptionsApi = jest.spyOn(
  characteristicsApi,
  'getAllCharacteristicsDescriptions'
);

describe('getAll', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should set all characteristics descriptions in store', async () => {
    const characteristicsDescriptions = new Map([
      ['key1', 'value1'],
      ['key2', 'value2'],
    ]);
    spyGetAllCharacteristicsDescriptionsApi.mockResolvedValue(
      characteristicsDescriptions
    );
    await getAll();
    expect(spySetAllCharacteristics).toHaveBeenCalledWith(
      characteristicsDescriptions
    );
  });
});

describe('getAllCharacteristics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should return all characteristics', () => {
    const characteristicsDescriptions = new Map([
      ['key1', 'value1'],
      ['key2', 'value2'],
    ]);
    spyGetAllCharacteristics.mockReturnValue(characteristicsDescriptions);
    expect(getAllCharacteristics()).toStrictEqual(characteristicsDescriptions);
    expect(spyGetAllCharacteristics).toHaveBeenCalled();
  });
});
