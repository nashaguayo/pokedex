import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue';

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
    meta: {
      scrollToTopButton: false,
    },
  },
  {
    path: '/404',
    name: 'pageNotFound',
    component: () => import('@/views/PageNotFoundView.vue'),
  },
  {
    path: '*',
    redirect: '/404',
  },
  {
    path: '/pokemons',
    name: 'pokemons',
    component: () => import('@/views/PokemonsView.vue'),
    meta: {
      footer: false,
    },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/SearchView.vue'),
    meta: {
      header: false,
      footer: false,
    },
  },
  {
    path: '/pokemons/:id',
    name: 'pokemon',
    component: () => import('@/views/PokemonView.vue'),
    meta: {
      header: false,
      footer: false,
    },
  },
  {
    path: '/install',
    name: 'install',
    component: () => import('@/views/InstallView.vue'),
    meta: {
      header: false,
      footer: false,
    },
  },
];

const router = new VueRouter({
  base: '/pokedex',
  mode: 'hash',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'pokemon') {
    to.meta.transition = 'slide-from-right';
  } else if (from.name === 'pokemon') {
    to.meta.transition = 'slide-from-left';
  } else {
    to.meta.transition = 'slide';
  }
  next();
});

export default router;
