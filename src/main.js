// =========================================================
// * Vue Material Dashboard PRO - v1.4.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard-pro
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";
import VCalendar from "v-calendar";
Vue.use(VCalendar);
// Introduced in vue file
import FunctionalCalendar from "vue-functional-calendar";
Vue.use(FunctionalCalendar, {
  dayNames: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
});

import MonthPicker from "vue-month-picker";
import MonthPickerInput from "vue-month-picker";

import VueMonthlyPicker from "vue-monthly-picker";
Vue.component("vue-monthly-picker", VueMonthlyPicker);

Vue.use(MonthPicker);
Vue.use(MonthPickerInput);
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
Vue.component("VueCtkDateTimePicker", VueCtkDateTimePicker);
import "vue-search-select/dist/VueSearchSelect.css";
import VueRouter from "vue-router";
import DashboardPlugin from "./material-dashboard";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/NanoSoft.css";
Vue.use(ElementUI);
// Plugins
import App from "./App.vue";
import Chartist from "chartist";

// router setup
import routes from "./routes/routes";
import VueExcelXlsx from "vue-excel-xlsx";
// import Vue from "vue";

Vue.use(VueExcelXlsx);

// plugin setup
Vue.use(VueRouter);
Vue.use(DashboardPlugin);

// configure router

const router = new VueRouter({
  mode: "history",
  routes, // short for routes: routes
  // scrollBehavior: to => {
  //   if (to.hash) {
  //     return { selector: to.hash };
  //   } else {
  //     return { x: 0, y: 0 };
  //   }
  // },
  linkExactActiveClass: "nav-item active"
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.IsAuth) === true) {
    if (
      localStorage.getItem("Nannotoken") === null ||
      localStorage.getItem("Nannotoken") === ""
    ) {
      return next({ name: "Login" });
    } else {
      return next();
    }
  } else {
    return next();
  }
});

// global library setup
Vue.prototype.$Chartist = Chartist;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router
});
