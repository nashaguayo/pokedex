<template>
  <transition name="slide-in-and-out">
    <div
      :class="{ 'bounce-animation': wasClicked }"
      :style="{ 'margin-bottom': `${marginBottom}px` }"
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
    document
      .getElementsByClassName('white-background')[0]
      .addEventListener('scroll', this.throttledHandleScroll);
  },
  beforeDestroy() {
    document
      .getElementsByClassName('white-background')[0]
      .removeEventListener('scroll', this.throttledHandleScroll);
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
      document
        .getElementsByClassName('white-background')[0]
        .scrollTo({ top: 0, behavior: 'smooth' });
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
  margin-left: 2rem;
  padding: 0.5rem;
  text-align: center;
  box-shadow: var(--main-box-shadow);
  position: fixed;
  align-self: end;
  bottom: 0;
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
