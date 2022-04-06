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
                    ></model-list-select>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-field>
                      <label>نوع المستقطع</label>
                      <md-select v-model="Type">
                        <md-option value="1">سلفة</md-option>
                        <md-option value="2">نفقة شرعية</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div
                    v-if="Type == '2'"
                    class="md-layout-item md-size-30 mt-25 ml-15"
                  >
                    <md-field>
                      <label>المحاكم</label>
                      <md-select v-model="CourtId">
                        <md-option
                          v-for="court in courts"
                          v-bind:key="court.key"
                          :value="court.key"
                          >{{ court.value }}</md-option
                        >
                      </md-select>
                    </md-field>
                  </div>

                  <!-- <div v-if="Type == '1'" class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-field>
                      <label>نوع الدفع</label>
                      <md-select v-model="PayType">
                        <md-option value="0">شهري</md-option>
                      </md-select>
                    </md-field>
                  </div>-->

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>المرتب الأساسي</label>
                      <md-input disabled v-model="basicSalary"></md-input>
                    </md-field>
                  </div>
                  <div
                    v-if="Type == '2'"
                    class="md-layout-item md-size-30 mt-25 ml-15"
                  >
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>قيمة النفقة</label>
                      <md-input
                        v-model="LegalExpenseValue"
                        type="number"
                      ></md-input>
                    </md-field>
                  </div>

                  <div
                    v-if="Type == '1'"
                    class="md-layout-item md-size-30 mt-25 ml-15"
                  >
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>عدد الأشهر</label>
                      <md-input v-model="Months" type="number"></md-input>
                    </md-field>
                  </div>

                  <div
                    v-if="Type == '1'"
                    class="md-layout-item md-size-30 mt-25 ml-15"
                  >
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>قيمة السلفة</label>
                      <md-input v-model="Value" type="number"></md-input>
                    </md-field>
                  </div>

                  <div
                    v-if="Type == '1'"
                    class="md-layout-item md-size-30 mt-25 ml-15"
                  >
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>قيمة المستقطع</label>
                      <md-input
                        disabled
                        :value="Number(Value) / Number(Months)"
                        type="number"
                      ></md-input>
                    </md-field>
                  </div>

                  <!-- <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-datepicker v-model="date">
                      <label class="mr-28">تاريخ بداية الإستقطاع</label>
                    </md-datepicker>
                  </div> -->

                  <!-- <div class="md-layout-item md-size-30 ml-15">
                    <h4 class="">تاريخ بداية الإستقطاع</h4>
                    <month-picker
                      :no-default="true"
                      v-model="date"
                    ></month-picker>
                  </div> -->

                  <div
                    class="md-layout-item md-layout-item-time md-size-30 ml-15"
                    style="position: relative"
                  >
                    <h4 class="monthly-picker-head" :class="{ active: date }">
                      تاريخ بداية الإستقطاع
                    </h4>
                    <vue-monthly-picker
                      class="monthly-picker"
                      alignment="right"
                      v-model="date"
                    />
                  </div>
                  <!-- 
                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-field
                      :class="[
                            { 'md-error': failed },
                            { 'md-valid': passed },
                          ]"
                    >
                      <label>ملاحظة</label>
                      <md-input v-model="Note"></md-input>
                    </md-field>
                  </div>-->
                </div>

                <div class="md-layout">
                  <div class="md-layout-item md-size-100 mt-25 center-content">
                    <md-button @click="Save" class="md-success btn_nanosoft"
                      >حفظ</md-button
                    >
                    <md-button @click="clear" class="md-info btn_nanosoft"
                      >جديد</md-button
                    >
                    <md-button @click="Confirm" class="md-info btn_nanosoft"
                      >اعتماد</md-button
                    >
                    <md-button @click="unconfirm" class="md-black btn_nanosoft"
                      >الغاء الإعتماد</md-button
                    >
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
        <!-- <md-card-header class="md-card-header-text md-card-header-green">
          <div class="card-text">
            <h4 class="title">البحث</h4>
          </div>
        </md-card-header>-->
        <md-card-content>
          <div class="md-layout flex-content-left">
            <div class="md-layout-item md-size-15">
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

              <md-table-cell md-label="نوع المستقطع">{{
                item.type == 1 ? " سلفة" : "نفقة شرعية"
              }}</md-table-cell>

              <md-table-cell md-label="المحاكم">{{
                item.courtName
              }}</md-table-cell>

              <md-table-cell md-label="تاريخ بداية الإستقطاع">{{
                item.date.split("T")[0]
              }}</md-table-cell>

              <md-table-cell md-label="عدد الاشهر">{{
                item.months
              }}</md-table-cell>

              <md-table-cell md-label="قيمة السلفة">{{
                item.value
              }}</md-table-cell>
              <md-table-cell md-label="قيمة المستقطع">{{
                item.monthlyCredit
              }}</md-table-cell>

              <md-table-cell md-label="نوع الدفع">شهري</md-table-cell>

              <md-table-cell md-label="حالة الاستقطاع">{{
                item.isActive == false ? "غير نشط" : "نشط"
              }}</md-table-cell>

              <!-- <md-table-cell md-label="ملاحظة">{{ item.note }}</md-table-cell> -->

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
import { ModelListSelect } from "vue-search-select";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
// import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import moment from "moment";
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
      Type: "1",
      PayType: "0",
      Months: 0,
      basicSalary: "",
      Value: 0,
      date: "",
      Note: "",
      CourtId: "",
      LegalExpenseValue: 0,
      btn: "new",
      idTable: "",
      courts: "",
      deductionValue: "",
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

  watch: {
    async EmployeeId() {
      try {
        if (!this.EmployeeId) {
          return;
        }
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/hr/Employees/getBasicSalary/${this.EmployeeId}`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.basicSalary = result.data.data;
      } catch (error) {
        return this.notifyVue("top", "center", "danger", error);
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
        let employeeId = localStorage.getItem("idTable");

        if (!this.EmployeeId) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء اختيار الموظف "
          );
        }

        if (this.Type == "1") {
          if (!this.Months) {
            return this.notifyVue(
              "top",
              "center",
              "danger",
              "عفواً، الرجاء ادخال عدد الأشهر "
            );
          }
          if (!this.Value) {
            return this.notifyVue(
              "top",
              "center",
              "danger",
              "عفواً، الرجاء ادخال قيمة السلفة "
            );
          }
        }

        if (this.Type == "2") {
          if (!this.LegalExpenseValue) {
            return this.notifyVue(
              "top",
              "center",
              "danger",
              "عفواً، الرجاء ادخال قيمة النفقة "
            );
          }
        }

        if (this.Type == "2") {
          if (!this.CourtId) {
            return this.notifyVue(
              "top",
              "center",
              "danger",
              "عفواً، الرجاء اختيار المحاكم "
            );
          }
        }

        if (!this.date) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء إدخال تاريخ بداية الإستقطاع  "
          );
        }

        let token = atob(T);

        let schema = {
          EmployeeId: this.EmployeeId,
          Type: this.Type,
          PayType: "0",
          Months: this.Months,
          Value: this.Value,
          Date: moment(this.date).format("YYYY-MM-DD"),
          Note: this.Note,
          CourtId: this.CourtId,
          LegalExpenseValue: this.LegalExpenseValue
        };

        if (this.btn === "new") {
          let result = await axios.post(`${env.HR()}/api/Deductions`, schema, {
            headers: { Authorization: "Bearer " + token }
          });
        } else {
          let result = await axios.put(
            `${env.HR()}/api/Deductions/${this.idTable}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        }
        this.btn = "new";
        this.init();
        this.clear();
        return this.notifyVue("top", "center", "success", " تم الحفظ بنجاح ");
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.message
        );
      }
    },

    async Confirm() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.patch(
          `${env.HR()}/api/Deductions/confirm/${this.idTable}`,
          {},
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        this.notifyVue("top", "center", "success", "تم الاعتماد بنجاح");

        return this.init();
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اختيار الطلب من الجدول"
        );
      }
    },

    async unconfirm() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.patch(
          `${env.HR()}/api/Deductions/unConfirm/${this.idTable}`,
          {},
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        this.notifyVue("top", "center", "success", "تم الغاء الإعتماد ");

        return this.init();
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اختيار الطلب من الجدول"
        );
      }
    },

    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(`${env.HR()}/api/Deductions`, {
          headers: { Authorization: "Bearer " + token }
        });
        this.tableData = result.data.data.deductions.results;
        this.courts = result.data.data.courts;
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
      // this.EmployeeId = "",
      (this.Months = ""),
        (this.Value = ""),
        (this.date = null),
        (this.Note = ""),
        (this.CourtId = ""),
        (this.LegalExpenseValue = ""),
        (this.btn = "new");
      this.EmployeeId = "";
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
    handleLike(item) {
      Swal.fire({
        title: `You liked ${item.name}`,
        buttonsStyling: false,
        type: "success",
        confirmButtonClass: "md-button md-success"
      });
    },

    handleEdit(item) {
      const offsetTop = document.getElementById("#content");
      scroll({
        top: offsetTop,
        behavior: "smooth"
      });
      (this.btn = "Edit"),
        (this.EmployeeId = item.employeeId),
        (this.Type = item.type),
        (this.PayType = item.payType),
        (this.Months = env.NULL(item.months)),
        (this.Value = env.NULL(item.value)),
        (this.date = new Date(item.date)),
        (this.Note = env.NULL(item.note)),
        (this.CourtId = env.NULL(item.courtId)),
        (this.LegalExpenseValue = env.NULL(item.legalExpenseValue)),
        (this.deductionValue = env.NULL(item.monthlyCredit)),
        (this.idTable = item.id);
    },

    handleDelete(item) {
      Swal.fire({
        text: "سيتم الحذف هل انت متأكد ؟",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "md-button md-success btn-fill",
        cancelButtonClass: "md-button md-danger btn-fill",
        confirmButtonText: "تعم",
        cancelButtonText: "لا",
        buttonsStyling: false
      }).then(async result => {
        if (result.value) {
          try {
            let T = localStorage.getItem("Nannotoken");
            let token = atob(T);
            let result = await axios.delete(
              `${env.HR()}/api/Deductions/${item.id}`,
              {
                headers: { Authorization: "Bearer " + token }
              }
            );
            this.deleteRow(item);
            this.init();
            return this.notifyVue(
              "top",
              "center",
              "success",
              "تم الحذف بنجاح "
            );
          } catch (error) {
            return this.notifyVue(
              "top",
              "center",
              "danger",
              error.response.data.message
            );
          }
        }
      });
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

<style scoped>
.mt-37 {
  margin-top: 37px;
}
</style>
