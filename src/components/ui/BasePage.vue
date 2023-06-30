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
.base-page {
  background-image: url('@assets/ui/background.jpg');
  background-size: contain;
  overflow-y: scroll;
  height: 100vh;

  .white-background {
    background-color: white;
    width: 75vw;
    box-shadow: 0 0 0.5rem 0.3rem var(--main-shadow-color);
    height: 100vh;
    padding: 0 3rem;
    overflow-y: scroll;
  }

  .white-background::-webkit-scrollbar {
    display: none;
  }
}
</style>
