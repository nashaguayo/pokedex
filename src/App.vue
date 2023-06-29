<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/pokemons">Pokemons</router-link>
    </nav> -->
    <router-view />
  </div>
</template>

<script>
import pokemonApi from './config/pokemonApi';

export default {
  name: 'App',
  async created() {
    const response = await pokemonApi.get('pokemon/1');
    if (response.status === 200) {
      console.log('Axios connection OK');
    } else {
      console.error('Something went wrong. Unable to connect to axios!');
    }
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: 'Pokemon Solid';
  src: local('Pokemon Solid'),
    url(@assets/fonts/pokemon-solid.ttf) format('truetype');
}

@font-face {
  font-family: 'Pokemon Hollow';
  src: local('Pokemon Hollow'),
    url(@assets/fonts/pokemon-hollow.ttf) format('truetype');
}

* {
  margin: 0 !important;
}

:root {
  --main-background-color: white;
  --main-text-color: black;
}

#app {
  background-color: var(--main-background-color);
  height: 100vh;

  h1,
  span,
  p {
    color: var(--main-text-color);
  }

  h1 {
    font-family: 'Pokemon Solid';
  }

  h2 {
    font-family: 'Pokemon Hollow';
  }
}
</style>
