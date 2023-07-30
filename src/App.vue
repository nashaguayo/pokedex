<template>
  <div id="app">
    <div class="base-page">
      <div
        class="page-background"
        :class="{
          'add-margins': displayHeader,
          'no-margins': !displayHeader,
        }"
      >
        <transition name="drawer-up">
          <BaseHeader v-if="displayHeader" />
        </transition>
        <transition :name="transition ?? 'slide'" appear mode="out-in">
          <router-view :key="$route.fullPath" />
        </transition>
        <transition name="drawer-down">
          <BaseFooter :displayFooter="displayFooter" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/ui/BaseHeader.vue';
import BaseFooter from '@/components/ui/BaseFooter.vue';
import store from '@/lib/store';
import { toggleDarkMode } from '@/lib/helpers';

export default {
  name: 'App',
  components: { BaseHeader, BaseFooter },
  async created() {
    this.setTheme(this.isDarkModeEnabled);
    await store.initializeStore();
  },
  computed: {
    isDarkModeEnabled() {
      return store.state.isDarkModeEnabled;
    },
    displayHeader() {
      return this.$route.meta.header ?? true;
    },
    displayFooter() {
      return this.$route.meta.footer ?? true;
    },
    transition() {
      return this.$route.meta.transition;
    },
  },
  watch: {
    isDarkModeEnabled(newValue) {
      this.setTheme(newValue);
    },
  },
  methods: {
    setTheme(isDarkModeEnabled) {
      toggleDarkMode(isDarkModeEnabled);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/css/themes.scss';

@font-face {
  font-family: 'Pokemon Solid';
  src: local('Pokemon Solid'),
    url(@/assets/fonts/pokemon-solid.ttf) format('truetype');
}

@font-face {
  font-family: 'Pokemon Hollow';
  src: local('Pokemon Hollow'),
    url(@/assets/fonts/pokemon-hollow.ttf) format('truetype');
}

@font-face {
  font-family: 'Upheaval';
  src: local('Upheaval'), url(@/assets/fonts/upheaval.ttf) format('truetype');
}

@font-face {
  font-family: 'Kanit';
  src: local('Kanit'), url(@/assets/fonts/kanit.ttf) format('truetype');
}

html[data-theme='light'] {
  --main-title-border-color: #{$light-main-title-border-color};
  --main-title-color: #{$light-main-title-color};
  --secondary-title-border-color: #{$light-secondary-title-border-color};
  --secondary-title-color: #{$light-secondary-title-color};
  --variant-title-border-color: #{$light-variant-title-border-color};
  --variant-title-color: #{$light-variant-title-color};

  --main-background-color: #{$light-main-background-color};
  --secondary-background-color: #{$light-secondary-background-color};
  --variant-background-color: #{$light-variant-background-color};

  --main-shadow-color: #{$light-main-shadow-color};
  --secondary-shadow-color: #{$light-secondary-shadow-color};

  --main-text-color: #{$light-main-text-color};
  --secondary-text-color: #{$light-secondary-text-color};
  --variant-text-color: #{$light-variant-text-color};

  --main-border-color: #{$light-main-border-color};
  --secondary-border-color: #{$light-secondary-border-color};

  --main-box-shadow: #{$light-main-box-shadow};

  --cards-background-color: #{$light-cards-background-color};
  --screen-background-gradient: #{$light-screen-background-gradient};

  --disabled-button-background-color: #{$light-disabled-button-background-color};
  --disabled-button-color: #{$light-disabled-button-color};

  --popup-background-color: #{$light-popup-background-gradient};

  --losing-color: #{$light-losing-color};
  --winning-color: #{$light-winning-color};
}

html[data-theme='dark'] {
  --main-title-border-color: #{$dark-main-title-border-color};
  --main-title-color: #{$dark-main-title-color};
  --secondary-title-border-color: #{$dark-secondary-title-border-color};
  --secondary-title-color: #{$dark-secondary-title-color};
  --variant-title-border-color: #{$dark-variant-title-border-color};
  --variant-title-color: #{$dark-variant-title-color};

  --main-background-color: #{$dark-main-background-color};
  --secondary-background-color: #{$dark-secondary-background-color};
  --variant-background-color: #{$dark-variant-background-color};

  --main-shadow-color: #{$dark-main-shadow-color};
  --secondary-shadow-color: #{$dark-secondary-shadow-color};

  --main-text-color: #{$dark-main-text-color};
  --secondary-text-color: #{$dark-secondary-text-color};
  --variant-text-color: #{$dark-variant-text-color};

  --main-border-color: #{$dark-main-border-color};
  --secondary-border-color: #{$dark-secondary-border-color};

  --main-box-shadow: #{$dark-main-box-shadow};

  --cards-background-color: #{$dark-cards-background-color};
  --screen-background-gradient: #{$dark-screen-background-gradient};

  --disabled-button-background-color: #{$dark-disabled-button-background-color};
  --disabled-button-color: #{$dark-disabled-button-color};

  --popup-background-color: #{$dark-popup-background-gradient};

  --losing-color: #{$dark-losing-color};
  --winning-color: #{$dark-winning-color};
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

h2,
span,
p {
  color: var(--main-text-color);
}

span,
p {
  font-family: 'Upheaval';
  color: var(--main-text-color);

  @media (min-width: $min-width-first-break) {
    font-size: 1.2rem;
  }

  @media (min-width: $min-width-second-break) {
    font-size: 1.5rem;
  }
}

h1 {
  font-size: 1.5rem;
  -webkit-text-stroke-width: 0.15rem;
  -webkit-text-stroke-color: var(--main-title-border-color);
  color: var(--main-title-color);

  @media (min-width: $min-width-first-break) {
    -webkit-text-stroke-width: 0.18rem;
    font-size: 1.8rem;
  }

  @media (min-width: $min-width-second-break) {
    -webkit-text-stroke-width: 0.2rem;
    font-size: 2.5rem;
  }
}

h2 {
  font-size: 1.2rem;
  -webkit-text-stroke-width: 0.08rem;
  -webkit-text-stroke-color: var(--secondary-title-border-color);
  color: var(--secondary-title-color);

  @media (min-width: $min-width-first-break) {
    -webkit-text-stroke-width: 0.1rem;
    font-size: 1.5rem;
  }

  @media (min-width: $min-width-second-break) {
    -webkit-text-stroke-width: 0.15rem;
    font-size: 2rem;
  }
}

h1,
h2 {
  font-family: 'Pokemon Solid';
  letter-spacing: 0.25rem;
  text-align: center;
}

#app {
  height: 100vh;
  background-image: url(@/assets/ui/wallpaper.jpg);
  background-size: cover;
  background-repeat: no-repeat;

  .base-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow-y: scroll;
    height: 100vh;

    .page-background {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--main-background-color);
      width: 100vw;
      height: 100vh;
      box-shadow: none;
      overflow-y: scroll;

      @media (min-width: $min-width-second-break) {
        box-shadow: 0 0 0.5rem 0.3rem var(--main-shadow-color);
        width: 75vw;
      }

      &.add-margins {
        padding-top: 5rem;

        @media (min-width: $min-width-first-break) {
          padding-top: 6rem;
        }

        @media (min-width: $min-width-second-break) {
          padding-top: 7rem;
        }
      }

      &.no-margins {
        padding-top: 0rem;

        @media (min-width: $min-width-second-break) {
          padding-top: 0rem;
        }
      }
    }

    .page-background::-webkit-scrollbar {
      display: none;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter {
  transform: translateY(100%);
}

.slide-leave-to {
  transform: translateY(-100%);
}

.drawer-up-enter-active,
.drawer-up-leave-active {
  transition: transform 0.3s;
}

.drawer-up-enter,
.drawer-up-leave-to {
  transform: translateY(-100%);
}

.drawer-down-enter-active,
.drawer-down-leave-active {
  transition: transform 0.3s;
}

.drawer-down-enter,
.drawer-down-leave-to {
  transform: translateY(100%);
}

.slide-from-left-enter-active,
.slide-from-left-leave-active {
  transition: transform 0.3s;
}

.slide-from-left-enter {
  transform: translateX(-100%);
}

.slide-from-left-leave-to {
  transform: translateX(100%);
}

.slide-from-right-enter-active,
.slide-from-right-leave-active {
  transition: transform 0.3s;
}

.slide-from-right-enter {
  transform: translateX(100%);
}

.slide-from-right-leave-to {
  transform: translateX(-100%);
}
</style>
