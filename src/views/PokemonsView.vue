<template>
  <CenteredColumn>
    <ErrorBoundary
      componentName="PokemonList"
      errorMessage="Unable to load Pokemon list"
    >
      <PokemonList />
    </ErrorBoundary>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@/components/ui/CenteredColumn.vue';
import ErrorBoundary from '@/components/ui/ErrorBoundary.vue';
import PokemonList from '@/components/pokemons/PokemonList.vue';

export default {
  name: 'PokemonsView',
  title: 'Pokemons',
  components: { CenteredColumn, PokemonList, ErrorBoundary },
};
</script>
