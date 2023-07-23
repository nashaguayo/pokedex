<template>
  <PokemonSearchFilters
    :allFilters="allTypes"
    :filteringFilters="filteringTypes"
    :toggleFilter="toggleTypeFilter"
  />
</template>

<script>
import PokemonSearchFilters from '@/components/search/PokemonSearchFilters';
import store from '@/lib/store';

export default {
  name: 'PokemonSearchTypes',
  components: { PokemonSearchFilters },
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
