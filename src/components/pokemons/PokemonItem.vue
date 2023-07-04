<template>
  <CenteredColumn class="pokemon-item">
    <img class="pokemon-image" :src="pokemonImage" />
    <div class="pokemon-image-container"></div>
    <h2 class="pokemon-name">{{ getCapitalizedPokemonName() }}</h2>
    <div class="pokemon-info-container">
      <BaseButton :onClickHandler="goBack">Go Back</BaseButton>
    </div>
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
  margin-top: 2rem;
  .pokemon-image {
    width: 20rem;

    @media (min-width: $min-width-first-break) {
      width: 25rem;
    }

    @media (min-width: $min-width-second-break) {
      width: 30rem;
    }
  }

  .pokemon-image-container {
    position: fixed;
    height: 2.5rem;
    width: 100%;
    z-index: 5;
    top: 16.5rem;
    backdrop-filter: grayscale(100%);

    @media (min-width: $min-width-first-break) {
      top: 20.5rem;
      height: 3rem;
    }

    @media (min-width: $min-width-second-break) {
      top: 24rem;
      height: 4rem;
    }
  }

  .pokemon-name {
    position: fixed;
    top: 16rem;
    z-index: 10;

    @media (min-width: $min-width-first-break) {
      top: 20rem;
    }

    @media (min-width: $min-width-second-break) {
      top: 23rem;
    }
  }

  .pokemon-info-container {
    margin-top: 2rem;
  }
}
</style>
