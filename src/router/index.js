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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.isReady().then(() => {
  if (Capacitor.isNativePlatform()) {
    // Adiciona um ouvinte para o evento 'hardwareBackButton' do Capacitor
    Capacitor.addListener('hardwareBackButton', () => {
      // Verifica se estamos na página inicial
      if (router.currentRoute.value.path !== '/') {
        // Se não estiver na página inicial, navegue de volta para ela
        router.push('/');
      } else {
        // Se estiver na página inicial, saia do aplicativo (ou faça qualquer outra ação desejada)
        // Capacitor.Plugins.App.exitApp(); // Se desejar sair do aplicativo
      }
    });
  }
});

export default router
