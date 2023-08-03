<template>
  <BaseLoader :loading="loading">
    <div class="random-pokemon">
      <h2>Random Pokemon</h2>
      <transition-group name="slide-to-left" class="pokemons">
        <div
          class="pokedex"
          v-for="pokemon in randomPokemons"
          :key="pokemon.name"
        >
          <router-link
            :to="{ name: 'pokemon', params: { id: pokemon.name } }"
            class="link"
          >
            <div class="pokemon-image">
              <img :src="pokemon.image" alt="random pokemon" />
            </div>
            <span class="pokemon-name">{{
              pokemon.name.replace('-', ' ')
            }}</span>
          </router-link>
        </div>
      </transition-group>
    </div>
  </BaseLoader>
</template>

<script>
import BaseLoader from '@/components/ui/BaseLoader.vue';
import store from '@/lib/store';
import {
  firstBreak,
  secondBreak,
  thirdBreak,
  fourthBreak,
  fifthBreak,
  sixthBreak,
} from '@/constants/resolutions';

export default {
  name: 'RandomPokemon',
  components: { BaseLoader },
  data() {
    return {
      timer: null,
      loading: true,
    };
  },
  mounted() {
    if (this.randomPokemons.length) {
      this.loading = false;
    }
    this.timer = setInterval(async () => {
      await this.getNewRandomPokemon();
    }, 5000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {
    randomPokemons() {
      return store.state.randomPokemons;
    },
    storeHasLoaded() {
      return store.state.storeHasLoaded;
    },
  },
  watch: {
    storeHasLoaded: {
      immediate: true,
      async handler(storeHasLoaded) {
        if (storeHasLoaded) {
          let amountOfRandomPokemons = 1;
          if (window.innerWidth >= sixthBreak) {
            amountOfRandomPokemons = 7;
          } else if (window.innerWidth >= fifthBreak) {
            amountOfRandomPokemons = 6;
          } else if (window.innerWidth >= fourthBreak) {
            amountOfRandomPokemons = 5;
          } else if (window.innerWidth >= thirdBreak) {
            amountOfRandomPokemons = 4;
          } else if (window.innerWidth >= secondBreak) {
            amountOfRandomPokemons = 3;
          } else if (window.innerWidth >= firstBreak) {
            amountOfRandomPokemons = 2;
          }

          await store.getRandomPokemons(amountOfRandomPokemons);
          this.loading = false;
        }
      },
    },
  },
  methods: {
    async getNewRandomPokemon() {
      await store.getNewRandomPokemon(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.random-pokemon {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-shadow: var(--main-box-shadow);
  background-color: var(--secondary-background-color);

  h2 {
    margin-bottom: 0.5rem;
  }

  .pokemons {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    gap: 1rem;
  }

  .pokedex {
    width: 9rem;

    .link {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .pokemon-image {
      background-color: var(--main-background-color);
      border-radius: 50%;
      margin-bottom: 0.5rem;
      box-shadow: var(--main-box-shadow);
      border: 0.15rem solid var(--main-border-color);
      padding: 1rem;
      width: 6rem;
      height: 6rem;
      display: flex;

      img {
        border-radius: 50%;
        justify-self: center;
        align-self: center;
      }

      @media (min-width: $min-width-second-break) {
        margin-top: 2rem;
      }
    }

    .pokemon-name {
      margin-bottom: 2rem;
      text-align: center;
      color: var(--secondary-text-color);
    }
  }
}

.slide-to-left-move,
.slide-to-left-enter-active,
.slide-to-left-leave-active {
  transition: all 0.5s;
}

.slide-to-left-leave-active {
  position: absolute;
  left: 0;
}

.slide-to-left-enter {
  transform: translateX(9rem);
  opacity: 0;
}

.slide-to-left-leave-to {
  transform: translateX(-9rem);
  opacity: 0;
}
</style>
