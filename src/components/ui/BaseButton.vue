<template>
  <button @click="onClick" class="base-button">{{ text }}</button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    onClick: {
      type: Function,
      default: () => {},
    },
    text: {
      type: String,
      default: 'Click Me',
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
}
</style>
