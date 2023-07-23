import { shallowMount } from '@vue/test-utils';
import ScrollToTop from '@/components/footer/ScrollToTop.vue';

jest.mock('@/lib/logger', () => ({
  logError: jest.fn(),
}));

describe('ScrollToTop', () => {
  let wrapper;
  let scrollEventSpy;
  let removeScrollEventSpy;

  beforeEach(() => {
    document.body.innerHTML = '<div class="page-background"></div>';
    window.Element.prototype.scrollTo = jest.fn();
    scrollEventSpy = jest.spyOn(window.Element.prototype, 'addEventListener');
    removeScrollEventSpy = jest.spyOn(
      window.Element.prototype,
      'removeEventListener'
    );
    wrapper = shallowMount(ScrollToTop, {
      stubs: ['FontAwesomeIcon'],
    });
  });

  afterEach(() => {
    scrollEventSpy.mockRestore();
    removeScrollEventSpy.mockRestore();
    wrapper.destroy();
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('adds scroll event listener on mounted', () => {
    expect(scrollEventSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('removes scroll event listener on beforeDestroy', () => {
    wrapper.destroy();
    expect(removeScrollEventSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });

  it('sets showScrollToTopButton to false initially', () => {
    expect(wrapper.vm.showScrollToTopButton).toBe(false);
  });

  it('sets showScrollToTopButton to true when scrollTop is greater than 100', () => {
    wrapper.vm.handleScroll({ srcElement: { scrollTop: 150 } });
    expect(wrapper.vm.showScrollToTopButton).toBe(true);
  });

  it('sets showScrollToTopButton to false when scrollTop is less than or equal to 100', () => {
    wrapper.vm.handleScroll({ srcElement: { scrollTop: 50 } });
    expect(wrapper.vm.showScrollToTopButton).toBe(false);
  });

  it('emits "userScrolled" event when the handleScroll method is called', () => {
    const emitSpy = jest.spyOn(wrapper.vm, '$emit');
    wrapper.vm.handleScroll({ srcElement: { scrollTop: 150 } });
    expect(emitSpy).toHaveBeenCalledWith('userScrolled');
  });

  it('scrolls to the top of the page-background element', () => {
    wrapper.vm.scrollToTop();
    expect(window.Element.prototype.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('applies "bounce-animation" class when the scroll-to-top button is clicked', () => {
    wrapper.vm.scrollToTop();
    expect(wrapper.vm.wasClicked).toBe(true);
  });

  it('removes "bounce-animation" class after animation ends', () => {
    wrapper.vm.handleAnimationEnd();
    expect(wrapper.vm.wasClicked).toBe(false);
  });

  it('renders the scroll-to-top button when showScrollToTopButton is true', async () => {
    wrapper.setData({ showScrollToTopButton: true });
    await wrapper.vm.$nextTick();
    const button = wrapper.find('.scroll-to-top');
    expect(button.exists()).toBe(true);
  });

  it('does not render the scroll-to-top button when showScrollToTopButton is false', async () => {
    wrapper.setData({ showScrollToTopButton: false });
    await wrapper.vm.$nextTick();
    const button = wrapper.find('.scroll-to-top');
    expect(button.exists()).toBe(false);
  });
});
