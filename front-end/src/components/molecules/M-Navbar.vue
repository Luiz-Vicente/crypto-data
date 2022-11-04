<template>
  <nav class="ps-3 navbar navbar-expand-lg navbar-light glassmorphism">
  <div class="container-fluid">
    <img style="width: 35px;" class="me-3" src="/img/favicon.svg" alt="">
    <a class="navbar-brand text-white" href="#">Crypto Data</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink class="nav-link active text-white" aria-current="page" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link text-white" aria-current="page" to="/price">Prices</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<style lang="scss" scoped>
.glassmorphism {
  z-index: 2;
  position: fixed;
  width: 100%;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, .15);
}
</style>