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
  },
  {
    path: '/pokemon',
    name: 'pokemon',
    component: () => import('@components/pokemons/PokemonItem.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
