<template>
    <div class="row q-col-gutter-none justify-center">
          <div class="col-12 text-center">
            <span class="sub-title">OKINAWA SHORIN-RYU</span>
          </div>
          <div class="col-12 text-center">
            <span class="sub-title">KARATÊ-DO BUSHIDAIKAN</span>
          </div>
          <div v-if="score > 0" class="col-12 text-center">
            <div class="col-12">
              <q-img class="col-12 imagem" :aspect-ratio="1" :src="getTrofeuPath"></q-img>
            </div>
            <div class="col-12">
              <p>Você acertou o total de</p>
            </div>
            <div class="col-12 text-center bg-amber">
              <span class="sub-title">{{ score }} de {{ score + erros }}</span>
            </div>
          </div>
          <div v-else class="col-12 text-center">
            <div class="col-12">
              <q-img class="col-12 imagem" :aspect-ratio="1" :src="getSocoPath"></q-img>
            </div>
            <div class="col-12">
              <p>Infelizmente você não pontuou</p>
            </div>
          </div>
          <div class="col-12 text-center">
            <p>Continue estudando para aumentar seu conhecimento!</p>
          </div>
          <div class="col-12 col-lg-7 q-mb-sm">
            <q-btn color="negative" text-color="white" class="full-width" to="/" block>Voltar ao ínicio</q-btn>
          </div>
          <div class="col-12 col-lg-7 q-mb-sm">
            <q-btn color="amber" text-color="black" class="full-width" @click.stop="reiniciar()" block>Treinar
              novamente</q-btn>
          </div>
        </div>
</template>

<script>


export default {
  name: 'Placar',
  props: {
    score: {
        type: Number,
        required: true, 
    },
    erros: {
        type: Number,
        required: true, 
    }
  },
  methods: {
    reiniciar() {
        this.$emit('reiniciar-quiz');
    },
  },
  computed: {
    getSocoPath() {
      return require(`@/assets/images/punho.png`);
    },
    getTrofeuPath() {
      return require(`@/assets/images/trofeu.png`);
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
