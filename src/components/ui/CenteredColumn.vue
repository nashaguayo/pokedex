<template>
  <div class="centered-column">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CenteredColumn',
};
</script>

<style lang="scss" scoped>
.centered-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
