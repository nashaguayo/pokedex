<template>
  <div class="pokemon-list">
    <PokemonListCard
      v-for="(pokemon, id) in pokemons"
      :key="id"
      :pokemonName="pokemon.name"
    />
  </div>
</template>

<script>
import PokemonListCard from '@components/pokemons/PokemonListCard';
import { getPokemons } from '@lib/pokemon';

export default {
  name: 'PokemonList',
  components: {
    PokemonListCard,
  },
  data() {
    return {
      pokemons: [],
    };
  },
  async mounted() {
    this.pokemons = (await getPokemons()).results;
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.pokemon-list {
  display: grid;
  grid-template-rows: 1fr;

  @media (min-width: $min-width-first-break) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: $min-width-third-break) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: $min-width-fourth-break) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
