<template>
  <CenteredColumn class="base-page">
    <CenteredColumn class="white-background">
      <slot name="header">
        <MobileHeader />
        <h1 v-if="title">{{ title }}</h1>
      </slot>
      <slot name="content"></slot>
      <slot name="footer">
        <BaseFooter />
      </slot>
    </CenteredColumn>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import MobileHeader from '@components/ui/MobileHeader.vue';
import BaseFooter from '@components/ui/BaseFooter.vue';

export default {
  name: 'BasePage',
  components: { CenteredColumn, MobileHeader, BaseFooter },
  props: {
    title: {
      type: String,
      default: 'Pokemon',
    },
  },
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
    min-height: 100vh;
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

  .logo {
    width: 18rem;

    @media (min-width: $min-width-first-break) {
      width: 21rem;
    }

    @media (min-width: $min-width-second-break) {
      width: 27rem;
    }
  }
}
</style>
