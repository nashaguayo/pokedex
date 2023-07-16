<template>
  <div class="general-navigation">
    <div class="navigation">
      <router-link to="/">
        <img
          src="@/assets/ui/pokeball.svg.png"
          alt="menu"
          class="url home-icon-link"
        />
      </router-link>
      <router-link class="desktop" :to="{ name: 'pokemons' }">
        <h2 class="url pokemons-link">Pokemons</h2>
      </router-link>
      <router-link class="mobile" :to="{ name: 'pokemons' }">
        <FontAwesomeIcon
          icon="fa-solid fa-book-open"
          :color="isDarkModeEnabled ? 'white' : 'black'"
          size="2x"
          class="icon"
        />
      </router-link>
      <router-link class="desktop" :to="{ name: 'search' }">
        <h2 class="url pokemons-link">Search</h2>
      </router-link>
      <router-link class="mobile" :to="{ name: 'search' }">
        <FontAwesomeIcon
          icon="fa-solid fa-magnifying-glass"
          :color="isDarkModeEnabled ? 'white' : 'black'"
          size="2x"
          class="icon"
        />
      </router-link>
    </div>
    <div class="darkmode">
      <transition name="flip" mode="out-in">
        <FontAwesomeIcon
          key="on"
          v-if="isDarkModeEnabled"
          @click="toggleTheme"
          icon="fa-solid fa-toggle-on"
          size="3x"
          color="white"
          class="icon"
        />
        <FontAwesomeIcon
          key="off"
          v-else
          @click="toggleTheme"
          icon="fa-solid fa-toggle-off"
          size="3x"
          class="icon"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import store from '@/lib/store';

export default {
  name: 'GeneralNavigation',
  computed: {
    isDarkModeEnabled() {
      return store.state.isDarkModeEnabled;
    },
  },
  methods: {
    toggleTheme() {
      store.toggleDarkMode();
    },
  },
};
</script>

<style lang="scss" scoped>
.general-navigation {
  background-color: var(--secondary-background-color);
  width: 100%;
  box-shadow: var(--main-box-shadow);
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 5;

  @media (min-width: $min-width-second-break) {
    width: 75vw;
  }

  .navigation {
    display: flex;
    align-items: center;

    .url {
      cursor: pointer;
    }
  }

  .home-icon-link {
    margin: 0.5rem 1rem;
    height: 3rem;

    @media (min-width: $min-width-first-break) {
      margin: 1rem 2rem;
    }

    @media (min-width: $min-width-third-break) {
      height: 4rem;
    }
  }

  .pokemons-link {
    margin-right: 2rem;
  }

  .darkmode {
    margin-right: 2rem;
  }

  .icon {
    cursor: pointer;
    margin-right: 2rem;
  }

  .flip-enter-active,
  .flip-leave-active {
    transition: transform 0.1s;
  }

  .flip-enter,
  .flip-leave-to {
    transform: scaleX(0);
  }

  .desktop {
    display: none;

    @media (min-width: $min-width-third-break) {
      display: block;
    }
  }

  .mobile {
    @media (min-width: $min-width-third-break) {
      display: none;
    }
  }
}
</style>
