<template>
  <v-container class="h-screen bg-padrao">
    <v-row>
      <v-col cols="12">
        <v-btn size="x-medium" class="btn btn-bushi" to="/" prepend-icon="mdi-arrow-left">Voltar</v-btn>
      </v-col>
      <v-col class="text-center" cols="12">
        <h3>Selecione o deseja praticar.</h3>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" v-for="tipo in tipos" :key="tipo.Id">
        <v-checkbox v-model="selecionados" :label="tipo.Nome" hide-details :value="tipo.Tipo"></v-checkbox>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
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
    }
  },
  methods: {
    iniciarQuiz() {
      this.$emit('iniciar-quiz', this.selecionados);
    },
  }
}
</script>
