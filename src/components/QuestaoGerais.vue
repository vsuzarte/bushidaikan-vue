<template>
  <div class="row q-col-gutter-none">
    <div class="col-12 text-center text-bold sub-title">{{ currentQuestion.Pergunta }}</div>
    <div v-if="!btnIsConfirm" class="col-12">
      <q-btn v-for="(option, index) in shuffledOptions" :key="index" :disabled="btnIsConfirm" class="full-width q-mb-xs"
        :color="index === selectedButtonIndex ? 'secondary' : 'amber'" text-color="black"
        @click.stop="selectAwnser(option, index)">
        {{ option.Resposta }}
      </q-btn>
      <q-btn class="full-width" color="primary" @click.stop="checkAwnser()" :disabled="selectedQuestion === null"
        block>Confirmar</q-btn>
    </div>
    <div v-else class="col-12">
      <div v-if="acertou" class="col-12 text-center">
        <div class="col-12 text-center" style="display: flex; align-items: center; justify-content: center;">
          <q-icon color="amber" size="2.1em" name="emoji_events" />
          <span class="sub-title text-bolder">Parabéns, você acertou!</span>
        </div>
        <p>Sua resposta foi:</p>
        <div class="col-12 bg-green text-center" style="display: flex; align-items: center; justify-content: center;">
          <q-icon color="white" size="2.1em" name="check_circle" />
          <span class="resposta text-bolder">{{ correctOption.Resposta }}</span>
        </div>
      </div>
      <div v-else class="col-12 text-center">
        <div class="col-12 text-center" style="display: flex; align-items: center; justify-content: center;">
          <q-icon color="red" size="2.1em" name="heart_broken" />
          <span class="sub-title text-bolder">Continue tentando!</span>
        </div>
        <p>Sua resposta foi:</p>
        <div class="col-12 bg-red text-center" style="display: flex; align-items: center; justify-content: center;">
          <q-icon color="white" size="2.1em" name="cancel" />
          <span class="resposta text-bolder">{{ selectedQuestion.Resposta }}</span>
        </div>
        <p>A resposta correta é: </p>
        <div class="col-12 bg-green text-center" style="display: flex; align-items: center; justify-content: center;">
          <q-icon color="white" size="2.1em" name="check_circle" />
          <span class="resposta text-bolder">{{ correctOption.Resposta }}</span>
        </div>
      </div>
      <div class="col-12 q-mt-md">
        <q-btn text-color="black" class="full-width q-mb-xs" color="amber" @click.stop="nextQuestion()">Continuar</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestaoPalavra',
  props: {
    currentQuestion: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      btnIsConfirm: false,
      selectedQuestion: null,
      selectedButtonIndex: null,
      acertou: false,
    };
  },
  methods: {
    getCorrectOption() {
      const respostaCorreta = this.currentQuestion.Alternativas.find(resposta => resposta.IsCorrect === true);
      return respostaCorreta;
    },
    selectAwnser(option, index) {
      this.selectedQuestion = option;
      this.selectedButtonIndex = index;
    },
    checkAwnser() {
      this.btnIsConfirm = true;
      this.acertou = this.selectedQuestion.IsCorrect;
      this.playSound(this.acertou);
    },
    nextQuestion() {
      this.btnIsConfirm = false;
      this.selectedQuestion = null;
      this.selectedButtonIndex = null;
      this.$emit('continuar-quiz', this.acertou);
      this.acertou = false;
    },
    playSound(acertou) {
      if (this.acertou) {
        const audio = new Audio(require(`@/assets/sounds/success.mp3`));
        audio.play();
      } else {
        const audio = new Audio(require(`@/assets/sounds/negative.mp3`));
        audio.play();
      }
    }
  },
  computed: {
    correctOption() {
      return this.getCorrectOption();
    },
    shuffledOptions() {
      const question = this.currentQuestion.Alternativas;
      return question.sort(() => Math.random() - 0.5);
    }
  }
}
</script>
<style scoped>
</style>
