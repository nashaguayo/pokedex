<template>
  <PokemonSearchFilters
    :allFilters="allShapes"
    :filteringFilters="filteringShape"
    :toggleFilter="toggleShapeFilter"
  />
</template>

<script>
import PokemonSearchFilters from '@/components/search/PokemonSearchFilters';
import shapes from '@/store/state/shapes';
import { toggleFilter } from '@/store/mutations/shapes';

export default {
  name: 'PokemonSearchShapes',
  components: { PokemonSearchFilters },
  computed: {
    allShapes() {
      return shapes.state.all;
    },
    filteringShape() {
      return shapes.state.filter;
    },
  },
  methods: {
    toggleShapeFilter(shape) {
      toggleFilter(shape);
    },
  },
};
</script>
