<template>
  <transition name="fade-in-out" mode="out-in">
    <FontAwesomeIcon
      v-if="loading"
      icon="fa-solid fa-spinner"
      class="fa-spin-pulse spinner-icon"
      :class="{ 'cover-page': coverPage }"
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
    coverPage: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.spinner-icon {
  margin: 3rem;
  width: 5rem;
}

.cover-page {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 100vh;
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
