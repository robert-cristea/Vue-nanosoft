<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header class="md-card-header-text md-card-header-green">
            <div class="card-text">
              <h4 class="title">البحث عن الموظفين</h4>
            </div>
          </md-card-header>

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

              <div class="md-layout-item md-size-30 ml-15 mt-25">
                <md-field>
                  <label>تصنيف الفروع</label>
                  <md-select v-model="ClassificationsId">
                    <md-option
                      v-for="dep in departmentClassifications"
                      v-bind:key="dep.id"
                      :value="dep.id"
                      >{{ dep.name }}</md-option
                    >
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout-item md-size-30 ml-15 mt-25">
                <model-list-select
                  class="input-must-rtl"
                  :list="departments"
                  v-model="Administration"
                  option-value="id"
                  option-text="name"
                  placeholder="الإدارة/المكتب"
                >
                </model-list-select>
              </div>

              <!-- <div class="md-layout-item md-size-30 ml-15 mt-25">
                <md-field>
                  <label>الإدارة/المكتب</label>
                  <md-select v-model="Administration">
                    <md-option
                      v-for="departments in departments"
                      v-bind:key="departments.id"
                      :value="departments.id"
                      >{{ departments.name }}</md-option
                    >
                  </md-select>
                </md-field>
              </div> -->

              <!-- <div class="md-layout-item md-size-30 ml-15 mt-25">
                <md-field>
                  <label>القسم/المشروع</label>
                  <md-select v-model="Section">
                    <md-option
                      v-for="depa_S in departments_Section"
                      v-bind:key="depa_S.id"
                      :value="depa_S.id"
                      >{{ depa_S.name }}</md-option
                    >
                  </md-select>
                </md-field>
              </div> -->

              <div class="md-layout-item md-size-30 ml-15 mt-25">
                <model-list-select
                  class="input-must-rtl"
                  :list="departments_Section"
                  v-model="Section"
                  option-value="id"
                  option-text="name"
                  placeholder="القسم/المشروع"
                >
                </model-list-select>
              </div>

              <div
                v-if="HasNoSalary == true"
                class="md-layout-item md-size-30 mt-25 ml-15"
              >
                <md-datepicker v-model="MonthDate_E">
                  <label class="mr-28">تاريخ الشهر </label>
                </md-datepicker>
              </div>

              <div class="md-layout mt-25">
                <div class="md-layout-item md-size-100">
                  <md-checkbox v-model="HasNoSalary"
                    >لم يتم احتساب مرتب له في هذا الشهر</md-checkbox
                  >
                </div>
              </div>
              <!-- <div class="md-layout-item md-size-30 ml-15 mtb-25">
                <md-field>
                  <label>عدد النتائج</label>

                  <md-select v-model="PageSize">
                    <md-option value="000">All</md-option>
                    <md-option value="25">25</md-option>
                    <md-option value="50">50</md-option>
                    <md-option value="75">75</md-option>
                    <md-option value="100">100</md-option>
                  </md-select>
                </md-field>
              </div> -->

              <div
                class="md-layout-item md-size-100 mt-25 mtb-25 center-content"
              >
                <md-button @click="Search" class="md-success btn_nanosoft"
                  >بحث عن الموظفين</md-button
                >

                <md-button @click="Clear" class="btn_nanosoft"
                  >إفراغ الحقول</md-button
                >
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>

    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-text md-card-header-green">
          <div class="card-text">
            <h4 class="title">إعداد المرتبات</h4>
          </div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout">
            <div
              class="md-layout-item md-layout-item-time md-size-30 ml-15"
              style="position: relative"
            >
              <h4 class="monthly-picker-head" :class="{ active: MonthDate }">
                شهر المرتب
              </h4>
              <vue-monthly-picker
                class="monthly-picker"
                alignment="right"
                v-model="MonthDate"
              />
            </div>
            <!-- <div class="md-layout-item md-size-30 mt-25 ml-15">
              <md-datepicker v-model="MonthDate">
                <p class="validate">*</p>
                <label class="mr-28">شهر المرتب</label>
              </md-datepicker>
            </div> -->
            <div class="md-layout-item md-size-30 mt-25 ml-15">
              <md-datepicker v-model="PaymentDate">
                <p class="validate">*</p>
                <label class="mr-28">تاريخ الصرف </label>
              </md-datepicker>
            </div>

            <div class="md-layout-item md-size-30 mt-25 center-content">
              <md-checkbox v-model="IsTimeSheet"
                >عدم احتساب المرتب من جدول الحضور والإنصراف</md-checkbox
              >
            </div>

            <div class="md-layout-item md-size-100 mt-25 mtb-25 center-content">
              <md-button @click="Save" class="md-success btn_nanosoft"
                >احتساب</md-button
              >
            </div>
          </div>

          <div class="md-layout flex-content-left">
            <div class="md-size-15 md-layout-item">
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

          <div class="md-layout">
            <div class="md-layout-item md-size-100">
              <md-checkbox @change="selectAll" v-model="All"
                >اختيار الكل</md-checkbox
              >
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
                    v-model="item.isActive"
                    @change="add(item)"
                  ></md-checkbox>
                </div>
              </md-table-cell>

              <md-table-cell md-label="رقم الملاك الوظيفي">{{
                item.jobNumber
              }}</md-table-cell>

              <md-table-cell md-label="الأسم">{{
                item.fullName
              }}</md-table-cell>

              <md-table-cell md-label="الوحدة التنظيمية">{{
                item.departmentName
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
      calendarConfigs: {
        sundayStart: false,
        dateFormat: "mm/yyyy",
        isDatePicker: false,
        isDateRange: false,
        isDark: true,
        changeYearFunction: true,
        changeMonthFunction: true,
        dateFormat: "yyyy/mm"
      },
      HasNoSalary: false,
      MonthDate_E: "",
      All: false,
      EmployeeId: "",
      ClassificationsId: "",
      Administration: "",
      Section: "",
      DeparatmentId: "",

      MonthDate: null,
      PaymentDate: null,
      IsTimeSheet: false,

      SelectedEmployees: [],
      tableData: [],
      employees: [],
      departmentClassifications: [],
      departments: [],
      departments_Section: [],

      btn: "new",
      idTable: "",
      updateStatus: "",
      balance: 0,
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

  watch: {
    async Administration() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        if (this.Administration != "") {
          let result = await axios.get(
            `${env.HR()}/api/Departments/${this.Administration}/load`,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
          (this.Section = ""), (this.departments_Section = result.data.data);
        }
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    }
  },

  methods: {
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    },
    async Save() {
      try {
        let T = localStorage.getItem("Nannotoken");

        if (!this.MonthDate) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال تاريخ الشهر "
          );
        }

        if (!this.PaymentDate) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال تاريخ الصرف"
          );
        }

        let token = atob(T);

        let schema = {
          MonthDate: moment(this.MonthDate).format("YYYY/MM/DD hh:mm:ss"),
          PaymentDate: moment(this.PaymentDate).format("YYYY/MM/DD hh:mm:ss"),
          IsTimeSheet: this.IsTimeSheet,
          SelectedEmployees: this.SelectedEmployees
        };

        let result = await axios.post(`${env.HR()}/api/Salaries`, schema, {
          headers: { Authorization: "Bearer " + token }
        });
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

    Clear() {
      (this.EmployeeId = ""),
        (this.ClassificationsId = ""),
        (this.Administration = ""),
        (this.Section = "");
    },

    async Search() {
      try {
        this.tableData = [];
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        // if (
        //   !this.EmployeeId &&
        //   !this.Administration &&
        //   !this.ClassificationsId
        // ) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء الإدخال "
        //   );
        // }

        if (this.Section == "") {
          this.DeparatmentId = this.Administration;
        } else {
          this.DeparatmentId = this.Section;
        }

        if (this.MonthDate_E == null) {
          this.MonthDate_E = "";
        } else {
          this.MonthDate_E = this.convert(this.MonthDate_E);
        }

        let result = await axios.get(
          `${env.HR()}/api/hr/Employees/SearchForSalaries?EmployeeId=${
            this.EmployeeId
          }&ClassificationsId=${this.ClassificationsId}&DeparatmentId=${
            this.DeparatmentId
          }&MonthDate=${this.MonthDate_E}&HasNoSalary=${this.HasNoSalary}`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        for (let i = 0; i < result.data.data.length; i++) {
          let schema = {
            jobNumber: result.data.data[i].jobNumber,
            employeeId: result.data.data[i].employeeId,
            fullName: result.data.data[i].fullName,
            departmentName: result.data.data[i].departmentName,
            isActive: false
          };
          this.tableData.push(schema);
        }
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
      if (item.isActive == true) {
        this.SelectedEmployees.push(item.employeeId);
      } else {
        for (let i = 0; i < this.SelectedEmployees.length; i++) {
          if (this.SelectedEmployees[i] == item.employeeId) {
            this.SelectedEmployees.splice(i, 1);
          }
        }
      }
    },

    selectAll() {
      if (this.All === true)
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].isActive = true;
          this.add(this.tableData[i]);
        }
      else {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].isActive = false;
          this.add(this.tableData[i]);
        }
      }
    },

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

    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        let result = await axios.get(`${env.HR()}/api/Salaries`, {
          headers: { Authorization: "Bearer " + token }
        });
        this.employees = result.data.data.employees;
        this.departmentClassifications =
          result.data.data.departmentClassifications;
        this.departments = result.data.data.departments;

        let result_Setting = await axios.get(`${env.HR()}/api/Setting`, {
          headers: { Authorization: "Bearer " + token }
        });
        this.IsTimeSheet =
          result_Setting.data.data.calculateSalriesFromTimeSheet;
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
