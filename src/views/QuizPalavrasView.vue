<template>
  <q-layout>
    <header-with-logos titulo="Quiz Palavras"></header-with-logos>
    <q-page-container class="q-page-container-custom">
      <div v-if="!finalizado">
        <selecionar-quantidade-palavras v-if="!quizIniciado" @iniciar-quiz="iniciarQuiz"></selecionar-quantidade-palavras>
        <questao-palavra v-else @continuar-quiz="nextQuestion" :currentQuestion="getCurrentQuestion"></questao-palavra>
      </div>
      <div v-else>
        <Placar @reiniciar-quiz="reiniciar" :score="score" :erros="erros"></placar>
      </div>
    </q-page-container>
    <q-footer class="bg-white text-black text-center items-center">
      <q-btn color="secondary" to="/" text-color="black" icon="arrow_back" label="Voltar" />
    </q-footer>
  </q-layout>
</template>

<script>

import { onMounted } from 'vue';
import { usePalavrasStore } from '@/stores/palavrasStore.js';
import PalavrasService from '@/services/palavras-service.js';
import SelecionarQuantidadePalavras from '../components/SelecionaQuatidadePalavras.vue';
import QuestaoPalavra from '../components/QuestaoPalavra.vue';
import HeaderWithLogos from '@/components/HeaderWithLogos.vue';
import Placar from '@/components/Placar.vue';

export default {
  name: 'QuizPalavras',
  components: { SelecionarQuantidadePalavras, QuestaoPalavra, HeaderWithLogos, Placar },
  setup() {
    const palavrasStore = usePalavrasStore();
    const palavrasService = new PalavrasService();

    onMounted(() => {
      palavrasStore.carregarPalavras();
    });

    return {
      palavrasStore,
      palavrasService,
    };
  },
  data() {
    return {
      questions: [],
      quizIniciado: false,
      currentQuestionIndex: 0,
      score: 0,
      erros: 0,
      finalizado: false,
    };
  },
  methods: {
    iniciarQuiz(quantidade) {
      this.quizIniciado = true;
      this.questions = this.palavrasService
        .getRandomQuestions(this.palavrasStore.palavras, quantidade);
    },
    nextQuestion(acertou) {
      if (acertou) {
        this.score++;
      } else {
        this.erros++;
      }

      this.currentQuestionIndex++;

      if (this.currentQuestionIndex >= this.questions.length) {
        this.finalizarQuiz();
      }
    },
    finalizarQuiz() {
      this.finalizado = true;
    },
    reiniciar() {
      this.questions = [];
      this.quizIniciado = false;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.erros = 0;
      this.finalizado = false;
    },
    getLogoPath() {
      return require(`@/assets/images/logo.png`);
    },
    getLogoPath2() {
      return require(`@/assets/images/logo2.png`);
    },
    getSocoPath() {
      return require(`@/assets/images/punho.png`);
    },
    getTrofeuPath() {
      return require(`@/assets/images/trofeu.png`);
    },
  },
  computed: {
    getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
  }
}
</script>

<style scoped></style>
