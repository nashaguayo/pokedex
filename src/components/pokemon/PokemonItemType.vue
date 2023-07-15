<template>
  <CenteredColumn class="pokemon-item-type">
    <span id="title">Types</span>
    <div v-for="t in types" :key="`type-${t}`" class="type">
      <span id="type-text">{{ t }}</span>
      <div
        class="lights"
        :style="{ backgroundColor: pokemonColorTypes.get(t) }"
      >
        <div class="shine" />
      </div>
    </div>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@/components/ui/CenteredColumn.vue';
import { pokemonColorTypes } from '@/constants/pokemonTypesColor';

export default {
  name: 'PokemonItemType',
  components: { CenteredColumn },
  data() {
    return {
      pokemonColorTypes,
    };
  },
  props: {
    types: {
      type: Array,
      required: [],
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-item-type {
  background-color: var(--variant-background-color);
  width: 100%;
  margin-top: 2rem;
  padding: 1rem 0;
  box-shadow: var(--main-box-shadow);

  @media (min-width: $min-width-fourth-break) {
    background-color: transparent;
    box-shadow: none;
    margin-bottom: 2rem;
  }

  #title {
    font-size: 2rem;
    color: var(--secondary-text-color);
  }

  .type {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0.5rem;
    gap: 1rem;
    align-items: center;

    #type-text {
      color: var(--variant-text-color);
    }

    .lights {
      border-radius: 50%;
      box-shadow: var(--main-box-shadow);
      height: 1rem;
      width: 1rem;
      border: 0.2rem solid var(--secondary-border-color);

      .shine {
        background-color: rgba(255, 255, 255, 0.5);
        width: 0.1rem;
        height: 0.1rem;
        border-radius: 50%;
        padding: 0.25rem;
      }
    }
  }
}
</style>
