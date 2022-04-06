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

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-datepicker v-model="From">
                    <label class="mr-28">بداية الإجازة</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-datepicker v-model="To">
                    <label class="mr-28">نهاية الإجازة</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mtb-25">
                  <md-field>
                    <label>نوع الإجازة</label>
                    <md-select v-model="Type">
                      <md-option
                        v-for="Type in Types"
                        v-bind:key="Type.id"
                        :value="Type.id"
                        >{{ Type.name }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mtb-25">
                  <md-field>
                    <label>ترتيب النتائج</label>

                    <md-select v-model="CurrentPage">
                      <md-option value="0">الأحدث</md-option>
                      <md-option value="1">الأقدم</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mtb-25">
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
                </div>

                <div
                  class="md-layout-item md-size-100 mt-25 mtb-25 center-content"
                >
                  <md-button @click="Search" class="md-success btn_nanosoft"
                    >بحث</md-button
                  >
                  <md-button @click="New" class="md-info btn_nanosoft"
                    >جديد</md-button
                  >

                  <md-button class="md-info btn_nanosoft">طباعة</md-button>
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
              <md-table-cell md-label="الموظف">{{
                item.employeeFullName
              }}</md-table-cell>

              <md-table-cell md-label="رقم الملاك الوظيفي">{{
                item.employeeNumber
              }}</md-table-cell>

              <md-table-cell md-label="نوع الإجازة">{{
                item.typeName
              }}</md-table-cell>

              <md-table-cell md-label="بداية العطلة">
                {{ convert(item.startOn) }}</md-table-cell
              >

              <md-table-cell md-label="نهاية الإجازة">{{
                convert(item.finishOn)
              }}</md-table-cell>

              <md-table-cell md-label="ملاحظة">{{ item.note }}</md-table-cell>

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
      IsAllEmployees: false,
      EmployeeId: "",
      Type: "",
      From: null,
      To: null,
      CurrentPage: "",
      PageSize: "",
      Types: "",

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

    async Search() {
      try {
        this.tableData = [];
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        if (this.From == null) {
          this.From = "";
        } else {
          this.convert(this.From);
        }
        if (this.To == null) {
          this.To = "";
        } else {
          this.convert(this.To);
        }
        let result = await axios.get(
          `${env.HR()}/api/hr/Vacations/filter?EmployeeId=${
            this.EmployeeId
          }&From=${this.From}&To=${this.To}&Type=${this.Type}&CurrentPage=${
            this.CurrentPage
          }&PageSize=${this.PageSize}`,
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
    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(`${env.HR()}/api/hr/Vacations/new`, {
          headers: { Authorization: "Bearer " + token }
        });

        this.employees = result.data.data.employees;
        this.Types = result.data.data.types;
        this.tableData = result.data.data.vacations.results;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    },

    New() {
      localStorage.setItem("idTable", "");
      this.$router.push("/pages/vacation/new");
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
      this.$router.push("vacation/new");
      localStorage.setItem("idTable", item.id);
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
              `${env.HR()}/api/hr/Vacations/${item.id}`,
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
