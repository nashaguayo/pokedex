<template>
  <CenteredColumn class="pokemon-list">
    <template v-if="!pokemons.length && !loading">
      <h2>Something went wrong!</h2>
      <p>No pokemons to display.</p>
    </template>
    <template v-else>
      <h1>Pokemons</h1>
      <router-link :to="{ name: 'search' }">
        <FontAwesomeIcon
          icon="fa-solid fa-magnifying-glass"
          size="3x"
          class="search"
        />
      </router-link>
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
    </template>
  </CenteredColumn>
</template>

<script>
import debounce from 'lodash/debounce';
import PokemonListCard from '@/components/pokemons/PokemonListCard';
import BaseLoader from '@/components/ui/BaseLoader.vue';
import CenteredColumn from '@/components/ui/CenteredColumn';
import { getPageBackgroundElement } from '@/lib/helpers';
import store from '@/lib/store';

export default {
  name: 'PokemonList',
  components: {
    BaseLoader,
    PokemonListCard,
    CenteredColumn,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    pokemons() {
      return store.state.scroll.pokemons;
    },
  },
  async created() {
    await this.getPokemons();
  },
  mounted() {
    this.debouncedScroll = debounce(this.handleScroll, 100);
    getPageBackgroundElement().addEventListener('scroll', this.debouncedScroll);
  },
  beforeDestroy() {
    getPageBackgroundElement().removeEventListener(
      'scroll',
      this.debouncedScroll
    );
  },
  methods: {
    async getPokemons() {
      await store.getPokemons();
      this.loading = false;
    },
    async handleScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight) {
        this.loading = true;
        await store.getMorePokemons();
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-list {
  margin-bottom: 2rem;

  .search {
    margin-bottom: 1rem;

    @media (min-width: $min-width-second-break) {
      margin-bottom: 2rem;
    }
  }

  .pokemons {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 1rem;
    grid-column-gap: 3rem;
    margin: 0 3rem 1rem;

    @media (min-width: $min-width-first-break) {
      grid-template-columns: repeat(2, 1fr);
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
