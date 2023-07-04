<template>
  <CenteredColumn class="pokemon-item">
    <img class="pokemon-image" :src="pokemonImage" />
    <div class="pokemon-backdrop-filter"></div>
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
    console.log(this.pokemon);
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

  .pokemon-backdrop-filter {
    position: relative;
    height: 2.5rem;
    width: 100%;
    z-index: 5;
    top: -5rem;
    backdrop-filter: grayscale(100%);

    @media (min-width: $min-width-first-break) {
      height: 4rem;
    }

    @media (min-width: $min-width-second-break) {
      height: 5rem;
    }
  }

  .pokemon-name {
    position: relative;
    top: -8rem;
    z-index: 10;

    @media (min-width: $min-width-first-break) {
      top: -9rem;
    }

    @media (min-width: $min-width-second-break) {
      top: -10.5rem;
    }
  }

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
