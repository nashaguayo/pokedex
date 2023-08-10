<template>
  <div
    :class="{ 'bounce-animation': wasClicked, disabled, small, variant }"
    class="base-chevron"
    @click="handleAndAnimate"
    @animationend="wasClicked = false"
  >
    <FontAwesomeIcon
      :icon="`fa-solid fa-chevron-${direction}`"
      :color="disabled ? 'silver' : 'white'"
      :size="small ? '1x' : '2x'"
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
    small: {
      type: Boolean,
      default: false,
    },
    variant: {
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
  min-width: 2rem;
  min-height: 2rem;
  border-radius: 50%;
  padding: 0.5rem;
  text-align: center;
  box-shadow: var(--main-box-shadow);
  cursor: pointer;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;

  &.disabled {
    background-color: var(--main-background-color);

    &.variant {
      background-color: var(--main-background-color);
    }
  }

  &.small {
    min-width: 1.2rem;
    min-height: 1.2rem;
  }

  &.variant {
    background-color: var(--secondary-background-color);
    border: 0.2rem solid var(--secondary-border-color);
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
