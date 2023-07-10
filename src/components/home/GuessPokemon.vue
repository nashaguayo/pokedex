<template>
  <CenteredColumn class="guess-pokemon">
    <div class="background-image">
      <img
        :src="image"
        alt="mysterious pokemon"
        :class="{ 'is-guessing': !hasWon, 'show-pokemon': hasWon || hasLost }"
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
      :lazy="true"
      :disabled="hasLost || hasWon"
    />
    <span v-if="!hasWon" class="tries-left">{{ triesLeftText }}</span>
    <BaseButton :big="true" :onClickHandler="getNewMysteryPokemon">
      {{ baseButtonText }}
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
      tries: 3,
    };
  },
  computed: {
    image() {
      return store.state.game.image;
    },
    name() {
      return store.state.game.name;
    },
    triesLeftText() {
      return this.hasLost
        ? `Pokemon was ${this.name}`
        : `You have ${this.tries} ${this.tries === 1 ? 'try' : 'tries'} left`;
    },
    gameResultsText() {
      return !this.playersGuess
        ? 'Guess the Pokemon!'
        : this.hasLost
        ? 'You Lost!'
        : this.playersGuess === this.name
        ? 'You won!'
        : "That's not it...";
    },
    hasWon() {
      return this.playersGuess === this.name;
    },
    hasLost() {
      return this.tries === 0;
    },
    baseButtonText() {
      return this.hasWon || this.hasLost ? 'New Pokemon!' : 'I Give Up!';
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
      this.tries = 3;
      console.log(this.name);
    },
    setPlayersGuess(playersGuess) {
      this.tries--;
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

      &.show-pokemon {
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

  .tries-left {
    margin-top: -1.5rem;
    margin-bottom: 1rem;
  }
}
</style>
