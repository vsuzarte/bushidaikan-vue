import { defineStore } from 'pinia';

export const usePosturasStore = defineStore('posturas', {
  state: () => ({
    posturas: [],
    selecionados: [],
  }),

  actions: {
    carregarPosturas() {
        this.posturas = require(`@/resources/posturas.json`);
    },

    getPosturaPorId(id) {
      return this.posturas.find((postura) => postura.Id === id);
    },

    getPosturasPorTipo(tipo) {
      return this.posturas.filter((postura) => postura.Tipo === tipo);
    },

    getPosturasPorTipos(tipos) {
      return this.posturas.filter((postura) => tipos.includes(postura.Tipo));
    },

    adicionarSelecionados(selecionados){
      this.selecionados = selecionados;
    },

    limparSelecionados(){
      this.selecionados  = [];
    }
  },
});