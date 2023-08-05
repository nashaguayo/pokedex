import { shallowMount } from '@vue/test-utils';
import GeneralNavigation from '@/components/header/GeneralNavigation.vue';

jest.mock('@/store/mutations/other', () => ({
  toggleDarkModeInStoreAndLocalStorage: jest.fn(),
}));

jest.mock('@/store/state/other', () => ({
  state: {
    isDarkModeEnabled: true,
  },
}));

jest.mock('@/components/header/GeneralNavigationLink.vue', () => ({
  name: 'GeneralNavigationLink',
  template: '<div class="mocked-general-navigation-link"></div>',
}));

jest.mock('@/components/header/LocaleChanger.vue', () => ({
  name: 'LocaleChanger',
  template: '<div class="mocked-locale-changer"></div>',
}));

describe('GeneralNavigation', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(GeneralNavigation, {
      stubs: ['router-link', 'FontAwesomeIcon', 'GeneralNavigationLink'],
      mocks: { $t: (key) => key },
    });
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('loads all routes from header', () => {
    expect(wrapper.findAll('generalnavigationlink-stub').length).toBe(3);
    expect(wrapper.find('localechanger-stub').exists()).toBeTruthy();
  });

  it('displays the dark mode on icon when isDarkModeEnabled is true', () => {
    expect(wrapper.findAll('.icon').at(0).attributes().icon).toBe(
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
      mocks: { $t: (key) => key },
    });
    expect(wrapper.findAll('.icon').at(0).attributes().icon).toBe(
      'fa-solid fa-toggle-off'
    );
  });
});
