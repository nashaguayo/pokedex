import { shallowMount } from '@vue/test-utils';
import SearchView from '@/views/SearchView.vue';

jest.mock('@/components/ui/CenteredColumn.vue', () => ({
  name: 'CenteredColumn',
  template: '<div class="mocked-centered-column"></div>',
}));

jest.mock('@/components/search/PokemonSearch.vue', () => ({
  name: 'PokemonSearch',
  template: '<div class="mocked-pokemon-search"></div>',
}));

describe('SearchView', () => {
  it('renders all components components', () => {
    const wrapper = shallowMount(SearchView);
    expect(wrapper.find('centeredcolumn-stub').exists()).toBe(true);
    expect(wrapper.find('pokemonsearch-stub').exists()).toBe(true);
  });
});
