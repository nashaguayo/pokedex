import { shallowMount } from '@vue/test-utils';
import BaseChevron from '@/components/ui/BaseChevron';

describe('BaseChevron', () => {
  let wrapper;
  let onClickHandlerMock;

  beforeEach(() => {
    onClickHandlerMock = jest.fn();
    wrapper = shallowMount(BaseChevron, {
      propsData: {
        direction: 'up',
        onClickHandler: onClickHandlerMock,
      },
      stubs: ['FontAwesomeIcon'],
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('does not call onClickHandler method when the button is clicked and "disabled" prop is true', async () => {
    await wrapper.setProps({ disabled: true });
    await wrapper.trigger('click');
    expect(onClickHandlerMock).not.toHaveBeenCalled();
  });

  it('calls onClickHandler method when the button is clicked and "disabled" prop is false', async () => {
    await wrapper.setProps({ disabled: false });
    await wrapper.trigger('click');
    expect(onClickHandlerMock).toHaveBeenCalled();
  });

  it('applies the "bounce-animation" class when "wasClicked" is true', async () => {
    wrapper.setData({ wasClicked: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.classes('bounce-animation')).toBe(true);
  });

  it('does not apply the "bounce-animation" class when "wasClicked" is false', async () => {
    wrapper.setData({ wasClicked: false });
    expect(wrapper.classes('bounce-animation')).toBe(false);
  });
});
