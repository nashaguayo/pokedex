<template>
  <PokemonSearchFilters
    :allFilters="allGenerations"
    :filteringFilters="filteringGeneration"
    :toggleFilter="toggleGenerationFilter"
  />
</template>

<script>
import PokemonSearchFilters from '@/components/search/PokemonSearchFilters';
import { toggleFilter } from '@/store/mutations/generations';
import generations from '@/store/state/generations';

export default {
  name: 'PokemonSearchGenerations',
  components: { PokemonSearchFilters },
  computed: {
    allGenerations() {
      return generations.state.all;
    },
    filteringGeneration() {
      return generations.state.filter;
    },
  },
  methods: {
    toggleGenerationFilter(generation) {
      toggleFilter(generation);
    },
  },
};
</script>
