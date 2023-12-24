<template>
    <v-row no-gutters>
      <v-col cols="12" class="col-center">
        <v-btn size="small" class="btn btn-bushi mb-5" to="/quiz-posturas" block>Treinar Técnicas</v-btn>
      </v-col>
      <v-col cols="12" class="col-center">
        <v-btn size="small" class="btn btn-black mb-5" to="/quiz-palavras" block>Treinar Vocabulário</v-btn>
      </v-col>
      <v-col cols="12" class="col-center">
        <v-btn size="small" class="btn btn-bushi mb-5" to="/quiz-palavras" block>Lista de Técnicas</v-btn>
      </v-col>
    </v-row>
</template>

<script>
export default {
  name: 'MenuPrincipal',
}
</script>

<style>

</style>
