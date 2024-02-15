import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/quiz-tecnicas',
    name: 'QuizTecnicas',
    component: () => import(/* webpackChunkName: "about" */ '../views/QuizTecnicasView.vue'),
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
  },
  {
    path: '/lista-palavras',
    name: 'lista-palavras',
    component: () => import(/* webpackChunkName: "about" */ '../views/ListaPalavrasView.vue')
  },
  {
    path: '/quiz-gerais',
    name: 'quiz-gerais',
    component: () => import(/* webpackChunkName: "about" */ '../views/QuizGeraisView.vue')
  },
  {
    path: '/quiz-audio',
    name: 'quiz-audio',
    component: () => import(/* webpackChunkName: "about" */ '../views/QuizAudioView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
