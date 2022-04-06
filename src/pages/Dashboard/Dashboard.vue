<template>
  <div>
    <!-- <md-card class="date">
      <md-card-content>
        <md-card-content>

 <div class="md-layout-item md-size-40">
              <md-field>
                <label>.md-size-40</label>
                <md-input v-model="layout3" type="text"></md-input>
              </md-field>
            </div>

          <div class="md-layout">
            <div class="md-layout-item md-size-40">
              <md-datepicker v-model="from">
                <label>From</label>
              </md-datepicker>
            </div>

            <div class="md-layout-item md-size-40">
              <md-datepicker v-model="to">
                <label>To</label>
              </md-datepicker>
            </div>
            <div class="ss">
              <md-button @click="Search" class="md-success">Search</md-button>
            </div>
          </div>
        </md-card-content>
      </md-card-content>
    </md-card>
    <h3 class="ma">Status</h3>
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
        v-for="kpi in kpis.status"
        v-bind:key="kpi.id"
      >
        <stats-card header-color="rose">
          <template slot="header">
            <div class="card-icon">
              <md-icon>equalizer</md-icon>
            </div>
            <p class="category">{{kpi.name}}</p>
            <h3 class="title">
              <animated-number :value="kpi.number"></animated-number>
            </h3>
          </template>
        </stats-card>
      </div>
    </div>

    <h3 class="ma">Severity</h3>
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
        v-for="kpi in kpis.severity"
        v-bind:key="kpi.id"
      >
        <stats-card header-color="rose">
          <template slot="header">
            <div class="card-icon">
              <md-icon>equalizer</md-icon>
            </div>
            <p class="category">{{kpi.name}}</p>
            <h3 class="title">
              <animated-number :value="kpi.number"></animated-number>
            </h3>
          </template>
        </stats-card>
      </div>
    </div>

    <h3 class="ma">Incident Severity</h3>
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
        v-for="kpi in kpis.incident"
        v-bind:key="kpi.id"
      >
        <stats-card header-color="rose">
          <template slot="header">
            <div class="card-icon">
              <md-icon>equalizer</md-icon>
            </div>
            <p class="category">{{kpi.name}}</p>
            <h3 class="title">
              <animated-number :value="kpi.number"></animated-number>
            </h3>
          </template>
        </stats-card>
      </div>
    </div>

    <h3 class="ma">Catagories</h3>
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
        v-for="kpi in kpis.category"
        v-bind:key="kpi.id"
      >
        <stats-card header-color="rose">
          <template slot="header">
            <div class="card-icon">
              <md-icon>equalizer</md-icon>
            </div>
            <p class="category">{{kpi.name}}</p>
            <h3 class="title">
              <animated-number :value="kpi.number"></animated-number>
            </h3>
          </template>
        </stats-card>
      </div>
    </div> -->
  </div>
</template>

<script>
import AsyncWorldMap from "@/components/WorldMap/AsyncWorldMap.vue";
import axios from "axios";
import env from "../../../env";
import { StatsCard, AnimatedNumber } from "@/components";

export default {
  components: {
    // StatsCard,
    // AnimatedNumber
  },
  methods: {
    async Search() {
      try {
        this.kpis = [];
        let tocken = localStorage.getItem("Nannotoken");
        let result = await axios.get(
          env.URL() +
            `Nanosoft/get/KPIS/${this.from === "" ? null : this.from}/${
              this.to === "" ? null : this.to
            }`,
          { headers: { authorization: tocken } }
        );
        this.kpis = result.data.result;
      } catch (error) {
        // console.log(error);
      }
    }
  },
  data() {
    return {
      selectedLabeled: "",
      from: "",
      to: "",
      kpis: [],
      product1: "./img/card-2.jpg",
      product2: "./img/card-3.jpg",
      product3: "./img/card-1.jpg",
      seq2: 0,
      mapData: {
        AU: 760,
        BR: 550,
        CA: 120,
        DE: 1300,
        FR: 540,
        GB: 690,
        GE: 200,
        IN: 200,
        RO: 600,
        RU: 300,
        US: 2920
      },
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]]
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De"
          ],
          series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      }
    };
  }
};
</script>
<style>
.ma {
  margin-left: 20px;
}
.date {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
.ss {
  text-align: center;
  margin-left: 20px;
}
</style>
