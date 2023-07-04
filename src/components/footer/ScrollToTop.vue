<template>
  <transition name="slide-in-and-out">
    <div
      :class="{ 'bounce-animation': wasClicked }"
      :style="{ 'margin-bottom': `${marginBottom * 0.063}rem` }"
      class="scroll-to-top"
      @click="scrollToTop"
      @animationend="wasClicked = false"
      v-if="showScrollToTopButton"
    >
      <FontAwesomeIcon icon="fa-solid fa-arrow-up" color="white" size="2x" />
    </div>
  </transition>
</template>

<script>
import throttle from 'lodash/throttle';
import {
  scrollToTopOfBackgroundPage,
  getPageBackgroundElement,
} from '@lib/helpers';

export default {
  name: 'ScrollToTop',
  props: {
    marginBottom: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      wasClicked: false,
      showScrollToTopButton: false,
    };
  },
  mounted() {
    getPageBackgroundElement().addEventListener(
      'scroll',
      this.throttledHandleScroll
    );
  },
  beforeDestroy() {
    getPageBackgroundElement().removeEventListener(
      'scroll',
      this.throttledHandleScroll
    );
  },
  created() {
    this.throttledHandleScroll = throttle(this.handleScroll, 300);
  },
  methods: {
    handleScroll(event) {
      this.showScrollToTopButton = event.srcElement.scrollTop > 100;
      this.$emit('userScrolled');
    },
    scrollToTop() {
      this.wasClicked = true;
      scrollToTopOfBackgroundPage();
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-to-top {
  background-color: var(--variant-background-color);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 2rem;
  padding: 0.5rem;
  text-align: center;
  box-shadow: var(--main-box-shadow);
  position: fixed;
  justify-self: end;
  bottom: 0;
  transition: margin-bottom 0.5s;
  cursor: pointer;
}

.bounce-animation {
  animation: bounce 0.3s;
}

@keyframes bounce {
  0% {
    transform: scale(1);
    background-color: var(--variant-background-color);
  }
  50% {
    transform: scale(1.1);
    background-color: var(--main-background-color);
  }
  100% {
    transform: scale(1);
    background-color: var(--variant-background-color);
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
