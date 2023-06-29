<template>
  <div class="home">
    <div class="logo">
      <img :src="require('@assets/home-view/pokedex-logo.png')" />
      <h2>Learn all about pokemons, fight battles, and more!</h2>
    </div>
    <div class="content">
      <img :src="require('@assets/home-view/pokemons.jpg')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style lang="scss" scoped>
.home {
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .content {
    img {
      width: 100%;
    }
  }
}
</style>
