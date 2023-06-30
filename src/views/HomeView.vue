<template>
  <div>
    <LogoAndBanner subtitle="Learn all about pokemons!" />
    <RandomPokemon />
  </div>
</template>

<script>
import LogoAndBanner from '@/components/home/LogoAndBanner.vue';
import RandomPokemon from '@components/home/RandomPokemon.vue';

export default {
  name: 'HomeView',
  components: {
    LogoAndBanner,
    RandomPokemon,
  },
};
</script>
