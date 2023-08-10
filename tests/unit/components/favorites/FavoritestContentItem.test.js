import { mount } from '@vue/test-utils';
import FavoritesContentItem from '@/components/favorites/FavoritesContentItem.vue';

describe('FavoritesContentItem', () => {
  const props = {
    id: 1,
    name: 'Test Item',
    image: 'test-image.jpg',
  };

  it('renders correctly with props', () => {
    const wrapper = mount(FavoritesContentItem, {
      propsData: props,
    });

    expect(wrapper.find('.id').text()).toBe(`#${props.id}`);
    expect(wrapper.find('.image').element.style.backgroundImage).toBe(
      `url(${props.image})`
    );
    expect(wrapper.find('.name').text()).toBe(props.name);
  });

  it('has the correct CSS classes and styles', () => {
    const wrapper = mount(FavoritesContentItem, {
      propsData: props,
    });

    expect(wrapper.classes()).toContain('favorites-content-item');

    const imageElement = wrapper.find('.image');
    expect(imageElement.classes()).toContain('image');

    const backgroundElement = wrapper.find('.background');
    expect(backgroundElement.classes()).toContain('background');

    const nameElement = wrapper.find('.name');
    expect(nameElement.classes()).toContain('name');
  });
});
