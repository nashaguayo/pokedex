<template>
  <div class="pokemon-item-characteristics">
    <div class="status">
      <span class="right">ID</span>
      <span>#{{ id }}</span>
      <span class="right">{{ $t('pokemonItemCharacteristicsWeight') }}</span>
      <span>{{ weight }} {{ $t('pokemonItemCharacteristicsPounds') }}</span>
      <span class="right">{{ $t('pokemonItemCharacteristicsHeight') }}</span>
      <span>{{ height }}"</span>
      <span class="right">{{ $t('pokemonItemCharacteristicsColor') }}</span>
      <span :style="{ color: color.name }" class="color">{{
        color.translated
      }}</span>
      <span class="right">{{ $t('pokemonItemCharacteristicsShape') }}</span>
      <span>{{ shape }}</span>
      <span class="right">{{
        $t('pokemonItemCharacteristicsGeneration')
      }}</span>
      <span>{{ generation.toUpperCase() }}</span>
      <span class="right">{{ $t('pokemonItemCharacteristicsHabitat') }}</span>
      <span>{{ habitat.replace('-', ' ') }}</span>
      <span class="characteristic">
        {{ characteristic }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonItemCharacteristics',
  props: {
    id: {
      type: Number,
      required: true,
    },
    characteristic: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    color: {
      type: Object,
      required: true,
    },
    shape: {
      type: String,
      required: true,
    },
    generation: {
      type: String,
      required: true,
    },
    habitat: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-item-characteristics {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .status {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin: 1rem 0;
    background-color: var(--secondary-background-color);
    width: 16rem;
    align-items: center;
    padding: 1rem;
    box-shadow: var(--main-box-shadow);

    @media (min-width: $min-width-second-break) {
      width: 23rem;
    }

    @media (min-width: $min-width-third-break) {
      width: 33rem;
    }

    @media (min-width: $min-width-fourth-break) {
      border-radius: 1rem;
      width: auto;
    }

    span {
      color: var(--secondary-text-color);

      @media (min-width: $min-width-fourth-break) {
        border-radius: 1rem;
      }

      &.right {
        justify-self: end;
      }

      &.characteristic {
        grid-column-start: 1;
        grid-column-end: 3;
        background-color: var(--variant-background-color);
        text-align: center;
        padding: 1rem;
      }
    }

    .color {
      -webkit-text-stroke-width: 0.05rem;
      -webkit-text-stroke-color: var(--main-text-color);
    }
  }
}
</style>
