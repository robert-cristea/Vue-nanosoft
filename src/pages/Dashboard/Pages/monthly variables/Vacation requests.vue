<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <modal
          v-if="showModalsorce"
          @close="
            showModalsorce = false;
            SourceT = Source;
          "
        >
          <h3 slot="header"></h3>
          <div slot="body">
            <div class="md-layout-item md-size-100 ml-15 mt-25">
              <md-field
                :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
              >
                <label>سبب رفض خصم الإجازة</label>
                <md-input v-model="note"></md-input>
              </md-field>
            </div>
          </div>
          <div slot="footer">
            <md-button
              style="margin-right: 32px"
              @click="unconfirm"
              class="md-success"
              >متابعة</md-button
            >

            <md-button @click="showModalsorce = false" class="md-danger"
              >الغاء</md-button
            >
          </div>
        </modal>

        <form>
          <md-card class="p-25">
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <model-list-select
                    class="input-must-rtl"
                    :list="employees"
                    v-model="RequesterEmployeeId"
                    option-value="key"
                    option-text="value"
                    placeholder="الموظف"
                  >
                  </model-list-select>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <model-list-select
                    class="input-must-rtl"
                    :list="departments"
                    v-model="RequesterDeparmentId"
                    option-value="id"
                    option-text="name"
                    placeholder="يتبع لـ"
                  >
                  </model-list-select>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mtb-25">
                  <md-field>
                    <label>نوع الإجازة</label>
                    <md-select v-model="VactionTypeId">
                      <md-option
                        v-for="vacationType in vacationType"
                        v-bind:key="vacationType.id"
                        :value="vacationType.id"
                        >{{ vacationType.name }}</md-option
                      >
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

                <div
                  class="md-layout-item md-size-100 mt-25 mtb-25 center-content"
                >
                  <md-button @click="Search" class="md-success btn_nanosoft"
                    >بحث</md-button
                  >
                  <md-button @click="confirm" class="md-info btn_nanosoft"
                    >اعتماد</md-button
                  >

                  <md-button @click="tracking" class="md-black btn_nanosoft"
                    >الغاء الإعتماد</md-button
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
              <md-table-cell md-label="الموظف">{{
                item.requesterEmployeeName
              }}</md-table-cell>

              <md-table-cell md-label="رقم الملاك الوظيفي">{{
                item.requesterEmployeeJobNumber
              }}</md-table-cell>

              <md-table-cell md-label="نوع الإجازة">{{
                item.vacationTypeName
              }}</md-table-cell>

              <md-table-cell md-label="بداية الإجازة">{{
                convert(item.from)
              }}</md-table-cell>

              <md-table-cell md-label="انتهاء الإجازة">{{
                convert(item.to)
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
import Modal from "../modal.vue";
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
    ModelListSelect,
    Modal
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
      RequesterEmployeeId: "",
      RequesterDeparmentId: "",
      VactionTypeId: "",
      DateFrom: null,
      DateTo: null,
      vacationType: "",
      employees: [],
      departments: [],
      tableData: [],
      idTable: "",
      note: "",
      showModalsorce: false,

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

        if (this.DateFrom == null) {
          this.DateFrom = "";
        } else {
          this.convert(this.DateFrom);
        }
        if (this.DateTo == null) {
          this.DateTo = "";
        } else {
          this.convert(this.DateTo);
        }
        let result = await axios.get(
          `${env.HR()}/api/request-active-vacation/filter?RequesterEmployeeId=${
            this.RequesterEmployeeId
          }&DateFrom=${this.DateFrom}&DateTo=${
            this.DateTo
          }&RequesterDeparmentId=${this.RequesterDeparmentId}&VactionTypeId=${
            this.VactionTypeId
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
    },

    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/desktopApp-request-active-vacations`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        this.employees = result.data.data.employees;
        this.departments = result.data.data.departments;
        this.vacationType = result.data.data.vacationType;
        this.tableData = result.data.data.vacationRequest.results;
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
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.patch(
          `${env.HR()}/api/desktopApp-request-active-vacations/${
            this.idTable
          }/discount`,
          {},
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        this.notifyVue("top", "center", "success", "تم الاعتماد بنجاح");

        this.idTable = "";
        this.RequesterEmployeeId = "";
        this.RequesterDeparmentId = "";
        this.VactionTypeId = "";
        this.DateFrom = null;
        this.DateTo = null;
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
          `${env.HR()}/api/desktopApp-request-active-vacations/${
            this.idTable
          }/undiscount/${this.note}`,
          {},
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        this.notifyVue("top", "center", "success", "تم الغاء الإعتماد ");

        this.idTable = "";
        this.RequesterEmployeeId = "";
        this.RequesterDeparmentId = "";
        this.VactionTypeId = "";
        this.DateFrom = null;
        this.DateTo = null;
        this.showModalsorce = false;

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

    tracking() {
      this.showModalsorce = true;
      this.note = "";
    },

    handleEdit(item) {
      const offsetTop = document.getElementById("#content");
      scroll({
        top: offsetTop,
        behavior: "smooth"
      });

      this.idTable = item.id;
      this.RequesterEmployeeId = item.requesterEmployeeId;
      this.RequesterDeparmentId = item.requesterDepartmentId;
      this.VactionTypeId = item.typeId;
      this.DateFrom = new Date(item.from);
      this.DateTo = new Date(item.to);
    }
  }
};
</script>
