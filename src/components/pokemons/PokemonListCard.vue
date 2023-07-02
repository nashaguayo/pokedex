<template>
  <CenteredColumn class="pokemon-list-card">
    <h2>{{ pokemonName }}</h2>
    <img :src="pokemon.sprites.front_default" alt="pokemon front default" />
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import { getPokemon } from '@lib/pokemon';

export default {
  name: 'PokemonListCard',
  data() {
    return {
      pokemon: {},
    };
  },
  components: {
    CenteredColumn,
  },
  props: {
    pokemonName: {
      type: String,
      required: true,
    },
  },
  async created() {
    this.pokemon = await getPokemon(this.pokemonName);
  },
};
</script>

<style></style>
