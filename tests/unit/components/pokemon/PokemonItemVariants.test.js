import { mount } from '@vue/test-utils';
import PokemonItemVariants from '@/components/pokemon/PokemonItemVariants.vue';

jest.mock('@/components/pokemon/PokemonItemVariantsDropdown.vue', () => ({
  name: 'PokemonItemVariantsDropdown',
  props: ['variants'],
  template: '<div class="mocked-dropdown">Mocked Dropdown</div>',
}));

describe('PokemonItemVariants', () => {
  let wrapper;

  beforeEach(() => {
    const variants = [
      { name: 'Variant 1', image: 'variant1.jpg' },
      { name: 'Variant 2', image: 'variant2.jpg' },
    ];

    wrapper = mount(PokemonItemVariants, {
      propsData: {
        pokemonName: 'Pikachu',
        variants: variants,
      },
      stubs: ['PokemonItemVariantsDropdown'],
      mocks: { $t: (key) => key },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('should display the title "Variants"', () => {
    expect(wrapper.find('.title').text()).toBe('pokemon.variants.title');
  });

  it('should display the first variant by default', () => {
    expect(wrapper.find('.name').text()).toBe('Variant 1');
    expect(wrapper.find('.screen').element.style.backgroundImage).toContain(
      'variant1.jpg'
    );
  });

  it('should open the variant dropdown on button click', async () => {
    expect(
      wrapper.findComponent({ name: 'PokemonItemVariantsDropdown' }).exists()
    ).toBe(false);
    await wrapper.find('.variant button').trigger('click');
    expect(
      wrapper.findComponent({ name: 'PokemonItemVariantsDropdown' }).exists()
    ).toBe(true);
  });

  it('should change the variant on dropdown selection', async () => {
    await wrapper.vm.displayVariant('Variant 1');
    expect(wrapper.find('.name').text()).toBe('Variant 1');
    expect(wrapper.find('.screen').element.style.backgroundImage).toContain(
      'variant1.jpg'
    );
    await wrapper.find('.variant button').trigger('click');
    await wrapper.vm.displayVariant('Variant 2');
    expect(wrapper.find('.name').text()).toBe('Variant 2');
    expect(wrapper.find('.screen').element.style.backgroundImage).toContain(
      'variant2.jpg'
    );
  });

  it("should disable variant button when there's only one variant", () => {
    const variants = [{ name: 'Variant 1', image: 'variant1.jpg' }];
    wrapper = mount(PokemonItemVariants, {
      propsData: {
        pokemonName: 'Pikachu',
        variants: variants,
      },
      stubs: ['PokemonItemVariantsDropdown'],
      mocks: { $t: (key) => key },
    });
    expect(wrapper.find('.variant button').attributes()['disabled']).toBe(
      'disabled'
    );
  });
});
