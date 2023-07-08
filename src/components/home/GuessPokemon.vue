<template>
  <div class="guess-pokemon">
    <h2>Guess the Pokemon</h2>
    <div class="background-image"></div>
  </div>
</template>

<script>
export default {
  name: 'GuessPokemon',
};
</script>

<style lang="scss" scoped>
.guess-pokemon {
  margin-bottom: 2rem;
  .background-image {
    background-image: url(@assets/home/mystery-pokemon.jpg);
    background-size: cover;
    width: 20rem;
    height: 12rem;
    border: 0.2rem solid var(--main-border-color);
    box-shadow: var(--main-box-shadow);
    border-radius: 1rem;
  }
}
</style>
