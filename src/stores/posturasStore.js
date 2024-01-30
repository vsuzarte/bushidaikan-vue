import { defineStore } from 'pinia';

export const usePosturasStore = defineStore('posturas', {
  state: () => ({
    posturas: [],
    tiposPosturas: [],
    selecionados: [],
  }),

  actions: {
    carregarPosturas() {
        this.posturas = require(`@/resources/posturas.json`);
    },

    getPosturasPorTipo(tipo) {
      return this.posturas.filter((postura) => postura.Tipo === tipo);
    },

    getPosturasPorNome(nome) {
      const filtradas = this.posturas.filter((postura) =>postura.Nome.toLowerCase().includes(nome.toLowerCase()));
      if(filtradas.length <= 0){
        return this.posturas;
      }
      return filtradas;
    },

    pesquisarPosturas(nome) {
      if (!Array.isArray(this.posturas) || !nome || typeof nome !== 'string') {
          return this.posturas;
      }
  
      const pesquisa = nome.toLowerCase();
      const filtradas = this.posturas.filter(item =>
          (item.Nome && item.Nome.toLowerCase().includes(pesquisa)) ||
          (item.PosturaBR && item.PosturaBR.toLowerCase().includes(pesquisa)) ||
          (item.PosturaJP && item.PosturaJP.toLowerCase().includes(pesquisa)) ||
          (item.Tipo && item.Tipo.toLowerCase().includes(pesquisa))
      );

      if(filtradas.length <= 0){
        return this.posturas;
      }
  
      return filtradas;
    },

    getPosturasPorTipos(tipos) {
      if(tipos.length <= 0){
        return this.posturas;
      }
      return this.posturas.filter((postura) => tipos.includes(postura.Tipo));
    },

    adicionarSelecionados(selecionados){
      this.selecionados = selecionados;
    },

    getTiposDePosturas(posturas){
      const valoresUnicos = new Set();
      posturas.forEach(postura => {
        valoresUnicos.add(postura.Tipo);
      });

      return [...valoresUnicos];
    },

    limparSelecionados(){
      this.selecionados  = [];
    }
  },
});