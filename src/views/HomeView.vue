<template>
  <div class="q-pa-md ">
    <div class="row q-col-gutter-none justify-center">
      <div class="col-12 text-center">
        <span class="text-bold title">OKINAWA SHORIN-RYU</span>
      </div>
      <div class="col-12 text-center text-bold">
        <span class="text-bold title">KARATÊ-DO BUSHIDAIKAN</span>
      </div>
      <div class="col-12 text-center">
        <q-img
          :src="getImagePath()"
          :ratio="1"
          width="60%"
        />
      </div>
      <div class="col-12 text-center">
        <span class="sub-title text-bold ">Karate-Do de</span>
      </div>
      <div class="col-12 text-center">
        <span class="sub-title text-bold ">OKINAWA SHORIN-RYU</span>
      </div>
      <div class="col-12 text-center text-bold">
        <p class="text-bold">Manual Auxiliar de Treino</p>
      </div>
      <div class="col-12 q-mb-sm">
        <q-btn color="amber" text-color="black" class="full-width" to="/quiz-posturas" block>Treinar Técnicas</q-btn>
      </div>
      <div class="col-12 q-mb-sm">
        <q-btn color="black" class="full-width" to="/lista-tecnicas" block>Lista de Técnicas</q-btn>
      </div>
      <div class="col-12 q-mb-sm">
        <q-btn color="amber" text-color="black" class="full-width" to="/quiz-palavras" block>Treinar Vocabulário</q-btn>
      </div>
      <div class="col-12 q-mb-sm">
        <q-btn color="black" class="full-width" to="/lista-palavras" block>Lista de Vacabulários</q-btn>
      </div>
      <div class="col-12 q-mb-sm">
        <q-btn color="amber" text-color="black" class="full-width" to="/" block>Treinar Conhecimentos gerais</q-btn>
      </div>
      <div class="col-12 text-center items-center footer-home">
        <p class="text-bold q-mt-sm">Renshi</p>
        <p class="text-bold">Maycon H. Sichelschimidt</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
  },
  methods: {
    getImagePath() {
      return require(`@/assets/images/logo.png`);
    },
  }
}
</script>
<style scoped>
</style>
