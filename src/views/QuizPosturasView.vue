<template>
  <v-container v-if="!finalizado" class="h-screen bg-padrao">
    <v-row v-if="!quizIniciado">
      <v-col v-if="tiposStore.tipos">
        <selecionar-tipos :tipos="tiposStore.tipos" @iniciar-quiz="iniciarQuiz"></selecionar-tipos>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-row no-gutters class="mt-2" id="cabecalho">
        <v-col>
          <v-btn size="x-medium" class="btn btn-bushi mb-2" to="/" prepend-icon="mdi-arrow-left">Sair</v-btn>
        </v-col>
        <v-col>
          <v-chip color="primary" prepend-icon="mdi-help-box">
            {{ (this.currentQuestionIndex + 1) }} / {{ this.questions.length }}
          </v-chip>
        </v-col>
        <v-col>
          <v-chip color="success" prepend-icon="mdi-check-bold">
            {{ this.score }}
          </v-chip>
        </v-col>
        <v-col>
          <v-chip color="danger" prepend-icon="mdi-close-thick">
            {{ this.erros }}
          </v-chip>
        </v-col>
      </v-row>
      <questao-postura @continuar-quiz="nextQuestion" :currentQuestion="getCurrentQuestion"></questao-postura>
    </v-row>
  </v-container>
  <v-container v-else class="h-screen bg-padrao">
    <v-row>
      <v-col class="text-center" cols="12">
        <p class="with-gradient p-3">Bushudaikan</p>
      </v-col>
      <v-col cols="6" class="text-center">
        <v-img width="100" :aspect-ratio="1" :src="getLogoPath()" Default></v-img>
      </v-col>
      <v-col cols="6" class="text-center">
        <v-img width="100" :aspect-ratio="1" :src="getLogoPath2()" Default></v-img>
      </v-col>
      <v-col cols="12" class="text-center">
        <span v-if="score > 0">Parabéns você teve {{ score }} acertos!!!</span>
        <span v-else>Continue tentando!!!</span>
      </v-col>
      <v-col cols="12">
        <v-btn class="btn btn-bushi mb-3" @click.stop="reiniciar()" block>Jogar novamente</v-btn>
        <v-btn class="btn btn-black" to="/" block>Voltar para início</v-btn>
      </v-col>
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
      tiposSelecionados: [],
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
    iniciarQuiz(selecionados) {
      this.tiposSelecionados = selecionados;
      this.quizIniciado = true;
      this.posturasSelecionados = this.posturasStore.getPosturasPorTipos(selecionados);
      this.questions = this.questionService.getRandomQuestions(this.posturasSelecionados);
    },
    nextQuestion(acertou) {
      if (acertou) {
        this.score++;
      } else {
        this.erros++;
      }

      this.currentQuestionIndex++;
      console.log('this.currentQuestionIndex', this.currentQuestionIndex);
      console.log('this.questions.length', this.questions.length);

      if (this.currentQuestionIndex >= this.questions.length) {
        this.finalizarQuiz();
      }
    },
    finalizarQuiz() {
      this.finalizado = true;
      console.log('fim de jogo', this.score);
    },
    reiniciar(){
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
    getLogoPath2(){
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
span{
  font-weight: 600;
}
</style>
