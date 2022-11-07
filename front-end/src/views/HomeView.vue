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
    <h3 :class="{ 'mt-5': screenSize.is.mobile }" class="mt-4 text-white">
      Top Most Searched Coins Today:
    </h3>
    <MFlicking></MFlicking>
  </div>
</template>

<script>
import MFlicking from '@/components/molecules/MFlicking.vue'

export default {
  components: {
    MFlicking
  },
  computed: {
    screenSize() {
      return this.$screenSize;
    },
  },
}
</script>

<style lang="scss" scoped>
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
