<template>
  <PokemonSearchFilters
    :allFilters="allColors"
    :filteringFilters="filteringColor"
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
    filteringColor() {
      return store.state.search.color;
    },
  },
  methods: {
    toggleColorFilter(color) {
      store.toggleColorFilter(color);
    },
  },
};
</script>
