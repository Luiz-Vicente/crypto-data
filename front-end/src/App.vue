<script setup>
import { RouterView } from 'vue-router'
import MNavbar from '@/components/molecules/M-Navbar.vue'
</script>

<template>
  <MNavbar></MNavbar>

  <RouterView class="app p-5" />
</template>

<style scoped>
body {
  overflow-x: hidden;
}
.app {
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(/background.svg);
}
</style>
