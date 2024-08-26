<template>
  <q-header elevated class="bg-amber text-black">
      <q-toolbar class="text-center">
        <q-avatar>
            <img :src="logo">
          </q-avatar>
        <q-toolbar-title>
          {{titulo}}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
</template>

<script>
export default {
  name: 'HeaderWithLogos',
  props: {
    titulo: {
      type: String,
      required: true,
    },
  },
  computed: {
    logo() {
      return require(`@/assets/images/logo.png`);
    },
  }
}
</script>


<style scoped></style>


