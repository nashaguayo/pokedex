<template>
  <div class="pokemon-list">
    <PokemonListCard
      v-for="(pokemon, id) in pokemons"
      :key="id"
      :pokemon="pokemon"
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

<style></style>
