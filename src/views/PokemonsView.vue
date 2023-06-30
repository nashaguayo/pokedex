<template>
  <BasePage>
    <template v-slot:content>
      <h1>Pokemons</h1>
      <span>This page will display Pokemons.</span>
    </template>
  </BasePage>
</template>

<script>
import BasePage from '@/components/ui/BasePage.vue';
export default {
  name: 'PokemonsView',
  components: { BasePage },
};
</script>
