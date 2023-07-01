<template>
  <div class="base-footer">
    <h1>This is a footer</h1>
  </div>
</template>

<script>
export default {
  name: 'BaseFooter',
};
</script>

<style lang="scss" scoped>
@import '@css/colors.scss';

.base-footer {
  position: relative;
  background-color: $variant-background-color;
  width: 100%;
  height: 7rem;
  bottom: 0;
  margin-top: auto;
}
</style>
