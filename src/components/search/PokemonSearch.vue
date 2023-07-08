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
    <span
      v-for="pokemon in searchResults"
      :key="pokemon"
      class="search-result"
      @click="goToPokemonPage(pokemon)"
    >
      {{ pokemon }}
    </span>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn';
import store from '@lib/store';

export default {
  name: 'PokemonSearch',
  components: { CenteredColumn },
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
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.pokemon-search {
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

  .search-result {
    margin: 0 1rem;
    padding: 1rem;
    border-bottom: 0.2rem solid var(--main-border-color);
    width: calc(100% - 2rem);
  }
}
</style>
