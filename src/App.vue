<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/pokemons">Pokemons</router-link>
    </nav>
    <router-view />
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
