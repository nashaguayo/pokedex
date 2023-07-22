import { shallowMount } from '@vue/test-utils';
import GeneralNavigation from '@/components/header/GeneralNavigation.vue';

jest.mock('@/lib/store', () => ({
  state: { isDarkModeEnabled: true },
  toggleDarkMode: jest.fn(),
}));

describe('GeneralNavigation', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(GeneralNavigation, {
      stubs: ['router-link', 'FontAwesomeIcon'],
    });
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('loads all routes from header', () => {
    expect(wrapper.findAll('router-link-stub').length).toBe(5);
  });

  it('displays the dark mode on icon when isDarkModeEnabled is true', () => {
    expect(wrapper.findAll('.icon').at(2).attributes().icon).toBe(
      'fa-solid fa-toggle-on'
    );
  });

  it('displays the dark mode off icon when isDarkModeEnabled is false', () => {
    const wrapper = shallowMount(GeneralNavigation, {
      computed: {
        isDarkModeEnabled() {
          return false;
        },
      },
      stubs: ['router-link', 'FontAwesomeIcon'],
    });
    expect(wrapper.findAll('.icon').at(2).attributes().icon).toBe(
      'fa-solid fa-toggle-off'
    );
  });
});
