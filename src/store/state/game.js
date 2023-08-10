import Vue from 'vue';

const state = Vue.observable({
  image: '',
  name: '',
});

export default {
  get state() {
    return state;
  },

  setMysteryPokemon(name, image) {
    state.name = name;
    state.image = image;
  },
};
