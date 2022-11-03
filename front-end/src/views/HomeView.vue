<template>
  <div>
    <main class="d-flex" :class="{ 'flex-column' : screenSize.is.mobile }">
    <div class="wrapper text-white col d-flex flex-column justify-content-center">
      <h1 class="mt-5" style="font-size: 4rem;">Crypto Data</h1>
      <p class="fs-3 fw-lighter">
        Discover the main cryptocurrencies available on the market. Know its current value and see its historical value
      </p>
    </div>
    <div class="wrapper col align-items-center" :class="screenSize.is.mobile ? 'd-none' : 'd-flex'">
      <img class="coin-1" src="/crypto-symbol/huobicoin.png" alt="" />
      <img class="coin-2" src="/crypto-symbol/etherium.png" alt="" />
      <img class="coin-3" src="/crypto-symbol/bitcoin.png" alt="" />
      <img class="coin-4" src="/crypto-symbol/cardano.png" alt="" />
      <img class="coin-5" src="/crypto-symbol/tron.png" alt="" />
    </div>
  </main>
  <h2 class="text-white">Top Most Searched Coins Today:</h2>
  <FlickingEx class="p-2 rounded" :options="{ circular: true }" :plugins="plugins">
    <div v-for="(coin, index) in trendingCoins" class="flicking-panel" :key="index">
      <div v-tooltip="coin.item.name" class="glassmorphism d-flex aling-items-center justify-content-center bg-gray mx-1 rounded border border-2 border-gray-500 p-3" style="width: 20vw;">
        <img style="width: 30px;" class="rounded-circle" :class="{ 'me-2': !screenSize.is.mobile }" :src="coin.item.small" alt="">
        <p :class="{ 'd-none': screenSize.is.mobile }" class="m-0 text-white lh-lg">{{ coin.item.name }}</p>
      </div>
    </div>
  </FlickingEx>
  </div>
</template>

<script>
import { AutoPlay } from "@egjs/flicking-plugins";
import axios from "@/services/axios.js";

export default {
  data() {
    return {
      trendingCoins: [],
      plugins: [new AutoPlay()]
    }
  },
  computed: {
    screenSize() {
      return this.$screenSize;
    }
  },
  async mounted() {
    const {data} = await axios.get('https://api.coingecko.com/api/v3/search/trending');
    console.log(data.coins)
    this.trendingCoins = data.coins;
  }
}
</script>

<style lang="scss" scoped>
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
