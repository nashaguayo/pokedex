<template>
  <PokemonSearchFilters
    :allFilters="allColors"
    :filteringFilters="filteringColors"
    :toggleFilter="toggleColorFilter"
  />
</template>

<script>
import PokemonSearchFilters from '@/components/search/PokemonSearchFilters';
import store from '@/lib/store';

export default {
  name: 'PokemonSearchColors',
  components: { PokemonSearchFilters },
  computed: {
    allColors() {
      return store.state.allColors;
    },
    filteringColors() {
      return store.state.search.colors;
    },
  },
  methods: {
    toggleColorFilter(color) {
      store.toggleColorFilter(color);
    },
  },
};
</script>
