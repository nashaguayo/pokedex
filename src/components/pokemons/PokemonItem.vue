<template>
  <CenteredColumn class="pokemon-item">
    <img class="pokemon-image" :src="pokemonImage" />
    <BaseButton :onClickHandler="goBack">Go Back</BaseButton>
  </CenteredColumn>
</template>

<script>
import BaseButton from '@components/ui/BaseButton.vue';
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import { getPokemon } from '@api/pokemon';

export default {
  name: 'PokemonItem',
  components: {
    BaseButton,
    CenteredColumn,
  },
  data() {
    return {
      pokemon: {},
      pokemonImage: '',
    };
  },
  async created() {
    // TODO: handle error gracefully when no pokemon is found or getPokemon() throws exception
    this.pokemon = await getPokemon(this.$route.params.id);
    this.pokemonImage = this.pokemon.sprites.other.dream_world.front_default;
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
      return pokemonNameCapitalized;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.pokemon-item {
  .pokemon-image {
    width: 20rem;

    @media (min-width: $min-width-first-break) {
      width: 25rem;
    }

    @media (min-width: $min-width-second-break) {
      width: 30rem;
    }
  }
}
</style>
