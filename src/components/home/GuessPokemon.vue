<template>
  <CenteredColumn class="guess-pokemon">
    <h2>Guess the Pokemon</h2>
    <div class="background-image">
      <img
        :src="image"
        alt="mysterious pokemon"
        :class="{ 'is-guessing': !hasWon, 'has-won': hasWon }"
      />
    </div>
    <span
      class="game-results"
      :class="{ losing: !hasWon && playersGuess.length, winning: hasWon }"
      >{{ gameResultsText }}</span
    >
    <BaseInput
      name="guess"
      placeholder="Guess the pokemon!"
      :model="playersGuess"
      @inputValueChanged="setPlayersGuess"
    />
    <BaseButton :big="true" :onClickHandler="getNewMysteryPokemon">
      Guess New Pokemon
    </BaseButton>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn';
import BaseInput from '@components/ui/BaseInput';
import BaseButton from '@components/ui/BaseButton';
import store from '@lib/store';

export default {
  name: 'GuessPokemon',
  components: { CenteredColumn, BaseButton, BaseInput },
  data() {
    return {
      playersGuess: '',
    };
  },
  computed: {
    image() {
      return store.state.game.image;
    },
    name() {
      return store.state.game.name;
    },
    gameResultsText() {
      return !this.playersGuess
        ? 'Insert the pokemon name below!'
        : this.playersGuess === this.name
        ? 'You won!'
        : "That's not it...";
    },
    hasWon() {
      return this.playersGuess === this.name;
    },
  },
  async created() {
    await this.getNewMysteryPokemon();
  },
  methods: {
    async getNewMysteryPokemon() {
      await store.getNewMysteryPokemon();
    },
    setPlayersGuess(playersGuess) {
      this.playersGuess = playersGuess;
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

    img {
      margin: 1rem;
      width: 10rem;

      &.is-guessing {
        filter: brightness(0);
      }

      &.has-won {
        filter: none;
      }
    }
  }

  .game-results {
    margin-top: 1rem;
    margin-bottom: -1rem;
    text-align: center;

    &.losing {
      color: red !important;
    }

    &.winning {
      color: green !important;
    }
  }
}
</style>
