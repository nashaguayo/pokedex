<template>
  <div class="page-not-found-view">
    <h1>404 Error</h1>
    <h2>Page Not Found</h2>
    <span class="page-not-found-text">
      How did you get here? There's nothing to see!
    </span>
  </div>
</template>

<script>
export default {
  title: 'Page Not Found',
  name: 'PageNotFoundView',
};
</script>

<style lang="scss" scoped>
.page-not-found-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .page-not-found-text {
    text-align: center;
  }
}
</style>
