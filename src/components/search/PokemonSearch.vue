<template>
  <CenteredColumn>
    <h2>Search for Pokemons!</h2>
    <BaseInput />
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
