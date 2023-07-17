<template>
  <CenteredColumn>
    <ErrorBoundary
      componentName="PokemonItem"
      errorMessage="Unable to load Pokemon details"
    >
      <PokemonItem />
    </ErrorBoundary>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@/components/ui/CenteredColumn.vue';
import ErrorBoundary from '@/components/ui/ErrorBoundary.vue';
import PokemonItem from '@/components/pokemon/PokemonItem.vue';

export default {
  name: 'PokemonView',
  title: 'Pokemon',
  components: { CenteredColumn, PokemonItem, ErrorBoundary },
};
</script>
