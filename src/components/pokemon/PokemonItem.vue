<template>
  <BaseLoader
    :loading="loading"
    :afterEnter="headerIsVisible"
    :coverPage="true"
  >
    <div class="pokemon-item" ref="pokemonItem">
      <PokemonItemHeader
        :name="name"
        :image="image"
        :smallImage="smallImage"
        :topPosition="topPosition"
        :habitat="habitat"
      />
      <div class="pokemon-info-container">
        <h2 class="pokemon-name">{{ capitalizeWord(name) }}</h2>
        <PokemonItemCharacteristics
          :id="id"
          :characteristic="characteristic"
          :height="height"
          :weight="weight"
          :color="color"
          :shape="shape"
          :generation="generation"
          :habitat="habitat"
        />
        <PokemonItemStats :stats="stats" />
        <PokemonItemType :types="types" />
      </div>
      <PokemonItemEvolutions :evolutions="evolutions" :pokemonName="name" />
      <PokemonItemVariants
        v-if="variants.length"
        :pokemon-name="name"
        :variants="variants"
      />
      <PokemonItemDescription :flavorTexts="flavorTexts" />
      <div class="navigation">
        <BaseButton
          :onClickHandler="goToPreviousPokemon"
          :disabled="id === 1"
          :variant="true"
        >
          Previous
        </BaseButton>
        <BaseButton
          :onClickHandler="goToNextPokemon"
          :disabled="id === lastPokemonId"
          :variant="true"
        >
          Next
        </BaseButton>
      </div>
      <div class="go-back">
        <BaseButton
          class="go-back-button"
          :onClickHandler="goToPokemonsPage"
          :big="true"
        >
          Go Back
        </BaseButton>
      </div>
    </div>
  </BaseLoader>
</template>

<script>
import { throttle } from 'lodash';
import BaseLoader from '@/components/ui/BaseLoader.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import PokemonItemHeader from '@/components/pokemon/PokemonItemHeader.vue';
import PokemonItemCharacteristics from '@/components/pokemon/PokemonItemCharacteristics.vue';
import PokemonItemStats from '@/components/pokemon/PokemonItemStats.vue';
import PokemonItemType from '@/components/pokemon/PokemonItemType.vue';
import PokemonItemEvolutions from '@/components/pokemon/PokemonItemEvolutions.vue';
import PokemonItemVariants from '@/components/pokemon/PokemonItemVariants.vue';
import PokemonItemDescription from '@/components/pokemon/PokemonItemDescription.vue';
import {
  getPageBackgroundElement,
  capitalizeWord,
  scrollToTopOfBackgroundPage,
} from '@/lib/helpers';
import store from '@/lib/store';
import { fourthBreak } from '@/constants/resolutions';
import silouette from '@/assets/pokemons/silouette.png';

export default {
  name: 'PokemonItem',
  components: {
    BaseLoader,
    BaseButton,
    PokemonItemHeader,
    PokemonItemCharacteristics,
    PokemonItemStats,
    PokemonItemType,
    PokemonItemEvolutions,
    PokemonItemVariants,
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
    lastPokemonId() {
      return this.allPokemons[this.allPokemons.length - 1]?.id ?? 0;
    },
    allPokemons() {
      return store.state.allPokemons;
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
      return store.state.pokemon.get(this.loading ? 0 : this.urlId)?.image;
    },
    smallImage() {
      return (
        store.state.pokemon.get(this.loading ? 0 : this.urlId)?.smallImage ??
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
    shape() {
      return (
        store.state.pokemon.get(this.loading ? 0 : this.urlId)?.shape ?? ''
      );
    },
    generation() {
      return (
        store.state.pokemon.get(this.loading ? 0 : this.urlId)?.generation ?? ''
      );
    },
    habitat() {
      return (
        store.state.pokemon.get(this.loading ? 0 : this.urlId)?.habitat ?? ''
      );
    },
    variants() {
      return (
        store.state.pokemon.get(this.loading ? 0 : this.urlId)?.variants ?? []
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
      this.$router.back();
    },
    parallax() {
      const yPosition = getPageBackgroundElement().scrollTop / 2;
      this.topPosition = yPosition;
    },
    headerIsVisible() {
      if (this.loading || window.innerWidth >= fourthBreak) {
        return;
      }
      this.throttledParallax = throttle(this.parallax, 10);
      getPageBackgroundElement().addEventListener(
        'scroll',
        this.throttledParallax
      );
    },
    goToPreviousPokemon() {
      const index = this.allPokemons.findIndex(
        (pokemon) => pokemon.id === this.id
      );
      this.navigateToPokemon(this.allPokemons[index - 1].name);
    },
    goToNextPokemon() {
      const index = this.allPokemons.findIndex(
        (pokemon) => pokemon.id === this.id
      );
      this.navigateToPokemon(this.allPokemons[index + 1].name);
    },
    navigateToPokemon(id) {
      this.$router.push({ name: 'pokemon', params: { id } });
      scrollToTopOfBackgroundPage('smooth');
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
  height: 100%;
  z-index: 1;

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
      border-radius: 2rem;
      box-shadow: var(--main-box-shadow);
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
        -webkit-text-stroke-color: var(--variant-title-border-color);
        color: var(--variant-title-color);
      }
    }
  }

  .navigation {
    display: grid;
    width: 90%;
    margin-top: 1rem;
    grid-template-columns: repeat(2, 1fr);

    @media (min-width: $min-width-first-break) {
      margin-top: 2rem;
      gap: 1rem;
    }

    @media (min-width: $min-width-fourth-break) {
      grid-row-start: 5;
      grid-row-end: 6;
      grid-column-start: 1;
      grid-column-end: 3;
      margin: 0 auto;
      margin-top: 2rem;
      gap: 2rem;
    }
  }

  .go-back {
    margin-bottom: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;

    @media (min-width: $min-width-fourth-break) {
      grid-column-start: 1;
      grid-column-end: 3;
    }

    .go-back-button {
      margin-top: 1rem;
      margin-bottom: 6rem;

      @media (min-width: $min-width-fourth-break) {
        justify-self: center;
        width: calc(100% - 6rem);
      }
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
