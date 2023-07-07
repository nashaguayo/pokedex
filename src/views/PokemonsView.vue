<template>
  <BasePage title="Pokemons">
    <template v-slot:content>
      <ErrorBoundary
        componentName="PokemonList"
        errorMessage="Unable to load Pokemon list"
      >
        <PokemonList />
      </ErrorBoundary>
    </template>
  </BasePage>
</template>

<script>
import BasePage from '@components/ui/BasePage.vue';
import ErrorBoundary from '@components/ui/ErrorBoundary.vue';
import PokemonList from '@components/pokemons/PokemonList.vue';

export default {
  name: 'PokemonsView',
  title: 'Pokemons',
  components: { BasePage, PokemonList, ErrorBoundary },
};
</script>
