<template>
  <div class="logo-and-banner">
    <img
      class="logo-image"
      alt="pokemon logo"
      src="@/assets/home/pokedex-logo.png"
    />
    <h1 v-if="subtitle">{{ subtitle }}</h1>
    <img
      class="banner"
      alt="pokemons banner"
      src="@/assets/home/pokemons.png"
    />
    <span class="description">
      {{ $t('home.description') }}
    </span>
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
    box-shadow: var(--main-box-shadow);
    display: block;
    width: 100%;
  }

  .description {
    font-family: 'Kanit';
    text-align: center;
    padding: 0 1rem;
    margin: 2rem 0;
  }
}
</style>
