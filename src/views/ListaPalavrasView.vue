<template>
  <q-layout view="hHh lpR fFf">
    <header-with-logos titulo="Vocabulário"></header-with-logos>
    <q-page-container>
      <div class="row justify-center">
        <div class="col-12 q-pa-xs q-mb-md div-border" v-for="palavra in palavras" :key="palavra.Id">
          <div class="chip">
            <div class="palavra">
              <q-avatar><img :src="getJapaoPath"></q-avatar>
              {{ palavra.Palavra }}
            </div>
              <q-btn @click.stop="getAudioPath(palavra)" label="Ouvir"  color="primary" flat  icon="volume_up" />
          </div>
          <div class="chip">
            <p><q-avatar size="md"><img :src="getBrasilPath"></q-avatar> {{ palavra.Traducao }}</p>
          </div>
        </div>
      </div>
    </q-page-container>

    <q-footer class="bg-white text-black text-center items-center">
      <div class="row justify-center">
        <div class="col-10 q-pa-sm">
          <q-input filled v-model="palavra" label="Buscar">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon name="close" @click="palavra = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
        <div class="col-6">
          <q-btn color="primary" @click="scrollToTop" text-color="black" icon="arrow_upward" label="Inicio" />
        </div>
        <div class="col-6">
          <q-btn color="secondary" to="/" text-color="black" icon="arrow_back" label="Voltar" />
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { onMounted, ref } from 'vue';
import { usePalavrasStore } from '@/stores/palavrasStore.js';
import HeaderWithLogos from '@/components/HeaderWithLogos.vue';

export default {
  name: 'ListaPalavras',
  components: { HeaderWithLogos },
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
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rola suavemente para o topo
      });
    },
    getAudioPath(palavra) {
      const palavraAudio = palavra.Audio;
      const audio = new Audio(require(`@/assets/sounds/palavras/${palavraAudio}`));
      audio.play();
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
.div-border {
  border-bottom: 2px solid #FBC920;
}

.chip {
  display: flex;
  justify-content: flex-start;
}

.palavra{
  font-size: 20px;
}
</style>
