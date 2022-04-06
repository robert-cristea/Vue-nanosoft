<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
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

                <!-- <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-datepicker v-model="MonthDate">
                    <label class="mr-28">تاريخ الشهر</label>
                  </md-datepicker>
                </div> -->

                <div
                  class="md-layout-item md-layout-item-time md-size-30 ml-15"
                  style="position: relative"
                >
                  <h4
                    class="monthly-picker-head"
                    :class="{ active: MonthDate }"
                  >
                    تاريخ الشهر
                  </h4>
                  <vue-monthly-picker
                    class="monthly-picker"
                    alignment="right"
                    v-model="MonthDate"
                  />
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>حالة الفروقات</label>
                    <md-select v-model="State">
                      <md-option value="true">معتمد</md-option>
                      <md-option value="false">غير معتمد</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div
                  class="md-layout-item md-size-100 mt-25 mtb-25 center-content"
                >
                  <md-button @click="Search" class="md-success btn_nanosoft"
                    >بحث</md-button
                  >

                  <md-button @click="confirm" class="md-info btn_nanosoft"
                    >اعتماد</md-button
                  >
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
    </div>

    <div class="md-layout-item">
      <md-card>
        <md-card-content>
          <div class="md-layout flex-content-left">
            <div class="md-size-15 md-layout-item mt-25">
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
              <md-table-cell>
                <div class="md-layout-item md-size-20 center-content">
                  <md-checkbox
                    v-model="item.isConfirm"
                    @change="add(item)"
                  ></md-checkbox>
                </div>
              </md-table-cell>

              <md-table-cell md-label="الإسم">{{
                item.employeeName
              }}</md-table-cell>

              <md-table-cell md-label="اسم الوحدة التنظيمية">{{
                item.departmentName
              }}</md-table-cell>

              <md-table-cell md-label="التاريخ الشهر">{{
                convert(item.monthDate)
              }}</md-table-cell>

              <md-table-cell md-label="المرتب الأساسي المحال من المالية">{{
                item.newBasicSalary
              }}</md-table-cell>

              <md-table-cell md-label="المرتب الأساسي">{{
                item.basicSalary
              }}</md-table-cell>

              <md-table-cell md-label="فروقات المرتب">{{
                item.totalsDifferences
              }}</md-table-cell>

              <md-table-cell md-label="حالة الفروقات">{{
                item.state == false ? "غير معتمد" : "معتمد"
              }}</md-table-cell>

              <md-table-cell md-label>
                <div class="md-just-icon md-info md-simple"></div>
                <!-- <md-button
                  class="md-just-icon md-warning md-simple"
                  @click.native="handleEdit(item)"
                >
                  <md-icon>dvr</md-icon>
                </md-button> -->
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
import axios from "../../../../components/service/HTTP";
import { Pagination } from "@/components";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import moment from "moment";
import { ModelListSelect } from "vue-search-select";
// import { SlideYDownTransition } from "vue2-transitions";
// import { extend } from "vee-validate";
// import { required, numeric, regex, confirmed } from "vee-validate/dist/rules";
import env from "../../../../../env";
// extend("required", required);
// extend("numeric", numeric);
// extend("regex", regex);
// extend("confirmed", confirmed);
export default {
  async created() {
    this.init();
  },
  components: {
    Pagination,
    ModelListSelect
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
      MonthDate: null,
      State: "",

      tableData: [],
      employees: [],
      SelectedSalary: [],

      pagination: {
        perPage: 25,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["Titel", "Severity", "Status"],
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

    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
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

    async Search() {
      try {
        this.tableData = [];
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        if (this.MonthDate == null) {
          this.MonthDate = "";
        } else {
          this.MonthDate = this.convert(this.MonthDate);
        }

        let result = await axios.get(
          `${env.HR()}/api/salariesDifferences/filter?EmployeeId=${
            this.EmployeeId
          }&MonthDate=${this.MonthDate}&State=${this.State}`,
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
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    },

    add(item) {
      if (item.isConfirm == true) {
        this.SelectedSalary.push(item.id);
      } else {
        for (let i = 0; i < this.SelectedSalary.length; i++) {
          if (this.SelectedSalary[i] == item.id) {
            this.SelectedSalary.splice(i, 1);
          }
        }
      }
    },

    async confirm() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        if (!this.MonthDate) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال تاريخ الشهر "
          );
        }

        let schema = {
          MonthDate: moment(this.MonthDate).format("YYYY/MM/DD hh:mm:ss"),
          SelectedSalary: this.SelectedSalary
        };

        let result = await axios.patch(
          `${env.HR()}/api/salariesDifferences/confirm`,
          schema,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        return this.notifyVue("top", "center", "success", result.data.message);
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.message
        );
      }
    },

    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");

        let token = atob(T);

        let result = await axios.get(`${env.HR()}/api/salariesDifferences`, {
          headers: { Authorization: "Bearer " + token }
        });
        this.tableData = result.data.data.salaryDifferences.results;
        this.employees = result.data.data.employees;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    }
  }
};
</script>

<style>
.md-table-cell-container {
  width: max-content;
}
</style>
