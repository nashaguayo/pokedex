import { shallowMount } from '@vue/test-utils';
import PokemonItemCharacteristics from '@/components/pokemon/PokemonItemCharacteristics.vue';

describe('LogoAndBanner', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonItemCharacteristics, {
      propsData: {
        characteristic: 'Mischievous',
        weight: 80,
        height: 17,
        color: 'yellow',
        shape: 'upright',
        generation: 'i',
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('displays the correct characteristic', () => {
    const characteristic = wrapper.find('.characteristic');
    expect(characteristic.text()).toBe('Mischievous');
  });

  it('displays the correct weight', () => {
    const weight = wrapper.findAll('span').at(1);
    expect(weight.text()).toBe('80 pounds');
  });

  it('displays the correct height', () => {
    const height = wrapper.findAll('span').at(3);
    expect(height.text()).toBe('17"');
  });

  it('displays the correct color', () => {
    const color = wrapper.findAll('span').at(5);
    expect(color.text()).toBe('yellow');
    expect(color.attributes('style')).toContain('color: yellow');
  });

  it('displays the correct shape', () => {
    const color = wrapper.findAll('span').at(7);
    expect(color.text()).toBe('upright');
  });

  it('displays the correct generation', () => {
    const color = wrapper.findAll('span').at(9);
    expect(color.text()).toBe('I');
  });
});
