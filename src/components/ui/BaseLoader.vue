<template>
  <transition
    name="fade-in-out"
    :mode="mode"
    @after-enter="afterEnter"
    appear
    :class="{ 'cover-page': coverPage }"
  >
    <FontAwesomeIcon
      v-if="loading"
      icon="fa-solid fa-spinner"
      class="fa-spin-pulse spinner-icon"
      size="6x"
      :color="shouldChangeColor ? 'white' : 'black'"
    />
    <slot v-else></slot>
  </transition>
</template>

<script>
import store from '@/lib/store';

export default {
  name: 'BaseLoader',
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    mode: {
      type: String,
      default: 'out-in',
    },
    coverPage: {
      type: Boolean,
      default: false,
    },
    enableDarkmodeColorSwitch: {
      type: Boolean,
      default: true,
    },
    afterEnter: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    isDarkModeEnabled() {
      return store.state.isDarkModeEnabled;
    },
    shouldChangeColor() {
      return this.isDarkModeEnabled && this.enableDarkmodeColorSwitch;
    },
  },
};
</script>

<style lang="scss" scoped>
.spinner-icon {
  margin: 3rem;
  width: 5rem;
}

.cover-page {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.fade-in-out-enter-active,
.fade-in-out-leave-active {
  transition: opacity 0.3s linear;
}

.fade-in-out-enter,
.fade-in-out-leave-to {
  opacity: 0;
}
</style>
