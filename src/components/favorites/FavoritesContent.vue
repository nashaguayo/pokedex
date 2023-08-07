<template>
  <div class="favorites-content">
    <h1>Favorites</h1>
    <FavoritesContentItem />
    <FavoritesContentItem />
    <FavoritesContentItem />
  </div>
</template>

<script>
import FavoritesContentItem from './FavoritesContentItem.vue';

export default {
  name: 'FavoritesContent',
  components: {
    FavoritesContentItem,
  },
};
</script>

<style lang="scss" scoped></style>
