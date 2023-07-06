<template>
  <CenteredColumn class="pokemon-item-evolutions">
    <p>Evolutions</p>
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
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import { getPokemonEvolutions } from '@api/evolutions.js';

export default {
  name: 'PokemonItemEvolutions',
  props: {
    pokemonId: {
      type: Number,
      required: true,
    },
  },
  components: { CenteredColumn },
  data() {
    return {
      evolutions: [],
    };
  },
  async created() {
    this.evolutions = await getPokemonEvolutions(this.pokemonId);
  },
};
</script>

<style lang="scss" scoped></style>
