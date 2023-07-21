<template functional>
  <div class="pokemon-item-characteristics">
    <div class="status">
      <span class="right">Weight</span>
      <span>{{ props.weight }} pounds</span>
      <span class="right">Height</span>
      <span>{{ props.height }}"</span>
      <span class="right">Color</span>
      <span :style="{ color: props.color }">{{ props.color }}</span>
      <span class="right">Shape</span>
      <span>{{ props.shape }}</span>
      <span class="characteristic">
        {{ props.characteristic }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonItemCharacteristics',
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
    color: {
      type: String,
      required: true,
    },
    shape: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-item-characteristics {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

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

    @media (min-width: $min-width-second-break) {
      width: 23rem;
    }

    @media (min-width: $min-width-third-break) {
      width: 33rem;
    }

    @media (min-width: $min-width-fourth-break) {
      width: auto;
    }

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
