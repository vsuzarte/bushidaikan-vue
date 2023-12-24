<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" align="left">
        <v-btn size="small" class="btn btn-bushi mb-4" to="/" prepend-icon="mdi-arrow-left">SAIR</v-btn>
      </v-col>
      <v-col cols="12" class="col-center">
        <h3>O que deseja praticar ?</h3>
      </v-col>
    </v-row>
    <v-row no-gutters >
      <v-col class="col-checkbox" cols="12" v-for="tipo in tipos" :key="tipo.Id">
        <v-checkbox color="orange" v-model="selecionados" :label="tipo.Nome" hide-details :value="tipo.Tipo"></v-checkbox>
      </v-col>
      <v-col cols="12">
        <hr>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="col-center mb-3">
        <h3>A quantidade de perguntas ?</h3>
      </v-col>
      <v-col cols="4" class="col-center">
        <v-btn size="small" @click="selecionarQuantidade(5)" class="btn btn-bushi mb-2" :class="{ 'btn-green': quantidade === 5 }">5</v-btn>
      </v-col>
      <v-col cols="4" class="col-center">
        <v-btn size="small" @click="selecionarQuantidade(10)"  class="btn btn-bushi mb-2" :class="{ 'btn-green': quantidade === 10 }">10</v-btn>
      </v-col>
      <v-col cols="4" class="col-center">
        <v-btn size="small" @click="selecionarQuantidade(20)" class="btn btn-bushi mb-2" :class="{ 'btn-green': quantidade > 10 }">Todas</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="col-center">
        <v-btn size="small" @click.stop="iniciarQuiz()" class="btn btn-bushi" block>Iniciar Quiz</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'SelecionarTipos',
  props: {
    tipos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selecionados: [],
      quantidade: 5,
    }
  },
  methods: {
    iniciarQuiz() {
      if(this.selecionados.length > 0){
        this.$emit('iniciar-quiz', this.selecionados, this.quantidade);
      }
    },
    selecionarQuantidade(quantidade){
      this.quantidade = quantidade;
    }
  }
}
</script>

<style scoped>
.col-checkbox{
  color: black;
  height: 50px;
}

.v-checkbox .v-selection-control {
    min-height: 10px !important;
}
</style>
