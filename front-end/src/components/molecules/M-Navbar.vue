<template>
  <nav class="ps-3 py-2 d-flex align-items-center glassmorphism">
    <RouterLink class="text-white" aria-current="page" to="/"
      ><img style="width: 35px" class="me-3" src="/img/favicon.svg" alt=""
    /></RouterLink>
    <RouterLink class="text-white" aria-current="page" to="/price"
      >Prices</RouterLink
    >
  </nav>
</template>

<style lang="scss" scoped>
.glassmorphism {
  z-index: 2;
  position: fixed;
  width: 100%;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.15);
}
</style>
