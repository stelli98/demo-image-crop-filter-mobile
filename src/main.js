import Vue from "vue";
import App from "./App.vue";
import Croppa from 'vue-croppa';
import 'vue-croppa/dist/vue-croppa.css';
import Caman from 'Caman';

Vue.use(Croppa);
Vue.use(Caman);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
