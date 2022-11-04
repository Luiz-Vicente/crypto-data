<script setup>
import { RouterView } from 'vue-router'
import MNavbar from '@/components/molecules/M-Navbar.vue'
</script>

<template>
  <MNavbar></MNavbar>

  <RouterView class="app py-5 px-3" />
</template>

<style lang="scss" scoped>
body {
  overflow-x: hidden;
}
.app {
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(../public/img/bg.svg);
}
</style>
