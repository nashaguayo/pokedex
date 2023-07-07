<template>
  <CenteredColumn class="random-pokemon">
    <h2>Random Pokemon</h2>
    <div class="pokemons">
      <CenteredColumn
        class="pokedex"
        v-for="pokemon in randomPokemons"
        :key="pokemon.name"
        @click="goToPokemonPage(pokemon.name)"
      >
        <div class="pokemon-image">
          <img :src="pokemon.image" alt="random pokemon" />
        </div>
        <h2 class="pokemon-name">{{ pokemon.name }}</h2>
      </CenteredColumn>
    </div>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import { getRandomPokemon } from '@api/pokemon';

export default {
  name: 'RandomPokemon',
  components: { CenteredColumn },
  data() {
    return {
      randomPokemons: [],
    };
  },
  async created() {
    this.getRandomPokemons();
  },
  methods: {
    async getRandomPokemons() {
      let pokemon;
      while (!pokemon) {
        pokemon = await getRandomPokemon();
      }

      const image = pokemon.sprites.front_default;
      const name = pokemon.name;
      this.randomPokemons.push({ name, image });
    },
    goToPokemonPage(pokemonName) {
      this.$router.push({ name: 'pokemon', params: { id: pokemonName } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.random-pokemon {
  box-shadow: var(--main-box-shadow);
  background-color: var(--secondary-background-color);
  width: 100%;

  .pokemons {
    display: flex;
    gap: 1rem;
  }

  .pokedex {
    .pokemon-image {
      background-color: var(--main-background-color);
      border-radius: 50%;
      margin-top: 1rem;
      border: 0.2rem solid var(--main-border-color);
      padding: 1rem;
      width: 6rem;
      height: 6rem;
      display: flex;

      img {
        border-radius: 50%;
        justify-self: center;
        align-self: center;
      }

      @media (min-width: $min-width-second-break) {
        margin-top: 2rem;
      }
    }
  }
}
</style>
