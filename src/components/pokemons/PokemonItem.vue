<template>
  <CenteredColumn class="pokemon-item" ref="pokemonItem">
    <PokemonItemHeader
      id="header"
      :pokemonName="pokemonName"
      :pokemonImage="pokemonImage"
      :topPosition="topPosition"
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
      <PokemonItemType :types="pokemonTypes" />
    </CenteredColumn>
    <BaseButton class="go-back-button" :onClickHandler="goBack" :variant="true">
      Go Back
    </BaseButton>
  </CenteredColumn>
</template>

<script>
import { throttle } from 'lodash';
import BaseButton from '@components/ui/BaseButton.vue';
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import PokemonItemHeader from '@components/pokemons/PokemonItemHeader.vue';
import PokemonItemStat from '@components/pokemons/PokemonItemStat.vue';
import PokemonItemType from '@components/pokemons/PokemonItemType.vue';
import { getPokemon } from '@api/pokemon';
import { capitalizeWord, getPokemonPageBackgroundElement } from '@lib/helpers';

export default {
  name: 'PokemonItem',
  components: {
    BaseButton,
    CenteredColumn,
    PokemonItemHeader,
    PokemonItemStat,
    PokemonItemType,
  },
  data() {
    return {
      pokemon: {},
      pokemonImage: '',
      pokemonName: '',
      pokemonStats: [],
      pokemonTypes: [],
      topPosition: 0,
      throttledParallax: null,
    };
  },
  async created() {
    this.pokemon = await getPokemon(this.$route.params.id);

    this.pokemonStats = this.pokemon.stats.map((s) => {
      return { name: s.stat.name, value: s.base_stat };
    });
    this.pokemonImage = this.pokemon.sprites.other.dream_world.front_default;
    this.pokemonTypes = this.pokemon.types;
    this.getCapitalizedPokemonName();
  },
  mounted() {
    this.throttledParallax = throttle(this.parallax, 20);
    getPokemonPageBackgroundElement().addEventListener(
      'scroll',
      this.throttledParallax
    );
  },
  beforeDestroy() {
    getPokemonPageBackgroundElement().removeEventListener(
      'scroll',
      this.throttledParallax
    );
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
    parallax() {
      const resolution = 1200;
      if (window.innerWidth > resolution) {
        return;
      }
      const yPosition = getPokemonPageBackgroundElement().scrollTop / 2;
      this.topPosition = yPosition;
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
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: repeat(2, 1fr);
    margin: 3rem 3rem 0;
    align-items: start;
    gap: 3rem;
    height: calc(100% - 3rem);
  }

  .pokemon-info-container {
    margin-top: 3rem;
    z-index: 10;
    background-color: var(--main-background-color);
    box-shadow: var(--main-box-shadow);

    @media (min-width: $min-width-first-break) {
      margin-top: 4rem;
    }

    @media (min-width: $min-width-second-break) {
      margin-top: 5rem;
    }

    @media (min-width: $min-width-fourth-break) {
      width: auto;
      background-color: var(--variant-background-color);
      border-radius: 5rem;
      box-shadow: var(--marin-box-shadow);
      border: 0.2rem solid var(--secondary-border-color);
      margin-top: 0;
      margin-left: 3rem;
      grid-row-start: 1;
      grid-row-end: 3;
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
      margin-right: 3rem;
    }
  }
}
</style>
