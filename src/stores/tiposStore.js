import { defineStore } from 'pinia';

export const useTiposStore = defineStore('tipos', {
  state: () => ({
    tipos: [],
    selecionados: [],
  }),

  actions: {
    carregarTipos() {
      try {
        this.tipos = require(`@/resources/tipos.json`);
      } catch (error) {
        console.error('Erro ao carregar tipos:', error);
      }
    },

    getPorTipos(tipos) {
      if(tipos.length <= 0){
        return this.tipos;
      }
      return this.tipos.filter((tipo) => tipos.includes(tipo.Tipo));
    },

    

  },
});