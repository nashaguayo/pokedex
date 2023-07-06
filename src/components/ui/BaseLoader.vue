<template>
  <transition name="fade-in-out" mode="out-in">
    <FontAwesomeIcon
      v-if="loading"
      icon="fa-solid fa-spinner"
      class="fa-spin-pulse spinner-icon"
      size="6x"
    />
    <slot v-else></slot>
  </transition>
</template>

<script>
export default {
  name: 'BaseLoader',
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
.spinner-icon {
  position: absolute;
  top: 50%;
}

.fade-in-out-enter-active,
.fade-in-out-leave-active {
  transition: opacity 0.3s;
}

.fade-in-out-enter,
.fade-in-out-leave-to {
  opacity: 0;
}
</style>
