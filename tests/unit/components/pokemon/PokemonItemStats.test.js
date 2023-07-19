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
      {
        name: 'speed',
        value: 112,
      },
    ];

    wrapper = mount(PokemonItemStats, {
      propsData: {
        stats,
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the correct number of stat items', () => {
    const statItems = wrapper.findAll('.pokemon-item-stat');
    expect(statItems.length).toBe(3);
  });

  it('displays the correct stat names and values', () => {
    const statNames = wrapper.findAll('.property-names');
    const statValues = wrapper.findAll('.property-values');

    expect(statNames.length).toBe(3);
    expect(statValues.length).toBe(3);
  });

  it('displays the title', () => {
    const title = wrapper.find('.title');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('Stats');
  });

  it('displays the correct amount of bars', () => {
    const filledBars = wrapper.findAll('.filled');
    const emptyBars = wrapper.findAll('.empty');
    const exceededBars = wrapper.findAll('.exceeded');

    expect(filledBars.length).toBe(17);
    expect(emptyBars.length).toBe(13);
    expect(exceededBars.length).toBe(1);
  });
});
