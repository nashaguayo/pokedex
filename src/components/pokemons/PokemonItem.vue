<template>
  <CenteredColumn class="pokemon-item" ref="pokemonItem">
    <PokemonItemHeader
      :pokemonName="pokemonName"
      :pokemonImage="pokemonImage"
    />
    <div class="pokemon-info-container">
      <BaseButton :onClickHandler="goBack">Go Back</BaseButton>
    </div>
  </CenteredColumn>
</template>

<script>
import BaseButton from '@components/ui/BaseButton.vue';
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import PokemonItemHeader from '@components/pokemons/PokemonItemHeader.vue';
import { getPokemon } from '@api/pokemon';

export default {
  name: 'PokemonItem',
  components: {
    BaseButton,
    CenteredColumn,
    PokemonItemHeader,
  },
  data() {
    return {
      pokemon: {},
      pokemonImage: '',
      pokemonName: '',
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
      this.pokemonName = pokemonNameCapitalized;
      document.title = `Pokedex - ${pokemonNameCapitalized}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.pokemon-item {
  .pokemon-info-container {
    position: relative;
    top: -5rem;

    @media (min-width: $min-width-first-break) {
      top: -7rem;
    }

    @media (min-width: $min-width-second-break) {
      top: -9rem;
    }
  }
}
</style>
