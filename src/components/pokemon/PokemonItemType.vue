<template>
  <div class="pokemon-item-type">
    <span class="title">{{ $t('pokemonItemTypeTitle') }}</span>
    <div class="types">
      <div v-for="t in types" :key="`type-${t.name}`" class="type">
        <span class="type-text">{{ t.translated }}</span>
        <div
          class="lights"
          :style="{ backgroundColor: pokemonColorTypes.get(t.name) }"
        >
          <div class="shine" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pokemonColorTypes } from '@/constants/pokemonTypesColor';

export default {
  name: 'PokemonItemType',
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: var(--variant-background-color);
  width: 100%;
  margin-top: 2rem;
  padding: 1rem 0;
  box-shadow: var(--main-box-shadow);

  @media (min-width: $min-width-fourth-break) {
    background-color: transparent;
    box-shadow: none;
    margin-bottom: 2rem;
    padding: 0;
  }

  .title {
    font-size: 2rem;
    color: var(--secondary-text-color);
  }

  .types {
    display: flex;
    gap: 1rem;

    .type {
      display: flex;
      padding: 0.5rem;

      .type-text {
        color: var(--variant-text-color);
        margin-right: 0.5rem;
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
}
</style>
