<template>
  <div class="row justify-center">
    <div class="col-12 text-center">
      <q-btn class="q-ma-lg" icon="volume_up" outline color="secondary"
        @click="getAudioPath(correctOption.audio)">Ouvir {{ correctOption.tecnicaBR  }}</q-btn>
    </div>
    <div class="row text-center" v-if="!btnIsConfirm">
      <div v-for="(option, index) in shuffledOptions" :key="index" class="col-12 cards">
        <q-card class="my-card q-mb-sm" bordered flat>
          <img :src="getImagePath(option.imagem)">
          <q-card-actions>
            <q-btn :disabled="btnIsConfirm" class="full-width q-mb-xs"
              :color="index === selectedButtonIndex ? 'secondary' : 'amber'" text-color="black"
              @click.stop="selectAwnser(option, index)" label="Selecionar" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-12">
        <q-btn class="full-width q-mb-lg" color="primary" @click.stop="checkAwnser()" :disabled="selectedQuestion === null"
          block>Confirmar</q-btn>
      </div>
    </div>
    <div class="row text-center" v-else>
      <resposta-audio :acertou="acertou" :respostaCorreta="correctOption" :respostaErrada="selectedQuestion">
      </resposta-audio>
      <div class="col-12 q-mt-md cards">
        <q-btn text-color="black" class="full-width q-mb-xs" color="amber" @click.stop="nextQuestion()">Continuar</q-btn>
      </div>
    </div>
  </div>
</template>
  
<script>
import RespostaAudio from './RespostaAudio.vue';

export default {
  name: 'QuestaoAudio',
  props: {
    currentQuestion: {
      type: Array,
      required: true,
    },
  },
  components: { RespostaAudio },
  data() {
    return {
      btnIsConfirm: false,
      selectedQuestion: null,
      selectedButtonIndex: null,
      acertou: false,
    };
  },
  methods: {
    getImagePath(imagem) {
      return require(`../assets/images/Tecnicas/${imagem}`);
    },
    getCorrectOption() {
      const tecnicaCorreta = this.currentQuestion.find(tecnica => tecnica.isCorrect === true);
      return tecnicaCorreta;
    },
    selectAwnser(option, index) {
      this.selectedQuestion = option;
      this.selectedButtonIndex = index;
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
.my-card {
  width: 100%;
  max-width: 250px;
}

.cards {
  display: flex;
  justify-content: center;
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
  