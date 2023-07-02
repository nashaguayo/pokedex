<template>
  <CenteredColumn class="base-page">
    <CenteredColumn class="white-background">
      <slot name="header">
        <BaseHeader />
        <h1 v-if="title">{{ title }}</h1>
      </slot>
      <slot name="content"></slot>
      <slot name="footer">
        <transition name="slide-in-and-out">
          <div
            class="scroll-to-top"
            @click="scrollToTop"
            v-if="showScrollToTopButton"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-arrow-up"
              color="white"
              size="2x"
            />
          </div>
        </transition>
        <BaseFooter />
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
  components: { CenteredColumn, BaseHeader, BaseFooter },
  data() {
    return {
      showScrollToTopButton: false,
    };
  },
  props: {
    title: {
      type: String,
      default: 'Pokemon',
    },
  },
  mounted() {
    document
      .getElementsByClassName('white-background')[0]
      .addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    document
      .getElementsByClassName('white-background')[0]
      .removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll(event) {
      this.showScrollToTopButton = event.srcElement.scrollTop > 100;
    },
    scrollToTop() {
      document
        .getElementsByClassName('white-background')[0]
        .scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.base-page {
  overflow-y: scroll;
  height: 100vh;

  .white-background {
    background-color: var(--main-background-color);
    width: 100vw;
    box-shadow: none;
    min-height: calc(100vh - 7rem);
    overflow-y: scroll;
    padding-top: 7rem;

    @media (min-width: $min-width-second-break) {
      box-shadow: 0 0 0.5rem 0.3rem var(--main-shadow-color);
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

  .scroll-to-top {
    background-color: var(--variant-background-color);
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin: 9rem 2rem;
    padding: 0.5rem;
    text-align: center;
    box-shadow: var(--main-box-shadow);
    position: fixed;
    align-self: end;
    bottom: 0;
  }
}

.slide-in-and-out-enter-active,
.slide-in-and-out-leave-active {
  transition: all 0.5s;
}

.slide-in-and-out-leave-from,
.slide-in-and-out-enter-to {
  opacity: 1;
}

.slide-in-and-out-leave-to,
.slide-in-and-out-enter {
  opacity: 0;
  transform: translateY(5rem);
}
</style>
