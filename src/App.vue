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
import pokemonApi from '@config/pokemonApi';

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
@import '@css/colors.scss';
@import '@css/media-queries.scss';

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

@font-face {
  font-family: 'Upheaval';
  src: local('Upheaval'), url(@assets/fonts/upheaval.ttf) format('truetype');
}

body {
  margin: 0;
}

#app {
  height: 100vh;

  h1,
  h2,
  span,
  p {
    color: $main-text-color;
  }

  span,
  p {
    font-family: 'Upheaval';
    font-size: 1rem;
    color: $main-text-color;

    @media (min-width: $min-width-first-break) {
      font-size: 1.2rem;
    }

    @media (min-width: $min-width-second-break) {
      font-size: 1.5rem;
    }
  }

  h1 {
    font-family: 'Pokemon Solid';
    font-size: 1.5rem;

    @media (min-width: $min-width-first-break) {
      font-size: 1.8rem;
    }

    @media (min-width: $min-width-second-break) {
      font-size: 2.5rem;
    }
  }

  h2 {
    font-family: 'Pokemon Hollow';
    font-size: 1.2rem;

    @media (min-width: $min-width-first-break) {
      font-size: 1.5rem;
    }

    @media (min-width: $min-width-second-break) {
      font-size: 2rem;
    }
  }

  h1,
  h2 {
    text-shadow: #fc0 1px 0 10px;
    letter-spacing: 0.25rem;
    text-align: center;
  }
}
</style>
