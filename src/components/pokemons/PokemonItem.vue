<template>
  <CenteredColumn>
    <BaseButton :onClickHandler="goBack">Go Back</BaseButton>
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
  created() {
    this.getCapitalizedPokemonName();
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    getCapitalizedPokemonName() {
      const pokemonName = this.$route.params.id;
      const firstLetter = pokemonName.charAt(0).toUpperCase();
      const remainingLetters = pokemonName.substring(1);
      const pokemonNameCapitalized = `${firstLetter}${remainingLetters}`;
      document.title = `Pokedex - ${pokemonNameCapitalized}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
