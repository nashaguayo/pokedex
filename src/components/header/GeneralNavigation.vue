<template>
  <div class="general-navigation">
    <div class="navigation">
      <GeneralNavigationLink :to="{ name: 'home' }" />
      <GeneralNavigationLink
        :to="{ name: 'pokemons' }"
        text="Pokemons"
        icon="fa-book-open"
      />
      <GeneralNavigationLink
        :to="{ name: 'search' }"
        text="Search"
        icon="fa-magnifying-glass"
      />
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
import GeneralNavigationLink from './GeneralNavigationLink.vue';
import store from '@/lib/store';

export default {
  name: 'GeneralNavigation',
  components: { GeneralNavigationLink },
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
}
</style>
