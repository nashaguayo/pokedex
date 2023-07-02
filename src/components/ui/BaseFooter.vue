<template>
  <div class="base-footer">
    <ScrollToTop />
    <FooterLinks />
  </div>
</template>

<script>
import ScrollToTop from '@components/footer/ScrollToTop.vue';
import FooterLinks from '@components/footer/FooterLinks.vue';

export default {
  name: 'BaseFooter',
  components: {
    ScrollToTop,
    FooterLinks,
  },
};
</script>

<style lang="scss" scoped>
.base-footer {
  position: relative;
  width: 100%;
  bottom: 0;
  margin-top: auto;
}
</style>
