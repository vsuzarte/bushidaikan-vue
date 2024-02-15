<template>
  <q-layout>
    <header-with-logos titulo="Quiz Palavras"></header-with-logos>
    <q-page-container class="q-page-container-custom">
      <div v-if="!finalizado">
        <selecionar-quantidade-gerais v-if="!quizIniciado" @iniciar-quiz="iniciarQuiz"></selecionar-quantidade-gerais>
        <questao-gerais v-else @continuar-quiz="nextQuestion" :currentQuestion="getCurrentQuestion"></questao-gerais>
      </div>
      <div v-else>
        <placar @reiniciar-quiz="reiniciar" :score="score" :erros="erros"></placar>
      </div>
    </q-page-container>
    <q-footer class="bg-white text-black text-center items-center">
      <q-btn color="secondary" to="/" text-color="black" icon="arrow_back" label="Voltar" />
    </q-footer>
  </q-layout>
</template>

<script>

import { onMounted } from 'vue';
import { useGeraisStore } from '@/stores/geraisStore.js';
import GeraisService from '@/services/gerais-service.js';
import SelecionarQuantidadeGerais from '../components/SelecionarQuantidadeGerais.vue';
import QuestaoGerais from '../components/QuestaoGerais.vue';
import Placar from '@/components/Placar.vue';
import HeaderWithLogos from '@/components/HeaderWithLogos.vue';

export default {
  name: 'QuizGerais',
  components: { SelecionarQuantidadeGerais, QuestaoGerais, Placar, HeaderWithLogos },
  setup() {
    const geraisStore = useGeraisStore();
    const geraisService = new GeraisService();

    onMounted(() => {
      geraisStore.carregarPerguntas();
    });

    return {
      geraisStore,
      geraisService,
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
      this.questions = this.geraisService
        .getRandomQuestions(this.geraisStore.perguntas, quantidade);
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
    getTrofeuPath(){
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

<style scoped>
</style>
