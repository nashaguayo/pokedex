<template>
  <div class="home">
    <div class="logo">
      <img :src="require('@assets/home-view/pokedex-logo.png')" />
      <h2>Learn all about pokemons!</h2>
    </div>
    <div class="content">
      <img src="@assets/home-view/pokemons.jpg" class="banner" />
      <RandomPokemon />
    </div>
  </div>
</template>

<script>
import RandomPokemon from '@components/home/RandomPokemon.vue';

export default {
  name: 'HomeView',
  components: {
    RandomPokemon,
  },
};
</script>

<style lang="scss" scoped>
.home {
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    .banner {
      width: 100%;
    }
  }
}
</style>
