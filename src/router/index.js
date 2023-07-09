import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '/pokedex',
    redirect: '/',
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/404',
    name: 'pageNotFound',
    component: () => import('@views/PageNotFoundView.vue'),
  },
  {
    path: '*',
    redirect: '/404',
  },
  {
    path: '/pokemons',
    name: 'pokemons',
    component: () => import('@views/PokemonsView.vue'),
    meta: {
      footer: false,
    },
  },
  {
    path: '/pokemons/search',
    name: 'search',
    component: () => import('@views/SearchView.vue'),
    meta: {
      header: false,
      footer: false,
    },
  },
  {
    path: '/pokemons/:id',
    name: 'pokemon',
    component: () => import('@views/PokemonView.vue'),
    meta: {
      header: false,
      footer: false,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
