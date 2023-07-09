<template>
  <div class="guess-pokemon">
    <h2>Guess the Pokemon</h2>
    <div class="background-image">
      <img :src="image" alt="mysterious pokemon" />
    </div>
  </div>
</template>

<script>
import store from '@lib/store';

export default {
  name: 'GuessPokemon',
  computed: {
    image() {
      return store.state.game.image;
    },
    name() {
      return store.state.game.name;
    },
  },
  created() {
    store.getNewMysteryPokemon();
  },
};
</script>

<style lang="scss" scoped>
.guess-pokemon {
  margin-bottom: 2rem;
  .background-image {
    background-image: url(@assets/home/mystery-pokemon.jpg);
    background-size: cover;
    width: 20rem;
    height: 12rem;
    border: 0.2rem solid var(--main-border-color);
    box-shadow: var(--main-box-shadow);
    border-radius: 1rem;

    img {
      margin: 1rem;
      filter: brightness(0);
      width: 10rem;
    }
  }
}
</style>
