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
    <transition name="flip" mode="out-in">
      <span
        id="game-results"
        :key="gameResultsText"
        :class="{ losing: !hasWon && playersGuess.length, winning: hasWon }"
        >{{ gameResultsText }}</span
      >
    </transition>
    <BaseInput
      name="guess"
      placeholder="Insert pokemon name here..."
      :model="playersGuess"
      @inputValueChanged="setPlayersGuess"
      :reset="reset"
      :lazy="true"
      :disabled="hasLost || hasWon"
      :focus="focus"
      @focused="focus = false"
    />
    <transition name="flip" mode="out-in">
      <span :key="triesLeftText" class="tries-left">{{ triesLeftText }}</span>
    </transition>
    <transition name="flip" appear>
      <CenteredColumn v-if="guessesInARow > 0" class="guesses-in-a-row">
        <span>Guesses in a row</span><br />
        <div class="stars">
          <transition-group name="zoom-in" appear>
            <FontAwesomeIcon
              v-for="guess in goldStars"
              :key="`guess-${guess}`"
              icon="fa-solid fa-star"
              class="gold-star"
            />
          </transition-group>
        </div>
        <div class="stars">
          <transition-group name="zoom-in" appear>
            <FontAwesomeIcon
              v-for="guess in silverStars"
              :key="`guess-${guess}`"
              icon="fa-solid fa-star"
              class="silver-star"
            />
          </transition-group>
        </div>
        <div class="stars">
          <transition-group name="zoom-in" appear>
            <FontAwesomeIcon
              v-for="guess in bronzeStars"
              :key="`guess-${guess}`"
              icon="fa-solid fa-star"
              class="bronze-star"
            />
          </transition-group>
        </div>
      </CenteredColumn>
    </transition>
    <BaseButton
      :big="true"
      :onClickHandler="getNewMysteryPokemonAndRefreshGuessesInARow"
      :disabled="hasWon"
    >
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
      timerCount: 5,
      timerEnabled: false,
      bronzeStars: 0,
      silverStars: 0,
      goldStars: 0,
      platinumStars: 0,
      focus: false,
      isFirstTime: true,
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
      return this.hasWon
        ? `Getting new Pokemon in ${this.timerCount}...`
        : this.hasLost
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
      return !this.hasWon && this.tries === 0;
    },
    baseButtonText() {
      return this.hasWon || this.hasLost ? 'New Pokemon!' : 'I Give Up!';
    },
  },
  watch: {
    hasWon(hasWon) {
      if (hasWon) {
        this.timerEnabled = true;
        this.guessesInARow++;
      }
    },
    hasLost(hasLost) {
      if (hasLost) {
        this.guessesInARow = 0;
      }
    },
    timerEnabled(enabled) {
      if (enabled) {
        setTimeout(() => {
          this.timerCount--;
        }, 1000);
      } else {
        this.timerCount = 5;
      }
    },
    timerCount(count) {
      if (count > 0 && this.timerEnabled) {
        setTimeout(() => {
          this.timerCount--;
        }, 1000);
        return;
      } else if (count === 0) {
        this.timerEnabled = false;
        this.getNewMysteryPokemon();
      }
    },
    guessesInARow(guesses) {
      if (guesses < 5) {
        this.bronzeStars = guesses;
        return;
      }

      if (guesses < 25) {
        this.silverStars = Math.floor(guesses / 5);
        this.bronzeStars = guesses % 5;
        return;
      }

      this.goldStars = Math.floor(guesses / 25);
      this.silverStars = Math.floor((guesses % 25) / 5);
      this.bronzeStars = (guesses % 25) % 5;
    },
  },
  async created() {
    await this.getNewMysteryPokemon('created');
  },
  methods: {
    async getNewMysteryPokemon() {
      this.loading = true;
      await store.getNewMysteryPokemon();
      this.reset = true;
      this.playersGuess = '';
      this.tries = 3;
      this.loading = false;

      if (!this.isFirstTime) {
        this.focus = true;
      } else {
        this.isFirstTime = false;
      }
    },
    setPlayersGuess(playersGuess) {
      this.reset = false;
      this.playersGuess = playersGuess;
      if (!this.hasWon) {
        this.tries--;
      }
    },
    getNewMysteryPokemonAndRefreshGuessesInARow() {
      this.guessesInARow = 0;
      this.getNewMysteryPokemon();
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
    .gold-star {
      color: #edb200;
      margin: 0 0.1rem;
    }
    .silver-star {
      color: #b5b4b0;
      margin: 0 0.1rem;
    }
    .bronze-star {
      color: #73440f;
      margin: 0 0.1rem;
    }
  }
}

.flip-enter-active,
.flip-leave-active {
  transition: transform 0.3s;
}

.flip-enter,
.flip-leave-to {
  transform: scaleY(0);
}

.zoom-in-enter-active,
.zoom-in-leave-active,
.zoom-in-move {
  transition: transform 0.3s;
}

.zoom-in-enter,
.zoom-in-leave-to {
  transform: scale(0);
}
</style>
