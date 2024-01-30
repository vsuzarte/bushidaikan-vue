import { defineStore } from 'pinia';

export const usePalavrasStore = defineStore('palavras', {
  state: () => ({
    palavras: [],
  }),

  actions: {
    carregarPalavras() {
        this.palavras = require(`@/resources/vocabularios.json`);
    },

    filtrarPalavraOuTraducao(palavra) {
      const filtradas = this.palavras.filter((item) => item.Palavra.toLowerCase().includes(palavra.toLowerCase()) || 
                                                       item.Traducao.toLowerCase().includes(palavra.toLowerCase()));
      return filtradas;
    },
  },
});