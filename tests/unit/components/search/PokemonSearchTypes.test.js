import { shallowMount } from '@vue/test-utils';
import PokemonSearchTypes from '@/components/search/PokemonSearchTypes.vue';

jest.mock('@/lib/store', () => ({
  toggleTypeFilter: jest.fn(),
  state: {
    allTypes: ['grass', 'electric', 'fire', 'poison'],
    search: {
      types: [],
    },
  },
}));

describe('PokemonSearchTypes', () => {
  let wrapper;

  beforeEach(() => {
    const allTypes = ['Fire', 'Water', 'Grass', 'Electric'];
    const filteringTypes = ['Water', 'Electric'];

    wrapper = shallowMount(PokemonSearchTypes, {
      computed: {
        allTypes: () => allTypes,
        filteringTypes: () => filteringTypes,
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the correct number of types', () => {
    const typeElements = wrapper.findAll('.type');
    expect(typeElements.length).toBe(wrapper.vm.allTypes.length);
  });

  it('calls toggleTypeFilter with the correct type when a type is clicked', async () => {
    const spy = jest.spyOn(wrapper.vm, 'toggleTypeFilter');
    const type = wrapper.findAll('.type').at(2);
    type.trigger('click');
    expect(spy).toHaveBeenCalledWith(type.text());
  });

  it('applies the active class to types in the filteringTypes array', async () => {
    expect(wrapper.findAll('.type').at(0).attributes().class).toBe(
      'type inactive'
    );
    expect(wrapper.findAll('.type').at(1).attributes().class).toBe(
      'type active'
    );
    expect(wrapper.findAll('.type').at(2).attributes().class).toBe(
      'type inactive'
    );
    expect(wrapper.findAll('.type').at(3).attributes().class).toBe(
      'type active'
    );
  });
});
