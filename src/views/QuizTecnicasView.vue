<template>
  <q-layout>
    <header-with-logos titulo="Quiz técnicas"></header-with-logos>
    <q-page-container class="q-page-container-custom">
      <div v-if="!finalizado">
        <selecionar-tipos v-if="!quizIniciado" :tipos="tiposStore.tipos" @iniciar-quiz="iniciarQuiz"></selecionar-tipos>
        <questao-tecnica v-else @continuar-quiz="nextQuestion" :currentQuestion="getCurrentQuestion"></questao-tecnica>
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
import { useTiposStore } from '@/stores/tiposStore.js';
import { useTecnicasStore } from '@/stores/tecnicasStore.js';
import QuestionService from '@/services/tecnica-service.js';
import SelecionarTipos from '../components/SelecionarTipos.vue';
import QuestaoTecnica from '../components/QuestaoTecnica.vue';
import HeaderWithLogos from '@/components/HeaderWithLogos.vue';
import Placar from '@/components/Placar.vue';

export default {
  components: { SelecionarTipos, QuestaoTecnica, HeaderWithLogos, Placar },
  name: 'QuizTecnicas',
  setup() {
    const tiposStore = useTiposStore()
    const tecnicasStore = useTecnicasStore();
    const questionService = new QuestionService();

    onMounted(() => {
      tiposStore.carregarTipos();
      tecnicasStore.carregarTecnicas();
    });

    return {
      tiposStore,
      tecnicasStore,
      questionService,
    };
  },
  data() {
    return {
      tecnicasSelecionados: [],
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
      const tecnicasSelecionados = this.tecnicasStore.getTecnicasPorTipos(selecionados);
      this.questions = this.questionService.getRandomQuestions(tecnicasSelecionados, quantidade);
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
      this.tecnicasSelecionados = [];
      this.questions = [];
      this.quizIniciado = false;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.erros = 0;
      this.finalizado = false;
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

<style scoped>
.imagem {
  width: 30%;
}

@media (min-width: 1000px) {
  .imagem {
    width: 20%;
  }
}

@media (max-width: 600px) {
  .imagem {
    width: 40%;
  }
}
</style>
