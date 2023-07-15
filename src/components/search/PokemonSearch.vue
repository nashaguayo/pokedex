<template>
  <CenteredColumn class="pokemon-search">
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
          :onClickHandler="clearSearch"
          :variant="true"
          :small="true"
        >
          Clear Search
        </BaseButton>
      </div>
    </div>
    <transition name="slide-from-above">
      <div v-if="displayTypes" class="types">
        <div
          class="type"
          :class="{
            active: filteringTypes.includes(t),
            inactive: !filteringTypes.includes(t),
          }"
          v-for="t in allTypes"
          :key="`type-${t}`"
          @click="toggleTypeFilter(t)"
        >
          {{ t }}
        </div>
      </div>
    </transition>
    <transition name="slide-from-above" mode="out-in" appear>
      <span
        class="no-results"
        v-if="
          (searchTerm.length >= 3 ||
            (searchTerm.length < 3 && filteringTypes.length)) &&
          !searchResults.length
        "
      >
        No results found
      </span>
    </transition>
    <BaseLoader :loading="loading">
      <div class="results">
        <transition-group name="slide-from-right" appear>
          <span
            v-for="pokemon in searchResults"
            :key="pokemon"
            class="search-result"
            @click="goToPokemonPage(pokemon)"
          >
            {{ pokemon }}
          </span>
        </transition-group>
      </div>
    </BaseLoader>
    <div class="go-back">
      <BaseButton
        :onClickHandler="goToPokemonsPage"
        :big="true"
        :variant="true"
      >
        Go Back
      </BaseButton>
    </div>
  </CenteredColumn>
</template>

<script>
import BaseLoader from '@/components/ui/BaseLoader';
import BaseButton from '@/components/ui/BaseButton';
import BaseInput from '@/components/ui/BaseInput';
import CenteredColumn from '@/components/ui/CenteredColumn';
import store from '@/lib/store';

export default {
  name: 'PokemonSearch',
  components: { BaseLoader, BaseButton, BaseInput, CenteredColumn },
  data() {
    return {
      searchTerm: '',
      displayTypes: false,
      reset: false,
    };
  },
  watch: {
    async searchTerm(searchTerm) {
      if (searchTerm.length < 3 && !this.filteringTypes.length) {
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
  },
  computed: {
    searchResults() {
      return store.state.search.results;
    },
    allTypes() {
      return store.state.allTypes;
    },
    filteringTypes() {
      return store.state.search.types;
    },
    loading() {
      return store.state.search.isSearchingPokemon;
    },
    displayTypesText() {
      return `${this.displayTypes ? 'Hide' : 'Show'} Types`;
    },
  },
  methods: {
    goToPokemonPage(pokemon) {
      this.$router.push({ name: 'pokemon', params: { id: pokemon } });
    },
    goToPokemonsPage() {
      this.$router.push({ name: 'pokemons' });
    },
    setSearchTerm(searchTerm) {
      this.reset = false;
      this.searchTerm = searchTerm;
    },
    toggleTypeFilter(type) {
      store.toggleTypeFilter(type);
    },
    toggleDisplayTypes() {
      this.displayTypes = !this.displayTypes;
    },
    clearSearch() {
      this.reset = true;
      store.clearSearchResults();
      store.clearFilters();
      this.displayTypes = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-search {
  width: 100%;

  .controls {
    width: 100%;
    background-color: var(--main-background-color);
    z-index: 5;

    @media (min-width: $min-width-third-break) {
      display: flex;
      justify-content: center;
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
    display: flex;
    justify-content: center;

    @media (min-width: $min-width-first-break) {
      gap: 1rem;
    }

    @media (min-width: $min-width-second-break) {
      gap: 2rem;
    }

    @media (min-width: $min-width-third-break) {
      align-items: center;
      gap: 1rem;
      padding-bottom: 0rem;
      margin-top: 0rem;
      padding-right: 1rem;
    }

    .button {
      margin-top: 1rem;

      @media (min-width: $min-width-third-break) {
        margin-top: 0rem;
        height: 2rem;
      }
    }
  }

  .no-results {
    margin-top: 1rem;
  }

  .types {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    font-family: 'Upheaval';
    gap: 0.5rem;
    padding: 1rem 0;
    border-bottom: 0.2rem solid var(--main-border-color);
    width: 100%;

    @media (min-width: $min-width-third-break) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (min-width: $min-width-fourth-break) {
      grid-template-columns: repeat(5, 1fr);
    }

    @media (min-width: $min-width-fifth-break) {
      grid-template-columns: repeat(6, 1fr);
    }

    .type {
      border-radius: 1rem;
      padding: 0.3rem;
      transition: all 0.3s;

      &.inactive {
        background-color: var(--disabled-button-background-color);
      }

      &.active {
        background-color: var(--secondary-background-color);
        color: var(--secondary-text-color);
      }
    }
  }

  .results {
    min-width: 100%;
    margin-bottom: 5rem;

    @media (min-width: $min-width-second-break) {
      margin-bottom: 6rem;
    }

    @media (min-width: $min-width-third-break) {
      margin-bottom: 7rem;
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
