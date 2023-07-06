<template>
  <CenteredColumn class="pokemon-item-evolutions">
    <span class="title">Evolutions</span>
    <CenteredColumn class="evolution">
      <span>
        {{ evolutions[evolution].species }}
      </span>
      <img :src="evolutions[evolution].image" alt="evolution" />
    </CenteredColumn>
    <div class="buttons">
      <BaseChevron
        :onClickHandler="getPreviousEvolution"
        direction="left"
        :disabled="!evolution"
      />
      <BaseChevron
        :onClickHandler="getNextEvolution"
        direction="right"
        :disabled="evolutions.length - 1 === evolution"
      />
    </div>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import BaseChevron from '@components/ui/BaseChevron.vue';
import { getPokemonEvolutions } from '@api/evolutions.js';

export default {
  name: 'PokemonItemEvolutions',
  props: {
    pokemonId: {
      type: Number,
      required: true,
    },
    pokemonName: {
      type: String,
      required: true,
    },
  },
  components: { CenteredColumn, BaseChevron },
  data() {
    return {
      evolutions: [{ species: '', image: '' }],
      evolution: 0,
    };
  },
  async created() {
    this.evolutions = await getPokemonEvolutions(this.pokemonId);
    this.evolution = this.evolutions.findIndex(
      (evolution) => evolution?.species === this.pokemonName.toLowerCase()
    );
  },
  methods: {
    getPreviousEvolution() {
      this.evolution = this.evolution - 1;
    },
    getNextEvolution() {
      this.evolution = this.evolution + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-item-evolutions {
  margin: 1rem 0;
  .title {
    font-size: 2rem;
  }

  .buttons {
    display: flex;
    gap: 1rem;
  }
}
</style>
