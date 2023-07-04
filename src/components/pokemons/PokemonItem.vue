<template>
  <CenteredColumn class="pokemon-item" ref="pokemonItem">
    <PokemonItemHeader
      :pokemonName="pokemonName"
      :pokemonImage="pokemonImage"
    />
    <CenteredColumn class="pokemon-info-container">
      <h1 class="pokemon-name">{{ pokemon.name }}</h1>
      <PokemonItemStat
        :key="'stat'"
        :pokemonStat="{ name: 'stat', value: 'value' }"
        :big="true"
      />
      <PokemonItemStat
        v-for="pokemonStat in pokemonStats"
        :key="pokemonStat.name"
        :pokemonStat="pokemonStat"
      />
      <BaseButton class="go-back-button" :onClickHandler="goBack"
        >Go Back</BaseButton
      >
    </CenteredColumn>
  </CenteredColumn>
</template>

<script>
import BaseButton from '@components/ui/BaseButton.vue';
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import PokemonItemHeader from '@components/pokemons/PokemonItemHeader.vue';
import PokemonItemStat from '@components/pokemons/PokemonItemStat.vue';
import { getPokemon } from '@api/pokemon';
import { capitalizeWord } from '@lib/helpers';

export default {
  name: 'PokemonItem',
  components: {
    BaseButton,
    CenteredColumn,
    PokemonItemHeader,
    PokemonItemStat,
  },
  data() {
    return {
      pokemon: {},
      pokemonImage: '',
      pokemonName: '',
      pokemonStats: [],
    };
  },
  async created() {
    // TODO: handle error gracefully when no pokemon is found or getPokemon() throws exception
    this.pokemon = await getPokemon(this.$route.params.id);
    this.pokemonStats = this.pokemon.stats.map((s) => {
      return { name: s.stat.name, value: s.base_stat };
    });
    this.pokemonImage = this.pokemon.sprites.other.dream_world.front_default;
    this.getCapitalizedPokemonName();
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    getCapitalizedPokemonName() {
      const pokemonNameCapitalized = capitalizeWord(this.$route.params.id);
      this.pokemonName = pokemonNameCapitalized;
      document.title = `Pokedex - ${pokemonNameCapitalized}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.pokemon-item {
  position: absolute;
  z-index: 1;
  background-image: var(--popup-background-color);
  height: 100%;
  overflow-x: hidden;

  @media (min-width: $min-width-second-break) {
    width: 75%;
  }

  @media (min-width: $min-width-fourth-break) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-evenly;
    align-items: flex-start;
    margin-top: 3rem;
  }

  .pokemon-info-container {
    margin-top: 3rem;

    @media (min-width: $min-width-first-break) {
      margin-top: 5rem;
    }

    @media (min-width: $min-width-second-break) {
      margin-top: 6rem;
    }

    @media (min-width: $min-width-fourth-break) {
      width: auto;
      background-color: var(--variant-background-color);
      border-radius: 5rem;
      box-shadow: var(--marin-box-shadow);
      border: 0.2rem solid var(--secondary-border-color);
      margin-top: 0;
    }

    .pokemon-name {
      display: none;

      @media (min-width: $min-width-fourth-break) {
        display: block;
        color: var(--secondary-text-color) !important;
      }
    }
  }

  .go-back-button {
    margin-top: 1rem;
    margin-bottom: 3rem;

    @media (min-width: $min-width-first-break) {
      margin-top: 2rem;
    }

    @media (min-width: $min-width-fourth-break) {
      margin-top: 3rem;
    }
  }
}
</style>
