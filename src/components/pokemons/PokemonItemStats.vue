<template>
  <div class="pokemon-item-stats">
    <h1>This is the pokemon Info</h1>
  </div>
</template>

<script>
export default {
  name: 'PokemonItemStats',
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-item-stats {
}
</style>
