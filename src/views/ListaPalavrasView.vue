<template>
  <div class="q-pa-md">
    <q-header bordered>
      <q-toolbar class="bg-dark">
        <q-toolbar-title class="text-center">
          <q-btn round color="amber" to="/" text-color="black" icon="home" />
        </q-toolbar-title>
        <q-input color="yellow" dark filled v-model="palavra" label="Buscar">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="nomePustura = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>
    <div class="row q-col-gutter-none justify-center q-mb-xs">
      <div class="col-12 text-center text-bold sub-title">--- Vocabulário ---</div>
    </div>
    <div v-for="palavra in palavras" :key="palavra.Id" class="row q-col-gutter-none justify-center q-mb-sm">
      <div class="col-12">
        <q-chip color="white" size="lg">
          <q-avatar><img :src="getJapaoPath"></q-avatar>
          {{ palavra.Palavra }}
        </q-chip>
      </div>
      <div class="col-12 div-border">
        <q-chip color="white" size="md">
          <q-avatar><img :src="getBrasilPath"></q-avatar>
          {{ palavra.Traducao }}
        </q-chip>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { usePalavrasStore } from '@/stores/palavrasStore.js';

export default {
  name: 'ListaPalavras',
  components: {
  },
  data() {
    return {
      palavra: '',
    }
  },
  setup() {
    const palavrasStore = usePalavrasStore();
    const palavras = ref([]);

    onMounted(() => {
      palavrasStore.carregarPalavras();
      palavras.value = palavrasStore.palavras;
    });

    return {
      palavrasStore,
      palavras
    };
  },
  methods: {
    limparFiltros() {
      this.palavra = '';
    },
    getImagePath() {
      return require(`@/assets/images/logo.png`);
    },
  },
  computed: {
    getBrasilPath() {
      return require(`@/assets/images/brasil.png`);
    },
    getJapaoPath() {
      return require(`@/assets/images/japao.png`);
    },
  },
  watch: {
    palavra(newSelect) {
      this.palavras = this.palavrasStore.filtrarPalavraOuTraducao(newSelect);
    },
  },
}

</script>
<style scoped>
.div-border{
  border-bottom: 2px solid #FBC920;
}
</style>
