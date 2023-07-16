<template functional>
  <CenteredColumn class="pokemon-item-characteristics">
    <div class="status">
      <span class="right">Weight</span>
      <span>{{ props.weight }} pounds</span>
      <span class="right">Height</span>
      <span>{{ props.height }}"</span>
      <span class="characteristic">
        {{ props.characteristic }}
      </span>
    </div>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@/components/ui/CenteredColumn.vue';

export default {
  name: 'PokemonItemCharacteristics',
  components: { CenteredColumn },
  props: {
    characteristic: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-item-characteristics {
  .status {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin: 1rem 0;
    background-color: var(--secondary-background-color);
    width: 16rem;
    align-items: end;
    padding: 1rem;
    box-shadow: var(--main-box-shadow);

    span {
      color: var(--secondary-text-color);

      &.right {
        justify-self: end;
      }

      &.characteristic {
        grid-column-start: 1;
        grid-column-end: 3;
        background-color: var(--variant-background-color);
        text-align: center;
        padding: 1rem;
      }
    }
  }
}
</style>
