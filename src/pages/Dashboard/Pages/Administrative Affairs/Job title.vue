<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <ValidationObserver v-slot="{ failed, passed }">
          <form>
            <md-card class="p-25">
              <md-card-content>
                <div class="md-layout mt-25">
                  <div class="md-layout-item md-size-25 mt-25 ml-15">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>اسم الصفة الوظيفية</label>
                      <md-input v-model="jobTitleName"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mt-25">
                    <model-list-select
                      class="input-must-rtl"
                      :list="organizations"
                      v-model="orgData"
                      option-value="id"
                      option-text="name"
                      placeholder="الوحدة التنظيمية"
                    ></model-list-select>
                  </div>

                  <div class="md-layout-item md-size-25 mt-25 ml-15">
                    <md-field>
                      <label>التصنيف الوظيفي</label>
                      <md-select v-model="JobtitelClassification">
                        <md-option value="0">موظف</md-option>
                        <md-option value="1">مدير إدارة</md-option>
                        <md-option value="2">رئيس قسم</md-option>
                        <md-option value="3">رئيس وحدة</md-option>
                        <md-option value="5">مدير عام</md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-25 mt-25 ml-15">
                    <md-field>
                      <label>مخول بالاعتماد</label>
                      <md-select v-model="isManager">
                        <md-option value="true">نعم</md-option>
                        <md-option value="false">لا</md-option>
                      </md-select>
                    </md-field>
                  </div>
                </div>
                <div class="md-layout-item md-size-100 mt-25 center-content">
                  <md-button @click="Save" class="md-success btn_nanosoft"
                    >حفظ</md-button
                  >
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
              <div class="md-layout mt-25">
                <div class="md-layout-item md-size-20 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>الصفة الوظيفية</label>
                    <md-input
                      v-model="jobTitleNameSearch"
                      type="email"
                    ></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-20 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>الوحدة التنظيمية</label>
                    <md-input v-model="UnitName" type="email"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-20 ml-15">
                  <md-button @click="Search" class="md-success btn_nanosoft"
                    >بحث</md-button
                  >
                </div>
              </div>

              <div class="md-layout flex-content-left">
                <div class="md-size-15 md-layout-item">
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
                  <md-table-cell md-label="اسم الصفة الوظيفية">{{
                    item.name
                  }}</md-table-cell>
                  <md-table-cell md-label="الوحدة التنظيمية">{{
                    item.organizationName
                  }}</md-table-cell>
                  <md-table-cell md-label="التصنيف الوظيفي">{{
                    item.jobtitelClassification == "0"
                      ? "موظف"
                      : item.jobtitelClassification == "1"
                      ? "مدير إدارة"
                      : item.jobtitelClassification == "2"
                      ? "رئيس قسم"
                      : item.jobtitelClassification == "3"
                      ? "رئيس وحدة"
                      : item.jobtitelClassification == "5"
                      ? "مدير عام"
                      : "-"
                  }}</md-table-cell>
                  <md-table-cell md-label="مخول">{{
                    item.isManager === true ? "نعم" : "لا"
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
import users from "../users";
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
      JobtitelClassification: 0,
      UnitName: "",
      jobTitleNameSearch: "",
      jobTitleName: "",
      orgData: "",
      organizations: [],
      isManager: false,
      id: "",
      //////////////////////
      boolean1: "",
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
    async Search() {
      try {
        this.tableData = [];
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/JobTitle/filter?Name=${
            this.jobTitleNameSearch
          }&OrganizationName=${this.UnitName}`,
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
        if (!this.jobTitleName) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال الإسم"
          );
        }
        if (!this.orgData) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء اختيار الوحدة التنظيمية"
          );
        }
        let schema = {
          Name: this.jobTitleName,
          OrganizationId: this.orgData,
          IsManager: this.isManager,
          JobtitelClassification: this.JobtitelClassification
        };
        if (this.id === "") {
          let result = await axios.post(`${env.HR()}/api/JobTitle`, schema, {
            headers: { Authorization: "Bearer " + token }
          });
        } else {
          let result = await axios.put(
            `${env.HR()}/api/JobTitle/${this.id}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        }
        this.init();
        this.id = "";
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
    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(`${env.HR()}/api/JobTitle`, {
          headers: { Authorization: "Bearer " + token }
        });
        this.tableData = result.data.data.jobTitles.results;
        this.organizations = result.data.data.organizations;
        let array = [];
        this.organizations.forEach(element => {
          element.children.forEach(el => {
            array.push(el);
          });
        });
        this.organizations = [...this.organizations]; //,// ...array];
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
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
    handleEdit(item) {
      const offsetTop = document.getElementById("#content");
      scroll({
        top: offsetTop,
        behavior: "smooth"
      });
      this.jobTitleName = item.name;
      this.isManager = item.isManager;
      this.orgData = item.organizationId;
      this.JobtitelClassification = item.jobtitelClassification;
      this.id = item.id;
    },
    handleDelete(item) {
      Swal.fire({
        title: "هل انت متأكد؟",
        text: `من النظام هل انت متأكد  ${item.fullName} سيتم حذف`,
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
              `${env.HR()}/api/JobTitle/${item.id}`,
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
