<template>
  <div class="q-pa-md ">
    <q-header bordered>
      <q-toolbar class="bg-dark">
        <q-toolbar-title>
          <q-btn round color="amber" to="/" text-color="black" icon="home" />
        </q-toolbar-title>
        <q-avatar>
        <img :src="getLogoPath()">
      </q-avatar>
      </q-toolbar>
    </q-header>
    <div v-if="!finalizado">
      <selecionar-tipos v-if="!quizIniciado" :tipos="tiposStore.tipos" @iniciar-quiz="iniciarQuiz"></selecionar-tipos>
      <questao-postura v-else @continuar-quiz="nextQuestion" :currentQuestion="getCurrentQuestion"></questao-postura>
    </div>
    <div v-else>
      <div class="row q-col-gutter-none">
        <div class="col-12 text-center">
          <span class="sub-title">OKINAWA SHORIN-RYU</span>
        </div>  
        <div class="col-12 text-center">
          <span class="sub-title">KARATÊ-DO BUSHIDAIKAN</span>
        </div>  
        <div class="col-6 text-center" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <q-img width="50%" :aspect-ratio="1" :src="getLogoPath()"></q-img>
          </div>
          <div class="col-6">
            <q-img width="100%" :aspect-ratio="1" :src="getLogoPath2()"></q-img>
          </div>
          <div v-if="score > 0" class="col-12 text-center">
            <div class="col-12">
              <q-img class="col-12" width="40%" :aspect-ratio="1" :src="getTrofeuPath()"></q-img>
            </div>
            <div class="col-12">
              <p>Você acertou o total de</p>
            </div>
            <div class="col-12 text-center bg-amber">
              <span class="sub-title">{{score}} de {{ score + erros }}</span>
            </div>
          </div>
          <div v-else class="col-12 text-center">
            <div class="col-12">
              <q-img class="col-12" width="40%" :aspect-ratio="1" :src="getSocoPath()"></q-img>
            </div>
            <div class="col-12">
              <p>Infelizmente você não pontuou</p>
            </div>
          </div>
          <div class="col-12 text-center">
              <p>Continue estudando para aumentar seu conhecimento!</p>
            </div>
          <div class="col-12 q-mb-sm">
            <q-btn color="negative" text-color="white" class="full-width" to="/" block>Voltar ao ínicio</q-btn>
          </div>
          <div class="col-12 q-mb-sm">
            <q-btn color="amber" text-color="black" class="full-width" @click.stop="reiniciar()" block>Treinar novamente</q-btn>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import { onMounted } from 'vue';
import { useTiposStore } from '@/stores/tiposStore.js';
import { usePosturasStore } from '@/stores/posturasStore.js';
import QuestionService from '@/services/postura-service.js';
import SelecionarTipos from '../components/SelecionarTipos.vue';
import QuestaoPostura from '../components/QuestaoPostura.vue';

export default {
  components: { SelecionarTipos, QuestaoPostura },
  name: 'QuizPosturas',
  setup() {
    const tiposStore = useTiposStore()
    const posturasStore = usePosturasStore();
    const questionService = new QuestionService();

    onMounted(() => {
      tiposStore.carregarTipos();
      posturasStore.carregarPosturas();
    });

    return {
      tiposStore,
      posturasStore,
      questionService,
    };
  },
  data() {
    return {
      posturasSelecionados: [],
      questions: [],
      quizIniciado: false,
      currentQuestionIndex: 0,
      score: 0,
      erros: 0,
      finalizado: false,
    };
  },
  methods: {
    iniciarQuiz(selecionados, quantidade) {
      this.quizIniciado = true;
      const posturasSelecionados = this.posturasStore.getPosturasPorTipos(selecionados);
      this.questions = this.questionService.getRandomQuestions(posturasSelecionados, quantidade);
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
      this.tiposSelecionados = [];
      this.posturasSelecionados = [];
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
      return require(`@/assets/images/logo3.png`);
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
