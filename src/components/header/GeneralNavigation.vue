<template>
  <div class="general-navigation">
    <div class="navigation">
      <GeneralNavigationLink :to="{ name: 'home' }" />
      <GeneralNavigationLink
        :to="{ name: 'pokemons' }"
        :text="$t('header.generalNavigation.goToPokemonsPage')"
        icon="fa-book-open"
      />
      <GeneralNavigationLink
        :to="{ name: 'search' }"
        :text="$t('header.generalNavigation.search')"
        icon="fa-magnifying-glass"
      />
    </div>
    <div class="darkmode">
      <LocaleChanger />
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
import GeneralNavigationLink from '@/components/header/GeneralNavigationLink.vue';
import LocaleChanger from '@/components/header/LocaleChanger.vue';
import other from '@/store/state/other';
import { toggleDarkModeInStoreAndLocalStorage } from '@/store/mutations/other';

export default {
  name: 'GeneralNavigation',
  components: { GeneralNavigationLink, LocaleChanger },
  computed: {
    isDarkModeEnabled() {
      return other.state.isDarkModeEnabled;
    },
  },
  methods: {
    toggleTheme() {
      toggleDarkModeInStoreAndLocalStorage();
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

  .darkmode {
    display: flex;
    align-items: center;
  }

  .icon {
    cursor: pointer;
    margin-right: 2rem;

    @media (min-width: $min-width-first-break) {
      margin-right: 1rem;
    }

    @media (min-width: $min-width-fourth-break) {
      margin-right: 3rem;
    }
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
