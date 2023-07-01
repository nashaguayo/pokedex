<template>
  <div class="base-header">
    <div class="navigation">
      <router-link to="/">
        <img
          src="@assets/ui/pokeball.svg.png"
          alt="menu"
          class="home-icon-link"
        />
      </router-link>
      <router-link to="/pokemons">
        <h2 class="pokemons-link">Pokemons</h2>
      </router-link>
    </div>
    <button @click="toggleTheme">Click me</button>
  </div>
</template>

<script>
export default {
  name: 'BaseHeader',
  data() {
    return {
      isDarkModeEnabled: false,
    };
  },
  created() {
    document.documentElement.setAttribute('data-theme', 'light');
  },
  watch: {
    isDarkModeEnabled(newValue) {
      document.documentElement.setAttribute(
        'data-theme',
        newValue ? 'dark' : 'light'
      );
    },
  },
  methods: {
    toggleTheme() {
      this.isDarkModeEnabled = !this.isDarkModeEnabled;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.base-header {
  background-color: var(--secondary-background-color);
  width: 100%;
  box-shadow: var(--main-box-shadow);
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;

  @media (min-width: $min-width-second-break) {
    width: 75vw;
  }

  .navigation {
    display: flex;
    align-items: center;
  }

  .home-icon-link {
    height: 4rem;
    margin-left: 1.5rem;
  }

  .pokemons-link {
    margin-left: 1rem;
  }
}
</style>
