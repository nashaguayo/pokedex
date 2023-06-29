<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/pokemons">Pokemons</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
}
</style>
