import { shallowMount } from '@vue/test-utils';
import DownloadView from '@/views/DownloadView.vue';

describe('DownloadView', () => {
  it('renders the BasePage component with correct title and content', () => {
    navigator.getInstalledRelatedApps = jest.fn().mockResolvedValue([]);

    const wrapper = shallowMount(DownloadView, {
      mocks: { $t: (key) => key },
      stubs: ['FontAwesomeIcon'],
    });

    const basePage = wrapper.find('.download-view');
    expect(basePage.exists()).toBe(true);

    const heading1 = basePage.find('h2');
    expect(heading1.exists()).toBe(true);
    expect(heading1.text()).toBe('download.title');

    expect(wrapper.find('fontawesomeicon-stub').exists()).toBeTruthy();
  });
});
