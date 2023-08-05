<template>
  <PokemonSearchFilters
    :allFilters="allGenerations"
    :filteringFilters="filteringGeneration"
    :toggleFilter="toggleGenerationFilter"
  />
</template>

<script>
import PokemonSearchFilters from '@/components/search/PokemonSearchFilters';
import store from '@/lib/store';
import generations from '@/store/state/generations';

export default {
  name: 'PokemonSearchGenerations',
  components: { PokemonSearchFilters },
  computed: {
    allGenerations() {
      return generations.state.all;
    },
    filteringGeneration() {
      return store.state.search.generation;
    },
  },
  methods: {
    toggleGenerationFilter(generation) {
      store.toggleGenerationFilter(generation);
    },
  },
};
</script>
