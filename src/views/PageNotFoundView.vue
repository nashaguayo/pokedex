<template>
  <BasePage title="404 Error">
    <template v-slot:content>
      <span>Page not found</span>
    </template>
  </BasePage>
</template>

<script>
import BasePage from '@/components/ui/BasePage.vue';

export default {
  components: { BasePage },
  name: 'PageNotFoundView',
};
</script>
