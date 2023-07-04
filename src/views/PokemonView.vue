<template>
  <BasePage title="Pokemon">
    <template v-slot:content>
      <PokemonItem />
    </template>
  </BasePage>
</template>

<script>
import BasePage from '@components/ui/BasePage.vue';
import PokemonItem from '@components/pokemons/PokemonItem.vue';

export default {
  name: 'PokemonView',
  components: { BasePage, PokemonItem },
};
</script>
