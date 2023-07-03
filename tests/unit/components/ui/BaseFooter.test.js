import { shallowMount } from '@vue/test-utils';
import BaseFooter from '@components/ui/BaseFooter';

jest.mock('@components/footer/ScrollToTop.vue', () => ({
  name: 'ScrollToTop',
  template: '<div class="mocked-scroll-to-top"></div>',
}));

jest.mock('@components/footer/FooterLinks.vue', () => ({
  name: 'FooterLinks',
  template: '<div class="mocked-footer-links"></div>',
}));

describe('BaseFooter', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BaseFooter);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('updates the height when setHeight method is called', () => {
    const height = 100;
    wrapper.vm.setHeight(height);
    expect(wrapper.vm.marginBottom).toBe(height + 20);
    expect(wrapper.vm.hasToUpdateHeight).toBe(false);
  });

  it('updates hasToUpdateHeight when updateHeight method is called', () => {
    wrapper.vm.updateHeight();
    expect(wrapper.vm.hasToUpdateHeight).toBe(true);
  });

  it('renders ScrollToTop component', () => {
    expect(wrapper.find('scrolltotop-stub').exists()).toBe(true);
  });

  it('renders FooterLinks component', () => {
    expect(wrapper.find('footerlinks-stub').exists()).toBe(true);
  });
});
