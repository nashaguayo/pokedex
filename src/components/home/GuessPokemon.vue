<template>
  <div class="guess-pokemon">
    <div class="background-image">
      <BaseLoader :loading="loading" :enableDarkmodeColorSwitch="false">
        <img
          :src="image"
          alt="mysterious pokemon"
          :class="{ 'is-guessing': !hasWon, 'show-pokemon': hasWon || hasLost }"
        />
      </BaseLoader>
    </div>
    <transition name="flip" mode="out-in">
      <span
        class="game-results"
        :key="
          $t('home.guessPokemon.gameResults', { playersGuess, hasLost, name })
        "
        :class="{ losing: !hasWon && playersGuess.length, winning: hasWon }"
      >
        {{
          $t('home.guessPokemon.gameResults', { playersGuess, hasLost, name })
        }}
      </span>
    </transition>
    <div class="players-guess">
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
        ref="playersGuess"
        class="guess-input"
      />
      <BaseChevron
        direction="right"
        class="send-guess"
        :small="true"
        :onClickHandler="sendPlayersGuess"
      />
    </div>
    <transition name="flip" mode="out-in">
      <span
        :key="
          $t('home.guessPokemon.triesLeft', {
            hasWon,
            hasLost,
            timerCount,
            name,
            tries,
          })
        "
        class="tries-left"
        :class="{ 'last-try': tries === 1 }"
        v-html="
          $t('home.guessPokemon.triesLeft', {
            hasWon,
            hasLost,
            timerCount,
            name,
            tries,
          })
        "
      ></span>
    </transition>
    <transition name="flip" appear>
      <div v-if="guessesInARow > 0" class="guesses-in-a-row">
        <span>{{ $t('home.guessPokemon.guessesInARow') }}</span
        ><br />
        <MetalStars v-if="goldStars" :amountOfStars="goldStars" metal="gold" />
        <MetalStars
          v-if="silverStars"
          :amountOfStars="silverStars"
          metal="silver"
        />
        <MetalStars
          v-if="bronzeStars"
          :amountOfStars="bronzeStars"
          metal="bronze"
        />
      </div>
    </transition>
    <BaseButton
      :big="true"
      :onClickHandler="getNewMysteryPokemonAndRefreshGuessesInARow"
      :disabled="hasWon"
      :variant="true"
      :small="true"
      class="retrieve-new-pokemon"
    >
      {{ $t('home.guessPokemon.baseButton', { hasWon, hasLost }) }}
    </BaseButton>
  </div>
</template>

<script>
import BaseLoader from '@/components/ui/BaseLoader';
import BaseInput from '@/components/ui/BaseInput';
import BaseButton from '@/components/ui/BaseButton';
import BaseChevron from '@/components/ui/BaseChevron';
import MetalStars from '@/components/home/MetalStars';
import {
  getNewMysteryPokemon,
  setMysteryPokemonFromLS,
} from '@/store/mutations/game';
import {
  getGuessesInARow,
  getTriesLeft,
  setGuessesInARow,
  setTriesLeft,
} from '@/lib/localStorage';
import other from '@/store/state/other';
import game from '@/store/state/game';

export default {
  name: 'GuessPokemon',
  components: {
    BaseLoader,
    BaseButton,
    BaseInput,
    BaseChevron,
    MetalStars,
  },
  data() {
    return {
      playersGuess: '',
      reset: false,
      tries: getTriesLeft() ?? 3,
      guessesInARow: getGuessesInARow() ?? 0,
      loading: false,
      timerCount: 5,
      timerEnabled: false,
      bronzeStars: 0,
      silverStars: 0,
      goldStars: 0,
      platinumStars: 0,
      focus: false,
      isFirstTime: true,
      timerEnabledTimeout: null,
      timerCountTimeout: null,
    };
  },
  computed: {
    image() {
      return game.state.image;
    },
    name() {
      return game.state.name;
    },
    storeHasLoaded() {
      return other.state.storeHasLoaded;
    },
    hasWon() {
      return this.playersGuess.toLowerCase() === this.name;
    },
    hasLost() {
      return !this.hasWon && this.tries === 0;
    },
  },
  watch: {
    storeHasLoaded: {
      immediate: true,
      async handler(storeHasLoaded) {
        if (storeHasLoaded && !this.image && !this.name) {
          const successful = setMysteryPokemonFromLS();
          if (!successful) {
            await this.getNewMysteryPokemon();
          }
        }
      },
    },
    hasWon(hasWon) {
      if (hasWon) {
        this.timerEnabled = true;
        this.tries = 3;
        this.guessesInARow++;
        setTriesLeft(this.tries);
        setGuessesInARow(this.guessesInARow);
      }
    },
    hasLost(hasLost) {
      if (hasLost) {
        this.guessesInARow = 0;
        setGuessesInARow(0);
      }
    },
    timerEnabled(enabled) {
      if (enabled) {
        this.timerEnabledTimeout = setTimeout(() => {
          this.timerCount--;
        }, 1000);
      } else {
        this.timerCount = 5;
        clearTimeout(this.timerEnabledTimeout);
      }
    },
    timerCount(count) {
      if (count > 0 && this.timerEnabled) {
        this.timerCountTimeout = setTimeout(() => {
          this.timerCount--;
        }, 1000);
        return;
      } else if (count === 0) {
        this.timerEnabled = false;
        this.getNewMysteryPokemon();
        clearTimeout(this.timerCountTimeout);
      }
    },
    guessesInARow: {
      immediate: true,
      handler(guesses) {
        if (guesses < 5) {
          this.goldStars = 0;
          this.silverStars = 0;
          this.bronzeStars = guesses;
          return;
        }

        if (guesses < 25) {
          this.goldStars = 0;
          this.silverStars = Math.floor(guesses / 5);
          this.bronzeStars = guesses % 5;
          return;
        }

        this.goldStars = Math.floor(guesses / 25);
        this.silverStars = Math.floor((guesses % 25) / 5);
        this.bronzeStars = (guesses % 25) % 5;
      },
    },
  },
  methods: {
    async getNewMysteryPokemon() {
      this.loading = true;
      await getNewMysteryPokemon();
      this.reset = true;
      this.tries = 3;
      this.loading = false;

      console.log(`You want to cheat? Mystery pokemon is: ${this.name}`);

      if (!this.isFirstTime) {
        this.focus = true;
      } else {
        this.isFirstTime = false;
      }
    },
    setPlayersGuess(playersGuess) {
      this.reset = false;
      this.playersGuess = playersGuess;
      if (!this.hasWon && playersGuess.length) {
        this.tries--;
        setTriesLeft(this.tries);
      }
    },
    getNewMysteryPokemonAndRefreshGuessesInARow() {
      this.guessesInARow = 0;
      setGuessesInARow(0);
      this.getNewMysteryPokemon();
    },
    sendPlayersGuess() {
      this.focus = true;
      document.body.dispatchEvent(
        new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          keyCode: 13,
        })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.guess-pokemon {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 6rem;
  max-width: 25rem;

  @media (min-width: $min-width-third-break) {
    margin-bottom: 2.5rem;
  }

  .background-image {
    background-image: url(@/assets/images/home/mystery-pokemon.jpg);
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

  .game-results {
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

  .players-guess {
    display: flex;
    width: 80%;
    align-items: center;
    gap: 0.5rem;

    .guess-input {
      justify-self: start;
    }

    .send-guess {
      max-width: 1.2rem;
    }
  }

  .tries-left {
    margin-top: -1.5rem;
    margin-bottom: 1rem;
    font-family: 'Kanit';

    &.last-try {
      color: red;
    }
  }

  .guesses-in-a-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
  }

  .retrieve-new-pokemon {
    width: 80%;
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
</style>
