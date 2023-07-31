<template>
  <div class="install-view">
    <h1>{{ $t('install.title') }}</h1>
    <span>{{ $t('install.description') }}</span>
    <BaseButton :big="true" :variant="true">{{
      $t('install.button')
    }}</BaseButton>
    <img src="@/assets/pokemons/silouette.png" alt="silouette" />
  </div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  name: 'InstallView',
  components: { BaseButton },
};
</script>

<style lang="scss" scoped>
.install-view {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 3rem;

    @media (min-width: $min-width-first-break) {
      font-size: 4rem;
    }
  }

  span {
    text-align: center;
    font-family: 'Kanit';
    margin-bottom: 1rem;
    width: 90%;

    @media (min-width: $min-width-third-break) {
      margin-bottom: 2rem;
    }
  }
}
</style>
