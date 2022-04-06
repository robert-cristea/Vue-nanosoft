<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <ValidationObserver v-slot="{ failed, passed }">
          <form>
            <md-card class="p-25">
              <md-card-content>
                <div class="md-layout">
                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>اسم الوحدة التنظيمية</label>
                      <md-input v-model="nameunit" type="email"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <model-list-select
                      class="input-must-rtl"
                      :list="departments"
                      v-model="departmentId"
                      option-value="id"
                      option-text="name"
                      placeholder="يتبع لـ"
                    ></model-list-select>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>رقم الوحدة التنظيمية</label>
                      <md-input v-model="number" :disabled="true"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field>
                      <label>التصنيف</label>
                      <md-select v-model="classificationId">
                        <md-option
                          v-for="classification in classifications"
                          v-bind:key="classification.id"
                          :value="classification.id"
                          >{{ classification.name }}</md-option
                        >
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-60 mt-25 mtb-25">
                    <md-button @click="Save" class="md-success btn_nanosoft"
                      >حفظ</md-button
                    >

                    <md-button @click="clear" class="md-info btn_nanosoft"
                      >جديد</md-button
                    >
                    <!-- <md-button class="md-success btn_nanosoft">حفظ كملف إكسل</md-button>
                  <md-button class="md-success btn_nanosoft">تحميل من ملف إكسل</md-button>-->
                  </div>
                </div>
              </md-card-content>
            </md-card>
          </form>
        </ValidationObserver>
      </div>
    </div>

    <div class="md-layout-item">
      <ValidationObserver v-slot="{ failed, passed }">
        <form>
          <md-card>
            <md-card-header class="md-card-header-text md-card-header-green">
              <div class="card-text">
                <h4 class="title">البحث</h4>
              </div>
            </md-card-header>
            <md-card-content>
              <div class="md-layout mtb-25">
                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>اسم الوحدة التنظيمية</label>
                    <md-input v-model="SearchName"></md-input>
                    <slide-y-down-transition>
                      <md-icon class="error" v-show="failed">close</md-icon>
                    </slide-y-down-transition>
                    <slide-y-down-transition>
                      <md-icon class="success" v-show="passed">done</md-icon>
                    </slide-y-down-transition>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رقم الوحدة التنظيمية</label>
                    <md-input v-model="SearchNumber"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <model-list-select
                    class="input-must-rtl"
                    :list="departmentsAndUnites"
                    v-model="departmentsAndUnitesId"
                    option-value="id"
                    option-text="name"
                    placeholder="الإدرات/المكاتب"
                  ></model-list-select>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>الأقسام والمشروعات</label>
                    <md-select v-model="departmentsLoadId">
                      <md-option
                        v-for="department in departmentsLoad"
                        v-bind:key="department.id"
                        :value="department.id"
                        >{{ department.name }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>الوحدات</label>
                    <md-select v-model="loadUnitsId">
                      <md-option
                        v-for="department in loadUnits"
                        v-bind:key="department.id"
                        :value="department.id"
                        >{{ department.name }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-button @click="Search" class="md-success btn_nanosoft"
                    >بحث</md-button
                  >
                  <md-button @click="New" class="md-info btn_nanosoft"
                    >جديد</md-button
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
                  <md-table-cell md-label="رقم الوحدة التنظيمية">{{
                    item.number
                  }}</md-table-cell>

                  <md-table-cell md-label="اسم الوحدة التنظيمية">{{
                    item.name
                  }}</md-table-cell>

                  <md-table-cell md-label="التصنيف">{{
                    item.departmentClassificationsName
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
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import axios from "../../../../components/service/HTTP";
import { Pagination } from "@/components";
import { ModelListSelect } from "vue-search-select";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import { SlideYDownTransition } from "vue2-transitions";
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
    SlideYDownTransition,
    ModelListSelect
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
      departmentsAndUnites: [],
      loadUnits: [],
      loadUnitsId: "",
      departmentsLoad: [],
      departmentsLoadId: "",
      departmentsAndUnitesId: "",
      departmentAndUnit: [],
      SearchName: "",
      SearchNumber: "",
      code: "",
      nameunit: "",
      departments: [],
      departmentId: "",
      number: "",
      classifications: [],
      classificationId: "",
      updateStatus: "",
      boolean1: false,
      id: "",
      isUpdate: false,
      IsAdmin: "Support",
      IsAdminSearch: false,
      Name: "",
      Title: "",
      Email: "",
      Password: "",
      Phone: "",
      currentSort: "Titel",
      currentSortOrder: "asc",
      pagination: {
        perPage: 25,
        currentPage: 1,
        perPageOptions: [25, 50, 100, 500],
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
    New() {
      try {
        this.SearchName = "";
        this.SearchNumber = "";
        this.departmentsAndUnitesId = "";
        this.departmentsLoadId = "";
        this.loadUnitsId = "";
      } catch (error) {
        // console.log(error);
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
    },
    async Save() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        if (!this.nameunit) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال اسم الوحدة التنظيمية"
          );
        }
        // if (!this.departmentId) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء اختيار من حقل يتبع لي"
        //   );
        // }
        // if (!this.classificationId) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء اختيار رمز التصنيف"
        //   );
        // }

        let schema = {
          Name: this.nameunit == "" ? null : this.nameunit,
          Number: this.number == "" ? null : this.number,
          Code: this.code == "" ? 0 : this.code,
          ParentId: this.departmentId == "" ? null : this.departmentId,
          DepartmentClassificationsId:
            this.classificationId == "" ? null : this.classificationId
        };

        if (this.id === "") {
          let result = await axios.post(`${env.HR()}/api/departments`, schema, {
            headers: { Authorization: "Bearer " + token }
          });
        } else {
          let result = await axios.put(
            `${env.HR()}/api/departments/${this.id}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        }
        this.init();
        this.id = "";
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
    async Search() {
      try {
        this.tableData = [];
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/departments/filter?Name=${this.SearchName}&Number=${
            this.SearchNumber
          }&ParentId=${this.departmentsLoadId}&ManagementId=${
            this.departmentsAndUnitesId
          }&UnitId=${this.loadUnitsId}&pageSize=${
            this.pagination.perPage
          }&CurrentPage=${this.pagination.currentPage}`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        let array = [];
        result.data.data.results.forEach(element => {
          element.children.forEach(el => {
            array.push(el);
          });
        });
        this.tableData = [...result.data.data.results, ...array];
        this.pagination.total = result.data.data.total;
        this.pagination.currentPage = result.data.data.currentPage;
        this.id = "";
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
        let result = await axios.get(`${env.HR()}/api/departments`, {
          headers: { Authorization: "Bearer " + token }
        });
        // this.Search()
        let departmentClassifications = await axios.get(
          `${env.HR()}/api/departmentClassifications`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        let departmentsAndUnites = await axios.get(
          `${env.HR()}/api/departments/LoadManagement`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.departmentsAndUnites = departmentsAndUnites.data.data;
        this.classifications = departmentClassifications.data.data;
        this.groups = result.data.data.groups;
        this.departments = result.data.data.department;
        let depart = result.data.data.departments.results;
        this.tableData = result.data.data.department;
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
      this.nameunit = "";
      this.departmentId = null;
      this.number = "";
      this.classificationId = "";
      this.id = "";
      this.updateStatus = false;
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
      this.nameunit = item.name;
      this.departmentId = item.parentId;
      this.number = item.number;
      this.id = item.id;
      this.code = item.code;
      this.classificationId = item.departmentClassificationsId;
      this.updateStatus = true;
    },
    handleDelete(item) {
      Swal.fire({
        title: "هل انت متأكد؟",
        text: ` سيتم حذف   ${item.name} من النظام هل انت متأكد`,
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
              `${env.HR()}/api/departments/${item.id}`,
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
  },
  watch: {
    "pagination.perPage"() {
      this.pagination.currentPage = 1;
      this.Search();
    },
    "pagination.currentPage"() {
      this.Search();
    },
    async departmentsAndUnitesId() {
      try {
        this.departmentsLoadId = "";
        this.loadUnitsId = "";
        if (this.departmentsAndUnitesId === "") {
          return;
        }
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/departments/${this.departmentsAndUnitesId}/load`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.departmentsLoad = result.data.data;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    },
    async departmentsLoadId() {
      try {
        if (this.departmentsLoadId === "") {
          return;
        }
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/departments/${this.departmentsLoadId}/loadUnits`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.loadUnits = result.data.data;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    },
    async departmentId() {
      try {
        if (this.updateStatus === true) {
          return (this.updateStatus = false);
        }
        if (this.departmentId === null) {
          return;
        }
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/departments/${this.departmentId}/preloadAsChild`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.number = result.data.data.number;
        this.code = result.data.data.code;
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
