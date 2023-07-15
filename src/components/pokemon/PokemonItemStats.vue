<template functional>
  <CenteredColumn class="pokemon-item-stats">
    <span class="title">Stats</span>
    <div
      v-for="stat in props.stats"
      :key="`stat-${stat.name}`"
      class="pokemon-item-stat"
    >
      <span class="property-names">{{ stat.name }}</span>
      <span class="property-values">{{ stat.value }}</span>
    </div>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@/components/ui/CenteredColumn.vue';

export default {
  name: 'PokemonItemStat',
  props: {
    stats: {
      type: Array,
      required: true,
    },
  },
  components: { CenteredColumn },
};
</script>

<style lang="scss" scoped>
.pokemon-item-stats {
  .title {
    text-align: center;
    font-size: 2rem;
    width: 100%;
    padding: 1rem 0;

    @media (min-width: $min-width-second-break) {
      width: 80%;
    }

    @media (min-width: $min-width-fourth-break) {
      font-size: 2.5rem;
      color: var(--secondary-text-color);
    }
  }

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
}
</style>
