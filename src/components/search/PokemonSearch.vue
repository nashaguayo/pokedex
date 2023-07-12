<template>
  <CenteredColumn class="pokemon-search">
    <BaseInput
      name="search"
      placeholder="search for pokemon"
      icon="fa-solid fa-magnifying-glass"
      @inputValueChanged="setSearchTerm"
      :model="searchTerm"
      class="search-input"
      :lazy="true"
    />
    <span
      class="no-results"
      v-if="searchTerm.length >= 3 && !searchResults.length"
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
import BaseLoader from '@components/ui/BaseLoader';
import BaseButton from '@components/ui/BaseButton';
import BaseInput from '@components/ui/BaseInput';
import CenteredColumn from '@components/ui/CenteredColumn';
import store from '@lib/store';

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
  },
  computed: {
    searchResults() {
      return store.state.searchResults;
    },
    loading() {
      return store.state.isSearchingPokemon;
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
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.pokemon-search {
  width: 100%;

  .search-input {
    border-bottom: 0.2rem solid var(--main-border-color);
  }

  .no-results {
    margin-top: 1rem;
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
