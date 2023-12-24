<template>
  <v-container class="h-screen">
    <v-row no-gutters>
      <v-col cols="12" class="col-center text-center">
        <h2>OKINAWA SHORIN-RYU</h2>
        <h2>KARATÊ-DO BUSHIDAIKAN</h2>
      </v-col>
      <v-col cols="12" class="col-center">
        <v-img width="150" :aspect-ratio="1" :src="getImagePath()" cover></v-img>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" class="col-center">
        <h2 class="mb-1">Karate-Do de</h2>
        <h1 class="mb-1">OKINAWA</h1>
        <h2 class="mb-5">Manual Auxiliar de Treino</h2>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <menu-principal />
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="col-center bg-bushi">
        <h3>Renshi</h3>
        <h3>Maycon H. Sichelschimidt</h3>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="col-center">
        <p>Beta-0.1.0</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MenuPrincipal from '../components/MenuPrincipal.vue';

export default {
  name: 'HomeView',
  components: {
    MenuPrincipal
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
