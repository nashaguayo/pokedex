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
        <transition :name="transition" mode="out-in">
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
import other from '@/store/state/other';
import { toggleDarkModeInDOM } from '@/lib/helpers';

export default {
  name: 'App',
  components: { BaseHeader, BaseFooter },
  async created() {
    this.setTheme(this.isDarkModeEnabled);
    window.addEventListener('online', this.online);
    window.addEventListener('offline', this.offline);
  },
  beforeDestroy() {
    window.removeEventListener('online', this.online);
    window.removeEventListener('offline', this.offline);
  },
  computed: {
    isDarkModeEnabled() {
      return other.state.isDarkModeEnabled;
    },
    displayHeader() {
      return this.$route.meta.header ?? false;
    },
    displayFooter() {
      return this.$route.meta.footer ?? false;
    },
    transition() {
      return this.$route.meta.transition ?? 'slide';
    },
  },
  watch: {
    isDarkModeEnabled(newValue) {
      this.setTheme(newValue);
    },
  },
  methods: {
    setTheme(isDarkModeEnabled) {
      toggleDarkModeInDOM(isDarkModeEnabled);
    },
    online() {
      this.$router.push({ name: 'home' });
    },
    offline() {
      if (this.$router.history.current.name !== 'favorites')
        this.$router.push({ name: 'offline' });
    },
  },
};
</script>

<style lang="scss">
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
  --main-title-border-color: #292a83;
  --main-title-color: #ffdf1b;
  --secondary-title-border-color: black;
  --secondary-title-color: white;
  --variant-title-border-color: white;
  --variant-title-color: transparent;

  --main-background-color: rgb(255, 255, 218);
  --secondary-background-color: #af0c00;
  --variant-background-color: black;

  --main-shadow-color: rgba(0, 0, 0, 0.6);
  --secondary-shadow-color: rgba(0, 0, 0, 0.3);

  --main-text-color: black;
  --secondary-text-color: #f4e9e9;
  --variant-text-color: white;

  --main-border-color: black;
  --secondary-border-color: #f4e9e9;

  --main-box-shadow: 0 0 0.2rem 0.2rem rgba(0, 0, 0, 0.3);

  --cards-background-color: rgb(255, 217, 0);
  --screen-background-gradient: linear-gradient(
    0deg,
    rgb(136, 136, 136) 0%,
    rgba(255, 255, 255, 1) 100%
  );

  --disabled-button-background-color: #cccccc;
  --disabled-button-color: #666666;

  --popup-background-color: linear-gradient(
    180deg,
    transparent,
    $light-cards-background-color
  );

  --losing-color: green;
  --winning-color: red;

  --favorite-cards-background-gradient: linear-gradient(
    36deg,
    rgb(255, 217, 0) 60%,
    white 80%,
    rgb(255, 217, 0) 100%
  );
  --favorite-cards-screen-background-gradient: radial-gradient(
    white,
    rgba(0, 0, 0, 0.8)
  );
}

html[data-theme='dark'] {
  --main-title-border-color: #ffdf1b;
  --main-title-color: #292a83;
  --secondary-title-border-color: black;
  --secondary-title-color: white;
  --variant-title-border-color: white;
  --variant-title-color: transparent;

  --main-background-color: #1d1f21;
  --secondary-background-color: #260a0a;
  --variant-background-color: rgb(0, 0, 0);

  --main-shadow-color: rgba(39, 39, 39, 0.6);
  --secondary-shadow-color: rgba(0, 0, 0, 0.3);

  --main-text-color: white;
  --secondary-text-color: white;
  --variant-text-color: white;

  --main-border-color: rgb(255, 255, 255);
  --secondary-border-color: white;

  --main-box-shadow: 0 0 0.2rem 0.2rem $dark-secondary-shadow-color;

  --cards-background-color: rgb(53, 52, 0);
  --screen-background-gradient: linear-gradient(
    0deg,
    rgb(44, 44, 44) 0%,
    rgb(0, 0, 0) 100%
  );

  --disabled-button-background-color: #535353;
  --disabled-button-color: #cccccc;

  --popup-background-color: linear-gradient(
    180deg,
    transparent,
    $dark-secondary-background-color
  );

  --losing-color: green;
  --winning-color: red;

  --favorite-cards-background-gradient: linear-gradient(
    36deg,
    rgb(255, 217, 0) 60%,
    white 80%,
    rgb(255, 217, 0) 100%
  );
  --favorite-cards-screen-background-gradient: radial-gradient(
    white,
    rgba(0, 0, 0, 0.8)
  );
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

  @media (min-width: $min-width-second-break) {
    background-image: url(@/assets/images/ui/wallpaper.jpg);
    background-size: cover;
    background-repeat: no-repeat;
  }

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
