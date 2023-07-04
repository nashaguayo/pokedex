import { shallowMount } from '@vue/test-utils';
import BaseHeader from '@components/ui/BaseHeader';

jest.mock('@components/header/GeneralNavigation.vue', () => ({
  name: 'GeneralNavigation',
  template: '<div class="mocked-general-navigation"></div>',
}));

describe('BaseHeader', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BaseHeader);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders GeneralNavigation component', () => {
    expect(wrapper.find('generalnavigation-stub').exists()).toBe(true);
  });
});
