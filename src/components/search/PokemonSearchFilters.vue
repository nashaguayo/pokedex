<template functional>
  <div class="pokemon-search-filters">
    <div
      class="filter"
      :class="{
        active:
          typeof props.filteringFilters === 'string'
            ? props.filteringFilters === f
            : props.filteringFilters.includes(f),
        inactive:
          typeof props.filteringFilters === 'string'
            ? props.filteringFilters !== f
            : !props.filteringFilters.includes(f),
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
      type: [Array, String],
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
.pokemon-search-filters {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  font-family: 'Upheaval';
  gap: 0.5rem;
  padding: 1rem 0;
  border-bottom: 0.2rem solid var(--main-border-color);
  width: calc(100% - 4rem);
  position: relative;
  z-index: 4;
  background-color: var(--main-background-color);

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
    font-size: 0.8rem;

    @media (min-width: $min-width-first-break) {
      font-size: 1rem;
    }

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
