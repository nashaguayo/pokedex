<template>
  <button
    :disabled="disabled"
    @click="handleAndAnimate"
    :class="{ 'shrink-animation': wasClicked }"
    class="base-button"
    @animationend="wasClicked = false"
  >
    <slot>Click Me</slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    onClickHandler: {
      type: Function,
      default: () => {},
    },
    text: {
      type: String,
      default: 'Click Me',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      wasClicked: false,
    };
  },
  methods: {
    handleAndAnimate() {
      this.wasClicked = true;
      this.onClickHandler();
    },
  },
};
</script>

<style lang="scss" scoped>
.base-button {
  background-color: var(--secondary-background-color);
  border-radius: 3rem;
  border: 0;
  color: var(--secondary-text-color);
  font-family: 'Upheaval';
  padding: 0.8rem;
  min-width: 15rem;
  font-size: 1.5rem;
  box-shadow: var(--main-box-shadow);
  border: 0.2rem solid var(--main-border-color);

  &[disabled] {
    background-color: var(--disabled-button-background-color);
    color: var(--disabled-button-color);
  }
}

.shrink-animation {
  animation: shrink 0.3s;
}

@keyframes shrink {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
}
</style>
