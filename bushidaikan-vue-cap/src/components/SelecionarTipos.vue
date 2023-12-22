<template>
  <v-container>
    <v-row id="cabecalho" no-gutters>
      <v-col cols="6">
        <v-btn size="x-medium" class="btn btn-bushi mb-2" to="/" prepend-icon="mdi-arrow-left">Voltar</v-btn>
      </v-col>
      <v-col id="logo" cols="6">
        <v-avatar class="mb-2">
          <v-img :src="getImagePath()" alt="logo"></v-img>
        </v-avatar>
      </v-col>
      <v-col class="mb-2" cols="12">
        <hr>
      </v-col>
      <v-col cols="12">
        <h4>Selecione o deseja praticar.</h4>
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
    getImagePath() {
      return require(`@/assets/images/logo.png`);
    },
  }
}
</script>
<style scoped>
#cabecalho {
  display: flex;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
}

#logo {
  display: flex;
  justify-content: flex-end;
  justify-items: center;
  align-items: center;
}
</style>
