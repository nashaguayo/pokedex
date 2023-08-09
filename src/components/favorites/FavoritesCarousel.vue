<template>
  <div class="favorites-carousel">
    <h1>Favorites</h1>
    <div class="carousel">
      <FavoritesContentItem
        v-for="pokemon in favoritePokemons"
        :key="`favorite-${pokemon.name}`"
        :name="pokemon.name"
        :image="pokemon.smallImage"
        :small="true"
        @goToPage="goToPage"
      />
    </div>
  </div>
</template>

<script>
import FavoritesContentItem from '@/components/favorites/FavoritesContentItem.vue';
import { getAllFavoritePokemons } from '@/store/mutations/pokemon';

export default {
  name: 'FavoritesCarousel',
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
  methods: {
    goToPage(name) {
      this.$router.push({ name: 'pokemon', params: { id: name } });
    },
  },
};
</script>

<style lang="scss" scoped>
.favorites-carousel {
  margin-bottom: 2rem;
  .carousel {
    background-color: var(--variant-background-color);
    border: 0.2rem solid var(--secondary-border-color);
    box-shadow: var(--main-box-shadow);
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 2rem;
    gap: 0.5rem;
  }
}
</style>
