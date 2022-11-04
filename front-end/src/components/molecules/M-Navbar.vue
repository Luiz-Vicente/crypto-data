<template>
  <nav class="ps-3 navbar navbar-expand-lg navbar-light glassmorphism">
    <div class="container-fluid">
      <img style="width: 35px" class="me-3" src="/img/favicon.svg" alt="" />
      <RouterLink class="navbar-brand text-white" aria-current="page" to="/"
        >Crypto Data</RouterLink
      >
      <RouterLink class="nav-link text-white" aria-current="page" to="/price"
        >Prices</RouterLink
      >
    </div>
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
