<template>
  <div class="row q-col-gutter-none justify-center">
    <div class="col-12 text-center">
      <span class="text-bold sub-title">Quantas perguntas ?</span>
    </div>
    <div class="col-4 text-center">
      <q-btn text-color="black" class="full-width" @click="selecionarQuantidade(5)" dense :color="quantidade === 5 ? 'secondary' : 'amber'"  label="5" />
    </div>
    <div class="col-4 text-center">
      <q-btn text-color="black" class="full-width" @click="selecionarQuantidade(10)" dense :color="quantidade === 10 ? 'secondary' : 'amber'"  label="10" />
    </div>
    <div class="col-4 text-center">
      <q-btn text-color="black" class="full-width"  @click="selecionarQuantidade(30)"  dense :color="quantidade === 30 ? 'secondary' : 'amber'"  label="Todas" />
    </div>
    <div class="col-12 text-center q-mt-xl">
      <q-btn text-color="black" class="full-width"  @click.stop="iniciarQuiz()" dense color="amber" label="Iniciar Quiz" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'SelecionarQuantidadeGerais',
  data() {
    return {
      quantidade: 5,
    }
  },
  methods: {
    iniciarQuiz() {
      this.$emit('iniciar-quiz', this.quantidade);
    },
    selecionarQuantidade(quantidade) {
      this.quantidade = quantidade;
    }
  }
}
</script>
<style scoped></style>
