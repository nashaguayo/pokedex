<template>
  <div @click="goToPokemonPage" class="pokemon-search-item">
    <span class="search-result">
      {{ name.replace('-', ' ') }}
    </span>
    <FontAwesomeIcon
      icon="fa-solid fa-chevron-right"
      class="icon"
      :color="isDarkModeEnabled ? 'white' : 'black'"
    />
  </div>
</template>

<script>
import { setRecentSearch } from '@/lib/localStorage';
import store from '@/lib/store';

export default {
  name: 'PokemonSearchItem',
  props: {
    name: {
      type: String,
      required: true,
    },
    isDarkModeEnabled: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    async goToPokemonPage() {
      setRecentSearch(this.name);
      if (await store.pokemonIsVariant(this.name)) {
        this.$router.push({
          name: 'pokemon',
          params: { id: this.name.split('-')[0] },
          query: {
            variantName: this.name.replace(`${this.name.split('-')[0]}-`, ''),
          },
        });
        return;
      }
      this.$router.push({
        name: 'pokemon',
        params: { id: this.name },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-search-item {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.2rem solid var(--main-border-color);
  cursor: pointer;

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
</style>
