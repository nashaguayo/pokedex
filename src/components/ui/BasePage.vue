<template>
  <CenteredColumn class="base-page">
    <div class="white-background">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';
export default {
  name: 'BasePage',
  components: { CenteredColumn },
};
</script>

<style lang="scss" scoped>
@import '@css/colors.scss';
@import '@css/media-queries.scss';

.base-page {
  overflow-y: scroll;
  height: 100vh;

  .white-background {
    background-color: $main-background-color;
    width: 100vw;
    box-shadow: none;
    height: 100vh;
    padding: 0 3rem;
    overflow-y: scroll;

    @media (min-width: $min-width-second-break) {
      box-shadow: 0 0 0.5rem 0.3rem $main-shadow-color;
      width: 75vw;
    }
  }

  .white-background::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: $min-width-second-break) {
    background-image: url('@assets/ui/background.jpg');
    background-size: contain;
  }
}
</style>
