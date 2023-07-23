<template functional>
  <div class="filters">
    <div
      class="filter"
      :class="{
        active: props.filteringFilters.includes(f),
        inactive: !props.filteringFilters.includes(f),
      }"
      v-for="f in props.allFilters"
      :key="`filter-${f}`"
      @click="props.toggleFilter(f)"
    >
      {{ f }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonSearchFilters',
  props: {
    allFilters: {
      type: Array,
      required: true,
    },
    filteringFilters: {
      type: Array,
      required: true,
    },
    toggleFilter: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
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

  .filter {
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
