<template>
  <div class="logo-and-banner">
    <img class="logo-image" src="@assets/home-view/pokedex-logo.png" />
    <h1 v-if="subtitle">{{ subtitle }}</h1>
    <img class="banner" src="@assets/home-view/pokemons.jpg" />
  </div>
</template>

<script>
export default {
  name: 'LogoAndBanner',
  props: {
    subtitle: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.logo-and-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .logo-image {
    width: 40rem;
  }

  .banner {
    width: 80%;
  }
}
</style>
