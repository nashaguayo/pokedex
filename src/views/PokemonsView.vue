<template>
  <BasePage title="Pokemons">
    <template v-slot:content>
      <PokemonList />
    </template>
  </BasePage>
</template>

<script>
import BasePage from '@components/ui/BasePage.vue';
import PokemonList from '@components/pokemons/PokemonList.vue';

export default {
  name: 'PokemonsView',
  components: { BasePage, PokemonList },
};
</script>
