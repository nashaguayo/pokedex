<template>
  <CenteredColumn>
    <BaseHeader />
    <img class="logo-image" src="@assets/home/pokedex-logo.png" />
    <h1 v-if="subtitle">{{ subtitle }}</h1>
    <img class="banner" src="@assets/home/pokemons.jpg" />
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn';
import BaseHeader from '@components/ui/BaseHeader';

export default {
  name: 'LogoAndBanner',
  components: { CenteredColumn, BaseHeader },
  props: {
    subtitle: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/colors.scss';
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
  box-shadow: $main-box-shadow;

  @media (min-width: $min-width-second-break) {
    display: block;
    width: 100%;
  }
}
</style>
