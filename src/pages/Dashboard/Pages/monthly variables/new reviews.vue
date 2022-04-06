<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <form>
          <md-card class="p-25">
            <md-card-content>
              <div class="md-layout">
                <div
                  v-if="btn == 'Edit'"
                  class="md-layout-item md-size-30 ml-15 mtb-25"
                >
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>الموظف</label>
                    <md-input disabled v-model="fullName"></md-input>
                  </md-field>
                </div>

                <div
                  v-if="btn == 'new'"
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  style="position: relative"
                >
                  <p
                    style="
                      position: absolute;
                      top: 10px;
                      right: 5px;
                      color: red;
                    "
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

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-datepicker v-model="DateFrom">
                    <p class="validate">*</p>

                    <label class="mr-28">تاريخ التقييم من</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-datepicker v-model="DateTo">
                    <p class="validate">*</p>

                    <label class="mr-28">تاريخ التقييم الى</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ملاحظة</label>
                    <md-input v-model="Notes"></md-input>
                  </md-field>
                </div>

                <div
                  class="md-layout-item md-size-100 mt-25 mtb-25 center-content"
                >
                  <!-- <md-button  @click="clear" class="md-info btn_nanosoft"
                    >جديد</md-button
                  > -->
                  <md-button @click="Save" class="md-success btn_nanosoft"
                    >حفظ</md-button
                  >
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
        <md-card-content>
          <div class="md-layout flex-content-left">
            <div class="md-size-15 md-layout-item mt-25">
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
              <md-table-cell md-label="نوع التقييم">{{
                item.evaluationTypeName
              }}</md-table-cell>

              <md-table-cell md-label="نسية التقييم">
                <md-field
                  class="
                    md-layout-item
                    md-size-25
                    md-medium-size-30
                    md-xsmall-size-100
                    md-size-small-100
                    mt-25
                  "
                >
                  <md-input v-model="item.ratio"></md-input>
                </md-field>
              </md-table-cell>

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
      EmployeeId: "",
      fullName: "",
      DateTo: null,
      DateFrom: null,
      Notes: "",
      tableData: [],
      Evaluation: [],

      Details: [
        {
          evaluationTypeId: "",
          ratio: ""
        }
      ],

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
      }
      if (this.one == "false") {
        this.tow = true;
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
      let id = this.$route.params.id;
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

        if (!this.DateFrom) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء تحديد التاريخ "
          );
        }

        if (!this.DateTo) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء تحديد التاريخ "
          );
        }

        let token = atob(T);
        let schema = {
          EmployeeId: this.EmployeeId,
          DateFrom: moment(this.DateFrom).format("YYYY/MM/DD hh:mm:ss"),
          DateTo: moment(this.DateTo).format("YYYY/MM/DD hh:mm:ss"),
          Notes: this.Notes,
          Details: this.tableData
        };

        if (id) {
          let result = await axios.post(`${env.HR()}/api/Evaluations`, schema, {
            headers: { Authorization: "Bearer " + token }
          });
        } else {
          let result = await axios.put(
            `${env.HR()}/api/Evaluations/${id}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        }

        this.$router.push("/pages/evaluation");
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

        let result_edit = await axios.get(`${env.HR()}/api/Evaluations/${id}`, {
          headers: { Authorization: "Bearer " + token }
        });
        if (id != "new") {
          this.btn = "Edit";
          this.Evaluation = result_edit.data.data;
          this.EmployeeId = this.Evaluation.employeeId;
          this.fullName = this.Evaluation.fullName;
          this.DateFrom = new Date(this.Evaluation.dateFrom);
          this.DateTo = new Date(this.Evaluation.dateTo);
          this.Notes = this.Evaluation.notes;
          this.tableData = result_edit.data.data.details;
        } else {
          this.btn = "new";
          let result_new = await axios.get(`${env.HR()}/api/Evaluations/new`, {
            headers: { Authorization: "Bearer " + token }
          });
          this.employees = result_new.data.data.employees;
          this.tableData = result_edit.data.data.details;
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
      this.$router.push("/pages/evaluation");
    },

    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    }
  }
};
</script>
