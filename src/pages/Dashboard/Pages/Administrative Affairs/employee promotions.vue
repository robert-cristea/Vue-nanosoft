<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <form>
          <md-card class="p-25">
            <div>
              <md-card-content>
                <div class="md-layout center-content">
                  <div class="md-layout-item md-size-30 ml-15 mt-8">
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
                  <div class="md-layout-item md-size-50">
                    <md-button @click="Search" class="md-info btn_nanosoft"
                      >بحث</md-button
                    >
                    <!-- <md-button @click="Save" class="md-success btn_nanosoft">حفظ</md-button> -->
                  </div>
                </div>
              </md-card-content>
            </div>
          </md-card>
        </form>
      </div>
    </div>

    <div class="md-layout-item">
      <md-card>
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
              <md-table-cell md-label="الإسم">{{
                item.employeeName
              }}</md-table-cell>
              <md-table-cell md-label="الدرجة الحالية">{{
                item.grade
              }}</md-table-cell>
              <md-table-cell md-label="العلاوة الحالية">{{
                item.bonus
              }}</md-table-cell>
              <md-table-cell md-label="الدرجة السابقة">{{
                item.oldGrade
              }}</md-table-cell>
              <md-table-cell md-label="العلاوة السابقة">{{
                item.oldBonus
              }}</md-table-cell>
              <md-table-cell md-label="التاريخ">{{
                convert(item.date)
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
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
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

    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(`${env.HR()}/api/employee-propmotions`, {
          headers: { Authorization: "Bearer " + token }
        });

        this.tableData = result.data.data.employeePromotion.results;
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

    async Search() {
      try {
        this.tableData = [];
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/employee-propmotions/filter?EmployeeId=${
            this.EmployeeId
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
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    }
  }
};
</script>

<style scoped>
.mt-8 {
  margin-top: -5px;
}
</style>
