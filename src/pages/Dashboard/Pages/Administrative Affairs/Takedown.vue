<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <ValidationObserver v-slot="{ failed, passed }">
          <form>
            <md-card class="p-25">
              <md-card-content>
                <div class="md-layout">
                  <div
                    v-if="idTable == ''"
                    class="md-layout-item md-size-30 ml-15 mt-25"
                  >
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

                  <div v-else class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>الموظف</label>
                      <md-input disabled v-model="employeeName"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field>
                      <label>نوع انتهاء الخدمة</label>
                      <md-select v-model="Type">
                        <md-option value="1">استقالة</md-option>
                        <md-option value="2">فصل من الخدمة</md-option>
                        <md-option value="3"
                          >تقاعد لبلوغ السن القانونية</md-option
                        >
                        <md-option value="4">تقاعد اختياري</md-option>
                        <md-option value="5">وفاة</md-option>
                        <md-option value="6">انهاء الندب</md-option>
                        <md-option value="7">نقل</md-option>
                        <md-option value="8">استقالة اعتبارية</md-option>
                        <md-option value="9">فسخ عقد</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-datepicker v-model="EndOfServiceDate">
                      <label class="mr-28">تاريخ انتهاء الخدمة</label>
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

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-datepicker v-model="DecisionDate">
                      <label class="mr-28">تاريخ القرار</label>
                    </md-datepicker>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>ملاحظة انتهاء الخدمة</label>
                      <md-input v-model="Cause"></md-input>
                    </md-field>
                  </div>
                  <div
                    class="
                      md-layout-item md-size-100
                      mt-25
                      mtb-25
                      center-content
                    "
                  >
                    <md-button @click="Save" class="md-success btn_nanosoft"
                      >حفظ</md-button
                    >
                    <md-button @click="clear" class="md-info btn_nanosoft"
                      >جديد</md-button
                    >

                    <md-button @click="clear" class="md-info btn_nanosoft"
                      >طباعة</md-button
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
              <md-table-cell md-label="الاسم">{{
                item.employeeName
              }}</md-table-cell>

              <md-table-cell
                v-if="item.type == '1'"
                md-label="نوع انتهاء الخدمة"
              >
                استقالة
              </md-table-cell>

              <md-table-cell
                v-if="item.type == '2'"
                md-label="نوع انتهاء الخدمة"
              >
                فصل من الخدمة
              </md-table-cell>

              <md-table-cell
                v-if="item.type == '3'"
                md-label="نوع انتهاء الخدمة"
              >
                تقاعد لبلوغ السن القانونية
              </md-table-cell>

              <md-table-cell
                v-if="item.type == '4'"
                md-label="نوع انتهاء الخدمة"
              >
                تقاعد اختياري
              </md-table-cell>

              <md-table-cell
                v-if="item.type == '5'"
                md-label="نوع انتهاء الخدمة"
              >
                وفاة
              </md-table-cell>

              <md-table-cell
                v-if="item.type == '6'"
                md-label="نوع انتهاء الخدمة"
              >
                انهاء الندب
              </md-table-cell>

              <md-table-cell
                v-if="item.type == '7'"
                md-label="نوع انتهاء الخدمة"
              >
                نقل
              </md-table-cell>

              <md-table-cell
                v-if="item.type == '8'"
                md-label="نوع انتهاء الخدمة"
              >
                استقالة اعتبارية
              </md-table-cell>

              <md-table-cell
                v-if="item.type == '9'"
                md-label="نوع انتهاء الخدمة"
              >
                فسخ عقد
              </md-table-cell>

              <md-table-cell md-label="تاريخ انتهاء الخدمة">{{
                convert(item.endOfServiceDate)
              }}</md-table-cell>

              <md-table-cell md-label="رقم القرار">{{
                item.decisionNumber
              }}</md-table-cell>

              <md-table-cell md-label="تاريخ القرار">{{
                item.decisionDate == null ? "" : convert(item.decisionDate)
              }}</md-table-cell>

              <md-table-cell md-label="ملاحظة انتهاء الخدمة">{{
                item.cause
              }}</md-table-cell>

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
      employeeName: "",
      Type: "",
      EndOfServiceDate: null,
      DecisionNumber: "",
      DecisionDate: null,
      Cause: "",

      tableData: [],
      btn: "new",
      idTable: "",
      employees: [],
      updateStatus: "",

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
            "عفواً، الرجاء اختيار الموظف   "
          );
        }

        if (!this.Type) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء اختيار نوع انتهاء الخدمة "
          );
        }

        if (!this.EndOfServiceDate) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء إدخال تاريخ انتهاء الخدمة "
          );
        }

        let token = atob(T);

        let schema = {
          EmployeeId: this.EmployeeId,
          Type: this.Type,
          EndOfServiceDate: moment(this.EndOfServiceDate).format(
            "YYYY/MM/DD hh:mm:ss"
          ),
          DecisionNumber: this.DecisionNumber,
          DecisionDate: new Date(
            moment(this.DecisionDate).format("YYYY/MM/DD hh:mm:ss")
          ),
          Cause: this.Cause
        };

        if (this.btn === "new") {
          let result = await axios.post(
            `${env.HR()}/api/end-services`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        } else {
          let result = await axios.put(
            `${env.HR()}/api/end-services/${this.idTable}`,
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

    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(`${env.HR()}/api/end-services/preload`, {
          headers: { Authorization: "Bearer " + token }
        });

        this.tableData = result.data.data.endServices;
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
        (this.Type = ""),
        (this.EndOfServiceDate = null),
        (this.DecisionNumber = ""),
        (this.DecisionDate = null),
        (this.Cause = ""),
        (this.btn = "new");
      this.idTable = "";
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

      (this.EmployeeId = item.employeeId),
        (this.employeeName = item.employeeName),
        alert;
      this.Type = item.type;
      if (item.endOfServiceDate !== null) {
        this.EndOfServiceDate = new Date(item.endOfServiceDate);
      }
      this.DecisionNumber = env.NULL(item.decisionNumber);
      if (item.decisionDate !== null) {
        this.DecisionDate = new Date(item.decisionDate);
      }
      (this.Cause = env.NULL(item.cause)), (this.btn = "Edit");
      this.idTable = item.id;
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
              `${env.HR()}/api/end-services/${item.id}`,
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
            let result =
              error.response.data.errors[
                Object.keys(error.response.data.errors)[0]
              ];
            return this.notifyVue("top", "center", "danger", result[0]);
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
