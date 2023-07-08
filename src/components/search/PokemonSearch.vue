<template>
  <CenteredColumn>
    <BaseInput name="pokemon" icon="fa-solid fa-magnifying-glass" />
  </CenteredColumn>
</template>

<script>
import BaseInput from '@components/ui/BaseInput';
import CenteredColumn from '@components/ui/CenteredColumn';

export default {
  name: 'PokemonSearch',
  components: { BaseInput, CenteredColumn },
};
</script>

<style lang="scss" scoped></style>
