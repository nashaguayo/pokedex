<template>
  <BaseLoader :coverPage="true" :loading="!storeHasLoaded">
    <div class="pokemon-search">
      <div class="controls">
        <BaseInput
          name="search"
          :placeholder="$t('search.placeholder')"
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
            :variant="!displayTypes"
            :small="true"
          >
            {{ $t('search.displayTypes', { displayTypes }) }}
          </BaseButton>
          <BaseButton
            class="button"
            :onClickHandler="toggleDisplayColors"
            :variant="!displayColors"
            :small="true"
          >
            {{ $t('search.displayColors', { displayColors }) }}
          </BaseButton>
          <BaseButton
            class="button"
            :onClickHandler="toggleDisplayShapes"
            :variant="!displayShapes"
            :small="true"
          >
            {{ $t('search.displayShapes', { displayShapes }) }}
          </BaseButton>
          <BaseButton
            class="button"
            :onClickHandler="toggleDisplayGenerations"
            :variant="!displayGenerations"
            :small="true"
          >
            {{ $t('search.displayGenerations', { displayGenerations }) }}
          </BaseButton>
          <BaseButton
            class="button clear-search"
            :onClickHandler="clearSearch"
            :small="true"
          >
            {{ $t('search.clearSearch') }}
          </BaseButton>
        </div>
      </div>
      <transition name="slide-from-above" mode="out-in">
        <component :is="component" />
      </transition>
      <transition name="slide-from-above" mode="out-in">
        <span
          class="no-results"
          v-if="
            (searchTerm.length >= 3 ||
              (searchTerm.length < 3 &&
                (filteringTypes.length ||
                  filteringColor.length ||
                  filteringShape.length ||
                  filteringGeneration.length))) &&
            !searchResults.length
          "
        >
          {{ $t('search.noResultsFound') }}
        </span>
      </transition>
      <transition name="slide-from-above" appear>
        <div
          v-if="
            !searchResults.length &&
            searchTerm.length === 0 &&
            filteringTypes.length === 0 &&
            !filteringColor &&
            !filteringShape &&
            !filteringGeneration &&
            recentSearches.length
          "
          class="recent-searches"
        >
          <span class="recent-searches-title">{{
            $t('search.recentSearches')
          }}</span>
          <div v-for="name in recentSearches" :key="`recent-search-${name}`">
            <PokemonSearchItem
              :name="name"
              :isDarkModeEnabled="isDarkModeEnabled"
            />
          </div>
          <FontAwesomeIcon
            icon="fa-regular fa-trash-can"
            size="2x"
            class="trash-can"
            :color="isDarkModeEnabled ? 'white' : 'black'"
            @click="clearRecentSearchesFromLS"
          />
        </div>
      </transition>
      <BaseLoader :loading="loading">
        <transition-group class="results" name="slide-from-right">
          <div v-for="name in searchResults" :key="name">
            <PokemonSearchItem
              :name="name"
              :isDarkModeEnabled="isDarkModeEnabled"
            />
          </div>
        </transition-group>
      </BaseLoader>
      <div class="go-back">
        <BaseButton :onClickHandler="goBack" :big="true">{{
          $t('search.goBackButton')
        }}</BaseButton>
      </div>
    </div>
  </BaseLoader>
</template>

<script>
import BaseLoader from '@/components/ui/BaseLoader';
import BaseButton from '@/components/ui/BaseButton';
import BaseInput from '@/components/ui/BaseInput';
import PokemonSearchTypes from '@/components/search/PokemonSearchTypes.vue';
import PokemonSearchColors from '@/components/search/PokemonSearchColors.vue';
import PokemonSearchShapes from '@/components/search/PokemonSearchShapes.vue';
import PokemonSearchGenerations from '@/components/search/PokemonSearchGenerations.vue';
import PokemonSearchItem from '@/components/search/PokemonSearchItem.vue';
import store from '@/lib/store';
import { getRecentSearches, clearRecentSearches } from '@/lib/localStorage';
import { initializeStore } from '@/store/mutations/other';
import { clearFilters as clearGenerationFilters } from '@/store/mutations/generations';
import { clearFilters as clearShapeFilters } from '@/store/mutations/shapes';
import { clearFilters as clearColorFilters } from '@/store/mutations/colors';
import other from '@/store/state/other';
import generations from '@/store/state/generations';
import shapes from '@/store/state/shapes';
import colors from '@/store/state/colors';

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
    PokemonSearchItem,
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
      recentSearches: getRecentSearches() ?? [],
    };
  },
  async created() {
    if (!this.storeHasLoaded) {
      await initializeStore();
    }
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
        !this.filteringGeneration.length
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
    async filteringGeneration(filteringGeneration) {
      if (!filteringGeneration.length && !this.searchTerm) {
        store.clearSearchResults();
        return;
      }
      await store.searchPokemons(this.searchTerm);
    },
  },
  computed: {
    storeHasLoaded() {
      return other.state.storeHasLoaded;
    },
    searchResults() {
      return store.state.search.results;
    },
    filteringTypes() {
      return store.state.search.types;
    },
    filteringColor() {
      return colors.state.filter;
    },
    filteringShape() {
      return shapes.state.filter;
    },
    filteringGeneration() {
      return generations.state.filter;
    },
    loading() {
      return store.state.search.isSearchingPokemon;
    },
    isDarkModeEnabled() {
      return other.state.isDarkModeEnabled;
    },
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'home' });
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
      clearColorFilters();
      clearShapeFilters();
      clearGenerationFilters();
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
      clearShapeFilters();
      clearGenerationFilters();
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
      clearColorFilters();
      clearGenerationFilters();
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
      clearColorFilters();
      clearShapeFilters();
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
    clearRecentSearchesFromLS() {
      clearRecentSearches();
      this.recentSearches = [];
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

  .recent-searches {
    margin-top: 1rem;
    width: calc(100% - 4rem);
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 3;

    @media (min-width: $min-width-second-break) {
      padding-bottom: 6rem;
    }

    @media (min-width: $min-width-third-break) {
      padding-bottom: 7rem;
    }

    .recent-searches-title {
      font-size: 1.5rem;
      text-align: center;
      align-self: center;
      border-bottom: 0.2rem solid var(--main-border-color);
      width: 100%;
      padding-bottom: 1rem;

      @media (min-width: $min-width-second-break) {
        font-size: 2rem;
      }
    }
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
  }

  .search-result-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.2rem solid var(--main-border-color);

    .search-result {
      display: flex;
      padding: 1rem;
      cursor: pointer;

      @media (min-width: $min-width-third-break) {
        padding: 1rem 3rem;
      }
    }

    .icon {
      margin-right: 1rem;
    }
  }

  .trash-can {
    margin-top: 1rem;
    cursor: pointer;
  }

  .go-back {
    position: fixed;
    bottom: 0;
    z-index: 10;
    background-color: var(--main-background-color);
    height: 4rem;
    display: flex;
    align-items: center;
    width: 100%;

    @media (min-width: $min-width-second-break) {
      margin-bottom: 2rem;
      width: 75%;
    }
  }
}

.slide-from-right-move,
.slide-from-right-enter-active,
.slide-from-right-leave-active {
  transition: all 0.3s;
}

.slide-from-right-enter-active {
  transition-delay: 0.3s;
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

.slide-from-above-enter-active {
  transition-delay: 0.3s;
}

.slide-from-above-enter,
.slide-from-above-leave-to {
  transform: translateY(-100%);
}
</style>
