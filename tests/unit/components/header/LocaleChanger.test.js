import { shallowMount } from '@vue/test-utils';
import LocaleChanger from '@/components/header/LocaleChanger';

jest.mock('@/lib/localStorage', () => ({
  setLanguage: jest.fn(),
}));

jest.mock('@/lib/store', () => ({
  clearPokemon: jest.fn(),
  clearPokemonListAndRefresh: jest.fn(),
}));

jest.mock('@/store/mutations/other', () => ({
  initializeStore: jest.fn(),
}));

describe('LocaleChanger', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(LocaleChanger, {
      mocks: {
        $i18n: {
          locale: 'en',
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('updates language when a new option is selected', async () => {
    const wrapper = shallowMount(LocaleChanger, {
      mocks: {
        $i18n: {
          locale: 'en',
        },
      },
      stubs: ['option'],
    });
    await wrapper.find('select').setValue('es');
    expect(wrapper.vm.$i18n.locale).toBe('es');
  });
});
