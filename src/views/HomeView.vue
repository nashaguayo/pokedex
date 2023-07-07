<template>
  <BasePage>
    <template v-slot:header>
      <ErrorBoundary
        componentName="LogoAndBanner"
        errorMessage="Logo and Banner unable to load"
      >
        <LogoAndBanner subtitle="Learn all about pokemons!" />
      </ErrorBoundary>
    </template>
    <template v-slot:content>
      <ErrorBoundary
        componentName="RandomPokemon"
        errorMessage="Unable to load random pokemon"
      >
        <RandomPokemon />
      </ErrorBoundary>
    </template>
  </BasePage>
</template>

<script>
import BasePage from '@components/ui/BasePage.vue';
import ErrorBoundary from '@components/ui/ErrorBoundary.vue';
import LogoAndBanner from '@components/home/LogoAndBanner.vue';
import RandomPokemon from '@components/home/RandomPokemon.vue';

export default {
  name: 'HomeView',
  title: 'Learn all about Pokemons!',
  components: {
    BasePage,
    ErrorBoundary,
    LogoAndBanner,
    RandomPokemon,
  },
};
</script>
