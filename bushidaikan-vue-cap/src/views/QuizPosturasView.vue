<template>
  <div>
    <div v-if="!quizIniciado">
      <div v-if="tiposStore.tipos">
        <selecionar-tipos :tipos="tiposStore.tipos" @iniciar-quiz="iniciarQuiz"></selecionar-tipos>
      </div>
    </div>

    <div v-else>

    </div>
  </div>
</template>

<script>

import { onMounted } from 'vue';
import { useTiposStore } from '@/stores/tiposStore.js';
import { usePosturasStore } from '@/stores/posturasStore.js';
import SelecionarTipos from '../components/SelecionarTipos.vue';

export default {
  components: { SelecionarTipos },
  name: 'QuizPosturas',
  setup() {
    const tiposStore = useTiposStore()
    const posturasStore = usePosturasStore();

    onMounted(() => {
      tiposStore.carregarTipos();
      posturasStore.carregarPosturas();
    });

    return {
      tiposStore,
      posturasStore,
    };
  },
  data() {
    return {
      quizIniciado: false,
      tiposSelecionados: [],
      posturasSelecionados: [],
      currentQuestionIndex: 0,
      score: 0,
      questions: [],
    };
  },
  methods: {
    iniciarQuiz(selecionados) {
      this.tiposSelecionados = selecionados;
      this.quizIniciado = true;
      this.posturasSelecionados = this.posturasStore.getPosturasPorTipos(selecionados);
      this.getRandomQuestions();
      console.log(this.questions);
    },
    getRandomQuestions() {
      
      const numQuestions = this.posturasSelecionados.length > 10 ? 10 : this.posturasSelecionados.length;
      const allPosturas = this.posturasSelecionados;
      const selectedPosturas = [];
      this.questions = [];

      for (let i = 0; i < numQuestions; i++) {
        
        const remainingPosturas = allPosturas.filter(postura => !selectedPosturas.includes(postura));

        const randomIndex = Math.floor(Math.random() * remainingPosturas.length);
        const currentQuestion = remainingPosturas[randomIndex];

        const otherPosturas = remainingPosturas.filter(postura => postura !== currentQuestion);

        // Pegar a postura correta
        const correctOption = {
          nome: currentQuestion.Nome,
          imagem: currentQuestion.Imagem,
          posturaBR: currentQuestion.PosturaBR,
          posturaJP: currentQuestion.PosturaJP,
          isCorrect: true,
        };

        // Pegar 3 posturas incorretas aleatórias
        const incorrects = otherPosturas.sort(() => Math.random() - 0.5).slice(0, 3);

        const incorrectOptions = [];

        incorrects.forEach(incorrectPostura => {
          const incorrectOption = {
            nome: currentQuestion.Nome,
            imagem: currentQuestion.Imagem,
            posturaBR: currentQuestion.PosturaBR,
            posturaJP: currentQuestion.PosturaJP,
            isCorrect: false,
          };
          incorrectOptions.push(incorrectOption);
        });

        // Incluir a postura correta em uma posição aleatória
        const fullOptions = [correctOption, ...incorrectOptions];
        const shuffledOptions = fullOptions.sort(() => Math.random() - 0.5);

        selectedPosturas.push(shuffledOptions);
      }

      this.questions = selectedPosturas;
    }
  },
}
</script>
<style scoped></style>
