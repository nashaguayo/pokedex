<template>
  <div class="favorites-content">
    <h1>Favorites</h1>
    <div class="favorites">
      <FavoritesContentItem
        v-for="pokemon in favoritePokemons"
        :key="pokemon.id"
        :id="pokemon.id"
        :name="pokemon.name"
        :image="pokemon.smallImage"
      />
    </div>
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

<style lang="scss" scoped>
.favorites-content {
  h1 {
    -webkit-text-stroke-color: var(--main-border-color);
  }

  .favorites {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
</style>
