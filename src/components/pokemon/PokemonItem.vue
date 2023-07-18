<template>
  <div class="pokemon-item" ref="pokemonItem">
    <PokemonItemHeader
      :name="name"
      :image="image"
      :topPosition="topPosition"
      v-observe-visibility="{ callback: headerIsVisible, once: true }"
    />
    <div class="pokemon-info-container">
      <h1 class="pokemon-name">{{ capitalizeWord(name) }}</h1>
      <PokemonItemCharacteristics
        :characteristic="characteristic"
        :height="height"
        :weight="weight"
        :color="color"
      />
      <PokemonItemStats :stats="stats" />
      <PokemonItemType :types="types" />
    </div>
    <PokemonItemEvolutions
      :evolutions="evolutions"
      :pokemonId="id"
      :pokemonName="name"
    />
    <PokemonItemDescription :flavorTexts="flavorTexts" />
    <BaseButton
      class="go-back-button"
      :onClickHandler="goToPokemonsPage"
      :variant="true"
      :big="true"
    >
      Go Back
    </BaseButton>
  </div>
</template>

<script>
import { throttle } from 'lodash';
import BaseButton from '@/components/ui/BaseButton.vue';
import PokemonItemHeader from '@/components/pokemon/PokemonItemHeader.vue';
import PokemonItemCharacteristics from '@/components/pokemon/PokemonItemCharacteristics.vue';
import PokemonItemStats from '@/components/pokemon/PokemonItemStats.vue';
import PokemonItemType from '@/components/pokemon/PokemonItemType.vue';
import PokemonItemEvolutions from '@/components/pokemon/PokemonItemEvolutions.vue';
import PokemonItemDescription from '@/components/pokemon/PokemonItemDescription.vue';
import { getPageBackgroundElement, capitalizeWord } from '@/lib/helpers';
import store from '@/lib/store';
import { fourthBreak } from '@/constants/resolutions';
import silouette from '@/assets/pokemons/silouette.png';

export default {
  name: 'PokemonItem',
  components: {
    BaseButton,
    PokemonItemHeader,
    PokemonItemCharacteristics,
    PokemonItemStats,
    PokemonItemType,
    PokemonItemEvolutions,
    PokemonItemDescription,
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
      document.title = `Pokedex - ${capitalizeWord(this.name)}`;
    },
  },
  computed: {
    urlId() {
      return this.$route.params.id;
    },
    id() {
      return store.state.pokemon.get(this.loading ? 0 : this.urlId)?.id ?? 0;
    },
    name() {
      return (
        store.state.pokemon.get(this.loading ? 0 : this.urlId)?.name ?? '???'
      );
    },
    image() {
      return (
        store.state.pokemon.get(this.loading ? 0 : this.urlId)?.image ??
        silouette
      );
    },
    stats() {
      return (
        store.state.pokemon.get(this.loading ? 0 : this.urlId)?.stats ?? []
      );
    },
    types() {
      return (
        store.state.pokemon.get(this.loading ? 0 : this.urlId)?.types ?? []
      );
    },
    evolutions() {
      return (
        store.state.pokemon.get(this.loading ? 0 : this.urlId)?.evolutions ?? []
      );
    },
    flavorTexts() {
      return (
        store.state.pokemon.get(this.loading ? 0 : this.urlId)?.flavorTexts ??
        []
      );
    },
    characteristic() {
      return (
        store.state.pokemon.get(this.loading ? 0 : this.urlId)
          ?.characteristic ?? ''
      );
    },
    weight() {
      return (
        store.state.pokemon.get(this.loading ? 0 : this.urlId)?.weight ?? 0
      );
    },
    height() {
      return (
        store.state.pokemon.get(this.loading ? 0 : this.urlId)?.height ?? 0
      );
    },
    color() {
      return (
        store.state.pokemon.get(this.loading ? 0 : this.urlId)?.color ?? ''
      );
    },
  },
  async created() {
    if (!store.state.pokemon.has(this.urlId)) {
      await store.getPokemon(this.urlId);
    }
    this.loading = false;
  },
  beforeDestroy() {
    if (window.innerWidth >= fourthBreak) {
      return;
    }
    getPageBackgroundElement().removeEventListener(
      'scroll',
      this.throttledParallax
    );
  },
  methods: {
    capitalizeWord,
    goToPokemonsPage() {
      this.$router.push({ name: 'pokemons' });
    },
    parallax() {
      const yPosition = getPageBackgroundElement().scrollTop / 2;
      this.topPosition = yPosition;
    },
    headerIsVisible() {
      if (this.loading || window.innerWidth >= fourthBreak) {
        return;
      }
      this.throttledParallax = throttle(this.parallax, 20);
      getPageBackgroundElement().addEventListener(
        'scroll',
        this.throttledParallax
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 1;
  background-image: var(--popup-background-color);
  overflow-x: hidden;

  @media (min-width: $min-width-second-break) {
    width: 75%;
  }

  @media (min-width: $min-width-fourth-break) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    margin: 0rem 3rem 0;
    padding-top: 3rem;
    align-items: start;
    gap: 1rem;
    height: calc(100% - 3rem);
  }

  .pokemon-info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
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
      grid-row-end: 4;
    }

    .pokemon-name {
      display: none;

      @media (min-width: $min-width-fourth-break) {
        display: block;
        color: var(--secondary-text-color);
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

.pokemon-item::-webkit-scrollbar {
  display: none;
}

.flip-open-enter-active,
.flip-open-leave-active {
  transition: transform 0.3s linear;
}

.flip-open-enter,
.flip-open-leave-to {
  transform: scaleY(0);
}
</style>
