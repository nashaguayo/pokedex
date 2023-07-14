<template>
  <CenteredColumn>
    <h1>404 Error</h1>
    <h2>Page Not Found</h2>
    <span class="page-not-found-text">
      How did you get here? There's nothing to see!
    </span>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@/components/ui/CenteredColumn.vue';

export default {
  components: { CenteredColumn },
  title: 'Page Not Found',
  name: 'PageNotFoundView',
};
</script>

<style lang="scss" scoped>
.page-not-found-text {
  text-align: center;
}
</style>
