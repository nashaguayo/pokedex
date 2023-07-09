import { shallowMount, mount } from '@vue/test-utils';
import FooterLinks from '@components/footer/FooterLinks.vue';
import Vue from 'vue';

describe('FooterLinks', () => {
  let wrapper;

  beforeEach(() => {
    Vue.directive('observe-visibility', {});
    wrapper = shallowMount(FooterLinks, {
      props: { hasToUpdateHeight: false },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the disclaimer', () => {
    expect(wrapper.find('#disclaimer').exists()).toBe(true);
    expect(wrapper.find('#disclaimer span').text()).toBe(
      'This is a project built for learning.'
    );
  });

  it('renders the "Fueled by" logo and link', () => {
    expect(wrapper.find('#fueled-by').exists()).toBe(true);
    expect(wrapper.find('#fueled-by span').text()).toBe('Fueled by');
    expect(wrapper.find('#fueled-by a').attributes('href')).toBe(
      'https://pokeapi.co/docs/v2'
    );
    expect(wrapper.find('#fueled-by a img').attributes('alt')).toBe(
      'pokeapi logo'
    );
  });

  it('renders the GitHub logo and link with the correct URL', () => {
    const githubLogoLink = wrapper.find('#repository');
    expect(githubLogoLink.exists()).toBe(true);
    expect(githubLogoLink.attributes('href')).toBe(
      process.env.VUE_APP_GITHUB_REPO_URL
    );
    expect(githubLogoLink.find('img').attributes('alt')).toBe('github logo');
  });

  it('emits the height when mounted', () => {
    expect(wrapper.emitted('setMargin')).toBeTruthy();
    expect(wrapper.emitted('setMargin')[0][0]).toBe(wrapper.vm.height);
  });

  it('updates the height when hasToUpdateHeight prop changes', async () => {
    wrapper = mount(FooterLinks, {
      props: {
        hasToUpdateHeight: false,
      },
    });

    wrapper.setProps({ hasToUpdateHeight: true });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('setMargin')).toBeTruthy();
    expect(wrapper.emitted('setMargin')[0][0]).toBe(wrapper.vm.height);
  });

  it('renders the GitHub logo with the correct URL', () => {
    const env = process.env;
    jest.resetModules();
    process.env = { ...env };

    wrapper = mount(FooterLinks, {
      props: {
        hasToUpdateHeight: false,
      },
    });

    const githubLogo = wrapper.find('#repository img');
    expect(githubLogo.attributes('src')).toBe('@assets/ui/github-logo.jpeg');
    expect(githubLogo.attributes('alt')).toBe('github logo');

    const githubLogoWrapper = wrapper.find('#repository');
    expect(githubLogoWrapper.attributes('href')).toBe(
      env.VUE_APP_GITHUB_REPO_URL
    );
  });

  it('initializes isVisible as false and height as 0', () => {
    expect(wrapper.vm.isVisible).toBe(false);
    expect(wrapper.vm.height).toBe(0);
  });

  it('sets height correctly when isVisible is true', () => {
    wrapper.vm.isVisible = true;
    wrapper.vm.setHeight();
    expect(wrapper.vm.height).toBe(
      wrapper.vm.$refs.footerLinks.$el.offsetHeight
    );
    expect(wrapper.emitted('setMargin')).toBeTruthy();
    expect(wrapper.emitted('setMargin')[0][0]).toBe(wrapper.vm.height);
  });

  it('sets height to 0 when isVisible is false', () => {
    wrapper.vm.isVisible = false;
    wrapper.vm.setHeight();
    expect(wrapper.vm.height).toBe(0);
    expect(wrapper.emitted('setMargin')).toBeTruthy();
    expect(wrapper.emitted('setMargin')[0][0]).toBe(0);
  });
});
