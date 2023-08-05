import { toggleFilter, clearFilters } from '@/store/mutations/generations';
import generations from '@/store/state/generations';

jest.mock('@/store/state/generations', () => ({
  setFilter: jest.fn(),
  getFilter: jest.fn(),
}));

const spySetFilter = jest.spyOn(generations, 'setFilter');
const spyGetFilter = jest.spyOn(generations, 'getFilter');

describe('toggleGenerationFilter', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should toggle the generation filter in the store', async () => {
    const generation = 'ii';
    spyGetFilter.mockReturnValueOnce('i');
    expect(spyGetFilter).not.toHaveBeenCalled();
    expect(spySetFilter).not.toHaveBeenCalled();
    toggleFilter(generation);
    expect(spyGetFilter).toHaveBeenCalled();
    expect(spySetFilter).toHaveBeenCalledWith(generation);
  });

  it('should remove filter when toggle is already active', async () => {
    const generation = 'i';
    spyGetFilter.mockReturnValueOnce(generation);
    expect(spyGetFilter).not.toHaveBeenCalled();
    expect(spySetFilter).not.toHaveBeenCalled();
    toggleFilter(generation);
    expect(spyGetFilter).toHaveBeenCalled();
    expect(spySetFilter).toHaveBeenCalledWith('');
  });
});

describe('clearGenerationFilters', () => {
  it('should clear filters in store', () => {
    expect(spySetFilter).not.toHaveBeenCalled();
    clearFilters();
    expect(spySetFilter).toHaveBeenCalledWith('');
  });
});
