import { shallowMount } from '@vue/test-utils';
import ScrollToTop from '@components/footer/ScrollToTop.vue';

describe('ScrollToTop', () => {
  let wrapper;

  beforeEach(() => {
    document.body.innerHTML = '<div class="white-background"></div>';
    window.Element.prototype.scrollTo = jest.fn();
    wrapper = shallowMount(ScrollToTop, {
      stubs: ['FontAwesomeIcon'],
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('sets showScrollToTopButton to true when scrollTop is greater than 100', () => {
    wrapper.vm.handleScroll({ srcElement: { scrollTop: 150 } });
    expect(wrapper.vm.showScrollToTopButton).toBe(true);
  });

  it('sets showScrollToTopButton to false when scrollTop is less than or equal to 100', () => {
    wrapper.vm.handleScroll({ srcElement: { scrollTop: 50 } });
    expect(wrapper.vm.showScrollToTopButton).toBe(false);
  });

  it('scrolls to the top of the white-background element', () => {
    wrapper.vm.scrollToTop();
    expect(window.Element.prototype.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
