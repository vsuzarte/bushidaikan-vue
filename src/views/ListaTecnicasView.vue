<template>
  <div class="q-pa-md ">
    <q-header bordered>
      <q-toolbar class="bg-dark">
        <q-toolbar-title>
          <q-btn round color="amber" to="/" text-color="black" icon="home" />
        </q-toolbar-title>
        <q-input color="yellow" dark filled v-model="nomePustura" label="Buscar">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click="nomePustura = ''" class="cursor-pointer" />
        </template>
      </q-input>
      </q-toolbar>
    </q-header>
    <div class="row q-col-gutter-none justify-center">
      <div class="col-12 text-center text-bold sub-title q-mb-md">--- Lista de Técnicas ---</div>
    </div>
    <div v-for="tipoTecnica in tipoTecnicas" :key="tipoTecnica.Id" class="row q-col-gutter-none justify-center q-mb-sm">
      <div v-for="(tenica, index) in getTecnicaTipo(tipoTecnica.Tipo)" :key="index" class="col-12 q-mb-md">
        <q-card
        style="border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); border: 2px solid #FBC920;">
          <img :src="getImagePath(tenica)">
          <q-card-section>
            <div class="col-12">
              <span class="sub-title">{{ tenica.Nome }}</span>
            </div>
            <div class="col-12">
              <q-chip color="white" size="md">
                <q-avatar><img :src="getJapaoPath"></q-avatar>
                {{ tenica.TecnicaJP }}
              </q-chip>
            </div>
            <div class="col-12">
              <q-chip color="white" size="md">
                <q-avatar><img :src="getBrasilPath"></q-avatar>
                {{ tenica.TecnicaBR }}
              </q-chip>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-footer elevated>
      <q-toolbar class="bg-dark">
        <q-toolbar-title>
        <q-btn round color="amber" to="/" text-color="black" icon="home" />
      </q-toolbar-title>
      <q-btn class="q-ml-sm" round color="green" text-color="black" icon="arrow_upward" @click="scrollToTop" />
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script>

import { onMounted, ref } from 'vue';
import { useTecnicasStore } from '@/stores/tenicasStore.js';
import { useTiposStore } from '@/stores/tiposStore.js';

export default {
  name: 'ListaTecnicas',
  components: {
  },
  setup() {
    const tenicasStore = useTecnicasStore();
    const tiposStore = useTiposStore();
    const tenicas = ref([]);
    const tipoTecnicas = ref([]);

    onMounted(() => {
      tenicasStore.carregarTecnicas();
      tiposStore.carregarTipos();
      tenicas.value = tenicasStore.tenicas;
      tipoTecnicas.value = tiposStore.tipos;
    });

    return {
      tenicasStore,
      tiposStore,
      tenicas,
      tipoTecnicas,
    };
  },
  data() {
    return {
      nomePustura: '',
    }
  },
  methods: {
    getImagePath(tenica) {
      const imagem = tenica.Imagem;
      return require(`../assets/images/Tecnicas/${imagem}`);
    },
    getTecnicaTipo(tipo) {
      return this.tenicas.filter(p => p.Tipo === tipo);
    },
    getLogoPath() {
      return require(`@/assets/images/logo.png`);
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rola suavemente para o topo
      });
    }
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
    nomePustura(newNome) {
      this.tenicas = this.tenicasStore.pesquisarTecnicas(newNome);
      const tipos = this.tenicasStore.getTiposDeTecnicas(this.tenicas);
      this.tipoTecnicas = this.tiposStore.getPorTipos(tipos);
    },
  },
}

</script>
<style scoped>
</style>
