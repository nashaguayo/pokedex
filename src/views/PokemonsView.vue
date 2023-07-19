<template>
  <div class="pokemons-view">
    <ErrorBoundary
      componentName="PokemonList"
      errorMessage="Unable to load Pokemon list"
    >
      <PokemonList />
    </ErrorBoundary>
  </div>
</template>

<script>
import ErrorBoundary from '@/components/ui/ErrorBoundary.vue';
import PokemonList from '@/components/pokemons/PokemonList.vue';

export default {
  name: 'PokemonsView',
  title: 'Pokemons',
  components: { PokemonList, ErrorBoundary },
};
</script>

<style lang="scss" scoped>
.pokemons-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
