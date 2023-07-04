<template>
  <BaseButton :onClickHandler="goBack">Go Back</BaseButton>
</template>

<script>
import BaseButton from '@components/ui/BaseButton.vue';

export default {
  name: 'PokemonItem',
  components: {
    BaseButton,
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped></style>
