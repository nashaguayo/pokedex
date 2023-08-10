<template>
  <BaseLoader :coverPage="true" :loading="!storeHasLoaded">
    <div class="home-view">
      <ErrorBoundary
        componentName="LogoAndBanner"
        errorMessage="Logo and Banner unable to load"
      >
        <LogoAndBanner :subtitle="$t('home.welcomeMessage')" />
      </ErrorBoundary>
      <ErrorBoundary
        componentName="RandomPokemon"
        errorMessage="Unable to load random pokemon"
      >
        <RandomPokemon />
      </ErrorBoundary>
      <ErrorBoundary
        componentName="GuessPokemon"
        errorMessage="Unable to load mini-game"
      >
        <GuessPokemon />
      </ErrorBoundary></div
  ></BaseLoader>
</template>

<script>
import ErrorBoundary from '@/components/ui/ErrorBoundary.vue';
import LogoAndBanner from '@/components/home/LogoAndBanner.vue';
import RandomPokemon from '@/components/home/RandomPokemon.vue';
import GuessPokemon from '@/components/home/GuessPokemon.vue';
import BaseLoader from '@/components/ui/BaseLoader.vue';
import { initializeStore } from '@/store/mutations/other';
import other from '@/store/state/other';

export default {
  name: 'HomeView',
  title: 'Learn all about Pokemons!',
  components: {
    ErrorBoundary,
    LogoAndBanner,
    RandomPokemon,
    GuessPokemon,
    BaseLoader,
  },
  computed: {
    storeHasLoaded() {
      return other.state.storeHasLoaded;
    },
  },
  async created() {
    if (!this.storeHasLoaded) {
      await initializeStore();
    }
  },
};
</script>

<style lang="scss" scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
