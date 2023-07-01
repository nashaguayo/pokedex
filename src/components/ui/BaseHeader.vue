<template>
  <div class="base-header">
    <router-link to="/">
      <img
        src="@assets/ui/pokeball.svg.png"
        alt="menu"
        class="home-icon-link"
      />
    </router-link>
    <router-link to="/pokemons">
      <h2 class="pokemons-link">Pokemons</h2>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BaseHeader',
};
</script>

<style lang="scss" scoped>
@import '@css/colors.scss';
@import '@css/media-queries.scss';

.base-header {
  background-color: $secondary-background-color;
  height: 5rem;
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  box-shadow: $main-box-shadow;
  position: fixed;
  top: 0;

  @media (min-width: $min-width-second-break) {
    width: 75vw;
  }

  .home-icon-link {
    height: 4rem;
    margin-left: 1.5rem;
  }

  .pokemons-link {
    margin-left: 1rem;
  }
}
</style>
