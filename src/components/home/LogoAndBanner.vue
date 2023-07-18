<template functional>
  <div class="logo-and-banner">
    <img class="logo-image" src="@/assets/home/pokedex-logo.png" />
    <h1 v-if="props.subtitle">{{ props.subtitle }}</h1>
    <img class="banner" src="@/assets/home/pokemons.jpg" />
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
    width: 80%;

    @media (min-width: $min-width-first-break) {
      width: 20rem;
    }

    @media (min-width: $min-width-second-break) {
      width: 25rem;
    }
  }

  .banner {
    display: none;
    box-shadow: var(--main-box-shadow);

    @media (min-width: $min-width-second-break) {
      display: block;
      width: 100%;
    }
  }
}
</style>
