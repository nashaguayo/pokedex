<template>
  <div class="general-navigation">
    <div class="navigation">
      <router-link to="/">
        <img
          src="@assets/ui/pokeball.svg.png"
          alt="menu"
          class="url home-icon-link"
        />
      </router-link>
      <router-link to="/pokemons">
        <h2 class="url pokemons-link">Pokemons</h2>
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
import { isDarkModeEnabled, toggleDarkMode } from '@lib/localStorage';

export default {
  name: 'GeneralNavigation',
  data() {
    return {
      isDarkModeEnabled: isDarkModeEnabled(),
    };
  },
  methods: {
    toggleTheme() {
      this.isDarkModeEnabled = !this.isDarkModeEnabled;
      toggleDarkMode();
      document.documentElement.setAttribute(
        'data-theme',
        this.isDarkModeEnabled ? 'dark' : 'light'
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.general-navigation {
  background-color: var(--secondary-background-color);
  width: 100%;
  box-shadow: var(--main-box-shadow);
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
    height: 4rem;
    margin-left: 1.5rem;
  }

  .pokemons-link {
    margin-left: 1rem;
  }

  .darkmode {
    margin-right: 2rem;
  }

  .icon {
    cursor: pointer;
  }

  .flip-enter-active,
  .flip-leave-active {
    transition: transform 0.1s;
  }

  .flip-enter,
  .flip-leave-to {
    transform: scaleX(0);
  }
}
</style>
