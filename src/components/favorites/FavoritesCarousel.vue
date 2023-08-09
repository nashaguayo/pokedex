<template>
  <div class="favorites-carousel">
    <h1>Favorites</h1>
    <div class="carousel">
      <div class="carousel-container"></div>
      <div class="favorites" ref="favorites">
        <FavoritesContentItem
          v-for="pokemon in favoritePokemons"
          :key="`favorite-${pokemon.name}`"
          :name="pokemon.name"
          :image="pokemon.smallImage"
          :small="true"
          @goToPage="goToPage"
        />
      </div>
      <div class="overlay">
        <div class="left-overlay" v-if="scrollX !== 0" />
        <div class="right-overlay" v-if="!disableRightButton" />
      </div>
      <div class="navigation">
        <BaseChevron
          direction="left"
          :onClickHandler="scrollToLeft"
          :disabled="scrollX === 0"
          :variant="true"
        />
        <BaseButton :onClickHandler="goToMyFavorites" :big="true">
          See all in My Favorites
        </BaseButton>
        <BaseChevron
          direction="right"
          :onClickHandler="scrollToRight"
          :variant="true"
          :disabled="disableRightButton"
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
      disableRightButton: false,
    };
  },
  created() {
    this.favoritePokemons = getAllFavoritePokemons();
  },
  mounted() {
    document
      .querySelector('.favorites')
      .addEventListener('scrollend', this.handleScrollEnd);
  },
  beforeDestroy() {
    document
      .querySelector('.favorites')
      .removeEventListener('scrollend', this.handleScrollEnd);
  },
  methods: {
    goToPage(name) {
      this.$router.push({ name: 'pokemon', params: { id: name } });
    },
    goToMyFavorites() {
      this.$router.push({ name: 'favorites' });
    },
    async scrollToRight() {
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
    handleScrollEnd() {
      if (
        document.querySelector('.favorites').scrollLeft >
        this.$refs.favorites.offsetWidth
      ) {
        this.scrollX = this.$refs.favorites.offsetWidth;
        this.disableRightButton = true;
      } else {
        this.scrollX = document.querySelector('.favorites').scrollLeft;
        this.disableRightButton = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.favorites-carousel {
  max-width: 100%;
  overflow: hidden;

  .carousel {
    position: relative;
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

      .left-overlay {
        width: 10rem;
        height: 10rem;
      }

      .right-overlay {
        width: 10rem;
        height: 10rem;
        background-color: red;
      }
    }

    .favorites::-webkit-scrollbar {
      display: none;
    }

    .overlay {
      display: grid;
      width: 100%;
      position: absolute;
      margin-left: -2rem;
      z-index: 50;

      .left-overlay {
        justify-self: start;
        width: 10rem;
        height: 13rem;
        background: linear-gradient(90deg, black 20%, transparent);
      }
      .right-overlay {
        justify-self: end;
        width: 10rem;
        height: 13rem;
        background-color: green;
        background: linear-gradient(270deg, black 20%, transparent);
      }
    }

    .navigation {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }
  }
}
</style>
