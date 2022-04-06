<template>
  <div>
    <!---------- section1  ------------->
    <div class="md-layout">
      <div class="md-layout-item">
        <ValidationObserver v-slot="{ passed, failed }">
          <form>
            <md-card class="p-25">
              <md-card-content>
                <div class="md-layout mt-25 center-content">
                  <div class="md-layout-item md-size-30 ml-15">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <p class="validate">*</p>
                      <label>اسم المستخدم</label>
                      <md-input v-model="Name" type="email"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15">
                    <md-field>
                      <p class="validate">*</p>
                      <label>المجموعة</label>
                      <md-select v-model="groupId">
                        <md-option
                          v-for="group in groups"
                          v-bind:key="group.key"
                          :value="group.key"
                          >{{ group.value }}</md-option
                        >
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15">
                    <model-list-select
                      class="input-must-rtl"
                      :list="employees"
                      v-model="employee"
                      option-value="key"
                      option-text="value"
                      placeholder="الموظف"
                    >
                    </model-list-select>
                  </div>
                </div>

                <div class="md-layout mt-25 center-content">
                  <div class="md-layout-item md-size-30 ml-15">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <p class="validate">*</p>

                      <label>اسم الدخول</label>
                      <md-input v-model="userName"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <p class="validate">*</p>

                      <label>كلمة المرور</label>
                      <md-input v-model="password" type="email"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <p class="validate">*</p>

                      <label>تأكيد كلمة المرور</label>
                      <md-input v-model="confarmPassword"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-20 mt-25 center-content">
                    <md-checkbox v-model="isActive"> نشط</md-checkbox>
                  </div>
                  <div class="md-layout-item md-size-50 mt-25">
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
              <md-table-cell md-label="اسم المستخدم">{{
                item.name
              }}</md-table-cell>

              <md-table-cell md-label="المجموعة">{{
                item.groupName
              }}</md-table-cell>

              <md-table-cell md-label="الموظف">{{
                item.employeeName
              }}</md-table-cell>

              <md-table-cell md-label="حالة المستخدم">{{
                item.isActive === false ? "غير نشط" : "نشط"
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
    // SlideYDownTransition,
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
      employees: [],
      groups: [],
      employee: "",
      userName: "",
      password: "",
      confarmPassword: "",
      isActive: false,
      Name: "",
      groupId: "",
      id: "",
      ///////
      boolean1: "",
      isUpdate: false,
      IsAdmin: "Support",
      IsAdminSearch: false,
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
    async Save() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        if (!this.Name) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال اسم المجموعة"
          );
        }
        if (!this.groupId) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال المجموعة"
          );
        }
        // if (!this.employee) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء اختيار الموظف"
        //   );
        // }
        if (!this.userName) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال اسم الدخول"
          );
        }
        if (this.password === "" || this.confarmPassword === "") {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال كلمة المرور"
          );
        }
        if (this.password !== this.confarmPassword) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، كلمة المرور غير مطابقة"
          );
        }
        let schema = {
          EmployeeId: this.employee,
          Name: this.Name,
          Culture: "ar-LY",
          GroupId: this.groupId,
          IsActive: this.isActive,
          CanDeleteUser: false,
          Identity: {
            Name: this.userName,
            Password: this.password,
            ConfirmPassword: this.confarmPassword
          }
        };

        if (this.id === "") {
          let result = await axios.post(`${env.HR()}/api/users`, schema, {
            headers: { Authorization: "Bearer " + token }
          });
        } else {
          let result = await axios.put(
            `${env.HR()}/api/users/${this.id}`,
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
    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(`${env.HR()}/api/users`, {
          headers: { Authorization: "Bearer " + token }
        });

        this.groups = result.data.data.groups;
        this.employees = result.data.data.employees;
        this.tableData = result.data.data.users;
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

    handleEdit(item) {
      const offsetTop = document.getElementById("#content");
      scroll({
        top: offsetTop,
        behavior: "smooth"
      });
      this.employee = item.employeeId;
      this.Name = item.name;
      this.userName = item.loginName;
      this.groupId = item.groupId;
      this.isActive = item.isActive;
      this.id = item.id;
    },
    clear() {
      this.employee = "";
      this.groupId = "";
      this.userName = "";
      this.password = "";
      this.Name = "";
      this.confarmPassword = "";
      this.id = "";
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
              `${env.HR()}/api/users/${item.id}`,
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
