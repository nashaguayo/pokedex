import { toggleFilter } from '@/store/mutations/types';
import types from '@/store/state/types';
import * as typesApi from '@/api/types';

jest.mock('@/store/state/types', () => ({
  getFilters: jest.fn(),
  addFilter: jest.fn(),
  removeFilter: jest.fn(),
}));

jest.mock('@/api/types', () => ({
  getAllTypes: jest.fn(),
  getPokemonsByType: jest.fn(),
}));

const spyGetFilters = jest.spyOn(types, 'getFilters');
const spyAddFilter = jest.spyOn(types, 'addFilter');
const spyRemoveFilter = jest.spyOn(types, 'removeFilter');

const spyGetAllTypes = jest.spyOn(typesApi, 'getAllTypes');
const spyGetPokemonsByType = jest.spyOn(typesApi, 'getPokemonsByType');

describe('toggleFilter', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should turn off the filter if its already present', () => {
    const types = ['grass', 'poison'];
    spyGetFilters.mockReturnValue(types);
    toggleFilter('grass');
    expect(spyGetFilters).toHaveBeenCalled();
    expect(spyRemoveFilter).toHaveBeenCalled();
    expect(spyAddFilter).not.toHaveBeenCalled();
  });

  it('should add filter if its not present', () => {
    const types = ['grass', 'poison'];
    spyGetFilters.mockReturnValue(types);
    toggleFilter('normal');
    expect(spyGetFilters).toHaveBeenCalled();
    expect(spyRemoveFilter).not.toHaveBeenCalled();
    expect(spyAddFilter).toHaveBeenCalledWith('normal');
  });
});
