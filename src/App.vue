<template>
  <div id="app">
    <h1>Pokedex</h1>
    <p>This is a website about pokemons.</p>
  </div>
</template>

<script>
import axios from './config/axios';

export default {
  name: 'App',
  async created() {
    const response = await axios.get('pokemon/1');
    if (response.status === 200) {
      console.log('Ok');
    } else {
      console.error('Something went wrong. Unable to connect to axios!');
    }
  },
};
</script>

<style>
#app {
}
</style>
