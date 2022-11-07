<template>
  <div>
    <main class="d-flex" :class="{ 'flex-column': screenSize.is.mobile }">
      <div
        class="wrapper text-white col d-flex flex-column justify-content-center"
      >
        <h1 class="mt-5">Crypto Data</h1>
        <p class="fs-5 fw-lighter">
          Discover the main cryptocurrencies available on the market. Know its
          current value and see its historical value
        </p>
      </div>
      <div
        class="wrapper col align-items-center"
        :class="screenSize.is.mobile ? 'd-none' : 'd-flex'"
      >
        <img
          class="coin-1"
          src="/img/crypto-symbol/huobicoin.png"
          alt="3D digitally created image representing the huobicoin"
        />
        <img
          class="coin-2"
          src="/img/crypto-symbol/etherium.png"
          alt="3D digitally created image representing the etherium"
        />
        <img
          class="coin-3"
          src="/img/crypto-symbol/bitcoin.png"
          alt="3D digitally created image representing the bitcoin"
        />
        <img
          class="coin-4"
          src="/img/crypto-symbol/cardano.png"
          alt="3D digitally created image representing the cardano"
        />
        <img
          class="coin-5"
          src="/img/crypto-symbol/tron.png"
          alt="3D digitally created image representing the tron"
        />
      </div>
    </main>
    <h3 v-if="trendingCoins.length" :class="{ 'mt-5': screenSize.is.mobile }" class="text-white">
      Top Most Searched Coins Today:
    </h3>
    <FlickingEx
      v-if="trendingCoins.length"
      class="p-2 rounded"
      :options="{ circular: true }"
      :plugins="plugins"
    >
      <div
        v-for="(coin, index) in trendingCoins"
        class="flicking-panel"
        :key="index"
      >
        <div
          class="glassmorphism d-flex align-items-center justify-content-center bg-gray mx-1 rounded border border-2 border-gray-500 p-3"
          :style=" screenSize.is.mobile ? 'width: 80vw': 'width: 20vw'"
        >
          <img
            style="width: 30px; height: 30px;"
            class="rounded-circle me-2"
            :src="coin.item.small || '/img/404.svg'"
            alt=""
          />
          <p
            class="m-0 text-white lh-sm fs-2"
          >
            {{ coin.item.name }}
          </p>
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
      plugins: [new AutoPlay()],
    };
  },
  watch: {
    period() {
      this.getBitcoinHistory();
    },
  },
  computed: {
    screenSize() {
      return this.$screenSize;
    },
  },
  methods: {
    async getTrendingCoins() {
      try {
        const { data } = await axios.get(
          "https://api.coingecko.com/api/v3/search/trending"
        );
        this.trendingCoins = data.coins;
      } catch (error) {
        console.log(error.data.response);
      }
    },
  },
  mounted() {
    this.getTrendingCoins();
  },
};
</script>

<style lang="scss" scoped>
.glassmorphism {
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.15);
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
  transform: translate(-110px, 140px);
  width: 20%;
  animation: up-5 7s ease-in-out both infinite;
}
@keyframes up-5 {
  50% {
    transform: translate(-110px, 90px);
  }
}
.wrapper {
  height: 100vh;
}
</style>
