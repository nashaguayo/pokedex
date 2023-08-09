<template>
  <div class="favorites-view">
    <FavoritesContent />
  </div>
</template>

<script>
import FavoritesContent from '@/components/favorites/FavoritesContent.vue';

export default {
  name: 'FavoritesView',
  components: {
    FavoritesContent,
  },
};
</script>

<style lang="scss" scoped>
.favorites-view {
  width: 100%;
}
</style>
