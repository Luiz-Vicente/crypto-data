import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ScreenSizeDetector from 'screen-size-detector';
import FloatingVue from 'floating-vue';
import { LineChart } from '@opd/g2plot-vue';

const screenSize = new ScreenSizeDetector();
import Flicking from "@egjs/vue3-flicking";

import 'floating-vue/dist/style.css'
import "@egjs/vue3-flicking/dist/flicking.css";
// Or, if you have to support IE9
import "@egjs/vue3-flicking/dist/flicking-inline.css";
import '@/assets/main.scss';

const app = createApp(App);

app.use(router).use(FloatingVue).use(LineChart);

app.component("FlickingEx", Flicking);

app.config.globalProperties.$screenSize = screenSize;

app.mount('#app');
