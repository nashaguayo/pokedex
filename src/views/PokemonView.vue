<template>
  <div class="pokemon-view">
    <ErrorBoundary
      componentName="PokemonItem"
      errorMessage="Unable to load Pokemon details"
    >
      <PokemonItem />
    </ErrorBoundary>
  </div>
</template>

<script>
import ErrorBoundary from '@/components/ui/ErrorBoundary.vue';
import PokemonItem from '@/components/pokemon/PokemonItem.vue';

export default {
  name: 'PokemonView',
  title: 'Pokemon',
  components: { PokemonItem, ErrorBoundary },
};
</script>

<style lang="scss" scoped>
.pokemon-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
}
</style>
