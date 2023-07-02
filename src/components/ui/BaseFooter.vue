<template>
  <div class="base-footer">
    <ScrollToTop :marginBottom="marginBottom" @userScrolled="updateHeight" />
    <FooterLinks
      :hasToUpdateHeight="hasToUpdateHeight"
      @setHeight="setHeight"
    />
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
  data() {
    return {
      hasToUpdateHeight: false,
      marginBottom: 0,
    };
  },
  methods: {
    setHeight(height) {
      this.marginBottom = height + 20;
      this.hasToUpdateHeight = false;
    },
    updateHeight() {
      this.hasToUpdateHeight = true;
    },
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
