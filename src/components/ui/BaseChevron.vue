<template>
  <div
    :class="{ 'bounce-animation': wasClicked, disabled }"
    class="base-chevron"
    @click="handleAndAnimate"
    @animationend="wasClicked = false"
  >
    <FontAwesomeIcon
      :icon="`fa-solid fa-chevron-${direction}`"
      :color="disabled ? 'silver' : 'white'"
      size="2x"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseChevron',
  data() {
    return {
      wasClicked: false,
    };
  },
  props: {
    direction: {
      type: String,
      required: true,
    },
    onClickHandler: {
      type: Function,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleAndAnimate() {
      if (this.disabled) {
        return;
      }

      this.wasClicked = true;
      this.onClickHandler();
    },
  },
};
</script>

<style lang="scss" scoped>
.base-chevron {
  background-color: var(--variant-background-color);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 2rem;
  padding: 0.5rem;
  text-align: center;
  box-shadow: var(--main-box-shadow);
  cursor: pointer;
  z-index: 50;

  &.disabled {
    background-color: var(--main-background-color);
  }
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
</style>
