<template>
  <div class="favorites-content-item" @click="$emit('goToPage', name)">
    <span class="id" v-if="id">#{{ id }}</span>
    <div class="image-container">
      <div class="image" :style="{ backgroundImage: `url(${image})` }"></div>
      <div class="background" />
    </div>
    <span class="name">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: 'FavoritesContentItem',
  props: {
    id: {
      type: Number,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.favorites-content-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--favorite-cards-background-gradient);
  border: 0.2rem solid var(--main-border-color);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: var(--main-box-shadow);
  min-width: 8rem;
  cursor: pointer;

  .id {
    text-align: center;
    font-size: 2rem;
  }

  .image-container {
    position: relative;
    .image {
      position: inherit;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      width: 7rem;
      height: 7rem;
      z-index: 10;
      padding: 1rem 0;
    }

    .background {
      position: absolute;
      z-index: 5;
      background: var(--favorite-cards-screen-background-gradient);
      width: 7rem;
      height: 7rem;
      border-radius: 1rem;
      transform: translateY(calc(-100% - 1rem));
      box-shadow: var(--main-box-shadow);
    }
  }

  .name {
    font-size: 1.5rem;
  }
}
</style>
