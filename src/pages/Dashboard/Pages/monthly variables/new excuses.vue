<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <form>
          <md-card class="p-25">
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <md-select v-model="one">
                      <md-option value="true">موظف واحد</md-option>
                      <md-option value="false">كافة الموظفين</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <md-select disabled v-model="tow">
                      <md-option value="true">حسب الإدارة</md-option>
                      <md-option value="false">كافة الإدارات</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div v-if="show" class="md-layout-item md-size-30 ml-15 mt-25">
                  <p
                    style="
                      position: absolute;
                      top: 48px;
                      right: 24px;
                      color: red;
                    "
                    class="validate"
                  >
                    *
                  </p>
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

                <div
                  v-if="one == 'false'"
                  class="md-layout-item md-size-30 ml-15 mt-25"
                >
                  <model-list-select
                    class="input-must-rtl"
                    :list="departmentsAndUnites"
                    v-model="departmentsAndUnitesId"
                    option-value="id"
                    option-text="name"
                    placeholder="الإدرات/المكاتب"
                  ></model-list-select>
                </div>

                <div
                  v-if="one == 'false'"
                  class="md-layout-item md-size-30 ml-15 mt-25"
                >
                  <md-field>
                    <label>الأقسام والمشروعات</label>
                    <md-select v-model="departmentsLoadId">
                      <md-option
                        v-for="department in departmentsLoad"
                        v-bind:key="department.id"
                        :value="department.id"
                        >{{ department.name }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>

                <div
                  v-if="one == 'false'"
                  class="md-layout-item md-size-30 ml-15 mt-25"
                >
                  <md-field>
                    <label>الوحدات</label>
                    <md-select v-model="loadUnitsId">
                      <md-option
                        v-for="department in loadUnits"
                        v-bind:key="department.id"
                        :value="department.id"
                        >{{ department.name }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-datepicker v-model="date">
                    <p class="validate">*</p>
                    <label class="mr-28">التاريخ</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mtb-25">
                  <md-field>
                    <p class="validate">*</p>
                    <label>نوع العذر</label>

                    <md-select v-model="Type">
                      <md-option value="1">حضور متأخر</md-option>
                      <md-option value="2">خروج مبكر</md-option>
                      <md-option value="3">غياب</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <p class="validate">*</p>
                    <label>ملاحظة</label>
                    <md-input v-model="Note"></md-input>
                  </md-field>
                </div>

                <div
                  class="md-layout-item md-size-100 mt-25 mtb-25 center-content"
                >
                  <!-- <md-button v-if="id == ''" @click="clear" class="md-info btn_nanosoft"
                    >جديد</md-button
                  > -->
                  <md-button @click="Save" class="md-success btn_nanosoft"
                    >حفظ</md-button
                  >
                  <md-button @click="gobBack" class="md-info btn_nanosoft"
                    >رجوع</md-button
                  >
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../../../components/service/HTTP";
// import { Pagination } from "@/components";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import moment from "moment";
// import { ModelListSelect } from "vue-search-select";
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
    // Pagination,
    // ModelListSelect,
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
      one: true,
      tow: false,
      show: true,

      EmployeeId: "",
      date: "",
      Note: "",
      Type: "",
      DepartmentId: "",

      departmentsAndUnites: [],
      departmentsAndUnitesId: "",
      departmentsLoadId: "",
      departmentsLoad: [],
      loadUnitsId: "",
      loadUnits: [],

      tableData: [],
      btn: "new",
      idTable: "",
      employees: [],
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
      fuseSearch: null
    };
  },

  watch: {
    one() {
      if (this.one == "true") {
        this.tow = false;
        this.show = true;
      }
      if (this.one == "false") {
        this.tow = true;
        this.show = false;
      }
    },

    async departmentsAndUnitesId() {
      try {
        this.departmentsLoadId = "";
        this.loadUnitsId = "";
        if (this.departmentsAndUnitesId === "") {
          return;
        }
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/departments/${this.departmentsAndUnitesId}/load`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.departmentsLoad = result.data.data;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    },
    async departmentsLoadId() {
      try {
        if (this.departmentsLoadId === "") {
          return;
        }
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/departments/${this.departmentsLoadId}/loadUnits`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.loadUnits = result.data.data;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    },
    async departmentId() {
      try {
        if (this.updateStatus === true) {
          return (this.updateStatus = false);
        }
        if (this.departmentId === null) {
          return;
        }
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/departments/${this.departmentId}/preloadAsChild`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.number = result.data.data.number;
        this.code = result.data.data.code;
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
        let id = this.$route.params.id;

        // if (!this.EmployeeId && IsAllEmployees ==false ) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء اختيار الموظف   "
        //   );
        // }

        let token = atob(T);

        if (this.departmentsLoadId == "" && this.loadUnitsId == "") {
          this.DepartmentId = this.departmentsAndUnitesId;
        } else if (this.loadUnitsId == "") {
          this.DepartmentId = this.departmentsLoadId;
        } else {
          this.DepartmentId = this.loadUnitsId;
        }

        let schema = {
          EmployeeId: this.EmployeeId,
          Type: this.Type,
          Date: moment(this.date).format("YYYY/MM/DD hh:mm:ss"),
          Note: this.Note,
          DepartmentId: this.DepartmentId
        };
        if (id == "new") {
          let result = await axios.post(`${env.HR()}/api/Excuses`, schema, {
            headers: { Authorization: "Bearer " + token }
          });
        } else {
          let result = await axios.put(
            `${env.HR()}/api/Excuses/${id}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        }
        this.$router.push("/pages/excuses");

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
        let id = this.$route.params.id;

        let token = atob(T);
        let result = await axios.get(`${env.HR()}/api/Excuses`, {
          headers: { Authorization: "Bearer " + token }
        });

        this.employees = result.data.data.employees;
        this.departmentsAndUnites = result.data.data.departments;

        if (id != "new") {
          let result = await axios.get(`${env.HR()}/api/Excuses/${id}`, {
            headers: { Authorization: "Bearer " + token }
          });

          (this.EmployeeId = result.data.data.employeeId),
            (this.date = new Date(result.data.data.date)),
            (this.Note = result.data.data.note),
            (this.Type = result.data.data.type);
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

    gobBack() {
      this.$router.push("/pages/excuses");
    }
  },

  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["Titel", "SystemVersion"],
      threshold: 0.3
    });
  }
};
</script>
