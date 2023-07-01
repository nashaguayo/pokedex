<template>
  <BasePage title="404 Error">
    <template v-slot:content>
      <h2>Page Not Found</h2>
      <span class="page-not-found-text">
        How did you get here? There's nothing to see!
      </span>
    </template>
  </BasePage>
</template>

<script>
import BasePage from '@components/ui/BasePage.vue';

export default {
  components: { BasePage },
  name: 'PageNotFoundView',
};
</script>

<style lang="scss" scoped>
.page-not-found-text {
  text-align: center;
}
</style>
