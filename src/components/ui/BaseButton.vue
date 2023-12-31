<template>
  <button
    :disabled="disabled"
    @click="handleAndAnimate"
    :class="{
      'shrink-animation': wasClicked,
      'background-variant': variant,
      big: big,
      small: small,
    }"
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
    disabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: Boolean,
      default: false,
    },
    big: {
      type: Boolean,
      default: false,
    },
    small: {
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
  box-shadow: var(--main-box-shadow);
  border: 0.2rem solid var(--secondary-border-color);
  cursor: pointer;
  padding: 0.5rem;
  min-width: 8rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &[disabled] {
    background-color: var(--disabled-button-background-color) !important;
    color: var(--disabled-button-color) !important;
  }

  @media (min-width: $min-width-third-break) {
    padding: 0.8rem;
    min-width: 15rem;
    font-size: 1.5rem;
  }

  &.small {
    @media (min-width: $min-width-third-break) {
      padding: 0.5rem;
      min-width: 10rem;
      font-size: 1rem;
    }
  }

  &.background-variant {
    background-color: var(--variant-background-color);
    color: var(--variant-text-color);
  }

  &.big {
    width: 90%;
    margin: 0 auto;
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
