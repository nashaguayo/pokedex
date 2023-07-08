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
    <span v-for="pokemon in searchResults" :key="pokemon">{{ pokemon }}</span>
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
      console.log(this.searchTerm);
      await store.searchPokemons(this.searchTerm);
    },
  },
  computed: {
    searchResults() {
      return store.state.searchResults;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.pokemon-search {
  .base-input {
    margin: 2rem;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-evenly;

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
}
</style>
