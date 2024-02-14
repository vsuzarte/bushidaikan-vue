import { defineStore } from 'pinia';

export const useTecnicasStore = defineStore('tecnicas', {
  state: () => ({
    tecnicas: [],
    tiposTecnicas: [],
    selecionados: [],
  }),

  actions: {
    carregarTecnicas() {
        this.tecnicas = require(`@/resources/tecnicas.json`);
    },

    getTecnicasPorTipo(tipo) {
      return this.tecnicas.filter((tecnica) => tecnica.Tipo === tipo);
    },

    getTecnicasPorNome(nome) {
      const filtradas = this.tecnicas.filter((tecnica) =>tecnica.Nome.toLowerCase().includes(nome.toLowerCase()));
      if(filtradas.length <= 0){
        return this.tecnicas;
      }
      return filtradas;
    },

    pesquisarTecnicas(nome) {
      if (!Array.isArray(this.tecnicas) || !nome || typeof nome !== 'string') {
          return this.tecnicas;
      }
  
      const pesquisa = nome.toLowerCase();
      const filtradas = this.tecnicas.filter(item =>
          (item.Nome && item.Nome.toLowerCase().includes(pesquisa)) ||
          (item.TecnicaBR && item.TecnicaBR.toLowerCase().includes(pesquisa)) ||
          (item.TecnicaJP && item.TecnicaJP.toLowerCase().includes(pesquisa)) ||
          (item.Tipo && item.Tipo.toLowerCase().includes(pesquisa))
      );

      if(filtradas.length <= 0){
        return this.tecnicas;
      }
  
      return filtradas;
    },

    getTecnicasPorTipos(tipos) {
      if(tipos.length <= 0){
        return this.tecnicas;
      }
      return this.tecnicas.filter((tecnica) => tipos.includes(tecnica.Tipo));
    },

    filterAll(tipos, nome) {
      if(tipos.length <= 0 || nome.length <= 0){
        return this.tecnicas;
      }
      return this.tecnicas.filter((tecnica) => tipos.includes(tecnica.Tipo) || tecnica.Nome && tecnica.Nome.toLowerCase().includes(nome));
    },

    adicionarSelecionados(selecionados){
      this.selecionados = selecionados;
    },

    getTiposDeTecnicas(tecnicas){
      const valoresUnicos = new Set();
      tecnicas.forEach(tecnica => {
        valoresUnicos.add(tecnica.Tipo);
      });

      return [...valoresUnicos];
    },

    limparSelecionados(){
      this.selecionados  = [];
    }
  },
});