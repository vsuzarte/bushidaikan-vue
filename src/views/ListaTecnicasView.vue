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
    <div v-for="tipoPostura in tipoPosturas" :key="tipoPostura.Id" class="row q-col-gutter-none justify-center q-mb-sm">
      <div v-for="(postura, index) in getPosturaTipo(tipoPostura.Tipo)" :key="index" class="col-12 q-mb-md">
        <q-card
        style="border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); border: 2px solid #FBC920;">
          <img :src="getImagePath(postura)">
          <q-card-section>
            <div class="col-12">
              <span class="sub-title">{{ postura.Nome }}</span>
            </div>
            <div class="col-12">
              <q-chip color="white" size="md">
                <q-avatar><img :src="getJapaoPath"></q-avatar>
                {{ postura.PosturaJP }}
              </q-chip>
            </div>
            <div class="col-12">
              <q-chip color="white" size="md">
                <q-avatar><img :src="getBrasilPath"></q-avatar>
                {{ postura.PosturaBR }}
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
import { usePosturasStore } from '@/stores/posturasStore.js';
import { useTiposStore } from '@/stores/tiposStore.js';

export default {
  name: 'ListaTecnicas',
  components: {
  },
  setup() {
    const posturasStore = usePosturasStore();
    const tiposStore = useTiposStore();
    const posturas = ref([]);
    const tipoPosturas = ref([]);

    onMounted(() => {
      posturasStore.carregarPosturas();
      tiposStore.carregarTipos();
      posturas.value = posturasStore.posturas;
      tipoPosturas.value = tiposStore.tipos;
    });

    return {
      posturasStore,
      tiposStore,
      posturas,
      tipoPosturas,
    };
  },
  data() {
    return {
      nomePustura: '',
    }
  },
  methods: {
    getImagePath(postura) {
      const imagem = postura.Imagem;
      return require(`../assets/images/Posturas/${imagem}`);
    },
    getPosturaTipo(tipo) {
      return this.posturas.filter(p => p.Tipo === tipo);
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
      this.posturas = this.posturasStore.pesquisarPosturas(newNome);
      const tipos = this.posturasStore.getTiposDePosturas(this.posturas);
      this.tipoPosturas = this.tiposStore.getPorTipos(tipos);
    },
  },
}

</script>
<style scoped>
</style>
