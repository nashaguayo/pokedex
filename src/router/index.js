import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { isDesktop, isInstalled, isOnline } from '@/lib/helpers';

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
      header: true,
      footer: true,
      scrollToTopButton: false,
    },
  },
  {
    path: '/404',
    name: 'pageNotFound',
    component: () => import('@/views/PageNotFoundView.vue'),
    meta: {
      header: true,
      footer: true,
    },
  },
  {
    path: '*',
    redirect: '/404',
    meta: {
      header: true,
      footer: true,
    },
  },
  {
    path: '/pokemons',
    name: 'pokemons',
    component: () => import('@/views/PokemonsView.vue'),
    meta: {
      header: true,
    },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/SearchView.vue'),
  },
  {
    path: '/pokemons/:id',
    name: 'pokemon',
    component: () => import('@/views/PokemonView.vue'),
  },
  {
    path: '/install',
    name: 'install',
    component: () => import('@/views/InstallView.vue'),
    meta: {
      transition: 'none',
    },
  },
  {
    path: '/offline',
    name: 'offline',
    component: () => import('@/views/OfflineView.vue'),
    meta: {
      transition: 'none',
    },
  },
];

const router = new VueRouter({
  base: '/pokedex',
  mode: 'hash',
  routes,
});

router.beforeEach((to, from, next) => {
  if (!isDesktop() && !isInstalled() && to.name !== 'install') {
    next({ name: 'install' });
    return;
  }

  if (!isOnline() && to.name !== 'offline') {
    next({ name: 'offline' });
    return;
  }

  if (to.name === 'pokemon') {
    to.meta.transition = 'slide-from-right';
  } else if (from.name === 'pokemon') {
    to.meta.transition = 'slide-from-left';
  } else if (to.name !== 'install' && to.name !== 'offline') {
    to.meta.transition = 'slide';
  }
  next();
});

export default router;
