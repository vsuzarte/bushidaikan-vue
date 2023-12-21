import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/quiz-postura-selecionar',
    name: 'quiz-postura-selecionar',
    component: () => import(/* webpackChunkName: "about" */ '../views/QuizPosturasSelecionarView.vue')
  },
  {
    path: '/quiz-palavras',
    name: 'quiz-palavras',
    component: () => import(/* webpackChunkName: "about" */ '../views/QuizPalavrasView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
