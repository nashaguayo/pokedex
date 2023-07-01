import { shallowMount } from '@vue/test-utils';
import BaseFooter from '@components/ui/BaseFooter.vue';

describe('BaseFooter', () => {
  it('renders disclaimer text correctly', () => {
    const wrapper = shallowMount(BaseFooter);
    const disclaimerText = wrapper.find('#disclaimer span').text();
    expect(disclaimerText).toBe('This is a project built for learning.');
  });

  it('renders correct GitHub repo URL', () => {
    const githubRepoUrl = 'www.example.com';
    process.env.VUE_APP_GITHUB_REPO_URL = githubRepoUrl;
    const wrapper = shallowMount(BaseFooter);
    const githubLink = wrapper.find('#repository');
    expect(githubLink.attributes('href')).toBe(githubRepoUrl);
  });

  it('renders PokéAPI logo', () => {
    const wrapper = shallowMount(BaseFooter);
    const pokeApiLogo = wrapper.find(
      '#fueled-by img[src="@assets/ui/pokeapi.png"]'
    );
    expect(pokeApiLogo.exists()).toBe(true);
  });

  it('renders GitHub logo', () => {
    const wrapper = shallowMount(BaseFooter);
    expect(wrapper.exists()).toBe(true);
    const githubLogo = wrapper.find('#github-logo');
    expect(githubLogo.exists()).toBe(true);
  });
});
