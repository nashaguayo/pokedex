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
.logo-image {
  width: 80%;
}

.banner {
  width: 80%;
}
</style>
