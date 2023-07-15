<template>
  <CenteredColumn class="pokemon-search">
    <BaseInput
      name="search"
      placeholder="search for pokemon"
      icon="fa-solid fa-magnifying-glass"
      @inputValueChanged="setSearchTerm"
      :model="searchTerm"
      class="search-input"
    />
    <div class="types">
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
    };
  },
  watch: {
    async searchTerm(searchTerm) {
      if (searchTerm.length < 3) {
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
  },
  methods: {
    goToPokemonPage(pokemon) {
      this.$router.push({ name: 'pokemon', params: { id: pokemon } });
    },
    goToPokemonsPage() {
      this.$router.push({ name: 'pokemons' });
    },
    setSearchTerm(searchTerm) {
      this.searchTerm = searchTerm;
    },
    toggleTypeFilter(type) {
      store.toggleTypeFilter(type);
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-search {
  width: 100%;

  .search-input {
    border-bottom: 0.2rem solid var(--main-border-color);
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
      width: 100%;
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
</style>
