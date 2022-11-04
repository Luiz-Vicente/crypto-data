<template>
  <section>
    <h2 class="text-white mt-5 d-flex align-items-center">
      <img
        style="width: 40px"
        class="rounded-circle me-2"
        :src="coin.image || '/img/404.svg'"
      />
      {{ coin.name }} price now: {{ coinPrice }}
    </h2>

    <div class="d-flex p-2" :class="{ 'flex-column': screenSize.is.mobile }">
      <div
        class="col d-flex mb-3 align-items-center justify-content-center p-4 rounded border border-2 border-gray-500 h-100"
      >
        <line-chart v-if="showChart" class="w-100" v-bind="config" />
        <pulse-loader v-else :loading="true" color="#3f2de6"></pulse-loader>
      </div>
      <div
        class="d-flex flex-column"
        :class="{ 'ms-2': !screenSize.is.mobile }"
      >
        <p
          v-tooltip="'Period in days'"
          class="d-block text-white fs-3 fw-semibold"
        >
          Period(days)
        </p>
        <div
          class="d-flex"
          :class="
            screenSize.is.mobile ? 'justify-content-between' : 'flex-column'
          "
        >
          <button
            class="btn btn-sm btn-outline-gray-200 mb-2"
            @click="period = 30"
          >
            30
          </button>
          <button
            class="btn btn-sm btn-outline-gray-200 mb-2"
            @click="period = 60"
          >
            60
          </button>
          <button
            class="btn btn-sm btn-outline-gray-200 mb-2"
            @click="period = 90"
          >
            90
          </button>
          <button
            class="btn btn-sm btn-outline-gray-200 mb-2"
            @click="period = 364"
          >
            365
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "@/services/axios.js";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  components: {
    PulseLoader,
  },
  data() {
    return {
      description: null,
      showChart: false,
      period: 30,
      coin: null,
      coinPrice: null,
      config: {
        height: 300,
        autoFit: true,
        xField: "day",
        yField: "price",
        smooth: true,
        data: [],
      },
    };
  },
  watch: {
    period() {
      this.getCoinHistory();
    },
  },
  computed: {
    screenSize() {
      return this.$screenSize;
    },
  },
  methods: {
    async getCoinInfo() {
      try {
        const { data } = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        this.coinPrice = data[0].current_price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "USD",
        });
        this.coin = data[0];
      } catch (error) {
        console.log(error.data.response);
      }
    },
    async getCoinHistory() {
      this.showChart = false;
      try {
        this.config.data = [];
        let day = 1;
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${this.period}&interval=daily`
        );
        data.prices.forEach((price) => {
          this.config.data.push({
            day: day.toString(),
            price: Number(price[1].toFixed(2)),
          });
          day = day + 1;
        });
        this.showChart = true;
      } catch (error) {
        console.log(error.data.response);
      }
    },
  },
  created() {
    this.getCoinInfo();
    this.getCoinHistory();
  },
};
</script>

<style lang="scss" scoped></style>
