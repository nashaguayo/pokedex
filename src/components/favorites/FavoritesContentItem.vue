<template functional>
  <div class="favorites-content-item">
    <span class="id">#{{ props.id }}</span>
    <div
      class="image"
      :style="{ backgroundImage: `url(${props.image})` }"
    ></div>
    <div class="background" />
    <span class="name">{{ props.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'FavoritesContentItem',
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.favorites-content-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--favorite-cards-background-gradient);
  margin-bottom: 1rem;
  border: 0.2rem solid var(--main-border-color);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: var(--main-box-shadow);
  width: 8rem;

  .id {
    text-align: center;
    font-size: 2rem;
  }

  .image {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 7rem;
    height: 9rem;
    z-index: 10;
  }

  .background {
    z-index: 5;
    position: absolute;
    background-color: var(--main-background-color);
    width: 7rem;
    height: 7rem;
    margin-top: 2.5rem;
    border-radius: 1rem;
    border: 0.2rem solid var(--main-border-color);
  }

  .name {
    font-size: 1.5rem;
  }
}
</style>
