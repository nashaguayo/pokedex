<template>
  <div class="pokemon-item-stat">
    <div class="property-names" :class="{ big }">{{ pokemonStat.name }}</div>
    <div class="property-values" :class="{ big }">{{ pokemonStat.value }}</div>
  </div>
</template>

<script>
export default {
  name: 'PokemonItemStat',
  props: {
    pokemonStat: {
      type: Object,
      required: true,
    },
    big: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.pokemon-item-stat {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  padding: 0.5rem 2rem;
  border-bottom: 0.2rem solid var(--secondary-border-color);
  width: 100%;

  @media (min-width: $min-width-first-break) {
    width: 70%;
  }

  .big {
    font-size: 2rem;
  }

  .property-names,
  .property-values {
    font-family: 'Upheaval';
    color: var(--secondary-text-color);
  }

  .property-names {
    text-align: right;
  }

  .property-values {
    text-align: left;
  }
}
</style>
