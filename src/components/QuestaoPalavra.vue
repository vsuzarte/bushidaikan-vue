<template>
  <div class="row">
    <div class="col-12 text-center text-bold sub-title q-mb-md">
      {{ correctOption.palavra }} 
      <q-btn @click.stop="getAudioPath(correctOption.audio)" label="Ouvir"  color="primary" flat  icon="volume_up" /></div>
    <div v-if="!btnIsConfirm" class="col-12">
      <q-btn v-for="(option, index) in shuffledOptions" :key="index" :disabled="btnIsConfirm" class="full-width q-mb-xs"
        :color="index === selectedButtonIndex ? 'secondary' : 'amber'" text-color="black"
        @click.stop="selectAwnser(option, index)">
        {{ option.traducao }}
      </q-btn>
      <q-btn class="full-width" color="primary" @click.stop="checkAwnser()" :disabled="selectedQuestion === null"
        block>Confirmar</q-btn>
    </div>
    <div v-else class="col-12">
      <resposta :acertou="acertou" :respostaCorreta="correctOption.traducao" :respostaErrada="selectedQuestion.traducao"></resposta>
      <div class="col-12 q-mt-md">
        <q-btn text-color="black" class="full-width q-mb-xs" color="amber" @click.stop="nextQuestion()">Continuar</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Resposta from './Resposta.vue';

export default {
    name: 'QuestaoPalavra',
    props: {
        currentQuestion: {
            type: Array,
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
            const palavraCorreta = this.currentQuestion.find(palavra => palavra.isCorrect === true);
            return palavraCorreta;
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
        playSound(acertou) {
            if (this.acertou) {
                const audio = new Audio(require(`@/assets/sounds/success.mp3`));
                audio.play();
            }
            else {
                const audio = new Audio(require(`@/assets/sounds/negative.mp3`));
                audio.play();
            }
        },
        getAudioPath(audio) {
            const audioplay = new Audio(require(`@/assets/sounds/palavras/${audio}`));
            audioplay.play();
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
    components: { Resposta }
}
</script>
<style scoped>
</style>
