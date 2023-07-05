<template>
  <div class="base-footer">
    <ScrollToTop :marginBottom="marginBottom" @userScrolled="updateMargin" />
    <FooterLinks
      v-if="displayFooter"
      :hasToUpdateHeight="hasToUpdateMargin"
      @setMargin="setMargin"
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
  props: {
    displayFooter: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      hasToUpdateMargin: false,
      marginBottom: 0,
    };
  },
  methods: {
    setMargin(height) {
      this.marginBottom = height + 20;
      this.hasToUpdateMargin = false;
    },
    updateMargin() {
      this.hasToUpdateMargin = true;
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
  display: grid;
}
</style>
