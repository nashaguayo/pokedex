<template>
  <CenteredColumn class="pokemon-list">
    <template v-if="!count">
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
        <BaseButton :onClickHandler="getPreviousPage" :disabled="!previousUrl">
          Previous
        </BaseButton>
        <BaseButton :onClickHandler="getNextPage" :disabled="!nextUrl">
          Next
        </BaseButton>
      </div>
    </template>
  </CenteredColumn>
</template>

<script>
import PokemonListCard from '@components/pokemons/PokemonListCard';
import CenteredColumn from '@components/ui/CenteredColumn';
import BaseButton from '@components/ui/BaseButton';
import { getPokemons } from '@api/pokemon';
import { scrollToTopOfBackgroundPage } from '@lib/helpers';
import { logError } from '@/lib/logger';

export default {
  name: 'PokemonList',
  components: {
    PokemonListCard,
    BaseButton,
    CenteredColumn,
  },
  data() {
    return {
      pokemons: [],
      previousUrl: null,
      nextUrl: null,
      count: 0,
    };
  },
  async mounted() {
    this.getPokemons();
  },
  methods: {
    async getPreviousPage() {
      await this.getPokemons(this.previousUrl);
    },
    async getNextPage() {
      await this.getPokemons(this.nextUrl);
    },
    async getPokemons(url) {
      const pokemonsInfo = await getPokemons(
        url?.replace(process.env.VUE_APP_POKEAPI_URL, '')
      );

      if (!pokemonsInfo) {
        logError(
          this.getPokemons.name,
          'Call to pokeapi API failed',
          new Error('pokemonsInfo is either undefined or null')
        );
        return;
      }

      this.pokemons = pokemonsInfo.results;
      this.nextUrl = pokemonsInfo.next;
      this.previousUrl = pokemonsInfo.previous;
      this.count = pokemonsInfo.count;
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
