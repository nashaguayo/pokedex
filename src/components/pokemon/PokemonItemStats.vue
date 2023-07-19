<template functional>
  <div class="pokemon-item-stats">
    <span class="title">Stats</span>
    <div
      v-for="stat in props.stats"
      :key="`stat-${stat.name}`"
      class="pokemon-item-stat"
    >
      <span class="property-names">{{ stat.name.replace('-', ' ') }}</span>
      <div class="bars">
        <template v-if="stat.value > 100">
          <div
            class="bar filled"
            v-for="n in 10"
            :key="`bar-filled-${n}`"
          ></div>
        </template>
        <template v-else>
          <div
            class="bar filled"
            v-for="n in Math.floor(stat.value / 10)"
            :key="`bar-filled-${n}`"
          ></div>
        </template>
        <template v-if="10 - Math.floor(stat.value / 10) > 0">
          <div
            class="bar empty"
            v-for="n in 10 - Math.floor(stat.value / 10)"
            :key="`bar-empty-${n}`"
          ></div>
        </template>
        <template v-if="Math.floor((stat.value - 100) / 10) > 0">
          <div
            class="bar exceeded"
            v-for="n in Math.floor((stat.value - 100) / 10)"
            :key="`bar-exceeded-${n}`"
          ></div>
        </template>
      </div>
      <span class="property-values">{{ stat.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonItemStat',
  props: {
    stats: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-item-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

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
    grid-template-columns: 6rem auto 4rem;
    grid-gap: 1rem;
    padding: 0.5rem 2rem;
    border-bottom: 0.2rem solid var(--main-border-color);
    width: 100%;

    @media (min-width: $min-width-first-break) {
      grid-template-columns: 5rem auto 3rem;
      width: 70%;
    }

    @media (min-width: $min-width-second-break) {
      grid-template-columns: 7rem auto 4rem;
      width: 70%;
    }

    @media (min-width: $min-width-fourth-break) {
      grid-template-columns: 6rem auto 2rem;
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

    .bars {
      display: flex;
      gap: 0.1rem;

      .bar {
        height: 1.5rem;
        width: 0.2rem;
        border: 0.2rem solid var(--main-border-color);
        border-radius: 0.5rem;

        &.filled {
          background-color: green;
        }

        &.empty {
          background-color: silver;
        }

        &.exceeded {
          background-color: red;
        }
      }
    }

    .property-values {
      text-align: left;
    }
  }
}
</style>
