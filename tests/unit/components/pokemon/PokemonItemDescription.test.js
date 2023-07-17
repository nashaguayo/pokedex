import { shallowMount } from '@vue/test-utils';
import PokemonItemDescription from '@/components/pokemon/PokemonItemDescription.vue';

describe('PokemonItemDescription', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonItemDescription, {
      propsData: {
        flavorTexts: ['flavor text 1', 'flavor text 2'],
      },
      stubs: ['CenteredColumn'],
    });
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the title correctly', () => {
    const titleElement = wrapper.find('.title');
    expect(titleElement.text()).toBe('Fun Facts');
  });

  it('renders the flavor texts correctly', () => {
    const liElements = wrapper.findAll('li');
    expect(liElements.length).toBe(2);
  });
});
