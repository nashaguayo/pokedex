<template>
  <div class="colors">
    <div
      class="color"
      :class="{
        active: filteringColors.includes(c),
        inactive: !filteringColors.includes(c),
      }"
      v-for="c in allColors"
      :key="`color-${c}`"
      @click="toggleColorFilter(c)"
    >
      {{ c }}
    </div>
  </div>
</template>

<script>
import store from '@/lib/store';

export default {
  name: 'PokemonSearchColors',
  computed: {
    allColors() {
      return store.state.allColors;
    },
    filteringColors() {
      return store.state.search.colors;
    },
  },
  methods: {
    toggleColorFilter(color) {
      store.toggleColorFilter(color);
    },
  },
};
</script>

<style lang="scss" scoped>
.colors {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  font-family: 'Upheaval';
  gap: 0.5rem;
  padding: 1rem 0;
  border-bottom: 0.2rem solid var(--main-border-color);
  width: 100%;

  @media (min-width: $min-width-third-break) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: $min-width-fourth-break) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: $min-width-fifth-break) {
    grid-template-columns: repeat(6, 1fr);
  }

  .color {
    border-radius: 1rem;
    padding: 0.3rem;
    transition: all 0.3s;
    cursor: pointer;

    &.inactive {
      background-color: var(--disabled-button-background-color);
    }

    &.active {
      background-color: var(--secondary-background-color);
      color: var(--secondary-text-color);
    }
  }
}
</style>
