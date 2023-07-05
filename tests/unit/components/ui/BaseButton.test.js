import { shallowMount } from '@vue/test-utils';
import BaseButton from '@components/ui/BaseButton';

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
});
