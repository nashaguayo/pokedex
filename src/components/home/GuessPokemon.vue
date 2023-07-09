<template>
  <CenteredColumn class="guess-pokemon">
    <h2>Guess the Pokemon</h2>
    <div class="background-image">
      <img :src="image" alt="mysterious pokemon" />
    </div>
    <BaseButton :big="true" :onClickHandler="getNewMysteryPokemon">
      Guess New Pokemon
    </BaseButton>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn';
import BaseButton from '@components/ui/BaseButton';
import store from '@lib/store';

export default {
  name: 'GuessPokemon',
  components: { CenteredColumn, BaseButton },
  computed: {
    image() {
      return store.state.game.image;
    },
    name() {
      return store.state.game.name;
    },
  },
  created() {
    this.getNewMysteryPokemon();
  },
  methods: {
    getNewMysteryPokemon() {
      store.getNewMysteryPokemon();
    },
  },
};
</script>

<style lang="scss" scoped>
.guess-pokemon {
  margin-bottom: 2rem;

  max-width: 25rem;
  .background-image {
    background-image: url(@assets/home/mystery-pokemon.jpg);
    background-size: cover;
    width: 20rem;
    height: 12rem;
    border: 0.2rem solid var(--main-border-color);
    box-shadow: var(--main-box-shadow);
    border-radius: 1rem;
    margin-bottom: 2rem;

    img {
      margin: 1rem;
      filter: brightness(0);
      width: 10rem;
    }
  }
}
</style>
