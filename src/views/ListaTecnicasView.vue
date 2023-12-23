<template>
  <v-container v-if="!finalizado" class="h-screen">
    <v-col cols="6" class="text-center">
      <v-img width="100" :aspect-ratio="1" :src="getLogoPath()" Default></v-img>
    </v-col>
    <v-col cols="6" class="text-center">
      <v-img width="100" :aspect-ratio="1" :src="getLogoPath2()" Default></v-img>
    </v-col>
    <v-col cols="12">
      <span>Ainda estamos trabalhando nisso. Em breve teremos essa página pronta.</span>
      <v-img width="100" :aspect-ratio="1" :src="getImagePath()" cover></v-img>
    </v-col>
    <v-col cols="12">
        <v-btn class="btn btn-bushi mb-3" to="/quiz-posturas" block>Treinar Técnicas</v-btn>
        <v-btn class="btn btn-black" to="/" block>Voltar para início</v-btn>
      </v-col>
  </v-container>
</template>

<script>

export default {
  name: 'ListaTecnicas',
  components: {
  },
  methods: {
    getImagePath() {
      return require(`@/assets/images/errou.png`);
    },
    getLogoPath() {
      return require(`@/assets/images/logo.png`);
    },
    getLogoPath2() {
      return require(`@/assets/images/logo2.png`);
    },
  }
}
</script>
<style scoped></style>
