<template>
  <v-container>
    <v-row>
      <v-col class="text-center" cols="12">
        <p class="with-gradient"><v-icon icon="mdi-karate"></v-icon> {{ correctOption.posturaBR }} <v-icon icon="mdi-karate"></v-icon></p>
      </v-col>
      <v-col cols="12">
        <v-img width="300" :aspect-ratio="1" :src="getImagePath()" Default></v-img>
      </v-col>
    </v-row>
    <v-row v-if="!btnIsConfirm">
      <v-col cols="12">
        <v-btn v-for="(option, index) in shuffledOptions" :key="index" :disabled="btnIsConfirm"
          @click.stop="selectAwnser(option, index)" class="btn btn-bushi mb-3"
          :class="{ 'btn-blue': index === selectedButtonIndex }" block>
          {{ option.nome }}
        </v-btn>
        <v-btn class="btn btn-green" @click.stop="checkAwnser()" block>Confirmar</v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-if="acertou" cols="12">
        <v-col cols="12">
          <span class="mb-2 text-center">Você acertou! Parabéns. </span>
          <span class="mb-2 text-center">Sua resposta foi: </span>
          <v-btn class="btn btn-green" block>{{ correctOption.nome }}</v-btn>
        </v-col>
      </v-col>
      <v-col v-else cols="12">
        <span class="mb-2">Você errou, sua resposta foi: </span>
        <v-btn class="btn btn-red mb-2" block>{{ selectedQuestion.nome }}</v-btn>
        <span class="mb-2">A resposta correta é: </span>
        <v-btn class="btn btn-green" block>{{ correctOption.nome }}</v-btn>
      </v-col>
      <v-col>
        <v-btn class="btn btn-bushi" @click.stop="nextQuestion()" block>Continuar</v-btn>
      </v-col>
    </v-row>
  </v-container>
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
      console.log('Selected', this.selectedQuestion, this.selectedQuestion.isCorrect);
    },
    checkAwnser() {
      this.btnIsConfirm = true;
      console.log(this.selectedQuestion);
      this.acertou = this.selectedQuestion.isCorrect;
    },
    nextQuestion() {
      this.btnIsConfirm = false;
      this.selectedQuestion = null;
      this.selectedButtonIndex = null;
      this.$emit('continuar-quiz', this.acertou);
      this.acertou = false;
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

span{
  font-weight: 600;
}
</style>
