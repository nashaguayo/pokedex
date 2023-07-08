import { shallowMount } from '@vue/test-utils';
import PokemonSearch from '@components/search/PokemonSearch.vue';

jest.mock('@components/ui/CenteredColumn.vue', () => ({
  name: 'CenteredColumn',
  template: '<div class="mocked-centered-column"></div>',
}));

jest.mock('@components/ui/BaseInput.vue', () => ({
  name: 'BaseInput',
  template: '<div class="mocked-base-input"></div>',
}));

describe('PokemonSearch', () => {
  it('renders all components components', () => {
    const wrapper = shallowMount(PokemonSearch);
    expect(wrapper.find('centeredcolumn-stub').exists()).toBe(true);
    expect(wrapper.find('baseinput-stub').exists()).toBe(true);
  });
});
