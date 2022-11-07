<template>
  <section class="pt-5">
    <h3 :class="{ 'mt-5': screenSize.is.mobile }" class="mt-4 text-white">
      Top Most Searched Coins Today:
    </h3>
    <MFlicking
      @selected="(researchedCoin = $event.item.name), searchCoin()"
    ></MFlicking>
    <div
      class="my-4 d-flex justify-content-between"
      :class="{ 'flex-column': screenSize.is.mobile }"
    >
      <div :class="{ 'w-25': !screenSize.is.mobile }">
        <label class="text-white lh-sm m-0 p-0" for="searchCrypto"
          >Search the price by a specific date</label
        >
        <div class="d-flex align-items-center">
          <input
            id="searchCrypto"
            v-model="searchedDate"
            v-on:keyup.enter="searchCoin()"
            v-on:input="getSpecifiedPrice()"
            class="form-control my-3 me-1 bg-white rounded"
            placeholder="Crypto name..."
            type="date"
          />
          <div
            v-if="coinSpecifiedPrice"
            class="border border-2 border-purple rounded px-2 py-1"
          >
            <p
              v-if="!loadingSpecifiedPrice"
              class="text-white text-nowrap lh-lg m-0"
            >
              {{ coinSpecifiedPrice }}
            </p>
            <div
              v-if="loadingSpecifiedPrice"
              class="spinner-border spinner-border-sm text-purple"
              role="status"
            ></div>
          </div>
        </div>
      </div>

      <div :class="{ 'w-25': !screenSize.is.mobile }">
        <label class="text-white lh-sm m-0 p-0" for="searchCrypto"
          >Search for Cryptocurrencies</label
        >
        <div class="d-flex align-items-center">
          <input
            id="searchCrypto"
            v-model="researchedCoin"
            v-on:keyup.enter="searchCoin()"
            class="form-control my-3 me-1 bg-white rounded"
            placeholder="Crypto name..."
          />
          <button v-on:click="searchCoin()" class="btn btn-purple">
            Search
          </button>
        </div>
      </div>
    </div>

    <div class="d-flex align-items-center">
      <img
        style="width: 40px; height: 40px"
        class="rounded-circle me-2"
        :src="coin.image || '/img/404.svg'"
      />
      <h2 class="text-white">
        {{ coin.name }} price now: <span>{{ coinPrice }}</span>
      </h2>
    </div>

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
        <p v-tooltip="'Period in days'" class="d-block text-white fs-3">
          Period(days)
        </p>
        <div
          class="d-flex"
          :class="
            screenSize.is.mobile ? 'justify-content-between' : 'flex-column'
          "
        >
          <button class="btn btn-sm btn-purple mb-2" @click="period = 30">
            30
          </button>
          <button class="btn btn-sm btn-purple mb-2" @click="period = 60">
            60
          </button>
          <button class="btn btn-sm btn-purple mb-2" @click="period = 90">
            90
          </button>
          <button class="btn btn-sm btn-purple mb-2" @click="period = 364">
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
import moment from "moment";
import MFlicking from "@/components/molecules/MFlicking.vue";

export default {
  components: {
    PulseLoader,
    MFlicking,
  },
  data() {
    return {
      loadingSpecifiedPrice: false,
      coinSpecifiedPrice: null,
      searchedDate: null,
      researchedCoin: "bitcoin",
      interval: null,
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
    dateFormat(value) {
      return moment(value).format("DD-MM-YYYY");
    },
    async getSpecifiedPrice() {
      this.loadingSpecifiedPrice = true;
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${this.researchedCoin
            .toLowerCase()
            .trim()}/history?date=${this.dateFormat(
            this.searchedDate
          )}&localization=en`
        );
        this.coinSpecifiedPrice =
          data.market_data.current_price.usd.toLocaleString("en", {
            style: "currency",
            currency: "USD",
          });
        this.loadingSpecifiedPrice = false;
      } catch (error) {
        console.log(error);
      }
    },
    async getCoinInfo() {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${
            this.researchedCoin.toLowerCase().trim() || "bitcoin"
          }&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );
        this.coinPrice = data[0].current_price.toLocaleString("en", {
          style: "currency",
          currency: "USD",
        });
        this.coin = data[0];
      } catch (error) {
        console.log(error);
      }
    },
    async getCoinHistory() {
      this.showChart = false;
      try {
        this.config.data = [];
        let day = 1;
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${
            this.researchedCoin.toLowerCase().trim() || "bitcoin"
          }/market_chart?vs_currency=usd&days=${this.period}&interval=daily`
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
    updateInfo() {
      this.interval = setInterval(() => {
        this.getCoinInfo();
        console.log("chamando");
      }, 40000);
    },
    searchCoin() {
      this.getCoinInfo();
      this.getCoinHistory();
      this.updateInfo();
    },
  },
  created() {
    this.getCoinInfo();
    this.getCoinHistory();
    this.updateInfo();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

<style lang="scss" scoped></style>
