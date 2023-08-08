<template functional>
  <div class="favorites-content-item">
    <span>{{ props.id }}</span>
    <span>{{ props.name }}</span>
    <span v-for="t in props.types" :key="t.name">{{ t.name }}</span>
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
    types: {
      type: Array,
      required: true,
    },
    smallImage: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.favorites-content-item {
}
</style>
