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
        <span class="pokemon-name">{{ pokemon.name }}</span>
      </CenteredColumn>
    </div>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import { getRandomPokemons as getRandomPokemonsApi } from '@api/pokemon';
import {
  FIRST_BREAK,
  THIRD_BREAK,
  FOURTH_BREAK,
  FIFTH_BREAK,
} from '@constants/resolutions';

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
      let amountOfRandomPokemons = 1;
      if (window.innerWidth >= FIFTH_BREAK) {
        amountOfRandomPokemons = 5;
      } else if (window.innerWidth >= FOURTH_BREAK) {
        amountOfRandomPokemons = 4;
      } else if (window.innerWidth >= THIRD_BREAK) {
        amountOfRandomPokemons = 3;
      } else if (window.innerWidth >= FIRST_BREAK) {
        amountOfRandomPokemons = 2;
      }

      let pokemons;
      while (!pokemons) {
        pokemons = await getRandomPokemonsApi(amountOfRandomPokemons);
      }

      for (let pokemon in pokemons) {
        const image = pokemons[pokemon].sprites.front_default;
        const name = pokemons[pokemon].name;
        this.randomPokemons.push({ name, image });
      }
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

  h2 {
    margin-bottom: 0.5rem;
  }

  .pokemons {
    display: flex;
    gap: 1rem;
  }

  .pokedex {
    .pokemon-image {
      background-color: var(--main-background-color);
      border-radius: 50%;
      margin-bottom: 0.5rem;
      box-shadow: var(--main-box-shadow);
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

    .pokemon-name {
      margin-bottom: 2rem;
    }
  }
}
</style>
