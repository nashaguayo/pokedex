<template>
  <BaseLoader :loading="loading" :coverPage="true" mode="in-out">
    <CenteredColumn class="pokemon-item" ref="pokemonItem">
      <PokemonItemHeader
        id="header"
        :name="name"
        :image="image"
        :topPosition="topPosition"
      />
      <CenteredColumn class="pokemon-info-container">
        <h1 class="pokemon-name">{{ capitalizeWord(name) }}</h1>
        <PokemonItemStat
          :key="'stat'"
          :stat="{ name: 'stat', value: 'value' }"
          :big="true"
        />
        <PokemonItemStat v-for="stat in stats" :key="stat.name" :stat="stat" />
        <PokemonItemType :types="types" />
      </CenteredColumn>
      <PokemonItemEvolutions :pokemonId="id" :pokemonName="name" />
      <BaseButton
        class="go-back-button"
        :onClickHandler="goBack"
        :variant="true"
        :big="true"
      >
        Go Back
      </BaseButton>
    </CenteredColumn>
  </BaseLoader>
</template>

<script>
import { throttle } from 'lodash';
import BaseLoader from '@components/ui/BaseLoader.vue';
import BaseButton from '@components/ui/BaseButton.vue';
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import PokemonItemHeader from '@components/pokemon/PokemonItemHeader.vue';
import PokemonItemStat from '@components/pokemon/PokemonItemStat.vue';
import PokemonItemType from '@components/pokemon/PokemonItemType.vue';
import PokemonItemEvolutions from '@components/pokemon/PokemonItemEvolutions.vue';
import { getPokemonPageBackgroundElement } from '@lib/helpers';
import store from '@lib/store';
import { capitalizeWord } from '@lib/helpers';
import mediaQueries from '@css/media-queries.scss?vue&type=style&index=0&lang=scss&module=1';

export default {
  name: 'PokemonItem',
  components: {
    BaseLoader,
    BaseButton,
    CenteredColumn,
    PokemonItemHeader,
    PokemonItemStat,
    PokemonItemType,
    PokemonItemEvolutions,
  },
  data() {
    return {
      topPosition: 0,
      throttledParallax: null,
      loading: true,
    };
  },
  watch: {
    name() {
      document.title = `Pokedex - ${capitalizeWord(this.name ?? '')}`;
    },
    async loading() {
      if (this.loading) {
        return;
      }
      await this.$nextTick();

      if (
        window.innerWidth >= Number(mediaQueries.fourthBreak.replace('px', ''))
      ) {
        return;
      }
      this.throttledParallax = throttle(this.parallax, 20);
      getPokemonPageBackgroundElement().addEventListener(
        'scroll',
        this.throttledParallax
      );
    },
  },
  computed: {
    urlId() {
      return this.$route.params.id;
    },
    id() {
      return store.state.pokemon.get(this.loading ? 0 : this.urlId)?.id;
    },
    name() {
      return store.state.pokemon.get(this.loading ? 0 : this.urlId)?.name;
    },
    image() {
      return store.state.pokemon.get(this.loading ? 0 : this.urlId)?.image;
    },
    stats() {
      return store.state.pokemon.get(this.loading ? 0 : this.urlId)?.stats;
    },
    types() {
      return store.state.pokemon.get(this.loading ? 0 : this.urlId)?.types;
    },
  },
  async created() {
    if (!store.state.pokemon.has(this.urlId)) {
      await store.getPokemon(this.urlId);
    }
    this.loading = false;
  },
  beforeDestroy() {
    if (
      window.innerWidth >= Number(mediaQueries.fourthBreak.replace('px', ''))
    ) {
      return;
    }
    getPokemonPageBackgroundElement().removeEventListener(
      'scroll',
      this.throttledParallax
    );
  },
  methods: {
    capitalizeWord,
    goBack() {
      if (this.$router.history?._startLocation === this.$route.path) {
        this.$router.push({ name: 'pokemons' });
        return;
      }
      this.$router.back();
    },
    parallax() {
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
    grid-template-rows: repeat(3, 1fr);
    margin: 3rem 3rem 0;
    align-items: start;
    gap: 1rem;
    height: calc(100% - 3rem);
  }

  .pokemon-info-container {
    margin-top: 2rem;
    z-index: 10;
    background-color: var(--main-background-color);
    box-shadow: var(--main-box-shadow);

    @media (min-width: $min-width-first-break) {
      margin-top: 3rem;
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
      grid-column-start: 1;
      grid-column-end: 3;
      justify-self: center;
      width: calc(100% - 6rem);
    }
  }
}
</style>
