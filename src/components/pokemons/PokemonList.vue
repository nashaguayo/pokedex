<template>
  <transition-group name="slide-up" class="pokemon-list">
    <PokemonListCard
      v-for="pokemon in pokemons"
      :key="pokemon.name"
      :pokemonName="pokemon.name"
    />
  </transition-group>
</template>

<script>
import PokemonListCard from '@components/pokemons/PokemonListCard';
import { getPokemons } from '@lib/pokemon';

export default {
  name: 'PokemonList',
  components: {
    PokemonListCard,
  },
  data() {
    return {
      pokemons: [],
    };
  },
  async mounted() {
    this.pokemons = (await getPokemons()).results;
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.pokemon-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1rem;
  grid-column-gap: 3rem;
  margin: 0 3rem 5rem;

  @media (min-width: $min-width-first-break) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: $min-width-third-break) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: $min-width-fourth-break) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (min-width: $min-width-fifth-break) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.5s;
}

.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(5rem);
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
}
</style>
