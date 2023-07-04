<template>
  <div id="app">
    <transition appear name="slide-in" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
@import '@css/themes.scss';
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

html[data-theme='light'] {
  --main-background-color: #{$light-main-background-color};
  --secondary-background-color: #{$light-secondary-background-color};
  --variant-background-color: #{$light-variant-background-color};

  --main-shadow-color: #{$light-main-shadow-color};
  --secondary-shadow-color: #{$light-secondary-shadow-color};

  --main-text-color: #{$light-main-text-color};
  --secondary-text-color: #{$light-secondary-text-color};
  --variant-text-color: #{$light-variant-text-color};

  --main-border-color: #{$light-main-border-color};

  --main-box-shadow: #{$light-main-box-shadow};

  --cards-background-color: #{$light-cards-background-color};
  --screen-background-color: #{$light-screen-background-color};

  --disabled-button-background-color: #{$light-disabled-button-background-color};
  --disabled-button-color: #{$light-disabled-button-color};
}

html[data-theme='dark'] {
  --main-background-color: #{$dark-main-background-color};
  --secondary-background-color: #{$dark-secondary-background-color};
  --variant-background-color: #{$dark-variant-background-color};

  --main-shadow-color: #{$dark-main-shadow-color};
  --secondary-shadow-color: #{$dark-secondary-shadow-color};

  --main-text-color: #{$dark-main-text-color};
  --secondary-text-color: #{$dark-secondary-text-color};
  --variant-text-color: #{$dark-variant-text-color};

  --main-border-color: #{$dark-main-border-color};

  --main-box-shadow: #{$dark-main-box-shadow};

  --cards-background-color: #{$dark-cards-background-color};
  --screen-background-color: #{$dark-screen-background-color};

  --disabled-button-background-color: #{$dark-disabled-button-background-color};
  --disabled-button-color: #{$dark-disabled-button-color};
}

body {
  margin: 0;
}

a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

a:active {
  text-decoration: none;
}

#app {
  height: 100vh;
  background-image: url(@assets/ui/wallpaper.jpg);
  background-size: cover;
  background-repeat: no-repeat;

  h1,
  h2,
  span,
  p {
    color: var(--main-text-color);
  }

  span,
  p {
    font-family: 'Upheaval';
    font-size: 1rem;
    color: var(--main-text-color);

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
    text-shadow: var(--secondary-background-color) 0.1rem 0 1rem;
    letter-spacing: 0.25rem;
    text-align: center;
  }
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s;
}

.slide-in-enter {
  transform: translateY(100%);
}

.slide-in-leave-to {
  transform: translateY(-100%);
}
</style>
