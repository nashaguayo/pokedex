<template>
  <div class="favorites-content">
    <h1>Favorites</h1>
    <FavoritesContentItem
      v-for="pokemon in favoritePokemons"
      :key="pokemon.id"
      :id="pokemon.id"
      :name="pokemon.name"
      :types="pokemon.types"
      :smallImage="pokemon.smallImage"
    />
  </div>
</template>

<script>
import { getAllFavoritePokemons } from '@/store/mutations/pokemon';
import FavoritesContentItem from './FavoritesContentItem.vue';

export default {
  name: 'FavoritesContent',
  components: {
    FavoritesContentItem,
  },
  data() {
    return {
      favoritePokemons: [],
    };
  },
  created() {
    this.favoritePokemons = getAllFavoritePokemons();
  },
};
</script>

<style lang="scss" scoped></style>
