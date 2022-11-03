<template>
  <div>
    <main class="d-flex">
    <div class="wrapper text-white col d-flex flex-column justify-content-center">
      <h1 class="mt-5" style="font-size: 4rem;">Crypto Data</h1>
      <p class="fs-3 fw-lighter">
        Conheça as principais crypto moedas disponíveis no mercado. Saiba seu
        valor atual e consulte seu valor histórico
      </p>
    </div>
    <div class="wrapper col d-flex align-items-center">
      <img class="coin coin-1" src="/crypto-symbol/huobicoin.png" alt="" />
      <img class="coin coin-2" src="/crypto-symbol/etherium.png" alt="" />
      <img class="coin coin-3" src="/crypto-symbol/bitcoin.png" alt="" />
      <img class="coin coin-4" src="/crypto-symbol/cardano.png" alt="" />
      <img class="coin coin-5" src="/crypto-symbol/tron.png" alt="" />
    </div>
  </main>
  <FlickingEx class="p-2 rounded" :options="{ circular: true }" :plugins="plugins">
    <div v-for="idx in list" class="flicking-panel" :key="idx">
      <div class="bg-gray mx-1" style="width: 20vw;">
        <p class="glassmorphism rounded border border-2 border-gray-500 p-3 m-0 text-white">{{ idx }}</p>
      </div>
    </div>
  </FlickingEx>
  </div>
</template>

<script>
import { AutoPlay } from "@egjs/flicking-plugins";

export default {
  data() {
    return {
      list: [0, 1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      plugins: [new AutoPlay()]
    }
  },
}
</script>

<style lang="scss" scoped>
@media (max-width: 600px) {
  main {
    .coin {
      display: none;
    }
    flex-direction: column;
  }
}
.glassmorphism {
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, .15);
}
.coin-1 {
  transform: translate(70px, 140px);
  width: 20%;
	animation: up 7s ease-in-out both infinite;
}
@keyframes up {
  50% {
    transform: translate(70px, 130px);
  }
}
.coin-2 {
  transform: translateY(-140px);
  width: 20%;
	animation: up-2 7s ease-in-out both infinite;
}
@keyframes up-2 {
  50% {
    transform: translateY(-100px);
  }
}
.coin-3 {
  width: 35%;
	animation: up-3 7s ease-in-out both infinite;
}
@keyframes up-3 {
  50% {
    transform: translateY(-15px);
  }
}
.coin-4 {
  transform: translateY(-130px);
  width: 20%;
	animation: up-4 7s ease-in-out both infinite;
}
@keyframes up-4 {
  50% {
    transform: translateY(-120px);
  }
}
.coin-5 {
  transform: translate(-70px, 140px);
  width: 20%;
	animation: up-5 7s ease-in-out both infinite;
}
@keyframes up-5 {
  50% {
    transform: translate(-70px, 90px);
  }
}
.wrapper {
  height: 100vh;
}
</style>
