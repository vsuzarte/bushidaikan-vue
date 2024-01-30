<template>
  <div class="row q-col-gutter-none">
      <div class="col-12 text-center text-bold sub-title q-mb-md">{{ correctOption.posturaBR }}</div>
      <div class="col-12 text-center">
        <img width="100%" :src="getImagePath()" style="border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); border: 2px solid #FBC920;">
      </div>
      <div v-if="!btnIsConfirm" class="col-12">
        <q-btn  v-for="(option, index) in shuffledOptions" :key="index" :disabled="btnIsConfirm"
          class="full-width q-mb-xs" :color="index === selectedButtonIndex ? 'secondary' : 'amber'"
          text-color="black"
          @click.stop="selectAwnser(option, index)">
          {{ option.nome }}
        </q-btn>
        <q-btn class="full-width" color="primary" @click.stop="checkAwnser()" :disabled="selectedQuestion === null"
          block>Confirmar</q-btn>
      </div>
      <div v-else class="col-12">
        <div v-if="acertou" class="col-12 text-center">
          <q-chip color="white" size="xl">
                <q-icon color="amber"  name="emoji_events" />
                Parabéns, você acertou!
          </q-chip>
          <p>Sua resposta foi:</p>
          <q-chip color="green" size="lg">
                <q-icon color="white" size="1em"  name="check_circle" />
                {{ correctOption.nome }}
          </q-chip>
        </div>
        <div v-else class="col-12 text-center">
          <q-chip color="white" size="xl">
                <q-icon color="red"  name="heart_broken" />
                Continue tentando!
          </q-chip>
          <p>Sua resposta foi:</p>
          <q-chip color="red" size="lg">
                <q-icon color="white" size="1em"  name="cancel" />
                {{ selectedQuestion.nome }}
          </q-chip>
          <p>A resposta correta é: </p>
          <q-chip color="green" size="lg">
                <q-icon color="white" size="1em"  name="check_circle" />
                {{ correctOption.nome }}
          </q-chip>
        </div>
        <div class="col-12 q-mt-md">
          <q-btn text-color="black" class="full-width q-mb-xs" color="amber" @click.stop="nextQuestion()">Continuar</q-btn>
        </div>
      </div>
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
</style>
