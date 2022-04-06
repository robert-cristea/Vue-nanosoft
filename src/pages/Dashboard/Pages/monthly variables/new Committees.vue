<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <form>
          <md-card class="p-25">
            <md-card-header class="md-card-header-text md-card-header-green">
              <div
                class="card-text"
                style="position: absolute; right: 14px; top: 0px"
              >
                <h4 class="title">اللجان</h4>
              </div>
            </md-card-header>

            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-size-30 ml-15 mtb-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>اسم اللجنة</label>
                    <md-input v-model="Name"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mtb-25">
                  <md-field>
                    <label>نوع اللجنة</label>
                    <md-select v-model="TypeCommittee">
                      <md-option value="1">لجنة دائمة</md-option>
                      <md-option value="2">لجنة غير دائمة</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mtb-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رقم القرار</label>
                    <md-input v-model="DecisionNumber"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-datepicker v-model="CommitteeStartingDate">
                    <label class="mr-28">تاريخ بدء اللجنة</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-datepicker v-model="date">
                    <label class="mr-28">تاريخ تحصيل علاوة اللجنة</label>
                  </md-datepicker>
                </div>

                <div
                  class="md-layout-item md-size-100 mt-25 mtb-25 center-content"
                >
                  <!-- <md-button @click="clear" class="md-info btn_nanosoft"
                    >جديد</md-button
                  > -->
                  <md-button @click="Save" class="md-success btn_nanosoft"
                    >حفظ</md-button
                  >

                  <md-button @click="confirm" class="md-info btn_nanosoft"
                    >اعتماد</md-button
                  >

                  <md-button
                    @click="confirmBonusAccount"
                    class="md-info btn_nanosoft"
                    >اعتماد علاوة اللجنة</md-button
                  >
                  <md-button @click="unconfirm" class="md-danger btn_nanosoft"
                    >الغاء الإعتماد</md-button
                  >

                  <md-button class="md-info btn_nanosoft">طباعة</md-button>
                  <md-button @click="gobBack" class="md-black btn_nanosoft"
                    >رجوع</md-button
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
        <md-card-header class="md-card-header-text md-card-header-green">
          <div class="card-text">
            <h4 class="title">أعضاء اللجنة</h4>
          </div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-size-30 ml-15 mt-25">
              <model-list-select
                class="input-must-rtl"
                :list="employees"
                v-model="employeeId"
                option-value="key"
                option-text="value"
                placeholder="الموظف"
              >
              </model-list-select>
            </div>

            <div class="md-layout-item md-size-30 ml-15 mtb-25">
              <md-field
                :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
              >
                <label>علاوة اللجنة</label>
                <md-input v-model="committesAllowance"></md-input>
              </md-field>
            </div>

            <div class="md-layout-item md-size-30 ml-15 mtb-25">
              <md-field>
                <label>صفة الموظف في اللجنة</label>
                <md-select v-model="Descrption">
                  <md-option value="1">رئيس اللجنة</md-option>
                  <md-option value="2">عضو</md-option>
                  <md-option value="3">المقرر </md-option>
                  <md-option value="4">عضو مقرر</md-option>
                </md-select>
              </md-field>
            </div>

            <div class="md-layout-item md-size-100 mt-25 mtb-25 center-content">
              <md-button @click="Add" class="md-success btn_nanosoft"
                >اضافة</md-button
              >
            </div>
          </div>

          <div class="md-layout flex-content-left">
            <div class="md-size-15 md-layout-item">
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
              <md-table-cell md-label="الإسم">{{
                item.employeeName
              }}</md-table-cell>

              <md-table-cell md-label="علاوة اللجنة">{{
                item.committeeAllowance
              }}</md-table-cell>

              <md-table-cell
                v-if="item.description == '1'"
                md-label="صفة الموظف في اللجنة"
              >
                رئيس اللجنة
              </md-table-cell>

              <md-table-cell
                v-if="item.description == '2'"
                md-label="صفة الموظف في اللجنة"
              >
                عضو
              </md-table-cell>

              <md-table-cell
                v-if="item.description == '3'"
                md-label="صفة الموظف في اللجنة"
              >
                المقرر
              </md-table-cell>

              <md-table-cell
                v-if="item.description == '4'"
                md-label="صفة الموظف في اللجنة"
              >
                عضو مقرر
              </md-table-cell>

              <md-table-cell md-label>
                <div class="md-just-icon md-info md-simple"></div>
                <md-button
                  class="md-just-icon md-warning md-simple"
                  @click.native="handleEdit(item)"
                >
                  <md-icon>dvr</md-icon>
                </md-button>
                <md-button
                  class="md-just-icon md-danger md-simple"
                  @click.native="handleDelete(item)"
                >
                  <md-icon>close</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
          <div class="footer-table md-table">
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
          </div>
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
      id: "00000000-0000-0000-0000-000000000000",
      Name: "",
      TypeCommittee: "",
      CommitteeState: "",
      DecisionNumber: "",
      date: null,
      CommitteeStartingDate: null,

      employeeId: "",
      committesAllowance: 0,
      Descrption: "1",

      DeleteEmployees: [],
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
      let id = this.$route.params.id;
      try {
        let T = localStorage.getItem("Nannotoken");

        let token = atob(T);

        let schema = {
          Name: this.Name,
          TypeCommittee: this.TypeCommittee,
          DecisionNumber: this.DecisionNumber,
          CommitteeStartingDate:
            this.CommitteeStartingDate === null
              ? null
              : moment(this.CommitteeStartingDate).format(
                  "YYYY/MM/DD hh:mm:ss"
                ),
          DeleteEmployees: this.DeleteEmployees
        };
        if (id == "new") {
          schema["CreateDetails"] = this.tableData;
        } else {
          schema["EditDetails"] = this.tableData;
        }
        if (id == "new") {
          let result = await axios.post(`${env.HR()}/api/committees`, schema, {
            headers: { Authorization: "Bearer " + token }
          });
        } else {
          let result = await axios.put(
            `${env.HR()}/api/committees/${id}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        }
        this.notifyVue("top", "center", "success", " تم الحفظ بنجاح ");
        return this.$router.push("/pages/Committees");
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.message
        );
      }
    },

    async confirm() {
      try {
        let id = this.$route.params.id;
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.patch(
          `${env.HR()}/api/committees/${id}/confirm`,
          {},
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        return this.notifyVue(
          "top",
          "center",
          "success",
          " تم الإعتماد بنجاح "
        );
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.message
        );
      }
    },

    async unconfirm() {
      try {
        let id = this.$route.params.id;
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.patch(
          `${env.HR()}/api/committees/${id}/unconfirm`,
          {},
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        return this.notifyVue("top", "center", "success", " تم إلغاء الإعتماد");
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.message
        );
      }
    },

    async confirmBonusAccount() {
      try {
        let id = this.$route.params.id;
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        let result = await axios.patch(
          `${env.HR()}/api/committees/${id}/confirmBonusAccount?confirmDate=${moment(
            this.date
          ).format("YYYY/MM/DD hh:mm:ss")}`,
          {},
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        return this.notifyVue(
          "top",
          "center",
          "success",
          "تم اعتماد علاوة اللجنة"
        );
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
        let id = this.$route.params.id;

        if (id != "new") {
          let result_edit = await axios.get(
            `${env.HR()}/api/committees/${id}`,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );

          this.Name = result_edit.data.data.name;
          this.DecisionNumber = result_edit.data.data.decisionNumber;

          if (result_edit.data.data.committeeStartingDate != null) {
            this.CommitteeStartingDate = new Date(
              result_edit.data.data.committeeStartingDate
            );
          }

          if (result_edit.data.data.committeeDate != null) {
            this.date = new Date(result_edit.data.data.committeeDate);
          }

          this.TypeCommittee = result_edit.data.data.typeCommittee;

          this.tableData = result_edit.data.data.details;
          this.employees = result_edit.data.data.employees;
        } else {
          let result_new = await axios.get(`${env.HR()}/api/committees/new`, {
            headers: { Authorization: "Bearer " + token }
          });

          this.employees = result_new.data.data.employees;
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

    Add() {
      if (!this.employeeId) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "عفواً، الرجاء ادخال الموظف "
        );
      }

      let schema = {
        employeeId: this.employeeId,
        committeeAllowance: this.committesAllowance,
        description: this.Descrption
      };

      let id = this.$route.params.id;

      if (id != "new") {
        schema["Id"] = "00000000-0000-0000-0000-000000000000";
      } else {
        schema["Id"] = "";
      }

      for (var i = 0; i < this.employees.length; i++) {
        if (this.employees[i].key == schema.employeeId) {
          schema.employeeName = this.employees[i].value;
        }
      }

      if (this.btn == "new") {
        this.tableData.push(schema);
      } else {
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].employeeId == this.id) {
            this.tableData.splice(i, 1);
          }
        }

        this.tableData.push(schema);
      }

      this.employeeId = "";
      this.committesAllowance = 0;
      this.Descrption = "1";
      this.btn = "new";
    },

    gobBack() {
      this.$router.push("/pages/Committees");
    },

    handleEdit(item) {
      this.employeeId = item.employeeId;
      this.committesAllowance = item.committeeAllowance;
      this.Descrption = item.description;
      this.btn = "edit";
      this.id = item.employeeId;
    },

    handleDelete(item) {
      try {
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].employeeId == item.employeeId) {
            this.tableData.splice(i, 1);
          }
        }
        if (item.id != undefined) {
          let schema = {
            id: item.id
          };

          this.DeleteEmployees.push(schema);
        }

        return this.notifyVue(
          "top",
          "center",
          "warning",
          "لتأكيد الحذف الرجاء الضغط  على زر الحفظ"
        );
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.errors[Object.keys(error.response.data.errors)][0]
        );
      }
    },
    deleteRow(item) {
      let indexToDelete = this.tableData.findIndex(
        tableRow => tableRow.id === item.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
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
