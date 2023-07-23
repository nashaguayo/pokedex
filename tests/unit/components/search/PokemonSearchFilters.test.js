import { shallowMount } from '@vue/test-utils';
import PokemonSearchFilters from '@/components/search/PokemonSearchFilters.vue';

describe('PokemonSearchFilters', () => {
  let wrapper;

  beforeEach(() => {
    const allFilters = ['Fire', 'Water', 'Grass', 'Electric'];
    const filteringFilters = ['Water', 'Electric'];
    const toggleFilter = jest.fn();

    wrapper = shallowMount(PokemonSearchFilters, {
      propsData: { allFilters, filteringFilters, toggleFilter },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the correct number of filters', () => {
    const filterElements = wrapper.findAll('.filter');
    expect(filterElements.length).toBe(4);
  });

  it('applies the active class to filters in the filteringFilters array', async () => {
    expect(wrapper.findAll('.filter').at(0).attributes().class).toBe(
      'filter inactive'
    );
    expect(wrapper.findAll('.filter').at(1).attributes().class).toBe(
      'filter active'
    );
    expect(wrapper.findAll('.filter').at(2).attributes().class).toBe(
      'filter inactive'
    );
    expect(wrapper.findAll('.filter').at(3).attributes().class).toBe(
      'filter active'
    );
  });
});
