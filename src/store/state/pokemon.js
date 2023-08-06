import Vue from 'vue';

const state = Vue.observable({
  visited: new Map(),
});

export default {
  get state() {
    return state;
  },

  getVisited() {
    return state.visited;
  },

  setVisited(name, details) {
    state.visited.set(name, details);
  },

  hasVisitedPokemon(name) {
    return state.visited.has(name);
  },
};
