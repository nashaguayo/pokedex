<template>
  <CenteredColumn class="guess-pokemon">
    <div class="background-image">
      <BaseLoader :loading="loading">
        <img
          :src="image"
          alt="mysterious pokemon"
          :class="{ 'is-guessing': !hasWon, 'show-pokemon': hasWon || hasLost }"
        />
      </BaseLoader>
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
    <CenteredColumn v-if="guessesInARow > 0" class="guesses-in-a-row">
      <span>Guesses in a row</span><br />
      <div class="stars">
        <FontAwesomeIcon
          v-for="guess in guessesInARow"
          :key="`guess-${guess}`"
          icon="fa-solid fa-star"
          class="star"
        />
      </div>
    </CenteredColumn>
    <BaseButton :big="true" :onClickHandler="getNewMysteryPokemon">
      {{ baseButtonText }}
    </BaseButton>
  </CenteredColumn>
</template>

<script>
import BaseLoader from '@components/ui/BaseLoader';
import CenteredColumn from '@components/ui/CenteredColumn';
import BaseInput from '@components/ui/BaseInput';
import BaseButton from '@components/ui/BaseButton';
import store from '@lib/store';

export default {
  name: 'GuessPokemon',
  components: { BaseLoader, CenteredColumn, BaseButton, BaseInput },
  data() {
    return {
      playersGuess: '',
      reset: false,
      tries: 3,
      guessesInARow: 0,
      loading: false,
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
  watch: {
    hasWon(hasWon) {
      if (hasWon) {
        this.guessesInARow++;
      }
    },
    hasLost(hasLost) {
      if (hasLost) {
        this.guessesInARow = 0;
      }
    },
  },
  async created() {
    this.loading = true;
    await this.getNewMysteryPokemon();
    this.loading = false;
  },
  methods: {
    async getNewMysteryPokemon() {
      this.loading = true;
      await store.getNewMysteryPokemon();
      this.reset = true;
      this.playersGuess = '';
      this.tries = 3;
      this.loading = false;
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

  .guesses-in-a-row {
    margin-bottom: 1rem;

    .star {
      color: #edb200;
      margin: 0 0.1rem;
    }
  }
}
</style>
