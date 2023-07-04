<template>
  <CenteredColumn class="pokemon-item-type">
    <div v-for="t in types" :key="`type-${t}`" class="type">
      <span>{{ t.type.name }}</span>
      <div class="lights">
        <div class="shine" />
      </div>
    </div>
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
  padding: 1rem 0;

  .type {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0.5rem;
    gap: 1rem;
    align-items: center;

    .lights {
      border-radius: 50%;
      box-shadow: var(--main-box-shadow);
      height: 1rem;
      width: 1rem;
      border: 0.2rem solid var(--main-border-color);

      .shine {
        background-color: rgba(255, 255, 255, 0.5);
        width: 0.1rem;
        height: 0.1rem;
        border-radius: 50%;
        padding: 0.25rem;
      }
    }
  }
}
</style>
