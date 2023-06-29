<template>
  <!-- TO-DO: Create slot for this class, display flex, flex direction, align items. -->
  <div class="random-pokemon">
    <h1>Random Pokemon</h1>
    <div class="pokedex"></div>
  </div>
</template>

<script>
export default {
  name: 'RandomPokemon',
};
</script>

<style lang="scss" scoped>
.random-pokemon {
  display: flex;
  flex-direction: column;
  align-items: center;

  .pokedex {
    margin: 1rem 0;
    border: 1rem solid var(--main-border-color);
  }
}
</style>
