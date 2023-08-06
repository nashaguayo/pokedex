import { shallowMount } from '@vue/test-utils';
import MetalStars from '@/components/home/MetalStars.vue';

describe('MetalStars', () => {
  it('applies the zoom-in transition-group', () => {
    const metal = 'gold';
    const amountOfStars = 5;

    const wrapper = shallowMount(MetalStars, {
      propsData: { metal, amountOfStars },
      stubs: ['FontAwesomeIcon'],
    });

    const transitionGroup = wrapper.findComponent({ name: 'transition-group' });
    expect(transitionGroup.exists()).toBe(true);
    expect(transitionGroup.attributes('name')).toBe('zoom-in');
  });
});
