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
        @goToPage="goToPokemonDetailsPage"
      />
    </div>
  </div>
</template>

<script>
import { getAllFavoritePokemons } from '@/store/mutations/pokemon';
import FavoritesContentItem from './FavoritesContentItem.vue';
import { pokemonIsVariant } from '@/store/mutations/variations';

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
  },
};
</script>

<style lang="scss" scoped>
.favorites-content {
  padding: 0 1rem;

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
