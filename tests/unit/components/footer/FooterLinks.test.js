import { shallowMount, mount } from '@vue/test-utils';
import FooterLinks from '@components/footer/FooterLinks.vue';

describe('FooterLinks', () => {
  let wrapper;

  beforeEach(() => {
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
    expect(wrapper.emitted('setHeight')).toBeTruthy();
    expect(wrapper.emitted('setHeight')[0][0]).toBe(wrapper.vm.height);
  });

  it('updates the height when hasToUpdateHeight prop changes', async () => {
    wrapper = mount(FooterLinks, {
      props: {
        hasToUpdateHeight: false,
      },
    });

    wrapper.setProps({ hasToUpdateHeight: true });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('setHeight')).toBeTruthy();
    expect(wrapper.emitted('setHeight')[0][0]).toBe(wrapper.vm.height);
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
});
