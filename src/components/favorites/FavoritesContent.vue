<template>
  <div class="favorites-content">
    <h1>{{ $t('favorites.title') }}</h1>
    <div class="search">
      <BaseInput
        name="search"
        icon="fa-solid fa-magnifying-glass"
        class="search-input"
        :placeholder="$t('favorites.placeholder')"
        :model="searchTerm"
        @inputValueChanged="setSearchTerm"
        @focused="focus = false"
        :focus="focus"
      />
      <BaseChevron direction="right" />
    </div>
    <transition-group name="flip" mode="out-in" class="favorites">
      <FavoritesContentItem
        v-for="pokemon in favoritePokemonsFiltered"
        :key="pokemon.id"
        :id="pokemon.id"
        :name="pokemon.name"
        :image="pokemon.smallImage"
        @goToPage="goToPokemonDetailsPage"
      />
    </transition-group>
  </div>
</template>

<script>
import { getAllFavoritePokemons } from '@/store/mutations/pokemon';
import FavoritesContentItem from '@/components/favorites/FavoritesContentItem.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseChevron from '@/components/ui/BaseChevron.vue';
import { pokemonIsVariant } from '@/store/mutations/variations';

export default {
  name: 'FavoritesContent',
  components: {
    FavoritesContentItem,
    BaseInput,
    BaseChevron,
  },
  data() {
    return {
      favoritePokemons: [],
      searchTerm: '',
      focus: false,
      favoritePokemonsFiltered: [],
    };
  },
  created() {
    this.favoritePokemons = getAllFavoritePokemons();
    this.favoritePokemonsFiltered = this.favoritePokemons;
  },
  watch: {
    searchTerm(searchTerm) {
      if (!searchTerm) {
        this.favoritePokemonsFiltered = this.favoritePokemons;
      } else {
        this.favoritePokemonsFiltered = this.favoritePokemons.filter(
          (pokemon) => pokemon.name.includes(searchTerm.toLowerCase())
        );
      }
    },
  },
  methods: {
    async goToPokemonDetailsPage(name) {
      const pokemonName = name.split('-')[0];
      if (await pokemonIsVariant(name)) {
        this.$router.push({
          name: 'pokemon',
          params: { id: pokemonName },
          query: { variantName: name.replace(`${pokemonName}-`, '') },
        });
        return;
      }
      this.$router.push({ name: 'pokemon', params: { id: name } });
    },
    setSearchTerm(searchTerm) {
      this.searchTerm = searchTerm;
    },
    sendSearchTerm() {
      this.focus = true;
      document.body.dispatchEvent(
        new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          keyCode: 13,
        })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.favorites-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  width: 100%;

  h1 {
    margin: 0;
    -webkit-text-stroke-color: var(--main-border-color);
  }

  .search {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    padding-top: 2rem;
    margin: 2rem 0;
    border-top: 0.2rem solid var(--main-border-color);

    .search-input {
      width: 90%;
      margin-right: 1rem;
    }
  }

  .favorites {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    width: 100%;
  }
}

.flip-move {
  transition: all;
}

.flip-leave-active,
.flip-enter-active {
  transition: transform 0.3s;
}

.flip-enter,
.flip-leave-to {
  transform: scaleY(0);
}
</style>
