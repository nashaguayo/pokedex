<template>
  <PokemonSearchFilters
    :allFilters="allColors"
    :filteringFilters="filteringColor"
    :toggleFilter="toggleColorFilter"
  />
</template>

<script>
import PokemonSearchFilters from '@/components/search/PokemonSearchFilters';
import colors from '@/store/state/colors';
import { toggleFilter } from '@/store/mutations/colors';

export default {
  name: 'PokemonSearchColors',
  components: { PokemonSearchFilters },
  computed: {
    allColors() {
      return colors.state.all;
    },
    filteringColor() {
      return colors.state.filter;
    },
  },
  methods: {
    toggleColorFilter(color) {
      toggleFilter(color);
    },
  },
};
</script>
