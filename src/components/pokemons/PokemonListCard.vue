<template>
  <h2>{{ pokemon.name }}</h2>
</template>

<script>
export default {
  name: 'PokemonListCard',
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
