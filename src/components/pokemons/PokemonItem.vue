<template>
  <transition name="slide-in">
    <button @click="goBack">Go Back</button>
  </transition>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s;
}

.slide-in-enter {
  transform: translateY(100%);
}

.slide-in-leave-to {
  transform: translateY(-100%);
}
</style>
