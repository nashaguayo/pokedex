<template>
  <div class="pokemon-list">
    <transition name="slide-up" appear mode="out-in">
      <div v-if="!pokemons.length && !loading" key="no-results">
        <h2>Something went wrong!</h2>
        <p>No pokemons to display.</p>
      </div>
      <div v-else key="results" class="pokemons-container">
        <h1>{{ $t('pokemons.title') }}</h1>
        <transition-group name="slide-up" appear class="pokemons">
          <PokemonListCard
            v-for="pokemon in pokemons"
            :key="pokemon.name"
            :id="pokemon.id"
            :name="pokemon.name"
            :image="pokemon.image"
            :types="pokemon.types"
          />
        </transition-group>
        <BaseLoader :loading="loading" />
      </div>
    </transition>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import PokemonListCard from '@/components/pokemons/PokemonListCard';
import BaseLoader from '@/components/ui/BaseLoader.vue';
import {
  getPageBackgroundElement,
  scrollToTopOfBackgroundPage,
} from '@/lib/helpers';
import store from '@/lib/store';
import { fourthBreak, thirdBreak } from '@/constants/resolutions';

export default {
  name: 'PokemonList',
  components: {
    BaseLoader,
    PokemonListCard,
  },
  data() {
    return {
      loading: true,
      amountOfPokemonsToLoadPerPage: 20,
    };
  },
  computed: {
    pokemons() {
      return store.state.scroll.pokemons;
    },
  },
  async created() {
    if (window.innerWidth >= thirdBreak && window.innerWidth < fourthBreak) {
      this.amountOfPokemonsToLoadPerPage = 21;
    }
    await this.getPokemons();
  },
  mounted() {
    scrollToTopOfBackgroundPage();
    this.debouncedScroll = debounce(this.handleScroll, 100);
    getPageBackgroundElement().addEventListener('scroll', this.debouncedScroll);
    getPageBackgroundElement().addEventListener(
      'touchmove',
      this.debouncedScroll
    );
  },
  beforeDestroy() {
    getPageBackgroundElement().removeEventListener(
      'scroll',
      this.debouncedScroll
    );
    getPageBackgroundElement().removeEventListener(
      'touchmove',
      this.debouncedScroll
    );
  },
  methods: {
    async getPokemons() {
      await store.getPokemons(null, this.amountOfPokemonsToLoadPerPage);
      this.loading = false;
    },
    async handleScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight + 100 >= scrollHeight) {
        this.loading = true;
        await store.getMorePokemons(this.amountOfPokemonsToLoadPerPage);
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;

  .pokemons-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .pokemons {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-row-gap: 1rem;
      grid-column-gap: 1rem;
      margin: 0 3rem 1rem;

      @media (min-width: $min-width-first-break) {
        grid-column-gap: 2rem;
      }

      @media (min-width: $min-width-second-break) {
        grid-column-gap: 3rem;
      }

      @media (min-width: $min-width-third-break) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (min-width: $min-width-fourth-break) {
        grid-template-columns: repeat(4, 1fr);
      }

      @media (min-width: $min-width-fifth-break) {
        grid-template-columns: repeat(5, 1fr);
      }
    }
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s;
}

.slide-up-enter,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(5rem);
}
</style>
