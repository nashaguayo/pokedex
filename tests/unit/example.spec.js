import { shallowMount } from '@vue/test-utils';
import BasePage from '@components/ui/BasePage.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(BasePage);
    expect(BasePage).toBe().present();
  });
});
