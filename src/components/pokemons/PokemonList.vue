<template>
  <BaseLoader :loading="loading">
    <CenteredColumn class="pokemon-list">
      <template v-if="!pokemons.length">
        <h2>Something went wrong!</h2>
        <p>No pokemons to display.</p>
      </template>
      <template v-else>
        <div class="pokemons">
          <PokemonListCard
            v-for="pokemon in pokemons"
            :key="pokemon.name"
            :pokemonName="pokemon.name"
            :disabled="!nextUrl"
          />
        </div>
        <div class="pagination-buttons">
          <BaseButton
            :onClickHandler="getPreviousPage"
            :disabled="!previousUrl"
          >
            Previous
          </BaseButton>
          <BaseButton :onClickHandler="getNextPage" :disabled="!nextUrl">
            Next
          </BaseButton>
        </div>
      </template>
    </CenteredColumn>
  </BaseLoader>
</template>

<script>
import PokemonListCard from '@components/pokemons/PokemonListCard';
import BaseLoader from '@components/ui/BaseLoader.vue';
import CenteredColumn from '@components/ui/CenteredColumn';
import BaseButton from '@components/ui/BaseButton';
import { scrollToTopOfBackgroundPage } from '@lib/helpers';
import store from '@lib/store';

export default {
  name: 'PokemonList',
  components: {
    BaseLoader,
    PokemonListCard,
    BaseButton,
    CenteredColumn,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    pokemons() {
      return store.state.pokemons;
    },
    previousUrl() {
      return store.state.scroll.previousUrl;
    },
    nextUrl() {
      return store.state.scroll.nextUrl;
    },
  },
  async created() {
    await this.getPokemons();
  },
  methods: {
    async getPreviousPage() {
      await this.getPokemons(this.previousUrl);
    },
    async getNextPage() {
      await this.getPokemons(this.nextUrl);
    },
    async getPokemons(url) {
      this.loading = true;
      await store.getPokemons(url);
      this.loading = false;
      scrollToTopOfBackgroundPage();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

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

.pagination-buttons {
  margin: 1rem 0 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: $min-width-first-break) {
    flex-direction: row;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: opacity 0.3s;
}

.slide-up-enter,
.slide-up-leave-to {
  opacity: 1;
}

.slide-up-enter-to,
.slide-up-leave-from {
  opacity: 0;
}
</style>
