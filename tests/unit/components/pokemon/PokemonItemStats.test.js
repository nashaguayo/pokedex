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

    const statNamesText = statNames.wrappers.map((el) => el.text());
    const statValuesText = statValues.wrappers.map((el) => el.text());

    expect(statNamesText).toEqual(['HP', 'attack', 'speed']);
    expect(statValuesText).toEqual(['50', '20', '112']);
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
    expect(emptyBars.length).toBe(15);
    expect(exceededBars.length).toBe(1);
  });

  it('correctly formats stat names with hyphens', () => {
    const statNames = wrapper.findAll('.property-names');
    const statNamesText = statNames.wrappers.map((el) => el.text());
    expect(statNamesText).toEqual(['HP', 'attack', 'speed']);
  });

  it('displays the correct number of filled, empty, and exceeded bars for each stat', () => {
    const statBars = wrapper.findAll('.bars');

    const statBarsData = statBars.wrappers.map((el) => {
      const filledBars = el.findAll('.bar.filled').length;
      const emptyBars = el.findAll('.bar.empty').length;
      const exceededBars = el.findAll('.bar.exceeded').length;
      return { filledBars, emptyBars, exceededBars };
    });

    expect(statBarsData).toEqual([
      { filledBars: 5, emptyBars: 6, exceededBars: 0 },
      { filledBars: 2, emptyBars: 9, exceededBars: 0 },
      { filledBars: 10, emptyBars: 0, exceededBars: 1 },
    ]);
  });
});
