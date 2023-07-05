import { mount } from '@vue/test-utils';
import PokemonItemType from '@components/pokemons/PokemonItemType.vue';

describe('PokemonItemType', () => {
  it('renders the component with the correct props', () => {
    const types = [
      { type: { name: 'fire' } },
      { type: { name: 'water' } },
      { type: { name: 'grass' } },
    ];

    const wrapper = mount(PokemonItemType, {
      propsData: {
        types,
      },
    });

    const typeElements = wrapper.findAll('.type');
    expect(typeElements.length).toBe(3);

    typeElements.wrappers.forEach((typeElementWrapper, index) => {
      const typeElement = typeElementWrapper.element;
      const type = types[index].type.name;
      const typeNameElement = typeElement.querySelector('span');
      const lightsElement = typeElement.querySelector('.lights');
      const shineElement = typeElement.querySelector('.shine');

      expect(typeNameElement.textContent).toBe(type);
      expect(lightsElement.style.backgroundColor).toBe(
        wrapper.vm.backgroundColorTypes.get(type)
      );
      expect(shineElement).toBeTruthy();
    });

    wrapper.destroy();
  });
});
