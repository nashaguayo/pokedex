<template>
  <CenteredColumn>
    <BaseButton :onClickHandler="goBack">Go Back</BaseButton>
    <p>{{ $route.params.id }}</p>
  </CenteredColumn>
</template>

<script>
import BaseButton from '@components/ui/BaseButton.vue';
import CenteredColumn from '@components/ui/CenteredColumn.vue';

export default {
  name: 'PokemonItem',
  components: {
    BaseButton,
    CenteredColumn,
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped></style>
