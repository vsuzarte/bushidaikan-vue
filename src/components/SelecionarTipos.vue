<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" class="col-center">
        <v-btn size="x-medium" class="btn btn-bushi mb-4" to="/" prepend-icon="mdi-arrow-left">Tela Inicial</v-btn>
      </v-col>
      <v-col cols="12">
        <hr>
      </v-col>
      <v-col cols="12" class="col-center">
        <h1>Selecione abaixo o deseja praticar.</h1>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" v-for="tipo in tipos" :key="tipo.Id">
        <v-checkbox color="orange" v-model="selecionados" :label="tipo.Nome" hide-details :value="tipo.Tipo"></v-checkbox>
      </v-col>
      <v-col cols="12">
        <hr>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="col-center">
        <h1>Selecione quantas perguntas deseja responder.</h1>
      </v-col>
      <v-col cols="4" class="col-center">
        <v-btn @click="selecionarQuantidade(5)" class="btn btn-bushi mb-2" :class="{ 'btn-green': quantidade === 5 }">5</v-btn>
      </v-col>
      <v-col cols="4" class="col-center">
        <v-btn @click="selecionarQuantidade(10)"  class="btn btn-bushi mb-2" :class="{ 'btn-green': quantidade === 10 }">10</v-btn>
      </v-col>
      <v-col cols="4" class="col-center">
        <v-btn @click="selecionarQuantidade(20)" class="btn btn-bushi mb-2" :class="{ 'btn-green': quantidade > 10 }">Todas</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="col-center">
        <v-btn @click.stop="iniciarQuiz()" class="btn btn-bushi" block>Iniciar Quiz</v-btn>
      </v-col>
    </v-row>
  </v-container>
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
      }else{
        console.log('Selecione ao menos 1 conteudo para estudo.')
      }
    },
    selecionarQuantidade(quantidade){
      this.quantidade = quantidade;
    }
  }
}
</script>
