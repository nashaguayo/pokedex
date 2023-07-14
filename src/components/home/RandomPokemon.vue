<template>
  <BaseLoader :loading="loading">
    <CenteredColumn class="random-pokemon">
      <h2>Random Pokemon</h2>
      <transition-group name="slide-to-right" class="pokemons">
        <CenteredColumn
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
            <span class="pokemon-name">{{ pokemon.name }}</span>
          </router-link>
        </CenteredColumn>
      </transition-group>
    </CenteredColumn>
  </BaseLoader>
</template>

<script>
import BaseLoader from '@/components/ui/BaseLoader.vue';
import CenteredColumn from '@/components/ui/CenteredColumn.vue';
import store from '@/lib/store';
import mediaQueries from '@/css/media-queries.scss?vue&type=style&index=0&lang=scss&module=1';

export default {
  name: 'RandomPokemon',
  components: { BaseLoader, CenteredColumn },
  data() {
    return {
      timer: null,
      loading: true,
    };
  },
  async created() {
    this.getRandomPokemons();
  },
  mounted() {
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
  },
  methods: {
    async getRandomPokemons() {
      let amountOfRandomPokemons = 1;
      if (window.innerWidth >= this.getResolution(mediaQueries.fifthBreak)) {
        amountOfRandomPokemons = 5;
      } else if (
        window.innerWidth >= this.getResolution(mediaQueries.fourthBreak)
      ) {
        amountOfRandomPokemons = 4;
      } else if (
        window.innerWidth >= this.getResolution(mediaQueries.thirdBreak)
      ) {
        amountOfRandomPokemons = 3;
      } else if (
        window.innerWidth >= this.getResolution(mediaQueries.firstBreak)
      ) {
        amountOfRandomPokemons = 2;
      }

      await store.getRandomPokemons(amountOfRandomPokemons);
      this.loading = false;
    },
    async getNewRandomPokemon() {
      await store.getNewRandomPokemon();
    },
    getResolution(resolution) {
      return Number(resolution.replace('px', ''));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/media-queries.scss';

.random-pokemon {
  box-shadow: var(--main-box-shadow);
  background-color: var(--secondary-background-color);
  width: 100%;

  h2 {
    margin-bottom: 0.5rem;
  }

  .pokemons {
    display: flex;
    direction: row-reverse;
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
      border: 0.2rem solid var(--main-border-color);
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
    }
  }
}

.slide-to-right-move,
.slide-to-right-enter-active,
.slide-to-right-leave-active {
  transition: all 0.5s;
}

.slide-to-right-enter {
  transform: translateX(-5rem);
  opacity: 0;
}

.slide-to-right-leave-to {
  transform: translateX(5rem);
  opacity: 0;
}
</style>
