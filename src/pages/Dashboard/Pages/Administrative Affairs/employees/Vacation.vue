<template>
  <div>
    <div class="md-layout-item md-size-100 mt-30 center-content">
      <md-button @click="personal_data" class="btn_nanosoft"
        >البيانات الشخصية</md-button
      >
      <md-button @click="Functional_data" class="btn_nanosoft"
        >البيانات الوظيفية</md-button
      >
      <md-button @click="Financial_data" class="btn_nanosoft"
        >البيانات المالية</md-button
      >
      <md-button @click="Qualifications_" class="btn_nanosoft"
        >المؤهلات العلمية</md-button
      >
      <md-button @click="Vacation" class="md-success btn_nanosoft"
        >أرصدة وخصميات الإجازات السنوية</md-button
      >
      <md-button @click="Assignment" class="btn_nanosoft"
        >الإنتداب لجهة اخرى</md-button
      >
      <md-button @click="EmployeeDocuments" class="btn_nanosoft"
        >مستندات الموظف</md-button
      >
    </div>

    <div class="md-layout">
      <div class="md-layout-item">
        <form>
          <md-card class="p-25">
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field>
                    <label>الموظف</label>
                    <md-input
                      v-model="fullName"
                      v-if="employeeId != 'new'"
                      disabled
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رصيد الإجازة السنوي</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>الرصيد المستحق إلى نهاية السنة</label>
                    <md-input disabled v-model="worth"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field>
                    <label>نوع الحركة</label>
                    <md-select v-model="Type">
                      <md-option value="1">إضافة رصيد</md-option>
                      <md-option value="2"
                        >خصم من رصيد الإجازة السنوية</md-option
                      >
                    </md-select>
                  </md-field>
                </div>

                <div
                  class="md-layout-item md-size-30 mt-25 ml-15"
                  v-if="Type != '1'"
                >
                  <md-datepicker v-model="From">
                    <label class="mr-28">من تاريخ</label>
                  </md-datepicker>
                </div>

                <div
                  class="md-layout-item md-size-30 mt-25 ml-15"
                  v-if="Type != '1'"
                >
                  <md-datepicker v-model="To">
                    <label class="mr-28">إلى تاريخ</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>عدد الأيام</label>
                    <md-input v-model="Days"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ملاحظة</label>
                    <md-input v-model="Note"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-100 mt-50 center-content">
                  <md-button @click="Save" class="md-success btn_nanosoft"
                    >حفظ</md-button
                  >
                  <md-button @click="clear" class="md-info btn_nanosoft"
                    >جديد</md-button
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

    <div class="md-layout-item">
      <md-card>
        <md-card-content>
          <div class="md-layout flex-content-left">
            <div class="md-layout-item md-size-15">
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
              <md-table-cell md-label="نوع الحركة">{{
                item.type == 2 ? "خصم من رصيد الإجازة السنوية" : "إضافة رصيد"
              }}</md-table-cell>

              <md-table-cell md-label="من تاريخ">
                {{ convert(item.from) }}
              </md-table-cell>

              <md-table-cell md-label="الى تاريخ">
                {{ convert(item.to) }}
              </md-table-cell>

              <md-table-cell md-label="عدد الأيام">{{
                item.days
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
import axios from "../../../../../components/service/HTTP.js";
import { Pagination } from "@/components";
import users from "../../users";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import moment from "moment";
// import { SlideYDownTransition } from "vue2-transitions";
// import { extend } from "vee-validate";
// import { required, numeric, regex, confirmed } from "vee-validate/dist/rules";
import env from "../../../../../../env";
// extend("required", required);
// extend("numeric", numeric);
// extend("regex", regex);
// extend("confirmed", confirmed);
export default {
  async created() {
    this.init();
  },
  components: {
    Pagination
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
      fullName: "",
      id: "",
      Type: "",
      From: "",
      To: "",
      Days: "",
      Note: "",
      btn: "new",
      idTable: "",
      balance: "",
      worth: "",

      /////////////////
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

    async Save() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        if (!this.Type) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال نوع الحركة"
          );
        }
        // if (!this.Note) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء ادخال الملاحظة"
        //   );
        // }
        if (this.Type != "1") {
          if (!this.From || !this.To) {
            return this.notifyVue(
              "top",
              "center",
              "danger",
              "عفواً، الرجاء ادخال التاريخ"
            );
          }
        }

        if (!this.Days) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال الأيام"
          );
        }

        let schema = {
          Type: this.Type,
          From:
            this.Type == "1"
              ? "2022-03-23"
              : moment(this.From).format("YYYY-MM-DD"),
          To:
            this.Type == "1"
              ? "2022-03-23"
              : moment(this.To).format("YYYY-MM-DD"),
          Days: this.Days,
          Note: this.Note
        };

        if (this.btn === "new") {
          let employeeId = this.$route.params.id;
          let result = await axios.post(
            `${env.HR()}/api/vacation-records/employees/${employeeId}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        } else {
          let result = await axios.put(
            `${env.HR()}/api/vacation-records/${this.idTable}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        }

        this.init();
        this.clear();
        this.btn = "new";
        return this.notifyVue("top", "center", "success", " تم الحفظ بنجاح ");
      } catch (error) {
        let result =
          error.response.data.errors[
            Object.keys(error.response.data.errors)[0]
          ];
        return this.notifyVue("top", "center", "danger", result[0]);
      }
    },
    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let employeeId = this.$route.params.id;
        if (employeeId == "new") {
          return;
        }
        let result = await axios.get(
          `${env.HR()}/api/vacation-records?employeeId=${employeeId}`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        let result_ = await axios.get(
          `${env.HR()}/api/hr/employees/${employeeId}/vacation-info`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.balance = result_.data.data.balance;
        this.worth = result_.data.data.worth;
        this.tableData = result.data.data;
        this.fullName = localStorage.getItem("name");
      } catch (error) {
        return this.notifyVue("top", "center", "danger", error);
      }
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

    async handleEdit(item) {
      const offsetTop = document.getElementById("#content");
      scroll({
        top: offsetTop,
        behavior: "smooth"
      });

      (this.Type = item.type),
        (this.From = new Date(item.from)),
        (this.To = new Date(item.to)),
        (this.Days = item.days),
        (this.Note = env.NULL(item.note));
      this.btn = "Edit";
      this.idTable = item.id;
    },

    gobBack() {
      this.$router.push("/pages/employees");
    },

    Functional_data() {
      let employeeId = this.$route.params.id;
      if (employeeId) {
        this.$router.push(
          "/pages/employee/Functionaldata/" + this.$route.params.id
        );
      }
    },

    Financial_data() {
      this.$router.push(
        "/pages/employee/Financialdata/" + this.$route.params.id
      );
    },

    personal_data() {
      this.$router.push("/pages/employee/info/" + this.$route.params.id);
    },

    Qualifications_() {
      this.$router.push(
        "/pages/employee/Certifications/" + this.$route.params.id
      );
    },

    Vacation() {
      this.$router.push("/pages/employee/Vacation/" + this.$route.params.id);
    },

    Assignment() {
      this.$router.push("/pages/employee/Assignment/" + this.$route.params.id);
    },

    EmployeeDocuments() {
      this.$router.push(
        "/pages/employee/EmployeeDocuments/" + this.$route.params.id
      );
    },

    clear() {
      (this.Type = ""),
        (this.From = null),
        (this.To = null),
        (this.Days = ""),
        (this.Note = "");
      this.btn = "new";
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
              `${env.HR()}/api/vacation-records/${item.id}`,
              {
                headers: { Authorization: "Bearer " + token }
              }
            );
            this.deleteRow(item);
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
    }
  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["Titel", "SystemVersion"],
      threshold: 0.3
    });
  },
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    }
  }
};
</script>
