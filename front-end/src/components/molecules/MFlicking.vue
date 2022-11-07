<template>
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
        v-on:click="$emit('selected', coin)"
        class="glassmorphism d-flex align-items-center justify-content-center bg-gray mx-1 rounded border border-2 border-gray-500 p-3"
        :style="screenSize.is.mobile ? 'width: 80vw' : 'width: 20vw'"
      >
        <img
          style="width: 30px; height: 30px"
          class="rounded-circle me-2"
          :src="coin.item.small || '/img/404.svg'"
          alt=""
        />
        <p class="m-0 text-white lh-sm fs-2">
          {{ coin.item.name }}
        </p>
      </div>
    </div>
  </FlickingEx>
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
</style>
