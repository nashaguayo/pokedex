import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/pokemons',
    name: 'pokemons',
    component: () => import('@views/PokemonsView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
