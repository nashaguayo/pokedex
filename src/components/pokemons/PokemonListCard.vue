<template>
  <CenteredColumn class="pokemon-list-card">
    <img
      :src="pokemon.sprites?.front_default"
      alt="pokemon front default"
      class="screen"
    />
    <span>{{ pokemonName }}</span>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import { getPokemon } from '@lib/pokemon';
import silouette from '@assets/pokemons/silouette.png';

export default {
  name: 'PokemonListCard',
  data() {
    return {
      pokemon: {
        sprites: {
          front_default: silouette,
        },
      },
    };
  },
  components: {
    CenteredColumn,
  },
  props: {
    pokemonName: {
      type: String,
      required: true,
    },
  },
  async created() {
    this.pokemon = await getPokemon(this.pokemonName);
  },
};
</script>

<style lang="scss" scoped>
.pokemon-list-card {
  // TODO: Make this a css variable for darkmode.
  background-color: rgb(20, 119, 0);
  box-shadow: var(--main-box-shadow);
  border: 0.15rem solid var(--main-border-color);
  border-radius: 1rem;
  padding: 0.5rem;

  .screen {
    background-color: white;
    background-size: cover;
    border-radius: 0.5rem;
    margin-bottom: 0.3rem;
    border: 0.15rem solid var(--main-border-color);
    width: 6.25rem;
    height: 6.25rem;
  }

  span {
    color: var(--secondary-text-color);
  }
}
</style>
