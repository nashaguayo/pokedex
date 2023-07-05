import { mount } from '@vue/test-utils';
import PokemonItemHeader from '@components/pokemons/PokemonItemHeader.vue';

describe('PokemonItemHeader', () => {
  let wrapper;
  let pokemonImage;

  beforeEach(() => {
    wrapper = mount(PokemonItemHeader, {
      propsData: {
        pokemonImage: 'image-url',
        pokemonName: 'Pikachu',
      },
      attachTo: document.body,
    });

    pokemonImage = wrapper.find('.pokemon-image');
    Object.defineProperty(pokemonImage.element, 'offsetHeight', { value: 200 });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the component with the correct props', () => {
    expect(wrapper.props('pokemonImage')).toBe('image-url');
    expect(wrapper.props('pokemonName')).toBe('Pikachu');
  });

  it('sets the location height on pokemon image load', () => {
    expect(wrapper.vm.locationHeight).toBe(0);
    pokemonImage.trigger('load');
    expect(wrapper.vm.locationHeight).toBe(200);
  });
});
