<template>
  <div class="search-view">
    <ErrorBoundary
      componentName="PokemonSearch"
      errorMessage="Unable to load search"
    >
      <PokemonSearch />
    </ErrorBoundary>
  </div>
</template>

<script>
import ErrorBoundary from '@/components/ui/ErrorBoundary.vue';
import PokemonSearch from '@/components/search/PokemonSearch';

export default {
  name: 'SearchView',
  title: 'Search for Pokemons',
  components: { ErrorBoundary, PokemonSearch },
};
</script>

<style lang="scss" scoped>
.search-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
