<template>
  <PokemonSearchFilters
    :allFilters="allTypes"
    :filteringFilters="filteringTypes"
    :toggleFilter="toggleTypeFilter"
  />
</template>

<script>
import PokemonSearchFilters from '@/components/search/PokemonSearchFilters';
import types from '@/store/state/types';
import { toggleFilter } from '@/store/mutations/types';

export default {
  name: 'PokemonSearchTypes',
  components: { PokemonSearchFilters },
  computed: {
    allTypes() {
      return types.state.all;
    },
    filteringTypes() {
      return types.state.filters;
    },
  },
  methods: {
    toggleTypeFilter(type) {
      toggleFilter(type);
    },
  },
};
</script>
