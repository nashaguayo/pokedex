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

export default {
  name: 'PokemonSearchGenerations',
  components: { PokemonSearchFilters },
  computed: {
    allGenerations() {
      return store.state.allGenerations;
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
