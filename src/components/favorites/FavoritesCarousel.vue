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
      <div class="navigation">
        <BaseChevron
          direction="left"
          :onClickHandler="scrollToLeft"
          :variant="true"
        />
        <BaseButton :onClickHandler="goToMyFavorites" :big="true">
          See all in My Favorites
        </BaseButton>
        <BaseChevron
          direction="right"
          :onClickHandler="scrollToRight"
          :variant="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FavoritesContentItem from '@/components/favorites/FavoritesContentItem.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseChevron from '@/components/ui/BaseChevron.vue';
import { getAllFavoritePokemons } from '@/store/mutations/pokemon';

export default {
  name: 'FavoritesCarousel',
  components: { BaseButton, BaseChevron, FavoritesContentItem },
  data() {
    return {
      favoritePokemons: [],
      scrollX: 0,
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
    scrollToRight() {
      this.scrollX += 500;
      document
        .querySelector('.favorites')
        .scroll({ top: 0, left: this.scrollX, behavior: 'smooth' });
    },
    scrollToLeft() {
      this.scrollX -= 500;
      document
        .querySelector('.favorites')
        .scroll({ top: 0, left: this.scrollX, behavior: 'smooth' });
    },
  },
};
</script>

<style lang="scss" scoped>
.favorites-carousel {
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

    .navigation {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }
  }
}
</style>
