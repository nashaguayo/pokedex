<template>
  <PokemonSearchFilters
    :allFilters="allShapes"
    :filteringFilters="filteringShapes"
    :toggleFilter="toggleShapeFilter"
  />
</template>

<script>
import PokemonSearchFilters from '@/components/search/PokemonSearchFilters';
import store from '@/lib/store';

export default {
  name: 'PokemonSearchShapes',
  components: { PokemonSearchFilters },
  computed: {
    allShapes() {
      return store.state.allShapes;
    },
    filteringShapes() {
      return store.state.search.shapes;
    },
  },
  methods: {
    toggleShapeFilter(shape) {
      store.toggleShapeFilter(shape);
    },
  },
};
</script>
