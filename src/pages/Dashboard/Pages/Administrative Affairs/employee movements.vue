<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <ValidationObserver>
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

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field>
                      <label>نوع المتغير</label>
                      <md-select v-model="Type">
                        <md-option value="1">ندب</md-option>
                        <md-option value="2">موقوف</md-option>
                        <md-option value="3">افراج</md-option>
                        <md-option value="4">نقل</md-option>
                        <md-option value="5">ايقاف عن العمل</md-option>
                        <md-option value="6">استقالة</md-option>
                        <md-option value="7">فصل من الخدمة</md-option>
                        <md-option value="8">تقاعد</md-option>
                        <md-option value="9">تقاعد اختياري</md-option>
                        <md-option value="10">انهاء الندب</md-option>
                        <md-option value="11">مستمر</md-option>
                        <md-option value="12">منقطع</md-option>
                        <md-option value="13">وفاة</md-option>
                        <md-option value="14">علاوة</md-option>
                        <md-option value="15">الدرجة</md-option>
                        <md-option value="16">اجازة</md-option>
                        <md-option value="17">تقييم</md-option>
                        <md-option value="18">مؤهل علمي</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-datepicker v-model="DateFrom">
                      <label class="mr-28">من تاريخ</label>
                    </md-datepicker>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-datepicker v-model="DateTo">
                      <label class="mr-28">الى تاريخ</label>
                    </md-datepicker>
                  </div>

                  <div class="md-layout-item md-size-60 mt-25 mtb-25">
                    <md-button @click="Search" class="md-success btn_nanosoft"
                      >بحث</md-button
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
                v-if="item.variablesType == '1'"
                md-label="نوع المتغير"
              >
                ندب
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '2'"
                md-label="نوع المتغير"
              >
                موقوف
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '3'"
                md-label="نوع المتغير"
              >
                افراج
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '4'"
                md-label="نوع المتغير"
              >
                نقل
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '5'"
                md-label="نوع المتغير"
              >
                ايقاف عن العمل
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '6'"
                md-label="نوع المتغير"
              >
                استقالة
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '7'"
                md-label="نوع المتغير"
              >
                فصل من الخدمة
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '8'"
                md-label="نوع المتغير"
              >
                تقاعد
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '9'"
                md-label="نوع المتغير"
              >
                تقاعد اختياري
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '10'"
                md-label="نوع المتغير"
              >
                انهاء الندب
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '11'"
                md-label="نوع المتغير"
              >
                مستمر
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '12'"
                md-label="نوع المتغير"
              >
                منقطع
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '13'"
                md-label="نوع المتغير"
              >
                وفاة
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '14'"
                md-label="نوع المتغير"
              >
                علاوة
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '15'"
                md-label="نوع المتغير"
              >
                الدرجة
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '16'"
                md-label="نوع المتغير"
              >
                اجازة
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '17'"
                md-label="نوع المتغير"
              >
                تقييم
              </md-table-cell>

              <md-table-cell
                v-if="item.variablesType == '18'"
                md-label="نوع المتغير"
              >
                مؤهل علمي
              </md-table-cell>

              <md-table-cell md-label="التاريخ">{{
                convert(item.date)
              }}</md-table-cell>

              <md-table-cell md-label="بيان حركة الموظف">{{
                item.note
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
import { ModelListSelect } from "vue-search-select";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
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
      return this.tableData;
      // if (this.searchedData.length > 0) {
      //   result = this.searchedData;
      // }
      // return result.slice(this.from, this.to);
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
      return this.pagination.total;
    }
  },
  data() {
    return {
      EmployeeId: "",
      Type: "",
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

        let result = await axios.get(
          `${env.HR()}/api/employee-variables/filter?EmployeeId=${
            this.EmployeeId
          }&Type=${this.Type}&DateFrom=${this.DateFrom}&DateTo=${
            this.DateTo
          }&CurrentPage=${this.pagination.currentPage}&PageSize=${
            this.pagination.perPage
          }`,

          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.tableData = result.data.data.results;
        this.pagination.total = result.data.data.total;
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
        let result = await axios.get(`${env.HR()}/api/employee-variables`, {
          headers: { Authorization: "Bearer " + token }
        });

        // this.tableData = result.data.data.employeeVariable.results;
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
  },
  watch: {
    "pagination.perPage"() {
      this.pagination.currentPage = 1;
      this.Search();
    },
    "pagination.currentPage"() {
      this.Search();
    }
  }
};
</script>

<style scoped>
.mt-37 {
  margin-top: 37px;
}
</style>
