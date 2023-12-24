<template>
  <div>
    <v-row no-gutters>
      <v-col class="text-center" cols="12">
        <h2> {{ correctOption.posturaBR }} </h2>
      </v-col>
      <v-col cols="12" class="mb-3 col-center">
        <v-img class="img-postura" width="300" :aspect-ratio="1" :src="getImagePath()" Default></v-img>
      </v-col>
    </v-row>
    <v-row no-gutters v-if="!btnIsConfirm">
      <v-col cols="12">
        <v-btn size="small" v-for="(option, index) in shuffledOptions" :key="index" :disabled="btnIsConfirm"
          @click.stop="selectAwnser(option, index)" class="btn btn-bushi mb-3"
          :class="{ 'btn-green': index === selectedButtonIndex }" block>
          {{ option.nome }}
        </v-btn>
        <v-btn size="small" class="btn btn-blue" @click.stop="checkAwnser()" :disabled="selectedQuestion === null"
          block>Confirmar</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters v-else>
      <v-col v-if="acertou" cols="12">
        <v-col cols="12" class="resposta">

          <h3>Você acertou! Parabéns. </h3>
          <h3>Sua resposta foi: </h3>
          <v-btn size="small" class="btn btn-green" block>{{ correctOption.nome }}</v-btn>
        </v-col>
      </v-col>
      <v-col v-else cols="12" class="resposta">
        <h3>Você errou mas continue tentando!!!</h3>
        <h3>Sua resposta foi: </h3>
        <v-btn size="small" class="btn btn-red" block>{{ selectedQuestion.nome }}</v-btn>
        <h3>A resposta correta é: </h3>
        <v-btn size="small" class="btn btn-green mb-3" block>{{ correctOption.nome }}</v-btn>
      </v-col>
      <v-col>
        <v-btn size="small" class="btn btn-bushi" @click.stop="nextQuestion()" block>Continuar</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'QuestaoPostura',
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
    getImagePath() {
      const imagem = this.getCorrectOption().imagem;
      return require(`../assets/images/Posturas/${imagem}`);
    },
    getImageErroPath() {
      return require(`@/assets/images/errou.png`);
    },
    getCorrectOption() {
      const posturaCorreta = this.currentQuestion.find(postura => postura.isCorrect === true);
      return posturaCorreta;
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
      const question = this.currentQuestion;
      return question.sort(() => Math.random() - 0.5);
    }
  }
}
</script>

<style scoped>
.resposta {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-postura {
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, #FBC920, black);
  border-image-slice: 1;
  background-color: #FBC920;
}
</style>
