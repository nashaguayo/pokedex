<template>
  <h1>Evolutions {{ pokemonId }}</h1>
</template>

<script>
import { getPokemonEvolutions } from '@api/pokemon.js';

export default {
  name: 'PokemonItemEvolutions',
  props: {
    pokemonId: {
      type: Number,
      required: true,
    },
  },
  async created() {
    const evolutions = await getPokemonEvolutions(this.pokemonId);
    console.log(evolutions);
  },
};
</script>

<style lang="scss" scoped></style>
