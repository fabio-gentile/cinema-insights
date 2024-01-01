export const DEFAULT_TITLE = 'Cinema Insights'
export default [
  {
    name: 'home',
    path: '/',
    component: () => import('@/pages/PageHome.vue'),
    meta: {
      title: `Home - ${DEFAULT_TITLE}`
    }
  },
  {
    name: 'movie',
    path: '/movie',
    component: () => import('@/pages/PageMovie.vue'),
    meta: {
      title: `Movie - ${DEFAULT_TITLE}`
    }
  },
  {
    name: 'tv',
    path: '/tv',
    component: () => import('@/pages/PageTvShow.vue'),
    meta: {
      title: `Tv Shows - ${DEFAULT_TITLE}`
    }
  },
  { name: 'movieDetail', path: '/movie/:id-:title', component: () => import('@/pages/MovieDetail.vue') },
  { name: 'tvSeason', path: '/tv/:id-:title/seasons/:season', component: () => import('@/pages/TvShowSeason.vue') },
  { name: 'tvDetail', path: '/tv/:id-:title', component: () => import('@/pages/TvShowDetail.vue') },
  {
    name: 'searchResult',
    path: '/search/:query',
    component: () => import('@/pages/SearchResult.vue'),
    meta: {
      title: `Search - ${DEFAULT_TITLE}`
    }
  },
  { name: 'personDetail', path: '/person/:id-:title', component: () => import('@/pages/PersonDetail.vue') },
  {
    name: 'error',
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/error/Error.vue'),
    meta: {
      title: `Page not found - ${DEFAULT_TITLE}`
    }
  }
]
