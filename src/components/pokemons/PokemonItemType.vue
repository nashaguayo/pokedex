<template>
  <CenteredColumn class="pokemon-item-type">
    <span v-for="t in types" :key="`type-${t}`">{{ t.type.name }}</span>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';

export default {
  name: 'PokemonItemType',
  components: { CenteredColumn },
  props: {
    types: Array,
    default: [],
  },
};
</script>

<style lang="scss" scoped>
.pokemon-item-type {
  background-color: var(--main-background-color);
  width: 100%;
  margin-top: 2rem;
}
</style>
