import { shallowMount } from '@vue/test-utils';
import BaseHeader from '@components/ui/BaseHeader.vue';

describe('BaseHeader', () => {
  it('renders the component correctly', () => {
    const wrapper = shallowMount(BaseHeader);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.base-header').exists()).toBe(true);
    expect(wrapper.find('.home-icon-link').exists()).toBe(true);
    expect(wrapper.find('.pokemons-link').exists()).toBe(true);
  });
});
