<template>
  <v-container v-if="!finalizado" class="h-screen">
    <v-row v-if="!quizIniciado">
      <v-col cols="12" v-if="tiposStore.tipos">
        <selecionar-tipos :tipos="tiposStore.tipos" @iniciar-quiz="iniciarQuiz"></selecionar-tipos>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="12" align="left" class="mb-3">
            <v-btn size="small" class="btn-bushi" to="/" prepend-icon="mdi-arrow-left">SAIR</v-btn>
          </v-col>
          <v-col cols="4" class="col-center">
            <v-chip color="primary" prepend-icon="mdi-help-box">
              {{ (this.currentQuestionIndex + 1) }} / {{ this.questions.length }}
            </v-chip>
          </v-col>
          <v-col cols="4" class="col-center">
            <v-chip color="success" prepend-icon="mdi-check-bold">
              {{ this.score }}
            </v-chip>
          </v-col>
          <v-col cols="4" class="col-center">
            <v-chip color="error" prepend-icon="mdi-close-thick">
              {{ this.erros }}
            </v-chip>
          </v-col>
        </v-row>
      </v-col>
      <v-row>
        <v-col cols="12">
          <questao-postura @continuar-quiz="nextQuestion" :currentQuestion="getCurrentQuestion"></questao-postura>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
  <v-container v-else class="h-screen">
    <v-row no-gutters>
      <v-col cols="12" class="col-center text-center">
        <h2>OKINAWA SHORIN-RYU</h2>
        <h2>KARATÊ-DO BUSHIDAIKAN</h2>
      </v-col>
      <v-col cols="6" class="text-center img-center">
        <v-img width="100" :aspect-ratio="1" :src="getLogoPath()" cover></v-img>
      </v-col>
      <v-col cols="6" class="text-center img-center mb-3">
        <v-img width="100" :aspect-ratio="1" :src="getLogoPath2()" cover></v-img>
      </v-col>
      <v-col v-if="score > 0" cols="12" class="col-center text-center">
        <h2>Você acertou:</h2>
        <h1 class="bg-bushi">{{score}} de {{ score + erros }}:</h1>
        <h2>Continue estudando para aumentar seu conhecimento!</h2>
      </v-col>
      <v-col v-else cols="12" class="col-center text-center bg-bushi">
        <h2>Infelizmente você não pontuou.</h2>
        <h2>Mas continue tentando!</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
      </v-col>
      <v-col cols="12">
        <v-btn size="small" class="btn btn-bushi mb-3" @click.stop="reiniciar()" block>Jogar novamente</v-btn>
        <v-btn size="small" class="btn btn-black" to="/" block>Voltar para início</v-btn>
      </v-col>
      <v-row no-gutters>
        <v-col cols="12" class="col-center bg-bushi">
          <h3>Renshi</h3>
          <h3>Maycon H. Sichelschimidt</h3>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
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
      return require(`@/assets/images/logo2.png`);
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
  .img-center{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
