<template>
  <CenteredColumn class="random-pokemon">
    <h2>Random Pokemon</h2>
    <CenteredColumn class="pokedex">
      <router-link :to="{ name: 'pokemon', params: { id: name } }">
        <div class="pokemon-image">
          <img :src="image" alt="random pokemon" />
        </div>
        <h2 class="pokemon-name">{{ name }}</h2>
      </router-link>
    </CenteredColumn>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import silouette from '@assets/pokemons/silouette.png';
import { getRandomPokemon } from '@api/pokemon';

export default {
  name: 'RandomPokemon',
  components: { CenteredColumn },
  data() {
    return {
      image: silouette,
      name: '',
    };
  },
  async created() {
    this.getRandomPokemon();
  },
  methods: {
    async getRandomPokemon() {
      const pokemon = await getRandomPokemon();
      this.image = pokemon.sprites.front_default;
      this.name = pokemon.name;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.random-pokemon {
  .pokedex {
    background-color: var(--secondary-background-color);
    box-shadow: var(--main-box-shadow);
    width: 100%;

    .pokemon-image {
      background-color: var(--main-background-color);
      border-radius: 1rem;
      margin-top: 1rem;
      display: flex;
      justify-content: center;

      @media (min-width: $min-width-second-break) {
        margin-top: 2rem;
      }
    }

    .pokemon-name {
      color: var(--secondary-text-color) !important;
    }
  }
}
</style>
