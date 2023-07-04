<template>
  <CenteredColumn class="pokemon-item-type">
    <span class="title">Types</span>
    <div v-for="t in types" :key="`type-${t.type.name}`" class="type">
      <span>{{ t.type.name }}</span>
      <div
        class="lights"
        :style="{ backgroundColor: backgroundColorTypes.get(t.type.name) }"
      >
        <div class="shine" />
      </div>
    </div>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';

const backgroundColorTypes = new Map([
  ['normal', 'black'],
  ['fighting', 'white'],
  ['flying', 'blue'],
  ['poison', 'green'],
  ['ground', 'brown'],
  ['rock', 'darkgrey'],
  ['bug', 'fuchsia'],
  ['ghost', 'coral'],
  ['steel', 'grey'],
  ['fire', 'red'],
  ['water', 'aquamarine'],
  ['grass', 'lime'],
  ['electric', 'antiquewhite'],
  ['psychic', 'blueviolet'],
  ['ice', 'blanchedalmond'],
  ['dragon', 'chocolate'],
  ['dark', 'darkolivegreen'],
  ['fairy', 'darkorange'],
  ['unknown', 'black'],
  ['shadow', 'darksalmon'],
]);

export default {
  name: 'PokemonItemType',
  components: { CenteredColumn },
  data() {
    return {
      backgroundColorTypes,
    };
  },
  props: {
    types: Array,
    default: [],
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

  .title {
    font-size: 2rem !important;
    color: var(--secondary-text-color) !important;
  }

  .type {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0.5rem;
    gap: 1rem;
    align-items: center;

    span {
      color: var(--variant-text-color) !important;
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
