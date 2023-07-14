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

  it('sets the margin when setMargin method is called', () => {
    const height = 100;
    wrapper.vm.setMargin(height);
    expect(wrapper.vm.marginBottom).toBe(height + 30);
    expect(wrapper.vm.hasToUpdateMargin).toBe(false);
  });

  it('updates hasToUpdateMargin when updateMargin method is called', () => {
    wrapper.vm.updateMargin();
    expect(wrapper.vm.hasToUpdateMargin).toBe(true);
  });

  it('renders ScrollToTop component', () => {
    expect(wrapper.find('scrolltotop-stub').exists()).toBe(true);
  });

  it('renders FooterLinks component if displayFooter prop is true', () => {
    wrapper.setProps({ displayFooter: true });
    expect(wrapper.find('footerlinks-stub').exists()).toBe(true);
  });
});
