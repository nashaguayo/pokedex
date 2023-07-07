<template>
  <BasePage :displayHeader="false" :displayFooter="false">
    <template v-slot:content>
      <ErrorBoundary
        componentName="PokemonItem"
        errorMessage="Unable to load Pokemon details"
      >
        <PokemonItem />
      </ErrorBoundary>
    </template>
  </BasePage>
</template>

<script>
import BasePage from '@components/ui/BasePage.vue';
import ErrorBoundary from '@components/ui/ErrorBoundary.vue';
import PokemonItem from '@components/pokemons/PokemonItem.vue';

export default {
  name: 'PokemonView',
  title: 'Pokemon',
  components: { BasePage, PokemonItem, ErrorBoundary },
};
</script>
