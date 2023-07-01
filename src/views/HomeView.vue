<template>
  <BasePage>
    <template v-slot:header>
      <LogoAndBanner subtitle="Learn all about pokemons!" />
    </template>
    <template v-slot:content>
      <RandomPokemon />
    </template>
  </BasePage>
</template>

<script>
import BasePage from '@components/ui/BasePage.vue';
import LogoAndBanner from '@components/home/LogoAndBanner.vue';
import RandomPokemon from '@components/home/RandomPokemon.vue';

export default {
  name: 'HomeView',
  components: {
    BasePage,
    LogoAndBanner,
    RandomPokemon,
  },
};
</script>
