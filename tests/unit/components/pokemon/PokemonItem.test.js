import { shallowMount } from '@vue/test-utils';
import PokemonItem from '@/components/pokemon/PokemonItem.vue';
import Vue from 'vue';

jest.mock('@/components/ui/BaseButton.vue', () => ({
  name: 'BaseButton',
  template: '<div class="mocked-base-button"></div>',
}));

jest.mock('@/components/pokemon/PokemonItemHeader.vue', () => ({
  name: 'PokemonItemHeader',
  template: '<div class="mocked-pokemon-item-header"></div>',
}));

jest.mock('@/components/pokemon/PokemonItemCharacteristics.vue', () => ({
  name: 'PokemonItemCharacteristics',
  template: '<div class="mocked-pokemon-item-characteristics"></div>',
}));

jest.mock('@/components/pokemon/PokemonItemStats.vue', () => ({
  name: 'PokemonItemStats',
  template: '<div class="mocked-pokemon-item-stats"></div>',
}));

jest.mock('@/components/pokemon/PokemonItemType.vue', () => ({
  name: 'PokemonItemType',
  template: '<div class="mocked-pokemon-item-type"></div>',
}));

jest.mock('@/components/pokemon/PokemonItemEvolutions.vue', () => ({
  name: 'PokemonItemEvolutions',
  template: '<div class="mocked-pokemon-item-evolutions"></div>',
}));

jest.mock('@/components/pokemon/PokemonItemVariants.vue', () => ({
  name: 'PokemonItemVariants',
  template: '<div class="mocked-pokemon-item-variants"></div>',
}));

jest.mock('@/components/pokemon/PokemonItemDescription.vue', () => ({
  name: 'PokemonItemDescription',
  template: '<div class="mocked-pokemon-item-description"></div>',
}));

jest.mock('@/lib/store', () => ({
  state: {
    allPokemons: [
      { id: 1, name: 'pikachu' },
      { id: 2, name: 'squirtle' },
      { id: 3, name: 'charmander' },
    ],
    pokemon: new Map([
      [
        1,
        {
          id: 1,
          name: 'pikachu',
          image: 'pikachu.png',
          stats: [],
          types: [],
          evolutions: [],
          flavorTexts: [],
          characteristic: '',
          weight: 0,
          height: 0,
          color: '',
          shape: '',
          generation: '',
          habitat: '',
          variants: [],
        },
      ],
      [
        2,
        {
          id: 2,
          name: 'squirtle',
          image: 'squirtle.png',
          stats: [],
          types: [],
          evolutions: [],
          flavorTexts: [],
          characteristic: '',
          weight: 0,
          height: 0,
          color: '',
          shape: '',
          generation: '',
          habitat: '',
          variants: [],
        },
      ],
      [
        3,
        {
          id: 3,
          name: 'charmander',
          image: 'charmander.png',
          stats: [],
          types: [],
          evolutions: [],
          flavorTexts: [],
          characteristic: '',
          weight: 0,
          height: 0,
          color: '',
          shape: '',
          generation: '',
          habitat: '',
          variants: [],
        },
      ],
    ]),
  },
  getPokemon: jest.fn(),
}));

jest.mock('@/lib/helpers', () => ({
  getPageBackgroundElement: jest.fn(() => ({
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    scrollTop: 0,
  })),
  capitalizeWord: jest.fn(),
  scrollToTopOfBackgroundPage: jest.fn(),
}));

describe('PokemonItem', () => {
  let wrapper;

  beforeEach(() => {
    Vue.directive('observe-visibility', {});
    wrapper = shallowMount(PokemonItem, {
      propsData: {
        loading: false,
      },
      mocks: {
        $route: {
          name: 'pokemon',
          params: {
            id: 2,
          },
        },
        $router: {
          push: jest.fn(),
        },
      },
    });
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders its respective components', () => {
    expect(wrapper.find('basebutton-stub').exists()).toBeTruthy();
    expect(wrapper.find('pokemonitemheader-stub').exists()).toBeTruthy();
    expect(wrapper.find('pokemonitemstats-stub').exists()).toBeTruthy();
    expect(wrapper.find('pokemonitemtype-stub').exists()).toBeTruthy();
    expect(wrapper.find('pokemonitemevolutions-stub').exists()).toBeTruthy();
    expect(wrapper.find('pokemonitemvariants-stub').exists()).toBeFalsy();
    expect(wrapper.find('pokemonitemdescription-stub').exists()).toBeTruthy();
  });

  it('navigates to next pokemon page when clicked', () => {
    const routerPushSpy = jest.spyOn(wrapper.vm.$router, 'push');
    const navigateToPokemonSpy = jest.spyOn(wrapper.vm, 'navigateToPokemon');
    wrapper.vm.goToPreviousPokemon();
    expect(navigateToPokemonSpy).toHaveBeenCalledWith('pikachu');
    expect(routerPushSpy).toHaveBeenCalledWith({
      name: 'pokemon',
      params: { id: 'pikachu' },
    });
  });

  it('navigates to previous pokemon page when clicked', () => {
    const routerPushSpy = jest.spyOn(wrapper.vm.$router, 'push');
    const navigateToPokemonSpy = jest.spyOn(wrapper.vm, 'navigateToPokemon');
    wrapper.vm.goToNextPokemon();
    expect(navigateToPokemonSpy).toHaveBeenCalledWith('charmander');
    expect(routerPushSpy).toHaveBeenCalledWith({
      name: 'pokemon',
      params: { id: 'charmander' },
    });
  });

  it('disables previous button when there are no previous pokemons', () => {
    wrapper = shallowMount(PokemonItem, {
      propsData: {
        loading: false,
      },
      mocks: {
        $route: {
          name: 'pokemon',
          params: {
            id: 1,
          },
        },
        $router: {
          push: jest.fn(),
        },
      },
    });
    expect(
      wrapper.findAll('basebutton-stub').at(0).attributes().disabled
    ).toBeTruthy();
    expect(
      wrapper.findAll('basebutton-stub').at(1).attributes().disabled
    ).toBeFalsy();
  });

  it('disables next button when there are no previous pokemons', () => {
    wrapper = shallowMount(PokemonItem, {
      propsData: {
        loading: false,
      },
      mocks: {
        $route: {
          name: 'pokemon',
          params: {
            id: 3,
          },
        },
        $router: {
          push: jest.fn(),
        },
      },
    });
    expect(
      wrapper.findAll('basebutton-stub').at(0).attributes().disabled
    ).toBeFalsy();
    expect(
      wrapper.findAll('basebutton-stub').at(1).attributes().disabled
    ).toBeTruthy();
  });
});
