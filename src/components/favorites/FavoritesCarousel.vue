<template>
  <div class="favorites-carousel">
    <h1>Favorites</h1>
    <div class="carousel">
      <template v-if="favoritePokemons.length">
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
          <transition name="fade-in" appear>
            <div class="left-overlay" v-if="scrollX !== 0" />
          </transition>
          <transition name="fade-in" appear>
            <div class="right-overlay" v-if="!disableRightButton" />
          </transition>
        </div>
        <div class="navigation">
          <BaseChevron
            direction="left"
            :onClickHandler="scrollToLeft"
            :disabled="scrollX === 0"
            :variant="true"
          />
          <BaseButton :onClickHandler="goToMyFavorites" :big="true">
            All Favorites
          </BaseButton>
          <BaseChevron
            direction="right"
            :onClickHandler="scrollToRight"
            :variant="true"
            :disabled="disableRightButton"
          />
        </div>
      </template>
      <div v-else class="no-favorites-message">
        <span>{{ $t('favorites.noFavoritesMessage') }}</span>
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
    if (document.querySelector('.favorites')) {
      document
        .querySelector('.favorites')
        .addEventListener('scrollend', this.handleScrollEnd);
    }
    if (!this.isOverflowingX(this.$refs.favorites)) {
      this.disableRightButton = true;
    }
  },
  beforeDestroy() {
    if (document.querySelector('.favorites')) {
      document
        .querySelector('.favorites')
        .removeEventListener('scrollend', this.handleScrollEnd);
    }
  },
  methods: {
    goToPage(name) {
      this.$router.push({ name: 'pokemon', params: { id: name } });
    },
    goToMyFavorites() {
      this.$router.push({ name: 'favorites' });
    },
    async scrollToRight() {
      this.scrollX += this.$refs.favorites.offsetWidth - 100;
      document.querySelector('.favorites').scroll({
        top: 0,
        left: this.scrollX,
        behavior: 'smooth',
      });
    },
    scrollToLeft() {
      this.scrollX -= this.$refs.favorites.offsetWidth - 100;
      document.querySelector('.favorites').scroll({
        top: 0,
        left: this.scrollX,
        behavior: 'smooth',
      });
    },
    handleScrollEnd() {
      this.scrollX = this.$refs.favorites.scrollLeft;
      if (
        this.$refs.favorites.scrollLeft + this.$refs.favorites.offsetWidth >=
        this.$refs.favorites.scrollWidth
      ) {
        this.disableRightButton = true;
      } else {
        this.disableRightButton = false;
      }
    },
    isOverflowingX(element) {
      if (!element) {
        return false;
      }
      return (
        element.scrollWidth !=
        Math.max(element.offsetWidth, element.clientWidth)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.favorites-carousel {
  width: 100%;
  overflow: hidden;

  .carousel {
    position: relative;
    background-color: var(--variant-background-color);
    border: 0.2rem solid var(--secondary-border-color);
    box-shadow: var(--main-box-shadow);
    padding: 2rem 0;
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;

    @media (min-width: $min-width-second-break) {
      border-radius: 1rem;
      margin: 2rem;
    }

    .favorites {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      padding: 0 2rem;
      overflow-x: scroll;
    }

    .favorites::-webkit-scrollbar {
      display: none;
    }

    .overlay {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      width: 100%;
      position: absolute;
      z-index: 50;
      pointer-events: none;

      .left-overlay {
        width: 10rem;
        height: 13rem;
        background: linear-gradient(90deg, black 20%, transparent);
      }
      .right-overlay {
        grid-column-start: 2;
        justify-self: flex-end;
        width: 10rem;
        height: 13rem;
        background: linear-gradient(270deg, black 20%, transparent);
      }
    }

    .navigation {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      padding: 0 1rem;

      @media (min-width: $min-width-first-break) {
        padding: 0 2rem;
      }
    }

    .no-favorites-message {
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        color: var(--secondary-text-color);
        text-align: center;
      }
    }
  }
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.3s;
}

.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
}
</style>
