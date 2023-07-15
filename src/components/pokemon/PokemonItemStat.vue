<template>
  <div class="pokemon-item-stat">
    <div class="property-names" :class="{ big }">{{ stat.name }}</div>
    <div class="property-values" :class="{ big }">{{ stat.value }}</div>
  </div>
</template>

<script>
export default {
  name: 'PokemonItemStat',
  props: {
    stat: {
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
.pokemon-item-stat {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  padding: 0.5rem 2rem;
  border-bottom: 0.2rem solid var(--main-border-color);
  width: 100%;

  @media (min-width: $min-width-first-break) {
    width: 70%;
  }

  @media (min-width: $min-width-fourth-break) {
    border-bottom: 0.2rem solid var(--secondary-border-color);
  }

  .big {
    font-size: 2rem;
  }

  .property-names,
  .property-values {
    font-family: 'Upheaval';

    @media (min-width: $min-width-fourth-break) {
      color: var(--secondary-text-color);
    }
  }

  .property-names {
    text-align: right;
  }

  .property-values {
    text-align: left;
  }
}
</style>
