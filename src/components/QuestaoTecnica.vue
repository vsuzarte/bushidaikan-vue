<template>
  <div class="row">
    <div class="col-12 text-center text-bold sub-title">{{ correctOption.tecnicaBR }}</div>
    <div class="col-12 text-center">
      <img class="imagem" :src="getImagePath()"
        style="border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); border: 2px solid #FBC920;">
    </div>
    <template v-if="!btnIsConfirm">
      <div class="col-12 col-lg-7">
        <q-btn v-for="(option, index) in shuffledOptions" :key="index" :disabled="btnIsConfirm" class="full-width q-mb-xs"
          :color="index === selectedButtonIndex ? 'secondary' : 'amber'" text-color="black"
          @click.stop="selectAwnser(option, index)">
          {{ option.nome }}
        </q-btn>
        <q-btn class="full-width" color="primary" @click.stop="checkAwnser()" :disabled="selectedQuestion === null"
          block>Confirmar</q-btn>
      </div>
    </template>
    <template v-else>
      <resposta :acertou="acertou" :respostaCorreta="correctOption.nome" :respostaErrada="selectedQuestion.nome"></resposta>
      <div class="col-12 q-mt-md">
        <q-btn text-color="black" class="full-width q-mb-xs" color="amber" @click.stop="nextQuestion()">Continuar</q-btn>
      </div>
    </template>
  </div>
</template>

<script>
import Resposta from './Resposta.vue';

export default {
  name: 'QuestaoTecnica',
  props: {
    currentQuestion: {
      type: Array,
      required: true,
    },
  },
  components: { Resposta },
  data() {
    return {
      btnIsConfirm: false,
      selectedQuestion: null,
      selectedButtonIndex: null,
      acertou: false,
    };
  },
  methods: {
    getImagePath() {
      const imagem = this.getCorrectOption().imagem;
      return require(`../assets/images/Tecnicas/${imagem}`);
    },
    getCorrectOption() {
      const tecnicaCorreta = this.currentQuestion.find(tecnica => tecnica.isCorrect === true);
      return tecnicaCorreta;
    },
    selectAwnser(option, index) {
      this.selectedQuestion = option;
      this.selectedButtonIndex = index;
      this.getAudioPath(option.audio);
    },
    checkAwnser() {
      this.btnIsConfirm = true;
      this.acertou = this.selectedQuestion.isCorrect;
      this.playSound(this.acertou);
    },
    nextQuestion() {
      this.btnIsConfirm = false;
      this.selectedQuestion = null;
      this.selectedButtonIndex = null;
      this.$emit('continuar-quiz', this.acertou);
      this.acertou = false;
    },
    playSound() {
      if (this.acertou) {
        const audio = new Audio(require(`@/assets/sounds/success.mp3`));
        audio.play();
      }
      else {
        const audio = new Audio(require(`@/assets/sounds/negative.mp3`));
        audio.play();
      }
    },
    getAudioPath(tecnica) {
      const audio = new Audio(require(`@/assets/sounds/tecnicas/${tecnica}`));
      audio.play();
    },
  },
  computed: {
    correctOption() {
      return this.getCorrectOption();
    },
    shuffledOptions() {
      const question = this.currentQuestion;
      return question.sort(() => Math.random() - 0.5);
    }
  },
}
</script>

<style scoped>

.imagem{
  width: 25%;
}

@media (max-width: 1500px) {
  .imagem {
    width: 35%;
  }
}

@media (max-width: 1000px) {
  .imagem {
    width: 50%;
  }
}

@media (max-width: 600px) {
  .imagem {
    width: 100%;
  }
}
</style>
