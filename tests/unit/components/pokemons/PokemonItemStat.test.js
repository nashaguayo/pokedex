import { mount } from '@vue/test-utils';
import PokemonItemStat from '@components/pokemons/PokemonItemStat.vue';

describe('PokemonItemStat', () => {
  let wrapper;

  beforeEach(() => {
    const stat = {
      name: 'HP',
      value: 100,
    };

    wrapper = mount(PokemonItemStat, {
      propsData: {
        stat,
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the component with the correct props', () => {
    expect(wrapper.props('stat')).toEqual({
      name: 'HP',
      value: 100,
    });
    expect(wrapper.props('big')).toBe(false);
    expect(wrapper.find('.property-names').classes('big')).toBe(false);
    expect(wrapper.find('.property-values').classes('big')).toBe(false);
    expect(wrapper.find('.property-names').text()).toBe('HP');
    expect(wrapper.find('.property-values').text()).toBe('100');
  });

  it('renders the component without the "big" class by default', () => {
    wrapper = mount(PokemonItemStat, {
      propsData: {
        stat: {},
        big: true,
      },
    });
    expect(wrapper.props('big')).toBe(true);
    expect(wrapper.find('.property-names').classes('big')).toBe(true);
    expect(wrapper.find('.property-values').classes('big')).toBe(true);
  });
});
