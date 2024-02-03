import { defineStore } from 'pinia';

export const useTecnicasStore = defineStore('tenicas', {
  state: () => ({
    tenicas: [],
    tiposTecnicas: [],
    selecionados: [],
  }),

  actions: {
    carregarTecnicas() {
        this.tenicas = require(`@/resources/tenicas.json`);
    },

    getTecnicasPorTipo(tipo) {
      return this.tenicas.filter((tenica) => tenica.Tipo === tipo);
    },

    getTecnicasPorNome(nome) {
      const filtradas = this.tenicas.filter((tenica) =>tenica.Nome.toLowerCase().includes(nome.toLowerCase()));
      if(filtradas.length <= 0){
        return this.tenicas;
      }
      return filtradas;
    },

    pesquisarTecnicas(nome) {
      if (!Array.isArray(this.tenicas) || !nome || typeof nome !== 'string') {
          return this.tenicas;
      }
  
      const pesquisa = nome.toLowerCase();
      const filtradas = this.tenicas.filter(item =>
          (item.Nome && item.Nome.toLowerCase().includes(pesquisa)) ||
          (item.TecnicaBR && item.TecnicaBR.toLowerCase().includes(pesquisa)) ||
          (item.TecnicaJP && item.TecnicaJP.toLowerCase().includes(pesquisa)) ||
          (item.Tipo && item.Tipo.toLowerCase().includes(pesquisa))
      );

      if(filtradas.length <= 0){
        return this.tenicas;
      }
  
      return filtradas;
    },

    getTecnicasPorTipos(tipos) {
      if(tipos.length <= 0){
        return this.tenicas;
      }
      return this.tenicas.filter((tenica) => tipos.includes(tenica.Tipo));
    },

    adicionarSelecionados(selecionados){
      this.selecionados = selecionados;
    },

    getTiposDeTecnicas(tenicas){
      const valoresUnicos = new Set();
      tenicas.forEach(tenica => {
        valoresUnicos.add(tenica.Tipo);
      });

      return [...valoresUnicos];
    },

    limparSelecionados(){
      this.selecionados  = [];
    }
  },
});