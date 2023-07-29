<template>
  <div @click="goToPokemonPage" class="pokemon-search-item">
    <span class="search-result">
      {{ name }}
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
    goToPokemonPage() {
      setRecentSearch(this.name);
      this.$router.push({ name: 'pokemon', params: { id: this.name } });
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
