<template>
  <v-container class="h-screen bg-padrao">
    <v-row no-gutters>
      <v-col cols="12">
        <v-img width="300" :aspect-ratio="1" :src="getImagePath()"
          cover></v-img>
      </v-col>
      <v-col class="text-center" cols="12">
        <h2 class="mb-5">Karate-Do Bushidaikan</h2>
      </v-col>
    </v-row>
    <v-row no-gutters>
        <menu-principal/>
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
