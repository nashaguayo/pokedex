<template>
  <BasePage :displayHeader="false" :displayFooter="false">
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
  title: 'Pokemon',
  components: { BasePage, PokemonItem },
};
</script>
