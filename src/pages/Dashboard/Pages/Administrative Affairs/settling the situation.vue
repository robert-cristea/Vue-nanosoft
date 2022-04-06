<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <ValidationObserver v-slot="{ passed, failed }">
          <form>
            <md-card class="p-25">
              <md-card-content>
                <div class="md-layout">
                  <div class="md-layout-item md-size-30 ml-15 mt-25">
                    <model-list-select
                      class="input-must-rtl"
                      :list="employees"
                      v-model="EmployeeId"
                      option-value="key"
                      option-text="value"
                      placeholder="الموظف"
                    >
                    </model-list-select>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-datepicker v-model="date">
                      <label class="mr-28">تاريخ الترقية أو العلاوة</label>
                    </md-datepicker>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>رقم القرار</label>
                      <md-input v-model="DecisionNumber"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>الدرجة بعد التسوية</label>
                      <md-input v-model="GradeAfterSettlement"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>العلاوة بعد التسوية</label>
                      <md-input v-model="BonusAfterSettlement"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-100 mtb-20 center-content">
                    <md-button @click="Save" class="md-success btn_nanosoft"
                      >حفظ</md-button
                    >
                    <md-button @click="clear" class="md-info btn_nanosoft"
                      >جديد</md-button
                    >
                    <md-button class="md-info btn_nanosoft">طباعة</md-button>
                  </div>
                </div>
              </md-card-content>
            </md-card>
          </form>
        </ValidationObserver>
      </div>
    </div>

    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-text md-card-header-green">
          <div class="card-text">
            <h4 class="title">البحث</h4>
          </div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout mt-25">
            <div class="md-layout-item md-size-30 ml-15">
              <model-list-select
                class="input-must-rtl"
                :list="employees"
                v-model="EmployeeId"
                option-value="key"
                option-text="value"
                placeholder="الموظف"
              >
              </model-list-select>
            </div>

            <div class="md-layout-item md-size-20 ml-15">
              <md-datepicker v-model="DateFrom">
                <label class="mr-28">من تاريخ</label>
              </md-datepicker>
            </div>

            <div class="md-layout-item md-size-20 ml-15">
              <md-datepicker v-model="DateTo">
                <label class="mr-28">الى تاريخ</label>
              </md-datepicker>
            </div>

            <div class="md-layout-item md-size-20 ml-15">
              <md-button @click="Search" class="md-success btn_nanosoft"
                >بحث</md-button
              >
            </div>
          </div>

          <div class="md-layout flex-content-left">
            <div class="md-layout-item mt-25 md-size-15">
              <md-table>
                <md-table-toolbar>
                  <md-field>
                    <label for="pages">عدد النتائج</label>
                    <md-select v-model="pagination.perPage" name="pages">
                      <md-option
                        v-for="item in pagination.perPageOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                        >{{ item }}</md-option
                      >
                    </md-select>
                  </md-field>
                </md-table-toolbar>
              </md-table>
            </div>
          </div>

          <md-table
            :value="queriedData"
            :md-sort.sync="currentSort"
            :md-sort-order.sync="currentSortOrder"
            :md-sort-fn="customSort"
            class="paginated-table table-striped table-hover mt-25"
          >
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="الإسم الرباعي">{{
                item.employeeName
              }}</md-table-cell>

              <md-table-cell md-label="رقم الملاك الوظيفي">{{
                item.employeeJobNumber
              }}</md-table-cell>
              <md-table-cell class="md-size-200" md-label="التاريخ">{{
                convert(item.date)
              }}</md-table-cell>
              <md-table-cell md-label="رقم القرار">{{
                item.decisionNumber
              }}</md-table-cell>

              <md-table-cell md-label="الدرجة قبل التسوية">{{
                item.gradeBeforeSettlement
              }}</md-table-cell>

              <md-table-cell md-label="العلاوة قبل التسوية">{{
                item.bonusBeforeSettlement
              }}</md-table-cell>

              <md-table-cell md-label="الدرجة بعد التسوية">{{
                item.gradeAfterSettlement
              }}</md-table-cell>

              <md-table-cell md-label="العلاوة بعد التسوية">{{
                item.bonusAfterSettlement
              }}</md-table-cell>

              <md-table-cell md-label>
                <div class="md-just-icon md-info md-simple"></div>
                <md-button
                  class="md-just-icon md-warning md-simple"
                  @click.native="handleEdit(item)"
                >
                  <md-icon>dvr</md-icon>
                </md-button>
                <!-- <md-button
                  class="md-just-icon md-danger md-simple"
                  @click.native="handleDelete(item)"
                >
                  <md-icon>close</md-icon>
                </md-button> -->
              </md-table-cell>
            </md-table-row>
          </md-table>
          <!-- <div class="footer-table md-table">
            <table>
              <tfoot>
                <tr>
                  <th
                    v-for="item in footerTable"
                    :key="item.name"
                    class="md-table-head"
                  >
                    <div class="md-table-head-container md-ripple md-disabled">
                      <div class="md-table-head-label">{{ item }}</div>
                    </div>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div> -->
        </md-card-content>
        <md-card-actions md-alignment="space-between">
          <div class>
            <p class="card-category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
            </p>
          </div>
          <pagination
            class="pagination-no-border pagination-success"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="total"
          ></pagination>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
import axios from "../../../../components/service/HTTP.js";
import { Pagination } from "@/components";
import moment from "moment";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import { ModelListSelect } from "vue-search-select";
// import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required, numeric, regex, confirmed } from "vee-validate/dist/rules";
import env from "../../../../../env";
extend("required", required);
extend("numeric", numeric);
extend("regex", regex);
extend("confirmed", confirmed);
export default {
  async created() {
    await this.init();
  },
  components: {
    Pagination,
    ModelListSelect
    // SlideYDownTransition
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    }
  },
  data() {
    return {
      EmployeeId: "",
      date: "",
      DecisionNumber: "",
      GradeAfterSettlement: "",
      BonusAfterSettlement: "",

      EmployeeSearch: "",
      DateFrom: "",
      DateTo: "",
      employees: [],

      pagination: {
        perPage: 25,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["Titel", "Severity", "Status"],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
      currentSort: "Titel",
      currentSortOrder: "asc"
    };
  },
  methods: {
    convert(event) {
      try {
        let d = new Date(event);
        if (isNaN(d.getFullYear()) === true) {
          return "-";
        }
        return (
          d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()

          // +
          // " , "
          // +
          // d.getHours() +
          // ":" +
          // d.getMinutes()
        );
      } catch (error) {}
    },

    notifyVue(verticalAlign, horizontalAlign, type, message, time = 10000) {
      this.$notify({
        timeout: time,
        message: message,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: type
      });
    },
    async Save() {
      try {
        let T = localStorage.getItem("Nannotoken");

        if (!this.EmployeeId) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء اختيار الموظف "
          );
        }

        if (!this.DecisionNumber) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال رقم القرار "
          );
        }

        if (!this.GradeAfterSettlement) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال العلاوة بعد التسوية "
          );
        }

        let token = atob(T);

        let schema = {
          EmployeeId: this.EmployeeId,
          Date: moment(this.date).format("YYYY/MM/DD"),
          DecisionNumber: this.DecisionNumber,
          GradeAfterSettlement: this.GradeAfterSettlement,
          BonusAfterSettlement: this.BonusAfterSettlement
        };

        let result = await axios.post(
          `${env.HR()}/api/situation-settlements`,
          schema,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        this.init();
        this.clear();
        return this.notifyVue("top", "center", "success", " تم الحفظ بنجاح ");
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.errors[Object.keys(error.response.data.errors)][0]
        );
      }
    },

    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/situation-settlements/preload`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        this.tableData = result.data.data.situationSettlements;
        this.employees = result.data.data.employees;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    },

    clear() {
      (this.EmployeeId = ""),
        (this.date = null),
        (this.DecisionNumber = ""),
        (this.GradeAfterSettlement = ""),
        (this.BonusAfterSettlement = "");
    },

    async Search() {
      try {
        this.tableData = [];
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/situation-settlements/filter?EmployeeId=${
            this.EmployeeSearch
          }&DateFrom=${moment(this.DateFrom).format("YYYY/MM/DD")}&DateTo=${
            this.DateTo
          }`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.tableData = result.data.data.results;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.errors[Object.keys(error.response.data.errors)][0]
        );
      }
    },

    handleLike(item) {
      Swal.fire({
        title: `You liked ${item.name}`,
        buttonsStyling: false,
        type: "success",
        confirmButtonClass: "md-button md-success"
      });
    },

    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    },

    handleEdit(item) {
      const offsetTop = document.getElementById("#content");
      scroll({
        top: offsetTop,
        behavior: "smooth"
      });

      this.EmployeeId = item.employeeId;
      if (item.date !== null) {
        this.date = new Date(item.date);
      }
      (this.DecisionNumber = item.decisionNumber),
        (this.GradeAfterSettlement = item.gradeAfterSettlement),
        (this.BonusAfterSettlement = env.NULL(item.bonusAfterSettlement));
    }
  }
};
</script>

<style scoped>
.mt-37 {
  margin-top: 37px;
}

.mt-12 {
  margin-top: 12px;
}
</style>
