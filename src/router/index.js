import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/quiz-posturas',
    name: 'QuizPosturas',
    component: () => import(/* webpackChunkName: "about" */ '../views/QuizPosturasView.vue'),
  },
  {
    path: '/quiz-palavras',
    name: 'quiz-palavras',
    component: () => import(/* webpackChunkName: "about" */ '../views/QuizPalavrasView.vue')
  },
  {
    path: '/lista-tecnicas',
    name: 'lista-tecnicas',
    component: () => import(/* webpackChunkName: "about" */ '../views/ListaTecnicasView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
