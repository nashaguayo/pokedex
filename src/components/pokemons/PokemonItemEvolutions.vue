<template>
  <CenteredColumn class="pokemon-item-evolutions">
    <p>Evolutions</p>
    <div class="evolution">
      <span>
        {{ evolutions[evolution].species }}
      </span>
      <img :src="evolutions[evolution].image" alt="evolution" />
    </div>
    <div class="buttons">
      <BaseButton :onClickHandler="getPreviousEvolution" :disabled="!evolution">
        Previous
      </BaseButton>
      <BaseButton
        :onClickHandler="getNextEvolution"
        :disabled="evolution === evolutions.length - 1"
      >
        Next
      </BaseButton>
    </div>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import BaseButton from '@components/ui/BaseButton.vue';
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
  components: { CenteredColumn, BaseButton },
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

<style lang="scss" scoped></style>
