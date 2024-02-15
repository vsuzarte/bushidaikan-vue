<template>
  <q-layout view="hHh lpR fFf">
    <header-with-logos titulo="Lista de técnicas"></header-with-logos>
    <q-page-container>
      <div v-for="tipoTecnica in tipoTecnicas" :key="tipoTecnica.Id"
        class="row q-col-gutter-none justify-center q-pa-md q-mb-sm">
        <div v-for="(tecnica, index) in getTecnicaTipo(tipoTecnica.Tipo)" :key="index"
          class="col-sm-6 col-md-6 col-lg-4 q-pa-sm">
          <q-card style="border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); border: 2px solid #FBC920;">
            <img class="imagem" :src="getImagePath(tecnica)">
            <q-card-section>
              <div class="col-12">
                <span class="sub-title">{{ tecnica.Nome }}</span>
              </div>
              <div class="col-12">
                <q-btn icon="volume_up" label="Ouvir" flat outline color="secondary" @click="getAudioPath(tecnica)"></q-btn>
              </div>
              <div class="col-12">
                <q-chip color="white" size="md">
                  <q-avatar><img :src="getJapaoPath"></q-avatar>
                  {{ tecnica.TecnicaJP }}
                </q-chip>
              </div>
              <div class="col-12">
                <q-chip color="white" size="md">
                  <q-avatar><img :src="getBrasilPath"></q-avatar>
                  {{ tecnica.TecnicaBR }}
                </q-chip>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page-container>
    <q-footer class="bg-white text-black text-center items-center">
      <div class="row justify-center">
        <div class="col-10 q-pa-sm">
          <q-input filled v-model="nomePustura" label="Buscar">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon name="close" @click="nomePustura = ''" class="cursor-pointer" />
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
import { useTecnicasStore } from '@/stores/tecnicasStore.js';
import { useTiposStore } from '@/stores/tiposStore.js';
import HeaderWithLogos from '@/components/HeaderWithLogos.vue';

export default {
  name: 'ListaTecnicas',
  components: { HeaderWithLogos },
  setup() {
    const tecnicasStore = useTecnicasStore();
    const tiposStore = useTiposStore();
    const tecnicas = ref([]);
    const tipoTecnicas = ref([]);

    onMounted(() => {
      tecnicasStore.carregarTecnicas();
      tiposStore.carregarTipos();
      tecnicas.value = tecnicasStore.tecnicas;
      tipoTecnicas.value = tiposStore.tipos;
    });

    return {
      drawer: ref(false),
      tecnicasStore,
      tiposStore,
      tecnicas,
      tipoTecnicas,
    };
  },
  data() {
    return {
      nomePustura: '',
      selecionados: [],
    }
  },
  methods: {
    getImagePath(tecnica) {
      const imagem = tecnica.Imagem;
      return require(`../assets/images/Tecnicas/${imagem}`);
    },
    getAudioPath(tecnica) {
      const tecnicaAudio = tecnica.Audio;
      const audio = new Audio(require(`@/assets/sounds/tecnicas/${tecnicaAudio}`));
      audio.play();
    },
    getTecnicaTipo(tipo) {
      return this.tecnicas.filter(p => p.Tipo === tipo);
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
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
  watch:{
    nomePustura(nome){
      this.tecnicas = this.tecnicasStore.pesquisarTecnicas(nome);
      const tipos = this.tecnicasStore.getTiposDeTecnicas(this.tecnicas);
      this.tipoTecnicas = this.tiposStore.getPorTipos(tipos);
    }
  }
}

</script>
<style scoped></style>
