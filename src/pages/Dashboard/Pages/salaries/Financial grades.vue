<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <ValidationObserver v-slot="{ failed, passed }">
          <form>
            <md-card class="p-25">
              <md-card-content>
                <div class="md-layout">
                  <div class="md-layout-item md-size-30 ml-15 mt-25">
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

                  <div class="md-layout-item md-size-30 ml-15 mt-25">
                    <md-field>
                      <p class="validate">*</p>
                      <label>الدرجة</label>
                      <md-select v-model="Degree">
                        <md-option value="1">الدرجة الاولى</md-option>
                        <md-option value="2">الدرجة التانية</md-option>
                        <md-option value="3">الدرجة الثالتة</md-option>
                        <md-option value="4">الدرجة الرابعة</md-option>
                        <md-option value="5">الدرجة الخامسة</md-option>
                        <md-option value="6">الدرجة السادسة</md-option>
                        <md-option value="7">الدرجة السابعة</md-option>
                        <md-option value="8">الدرجة الثامنة</md-option>
                        <md-option value="9">الدرجة التاسعة</md-option>
                        <md-option value="10">الدرجة العاشرة</md-option>
                        <md-option value="11">الدرجة الحادية عشر</md-option>
                        <md-option value="12">الدرجة التانية عشر</md-option>
                        <md-option value="13">الدرجة الثالتة عشر</md-option>
                        <md-option value="14">الدرجة الرابعة عشر</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mt-25">
                    <md-field>
                      <p class="validate">*</p>
                      <label>العلاوة</label>
                      <md-select v-model="Bonuse">
                        <md-option value="0">0</md-option>
                        <md-option value="1">1</md-option>
                        <md-option value="2">2</md-option>
                        <md-option value="3">3</md-option>
                        <md-option value="4">4</md-option>
                        <md-option value="5">5</md-option>
                        <md-option value="6">6</md-option>
                        <md-option value="7">7</md-option>
                        <md-option value="8">8</md-option>
                        <md-option value="9">9</md-option>
                        <md-option value="10">10</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-datepicker v-model="date">
                      <p class="validate">*</p>
                      <label class="mr-28">التاريخ</label>
                    </md-datepicker>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>ملاحظة</label>
                      <md-input v-model="Note"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>الدرجة الإدارية الحالية</label>
                      <md-input disabled v-model="degree"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>العلاوة الإدارية الحالية</label>
                      <md-input disabled v-model="bonuse"></md-input>
                    </md-field>
                  </div>

                  <!-- <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>الدرجة السابقة</label>
                    <md-input disabled v-model="Note"></md-input>
                  </md-field>
                </div>
 -->
                  <!-- <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>العلاوة السابقة</label>
                    <md-input disabled v-model="Note"></md-input>
                  </md-field>
                </div> -->

                  <!-- <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>تاريخ زيادة الدرجة او العلاوة</label>
                    <md-input disabled v-model="Note"></md-input>
                  </md-field>
                </div> -->

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
        <md-card-header class="md-card-header-text md-card-header-green">
          <div class="card-text">
            <h4 class="title">البحث</h4>
          </div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout mt-25">
            <div class="md-layout-item md-size-30 ml-15">
              <model-list-select
                class="input-must-rtl"
                :list="employees"
                v-model="EmployeeSearch"
                option-value="key"
                option-text="value"
                placeholder="الموظف"
              >
              </model-list-select>
            </div>

            <div class="md-layout-item md-size-30 ml-15">
              <md-button @click="Search" class="md-success btn_nanosoft"
                >بحث</md-button
              >
            </div>
          </div>

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
              <md-table-cell md-label="الإسم">{{
                item.employeeName
              }}</md-table-cell>

              <md-table-cell md-label="الدرجة">{{
                item.degreeString
              }}</md-table-cell>

              <md-table-cell md-label="العلاوة">{{
                item.bonuse
              }}</md-table-cell>

              <md-table-cell md-label="التاريخ">{{
                convert(item.date)
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
      EmployeeSearch: "",
      Degree: "",
      Bonuse: "",
      date: null,
      Note: "",
      bonuse: 0,
      degree: 0,

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
      fuseSearch: null,
      currentSort: "Titel",
      currentSortOrder: "asc"
    };
  },

  watch: {
    async EmployeeId() {
      try {
        if (this.EmployeeId != "") {
          let T = localStorage.getItem("Nannotoken");
          let token = atob(T);
          let result = await axios.get(
            `${env.HR()}/api/hr/Employees/getDegreeAndBonuse/${
              this.EmployeeId
            }`,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
          this.degree = result.data.data.degree;
          this.bonuse = result.data.data.bonuse;
        }
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

    async Search() {
      try {
        this.tableData = [];
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        let result = await axios.get(
          `${env.HR()}/api/scientificDegreesEmployees/filter?EmployeeId=${
            this.EmployeeSearch
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

    async Save() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        if (!this.EmployeeId) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال موظف "
          );
        }

        if (!this.Degree) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء اختيار الدرجة"
          );
        }

        if (!this.Bonuse) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء اختيار العلاوة"
          );
        }

        if (!this.date) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء اختيار التاريخ"
          );
        }

        let id = this.idTable;
        let schema = {
          EmployeeId: this.EmployeeId,
          Degree: this.Degree,
          Bonuse: this.Bonuse,
          Date: moment(this.date).format("YYYY/MM/DD hh:mm:ss"),
          Note: this.Note
        };

        if (this.btn === "new") {
          let result = await axios.post(
            `${env.HR()}/api/scientificDegreesEmployees`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        } else {
          let result = await axios.put(
            `${env.HR()}/api/scientificDegreesEmployees/${id}`,
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
          error.response.data.errors[Object.keys(error.response.data.errors)][0]
        );
      }
    },

    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        let result = await axios.get(
          `${env.HR()}/api/scientificDegreesEmployees`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.tableData = result.data.data.scientificDegreesEmployees.results;
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

    gobBack() {
      this.$router.push("/pages/evaluation");
    },

    clear() {
      (this.EmployeeId = ""),
        (this.Degree = ""),
        (this.Bonuse = ""),
        (this.date = null),
        (this.Note = "");
      (this.degree = 0), (this.bonuse = 0);
      this.btn = "new";
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
        (this.Degree = item.degree),
        (this.Bonuse = item.bonuse),
        (this.date = new Date(item.date)),
        (this.Note = item.note);
      this.degree = 0;
      this.bonuse = 0;
      (this.btn = "Edit"), (this.idTable = item.id);
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
              `${env.HR()}/api/scientificDegreesEmployees/${item.id}`,
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
