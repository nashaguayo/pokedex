<template>
  <CenteredColumn class="base-page">
    <CenteredColumn
      class="page-background"
      :class="{
        'add-margins': displayHeader,
        'no-margins': !displayHeader,
      }"
    >
      <slot v-if="displayHeader" name="header">
        <BaseHeader />
        <h1 v-if="title">{{ title }}</h1>
      </slot>
      <slot name="content"></slot>
      <slot name="footer">
        <BaseFooter :displayFooter="displayFooter" />
      </slot>
    </CenteredColumn>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import BaseHeader from '@components/ui/BaseHeader.vue';
import BaseFooter from '@components/ui/BaseFooter.vue';

export default {
  name: 'BasePage',
  components: {
    CenteredColumn,
    BaseHeader,
    BaseFooter,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    displayHeader: {
      type: Boolean,
      default: true,
    },
    displayFooter: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.base-page {
  overflow-y: scroll;
  height: 100vh;

  .page-background {
    background-color: var(--main-background-color);
    width: 100vw;
    box-shadow: none;
    overflow-y: scroll;

    @media (min-width: $min-width-second-break) {
      box-shadow: 0 0 0.5rem 0.3rem var(--main-shadow-color);
      width: 75vw;
    }
  }

  .add-margins {
    min-height: calc(100vh - 5rem);
    padding-top: 5rem;

    @media (min-width: $min-width-second-break) {
      min-height: calc(100vh - 7rem);
      padding-top: 7rem;
    }
  }

  .no-margins {
    min-height: 100vh;
    padding-top: 0rem;

    @media (min-width: $min-width-second-break) {
      min-height: 100vh;
      padding-top: 0rem;
    }
  }

  .page-background::-webkit-scrollbar {
    display: none;
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
