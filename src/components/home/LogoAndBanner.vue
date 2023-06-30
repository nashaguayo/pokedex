<template>
  <CenteredColumn>
    <img class="logo-image" src="@assets/home-view/pokedex-logo.png" />
    <h1 v-if="subtitle">{{ subtitle }}</h1>
    <img class="banner" src="@assets/home-view/pokemons.jpg" />
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn';

export default {
  name: 'LogoAndBanner',
  components: { CenteredColumn },
  props: {
    subtitle: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

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

  @media (min-width: $min-width-second-break) {
    display: block;
    width: 100%;
  }
}
</style>
