import { shallowMount } from '@vue/test-utils';
import BaseFooter from '@/components/BaseFooter.vue';

describe('BaseFooter', () => {
  it('renders the disclaimer', () => {
    const wrapper = shallowMount(BaseFooter);
    expect(wrapper.find('#disclaimer').exists()).toBe(true);
    expect(wrapper.find('#disclaimer span').text()).toBe(
      'This is a project built for learning.'
    );
  });

  it('renders the "Fueled by" logo and link', () => {
    const wrapper = shallowMount(BaseFooter);
    expect(wrapper.find('#fueled-by').exists()).toBe(true);
    expect(wrapper.find('#fueled-by span').text()).toBe('Fueled by');
    expect(wrapper.find('#fueled-by a').attributes('href')).toBe(
      'https://pokeapi.co/docs/v2'
    );
    expect(wrapper.find('#fueled-by a img').attributes('alt')).toBe(
      'pokapi logo'
    );
  });

  it('renders the GitHub logo and link with the correct URL', () => {
    const wrapper = shallowMount(BaseFooter);
    const githubLogoLink = wrapper.find('#repository');
    expect(githubLogoLink.exists()).toBe(true);
    expect(githubLogoLink.attributes('href')).toBe(
      process.env.VUE_APP_GITHUB_REPO_URL
    );
    expect(githubLogoLink.find('img').attributes('alt')).toBe('github logo');
  });

  it('has the correct CSS class names and styles', () => {
    const wrapper = shallowMount(BaseFooter);
    expect(wrapper.classes()).toContain('base-footer');
    expect(wrapper.find('#disclaimer').classes()).toContain(
      'base-footer__disclaimer'
    );
    expect(wrapper.find('.logos').classes()).toContain('base-footer__logos');
  });
});
