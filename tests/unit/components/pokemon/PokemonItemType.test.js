import { mount } from '@vue/test-utils';
import PokemonItemType from '@/components/pokemon/PokemonItemType.vue';

describe('PokemonItemType', () => {
  let wrapper;
  const types = ['fire', 'water', 'grass'];

  beforeEach(() => {
    wrapper = mount(PokemonItemType, {
      propsData: {
        types,
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the component with the correct props', () => {
    const typeElements = wrapper.findAll('.type');
    expect(typeElements.length).toBe(3);

    typeElements.wrappers.forEach((typeElementWrapper, index) => {
      const typeElement = typeElementWrapper.element;
      const type = types[index];
      const typeNameElement = typeElement.querySelector('span');
      const lightsElement = typeElement.querySelector('.lights');
      const shineElement = typeElement.querySelector('.shine');

      expect(typeNameElement.textContent).toBe(type);
      expect(lightsElement.style.backgroundColor).toBe(
        wrapper.vm.pokemonColorTypes.get(type)
      );
      expect(shineElement).toBeTruthy();
    });
  });

  it('renders the component with default props when no types are provided', () => {
    wrapper = mount(PokemonItemType, {
      propsData: {
        types: [],
      },
    });
    const typeElements = wrapper.findAll('.type');
    expect(typeElements.length).toBe(0);
  });
});
