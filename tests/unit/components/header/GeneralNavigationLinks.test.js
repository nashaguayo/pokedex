import { shallowMount } from '@vue/test-utils';
import GeneralNavigationLink from '@/components/header/GeneralNavigationLink'; // Replace with the actual path to your component

jest.mock('@/lib/store', () => ({
  state: {
    isDarkModeEnabled: false,
  },
}));

describe('GeneralNavigationLink', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(GeneralNavigationLink, {
      propsData: {
        to: { name: 'SomeRouteName', params: { id: 1 } },
        text: 'Test Link',
        icon: 'fa-icon-name',
      },
    });
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders a link with text when props are provided', () => {
    expect(wrapper.find('.desktop').exists()).toBeTruthy();
    expect(wrapper.find('.mobile').exists()).toBeTruthy();
    expect(wrapper.find('.icon').exists()).toBeTruthy();
    expect(wrapper.find('.link').text()).toBe('Test Link');
  });
});
