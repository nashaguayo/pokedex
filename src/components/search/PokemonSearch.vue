<template>
  <div class="pokemon-search">
    <div class="controls">
      <BaseInput
        name="search"
        placeholder="search for pokemon"
        icon="fa-solid fa-magnifying-glass"
        @inputValueChanged="setSearchTerm"
        :model="searchTerm"
        :reset="reset"
        class="search-input"
      />
      <div class="buttons">
        <BaseButton
          class="button"
          :onClickHandler="toggleDisplayTypes"
          :variant="true"
          :small="true"
        >
          {{ displayTypesText }}
        </BaseButton>
        <BaseButton
          class="button"
          :onClickHandler="toggleDisplayColors"
          :variant="true"
          :small="true"
        >
          {{ displayColorsText }}
        </BaseButton>
        <BaseButton
          class="button"
          :onClickHandler="toggleDisplayShapes"
          :variant="true"
          :small="true"
        >
          {{ displayShapesText }}
        </BaseButton>
        <BaseButton
          class="button"
          :onClickHandler="toggleDisplayGenerations"
          :variant="true"
          :small="true"
        >
          {{ displayGenerationsText }}
        </BaseButton>
        <BaseButton
          class="button clear-search"
          :onClickHandler="clearSearch"
          :small="true"
        >
          Clear Search
        </BaseButton>
      </div>
    </div>
    <transition name="slide-from-above" mode="out-in" appear>
      <component :is="component" />
    </transition>
    <transition name="slide-from-above" mode="out-in" appear>
      <span
        class="no-results"
        v-if="
          (searchTerm.length >= 3 ||
            (searchTerm.length < 3 &&
              (filteringTypes.length ||
                filteringColor.length ||
                filteringShape.length ||
                filteringGenerations.length))) &&
          !searchResults.length
        "
      >
        No results found
      </span>
    </transition>
    <BaseLoader :loading="loading">
      <transition-group
        class="results"
        name="slide-from-right"
        mode="out-in"
        appear
      >
        <span
          v-for="pokemon in searchResults"
          :key="pokemon"
          class="search-result"
          @click="goToPokemonPage(pokemon)"
        >
          {{ pokemon }}
        </span>
      </transition-group>
    </BaseLoader>
    <div class="go-back">
      <BaseButton :onClickHandler="goBack" :big="true"> Go Back </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseLoader from '@/components/ui/BaseLoader';
import BaseButton from '@/components/ui/BaseButton';
import BaseInput from '@/components/ui/BaseInput';
import PokemonSearchTypes from '@/components/search/PokemonSearchTypes.vue';
import PokemonSearchColors from '@/components/search/PokemonSearchColors.vue';
import PokemonSearchShapes from '@/components/search/PokemonSearchShapes.vue';
import PokemonSearchGenerations from '@/components/search/PokemonSearchGenerations.vue';
import store from '@/lib/store';

export default {
  name: 'PokemonSearch',
  components: {
    BaseLoader,
    BaseButton,
    BaseInput,
    PokemonSearchTypes,
    PokemonSearchColors,
    PokemonSearchShapes,
    PokemonSearchGenerations,
  },
  data() {
    return {
      component: null,
      searchTerm: '',
      displayTypes: false,
      displayColors: false,
      displayShapes: false,
      displayGenerations: false,
      reset: false,
    };
  },
  beforeDestroy() {
    this.clearSearch();
  },
  watch: {
    async searchTerm(searchTerm) {
      if (
        searchTerm.length < 3 &&
        !this.filteringTypes.length &&
        !this.filteringColor.length &&
        !this.filteringShape.length &&
        !this.filteringGenerations.length
      ) {
        store.clearSearchResults();
        return;
      }
      await store.searchPokemons(searchTerm);
    },
    async filteringTypes(filteringTypes) {
      if (!filteringTypes.length && !this.searchTerm) {
        store.clearSearchResults();
        return;
      }
      await store.searchPokemons(this.searchTerm);
    },
    async filteringColor(filteringColor) {
      if (!filteringColor.length && !this.searchTerm) {
        store.clearSearchResults();
        return;
      }
      await store.searchPokemons(this.searchTerm);
    },
    async filteringShape(filteringShape) {
      if (!filteringShape.length && !this.searchTerm) {
        store.clearSearchResults();
        return;
      }
      await store.searchPokemons(this.searchTerm);
    },
    async filteringGenerations(filteringGenerations) {
      if (!filteringGenerations.length && !this.searchTerm) {
        store.clearSearchResults();
        return;
      }
      await store.searchPokemons(this.searchTerm);
    },
  },
  computed: {
    searchResults() {
      return store.state.search.results;
    },
    filteringTypes() {
      return store.state.search.types;
    },
    filteringColor() {
      return store.state.search.color;
    },
    filteringShape() {
      return store.state.search.shape;
    },
    filteringGenerations() {
      return store.state.search.generations;
    },
    loading() {
      return store.state.search.isSearchingPokemon;
    },
    displayTypesText() {
      return `${this.displayTypes ? 'Hide' : 'Show'} Types`;
    },
    displayColorsText() {
      return `${this.displayColors ? 'Hide' : 'Show'} Colors`;
    },
    displayShapesText() {
      return `${this.displayShapes ? 'Hide' : 'Show'} Shapes`;
    },
    displayGenerationsText() {
      return `${this.displayGenerations ? 'Hide' : 'Show'} Gens`;
    },
  },
  methods: {
    goToPokemonPage(pokemon) {
      this.$router.push({ name: 'pokemon', params: { id: pokemon } });
    },
    goBack() {
      this.$router.back();
    },
    setSearchTerm(searchTerm) {
      this.reset = false;
      this.searchTerm = searchTerm;
    },
    toggleDisplayTypes() {
      this.clearDisplayVariables();
      if (this.component === 'PokemonSearchTypes') {
        this.component = null;
        return;
      }
      this.component = 'PokemonSearchTypes';
      this.displayTypes = true;
      store.clearColorFilters();
      store.clearShapeFilters();
      store.clearGenerationFilters();
    },
    toggleDisplayColors() {
      this.clearDisplayVariables();
      if (this.component === 'PokemonSearchColors') {
        this.component = null;
        return;
      }
      this.component = 'PokemonSearchColors';
      this.displayColors = true;
      store.clearTypeFilters();
      store.clearShapeFilters();
      store.clearGenerationFilters();
    },
    toggleDisplayShapes() {
      this.clearDisplayVariables();
      if (this.component === 'PokemonSearchShapes') {
        this.component = null;
        return;
      }
      this.component = 'PokemonSearchShapes';
      this.displayShapes = true;
      store.clearTypeFilters();
      store.clearColorFilters();
      store.clearGenerationFilters();
    },
    toggleDisplayGenerations() {
      this.clearDisplayVariables();
      if (this.component === 'PokemonSearchGenerations') {
        this.component = null;
        return;
      }
      this.component = 'PokemonSearchGenerations';
      this.displayGenerations = true;
      store.clearTypeFilters();
      store.clearColorFilters();
      store.clearShapeFilters();
    },
    clearSearch() {
      this.reset = true;
      store.clearSearchResults();
      store.clearFilters();
      this.component = null;
      this.clearDisplayVariables();
    },
    clearDisplayVariables() {
      this.displayTypes = false;
      this.displayColors = false;
      this.displayShapes = false;
      this.displayGenerations = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;

  .controls {
    width: calc(100% - 4rem);
    background-color: var(--main-background-color);
    z-index: 5;
    padding: 0 2rem;

    @media (min-width: $min-width-third-break) {
      display: grid;
    }
  }

  .search-input {
    @media (min-width: $min-width-third-break) {
      border-bottom: 0.2rem solid var(--main-border-color);
    }
  }

  .buttons {
    margin-top: -2rem;
    border-bottom: 0.2rem solid var(--main-border-color);
    padding-bottom: 1rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;

    @media (min-width: $min-width-first-break) {
      grid-gap: 0.2rem 1rem;
    }

    @media (min-width: $min-width-third-break) {
      grid-template-columns: repeat(3, 1fr);
      align-items: center;
      gap: 0.5rem;
      padding: 1.3rem 0;
      margin-top: 0rem;
    }

    @media (min-width: $min-width-fourth-break) {
      grid-template-columns: repeat(5, 1fr);
      align-items: center;
      gap: 0.5rem;
      padding: 1.5rem 0;
      margin-top: 0rem;
    }

    .button {
      margin-top: 1rem;

      @media (min-width: $min-width-third-break) {
        margin-top: 0rem;
        height: 2rem;
      }

      &.clear-search {
        grid-column-start: 1;
        grid-column-end: 3;

        @media (min-width: $min-width-third-break) {
          grid-column-start: 2;
          grid-column-end: 4;
        }

        @media (min-width: $min-width-fourth-break) {
          grid-column-start: 5;
          grid-column-end: 6;
        }
      }
    }
  }

  .no-results {
    margin-top: 1rem;
  }

  .results {
    width: calc(100% - 4rem);
    padding-bottom: 4rem;

    @media (min-width: $min-width-second-break) {
      padding-bottom: 6rem;
    }

    @media (min-width: $min-width-third-break) {
      padding-bottom: 7rem;
    }

    .search-result {
      display: flex;
      padding: 1rem;
      border-bottom: 0.2rem solid var(--main-border-color);
      cursor: pointer;

      @media (min-width: $min-width-third-break) {
        padding: 1rem 3rem;
      }
    }
  }

  .go-back {
    position: fixed;
    bottom: 0;
    margin-bottom: 1rem;

    @media (min-width: $min-width-second-break) {
      margin-bottom: 2rem;
    }
  }
}

.slide-from-right-move,
.slide-from-right-enter-active,
.slide-from-right-leave-active {
  transition: all 0.3s;
}

.slide-from-right-enter,
.slide-from-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-from-above-enter-active,
.slide-from-above-leave-active {
  transition: transform 0.3s;
}

.slide-from-above-enter,
.slide-from-above-leave-to {
  transform: translateY(-100%);
}
</style>
