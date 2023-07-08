<template>
  <CenteredColumn class="pokemon-search">
    <div class="base-input">
      <label for="search">
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
      </label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="search for pokemon"
        v-model="searchTerm"
      />
    </div>
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
import BaseButton from '@components/ui/BaseButton';
import CenteredColumn from '@components/ui/CenteredColumn';
import store from '@lib/store';

export default {
  name: 'PokemonSearch',
  components: { BaseButton, CenteredColumn },
  data() {
    return {
      searchTerm: '',
    };
  },
  watch: {
    async searchTerm() {
      await store.searchPokemons(this.searchTerm);
    },
  },
  computed: {
    searchResults() {
      return store.state.searchResults;
    },
  },
  methods: {
    goToPokemonPage(pokemon) {
      this.$router.push({ name: 'pokemon', params: { id: pokemon } });
    },
    goToPokemonsPage() {
      this.$router.push({ name: 'pokemons' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.pokemon-search {
  width: 100%;

  .base-input {
    margin-top: 2rem;
    padding-bottom: 2rem;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-evenly;
    border-bottom: 0.2rem solid var(--main-border-color);

    label {
      font-family: 'Upheaval';
      font-size: 1.5rem;
    }

    input {
      border: 0.2rem solid var(--main-border-color);
      border-radius: 2rem;
      height: 2rem;
      padding: 0 1rem;
      font-family: 'Upheaval';
      width: 70%;
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
