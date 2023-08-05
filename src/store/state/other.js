import Vue from 'vue';

const state = Vue.observable({
  storeHasLoaded: false,
  storeIsLoading: false,
  isDarkModeEnabled: false,
});

export default {
  get state() {
    return state;
  },

  getStoreHasLoaded() {
    return state.storeHasLoaded;
  },

  setStoreHasLoaded(storeHasLoaded) {
    state.storeHasLoaded = storeHasLoaded;
  },

  getStoreIsLoading() {
    return state.storeIsLoading;
  },

  setStoreIsLoading(storeIsLoading) {
    state.storeIsLoading = storeIsLoading;
  },

  getIsDarkModeEnabled() {
    return state.isDarkModeEnabled;
  },

  setIsDarkModeEnabled(isDarkModeEnabled) {
    state.isDarkModeEnabled = isDarkModeEnabled;
  },
};
