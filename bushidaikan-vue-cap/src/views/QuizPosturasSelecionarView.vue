<template>
  <v-container class="h-screen bg-padrao">
    <v-row no-gutters>
      <v-col align="left" cols="12">
        <v-btn
          size="x-medium"
          class="btn btn-bushi"
          to="/"
          prepend-icon="mdi-arrow-left"
        >Voltar</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <v-checkbox label="Checkbox"></v-checkbox>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'QuizPosturasSelecionar',
  components: {
  },
  methods: {
    
  }
}
</script>
<style scoped>
</style>
