<template>
  <div class="pokemon-item-evolutions">
    <div
      v-for="evolution in evolutions"
      :key="`evolution-${evolution.species}`"
      class="evolution"
    >
      <span>
        {{ evolution.species }}
      </span>
      <img :src="evolution.image" alt="evolution" />
    </div>
  </div>
</template>

<script>
import { getPokemonEvolutions } from '@api/evolutions.js';

export default {
  name: 'PokemonItemEvolutions',
  props: {
    pokemonId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      evolutions: [],
    };
  },
  async created() {
    this.evolutions = await getPokemonEvolutions(this.pokemonId);
    console.log(this.evolutions);
  },
};
</script>

<style lang="scss" scoped></style>
