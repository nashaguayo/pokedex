<template>
  <PokemonSearchFilters
    :allFilters="allShapes"
    :filteringFilters="filteringShape"
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
    filteringShape() {
      return store.state.search.shape;
    },
  },
  methods: {
    toggleShapeFilter(shape) {
      store.toggleShapeFilter(shape);
    },
  },
};
</script>
