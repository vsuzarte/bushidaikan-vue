import { defineStore } from 'pinia';

export const useQuizPosturasStore = defineStore('quizPosturas', {
  state: () => ({
    questions: [],
    currentQuestion: [],
  }),

  actions: {
    adicionarSelecionados(selecionados){
      this.selecionados = selecionados;
    },

    limparSelecionados(){
      this.selecionados  = [];
    }
  },
});