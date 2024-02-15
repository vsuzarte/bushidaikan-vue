<template>
  <q-layout>
    <header-with-logos titulo="Bushidaikan"></header-with-logos>
    <q-page-container class="q-page-container-custom">
      <div class="row">
        <div class="col-12 text-center">
          <span class="text-bold title">OKINAWA SHORIN-RYU</span>
        </div>
        <div class="col-12 text-center text-bold">
          <span class="text-bold title">KARATÊ-DO BUSHIDAIKAN</span>
        </div>
        <div class="col-12 text-center">
          <q-img :src="getImagePath()" :ratio="1" class="imagem"/>
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
          <q-btn color="amber" text-color="black" class="full-width" to="/quiz-tecnicas" block>Treinar Técnicas</q-btn>
        </div>
        <div class="col-12 q-mb-sm">
          <q-btn color="black" class="full-width" to="/lista-tecnicas" block>Lista de Técnicas</q-btn>
        </div>
        <div class="col-12 q-mb-sm">
          <q-btn color="amber" text-color="black" class="full-width" to="/quiz-palavras" block>Treinar Vocabulário</q-btn>
        </div>
        <div class="col-12 q-mb-sm">
          <q-btn color="black" class="full-width" to="/lista-palavras" block>Vacabulário</q-btn>
        </div>
        <div class="col-12">
          <q-btn color="amber" text-color="black" class="full-width" to="/quiz-gerais" block>Treinar Conhecimentos
            gerais</q-btn>
        </div>
      </div>
    </q-page-container>
    <q-footer elevated class="bg-amber text-black">
      <div class="col-12 text-center items-center">
        <p class="text-bold q-mt-sm">Renshi</p>
        <p class="text-bold">Maycon H. Sichelschimidt</p>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import HeaderWithLogos from '@/components/HeaderWithLogos.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderWithLogos
  },
  methods: {
    getImagePath() {
      return require(`@/assets/images/logo.png`);
    },
    getLogoPath2() {
      return require(`@/assets/images/logo2.png`);
    },
  }
}
</script>
<style scoped>
.imagem {
  width: 30%;
}

@media (min-width: 1000px) {
  .imagem {
    width: 20%;
  }
}

@media (max-width: 600px) {
  .imagem {
    width: 40%;
  }
}
</style>
