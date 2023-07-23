<template>
  <div class="types">
    <div
      class="type"
      :class="{
        active: filteringTypes.includes(t),
        inactive: !filteringTypes.includes(t),
      }"
      v-for="t in allTypes"
      :key="`type-${t}`"
      @click="toggleTypeFilter(t)"
    >
      {{ t }}
    </div>
  </div>
</template>

<script>
import store from '@/lib/store';

export default {
  name: 'PokemonSearchTypes',
  computed: {
    allTypes() {
      return store.state.allTypes;
    },
    filteringTypes() {
      return store.state.search.types;
    },
  },
  methods: {
    toggleTypeFilter(type) {
      store.toggleTypeFilter(type);
    },
  },
};
</script>

<style lang="scss" scoped>
.types {
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

  .type {
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
