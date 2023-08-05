<template>
  <div class="page-not-found-view">
    <h1>{{ $t('error.title') }}</h1>
    <h2>{{ $t('error.subtitle') }}</h2>
    <p class="page-not-found-text">
      {{ $t('error.description') }}
    </p>
    <img
      :src="silouette"
      alt="pokemon silouette"
      :class="{ 'white-silouette': isDarkModeEnabled }"
    />
  </div>
</template>

<script>
import silouette from '@/assets/images/pokemons/silouette.png';
import other from '@/store/state/other';

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
      return other.state.isDarkModeEnabled;
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
