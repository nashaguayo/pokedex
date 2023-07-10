<template>
  <CenteredColumn class="guess-pokemon">
    <div class="background-image">
      <img
        :src="image"
        alt="mysterious pokemon"
        :class="{ 'is-guessing': !hasWon, 'has-won': hasWon }"
      />
    </div>
    <span
      id="game-results"
      :class="{ losing: !hasWon && playersGuess.length, winning: hasWon }"
      >{{ gameResultsText }}</span
    >
    <BaseInput
      name="guess"
      placeholder="Insert pokemon name here..."
      :model="playersGuess"
      @inputValueChanged="setPlayersGuess"
      :reset="reset"
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
      reset: false,
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
        ? 'Guess the Pokemon!'
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
      this.reset = true;
      this.playersGuess = '';
    },
    setPlayersGuess(playersGuess) {
      this.reset = false;
      this.playersGuess = playersGuess;
    },
  },
};
</script>

<style lang="scss" scoped>
.guess-pokemon {
  margin: 2rem 0;

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

  #game-results {
    margin-top: 1rem;
    margin-bottom: -1rem;
    text-align: center;

    &.losing {
      color: red;
    }

    &.winning {
      color: green;
    }
  }
}
</style>
