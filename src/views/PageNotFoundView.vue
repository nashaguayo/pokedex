<template>
  <div class="page-not-found-view">
    <h1>404 Error</h1>
    <h2>Page Not Found</h2>
    <p class="page-not-found-text">
      How did you get here? There's nothing to see!
    </p>
    <img
      :src="silouette"
      alt="pokemon silouette"
      :class="{ 'white-silouette': isDarkModeEnabled }"
    />
  </div>
</template>

<script>
import silouette from '@/assets/pokemons/silouette.png';
import store from '@/lib/store';

export default {
  title: 'Page Not Found',
  name: 'PageNotFoundView',
  data() {
    return {
      silouette,
    };
  },
  computed: {
    isDarkModeEnabled() {
      return store.state.isDarkModeEnabled;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-not-found-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .page-not-found-text {
    text-align: center;
    font-family: 'Kanit';
  }

  .white-silouette {
    filter: brightness(0) invert(1);
  }
}
</style>
