<template>
  <div class="favorites-carousel">
    <h1>Favorites</h1>
    <div class="carousel">
      <div class="favorites">
        <FavoritesContentItem
          v-for="pokemon in favoritePokemons"
          :key="`favorite-${pokemon.name}`"
          :name="pokemon.name"
          :image="pokemon.smallImage"
          :small="true"
          @goToPage="goToPage"
        />
      </div>
      <BaseButton :onClickHandler="goToMyFavorites" :big="true">
        See all in My Favorites
      </BaseButton>
    </div>
  </div>
</template>

<script>
import FavoritesContentItem from '@/components/favorites/FavoritesContentItem.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { getAllFavoritePokemons } from '@/store/mutations/pokemon';

export default {
  name: 'FavoritesCarousel',
  components: { BaseButton, FavoritesContentItem },
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
    goToMyFavorites() {
      this.$router.push({ name: 'favorites' });
    },
  },
};
</script>

<style lang="scss" scoped>
.favorites-carousel {
  margin-bottom: 2rem;
  max-width: 100%;
  overflow: hidden;

  .carousel {
    background-color: var(--variant-background-color);
    border: 0.2rem solid var(--secondary-border-color);
    border-radius: 1rem;
    box-shadow: var(--main-box-shadow);
    padding: 2rem;
    margin: 2rem;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;

    .favorites {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      overflow-x: scroll;
    }

    .favorites::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
