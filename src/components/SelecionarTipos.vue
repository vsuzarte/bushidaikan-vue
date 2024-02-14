<template>
  <div class="row">
    <div class="col-12 text-center">
      <span class="text-bold sub-title">O que deseja praticar ?</span>
    </div>
    <div v-for="tipo in tipos" :key="tipo.Id" class="col-12 text-bolder text-center">
      <q-checkbox color="black" v-model="selecionados" :val="tipo.Tipo" :label="tipo.Nome" />
    </div>
    <div class="col-12 text-center">
      <span class="text-bold sub-title">Quantas perguntas ?</span>
    </div>
    <div class="col-12 col-lg-7 text-center q-mb-xs">
      <q-btn text-color="black" class="full-width" @click="selecionarQuantidade(5)" dense :color="quantidade === 5 ? 'secondary' : 'amber'"  label="5" />
    </div>
    <div class="col-12 col-lg-7 text-center q-mb-xs">
      <q-btn text-color="black" class="full-width" @click="selecionarQuantidade(10)" dense :color="quantidade === 10 ? 'secondary' : 'amber'"  label="10" />
    </div>
    <div class="col-12 col-lg-7 text-center q-mb-xs">
      <q-btn text-color="black" class="full-width"  @click="selecionarQuantidade(20)"  dense :color="quantidade > 10 ? 'secondary' : 'amber'"  label="Todas" />
    </div>
    <div class="col-12 col-lg-7 text-center q-mt-sm">
      <q-btn text-color="black" class="full-width"  @click.stop="iniciarQuiz()" dense color="amber" label="Iniciar Quiz" />
    </div>
  </div>
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
      if (this.selecionados.length > 0) {
        this.$emit('iniciar-quiz', this.selecionados, this.quantidade);
      }
    },
    selecionarQuantidade(quantidade) {
      this.quantidade = quantidade;
    }
  }
}
</script>
<style scoped></style>
