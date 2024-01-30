import { defineStore } from 'pinia';

export const useGeraisStore = defineStore('gerais', {
  state: () => ({
    perguntas: [],
  }),

  actions: {
    carregarPerguntas() {
        this.perguntas = require(`@/resources/gerais.json`);
    },
  },
});