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
    const weight = wrapper.find('.status span:nth-child(2)');
    expect(weight.text()).toBe('80 pounds');
  });

  it('displays the correct height', () => {
    const height = wrapper.find('.status span:nth-child(4)');
    expect(height.text()).toBe('17"');
  });

  it('displays the correct color', () => {
    const color = wrapper.find('.status span:nth-child(6)');
    expect(color.text()).toBe('yellow');
    expect(color.attributes('style')).toContain('color: yellow');
  });
});
