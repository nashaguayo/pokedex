<template>
  <CenteredColumn class="pokemon-list">
    <div class="pokemons">
      <PokemonListCard
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        :pokemonName="pokemon.name"
      />
    </div>
    <div class="pagination-buttons">
      <BaseButton
        text="Previous"
        :onClickHandler="getPreviousPage"
        :disabled="!previousUrl"
      />
      <BaseButton text="Next" :onClickHandler="getNextPage" />
    </div>
  </CenteredColumn>
</template>

<script>
import PokemonListCard from '@components/pokemons/PokemonListCard';
import CenteredColumn from '@components/ui/CenteredColumn';
import BaseButton from '@components/ui/BaseButton';
import { getPokemonsInfo } from '@api/pokemon';

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
      const pokemonsInfo = await getPokemonsInfo(url);
      this.pokemons = pokemonsInfo.results;
      this.nextUrl = pokemonsInfo.next;
      this.previousUrl = pokemonsInfo.previous;
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
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: $min-width-third-break) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: $min-width-fourth-break) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (min-width: $min-width-fifth-break) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}

.pagination-buttons {
  margin: 1rem 0 3rem;
  display: flex;
  gap: 2rem;
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
