import { mount } from '@vue/test-utils';
import PokemonItemStats from '@/components/pokemon/PokemonItemStats.vue';

describe('PokemonItemStats', () => {
  let wrapper;

  beforeEach(() => {
    const stats = [
      {
        name: 'HP',
        value: 50,
      },
      {
        name: 'attack',
        value: 20,
      },
    ];

    wrapper = mount(PokemonItemStats, {
      propsData: {
        stats,
      },
      stubs: ['CenteredColumn'],
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the correct number of stat items', () => {
    const statItems = wrapper.findAll('.pokemon-item-stat');
    expect(statItems.length).toBe(2);
  });

  it('displays the correct stat names and values', () => {
    const statNames = wrapper.findAll('.property-names');
    const statValues = wrapper.findAll('.property-values');

    expect(statNames.length).toBe(2);
    expect(statValues.length).toBe(2);
  });

  it('displays the title', () => {
    const title = wrapper.find('.title');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('Stats');
  });
});
