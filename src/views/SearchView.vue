<template>
  <CenteredColumn>
    <PokemonSearch />
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn';
import PokemonSearch from '@components/search/PokemonSearch';

export default {
  name: 'SearchView',
  title: 'Search for Pokemons',
  components: { CenteredColumn, PokemonSearch },
};
</script>
