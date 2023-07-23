import { shallowMount } from '@vue/test-utils';
import BaseButton from '@/components/ui/BaseButton';

describe('BaseButton', () => {
  let wrapper;
  let onClickHandler;

  beforeEach(() => {
    onClickHandler = jest.fn();
    wrapper = shallowMount(BaseButton, {
      propsData: {
        onClickHandler,
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('calls onClickHandler method when the button is clicked', async () => {
    await wrapper.trigger('click');
    expect(onClickHandler).toHaveBeenCalled();
  });

  it('renders the default slot content', () => {
    const buttonText = 'Click Me';
    wrapper = shallowMount(BaseButton, {
      slots: {
        default: buttonText,
      },
      propsData: {
        onClickHandler,
      },
    });
    expect(wrapper.text()).toBe(buttonText);
  });

  it('applies the "shrink-animation" class when "wasClicked" is true', async () => {
    expect(wrapper.classes('shrink-animation')).toBe(false);
    await wrapper.vm.handleAndAnimate();
    expect(wrapper.classes('shrink-animation')).toBe(true);
  });

  it('applies the "background-variant" class when "variant" prop is true', async () => {
    wrapper = shallowMount(BaseButton, {
      propsData: {
        variant: true,
      },
    });
    expect(wrapper.classes('background-variant')).toBe(true);
  });

  it('disables the button when "disabled" prop is true', async () => {
    expect(wrapper.attributes('disabled')).toBeFalsy();
    await wrapper.setProps({ disabled: true });
    expect(wrapper.attributes('disabled')).toBe('disabled');
  });

  it('calls the onClickHandler method when the button is clicked', async () => {
    await wrapper.find('button').trigger('click');
    expect(onClickHandler).toHaveBeenCalled();
  });

  it('renders the default slot content', () => {
    const buttonText = 'Click Me';
    wrapper = shallowMount(BaseButton, {
      slots: {
        default: buttonText,
      },
      propsData: {
        onClickHandler,
      },
    });
    expect(wrapper.text()).toBe(buttonText);
  });

  it('applies the "big" class when "big" prop is true', async () => {
    wrapper = shallowMount(BaseButton, {
      propsData: {
        big: true,
      },
    });
    expect(wrapper.classes('big')).toBe(true);
  });

  it('applies the "small" class when "small" prop is true', async () => {
    wrapper = shallowMount(BaseButton, {
      propsData: {
        small: true,
      },
    });
    expect(wrapper.classes('small')).toBe(true);
  });

  it('sets "wasClicked" to false after the shrink animation ends', async () => {
    wrapper.setData({ wasClicked: true });
    await wrapper.trigger('animationend');
    expect(wrapper.vm.wasClicked).toBe(false);
  });

  it('has correct default props', () => {
    expect(wrapper.props('disabled')).toBe(false);
    expect(wrapper.props('variant')).toBe(false);
    expect(wrapper.props('big')).toBe(false);
    expect(wrapper.props('small')).toBe(false);
  });

  it('renders the default slot content with default text', () => {
    const defaultButtonText = 'Click Me';
    expect(wrapper.text()).toBe(defaultButtonText);
  });

  it('renders the default slot content with custom text', () => {
    const customButtonText = 'Custom Text';
    wrapper = shallowMount(BaseButton, {
      slots: {
        default: customButtonText,
      },
      propsData: {
        onClickHandler,
      },
    });
    expect(wrapper.text()).toBe(customButtonText);
  });
});
