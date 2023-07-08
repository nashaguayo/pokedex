<template>
  <CenteredColumn>
    <ErrorBoundary
      componentName="LogoAndBanner"
      errorMessage="Logo and Banner unable to load"
    >
      <LogoAndBanner subtitle="Learn all about pokemons!" />
    </ErrorBoundary>
    <ErrorBoundary
      componentName="RandomPokemon"
      errorMessage="Unable to load random pokemon"
    >
      <RandomPokemon />
    </ErrorBoundary>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import ErrorBoundary from '@components/ui/ErrorBoundary.vue';
import LogoAndBanner from '@components/home/LogoAndBanner.vue';
import RandomPokemon from '@components/home/RandomPokemon.vue';

export default {
  name: 'HomeView',
  title: 'Learn all about Pokemons!',
  components: {
    CenteredColumn,
    ErrorBoundary,
    LogoAndBanner,
    RandomPokemon,
  },
};
</script>
