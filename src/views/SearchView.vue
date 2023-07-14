<template>
  <CenteredColumn>
    <ErrorBoundary
      componentName="PokemonSearch"
      errorMessage="Unable to load search"
    >
      <PokemonSearch />
    </ErrorBoundary>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@/components/ui/CenteredColumn';
import ErrorBoundary from '@/components/ui/ErrorBoundary.vue';
import PokemonSearch from '@/components/search/PokemonSearch';

export default {
  name: 'SearchView',
  title: 'Search for Pokemons',
  components: { CenteredColumn, ErrorBoundary, PokemonSearch },
};
</script>
