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
      <md-button @click="Qualifications_" class="md-success btn_nanosoft"
        >المؤهلات العلمية</md-button
      >
      <md-button @click="Vacation" class="btn_nanosoft"
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
                <div class="md-layout-item md-size-30 ml-15 mtb-25">
                  <md-field>
                    <label>المؤهل العلمي</label>
                    <md-select v-model="ScientificDegreeId">
                      <md-option
                        v-for="ScientificDegrees in ScientificDegrees"
                        v-bind:key="ScientificDegrees.key"
                        :value="ScientificDegrees.key"
                        >{{ ScientificDegrees.value }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mtb-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>التخصص</label>
                    <md-input v-model="Specialization"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mtb-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>سنة الحصول على المؤهل</label>
                    <md-input v-model="Year"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mtb-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>مكان الحصول على المؤهل</label>
                    <md-input v-model="Place"></md-input>
                  </md-field>
                </div>

                <div
                  class="md-layout-item md-size-100 mt-25 mtb-25 center-content"
                >
                  <md-button @click="Save" class="md-success btn_nanosoft"
                    >حفظ</md-button
                  >
                  <md-button @click="clear" class="md-info btn_nanosoft"
                    >جديد</md-button
                  >
                  <md-button @click="gobBack" class="md-info btn_nanosoft"
                    >رجوع</md-button
                  >
                  <!-- <md-button class="md-success btn_nanosoft">حفظ كملف إكسل</md-button>
                  <md-button class="md-success btn_nanosoft">تحميل من ملف إكسل</md-button>-->
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
              <md-table-cell md-label="المؤهل العلمي">
                {{ item.scientificDegreeName }}
              </md-table-cell>

              <md-table-cell md-label="التخصص">
                {{ item.specialization }}
              </md-table-cell>

              <md-table-cell md-label="سنة الحصول على المؤهل">
                {{ item.year }}
              </md-table-cell>

              <md-table-cell md-label="مكان الحصول على المؤهل">
                {{ item.place }}
              </md-table-cell>

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
import axios from "../../../../../components/service/HTTP";
import { Pagination } from "@/components";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
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
      ScientificDegreeId: "",
      ScientificDegrees: [],
      Specialization: "",
      Year: "",
      Place: "",
      tableData: [],
      btn: "new",
      idTable: "",
      fullName: "",
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
  methods: {
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
        let employeeId = this.$route.params.id;

        if (!this.ScientificDegreeId) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال المؤهل العلمي "
          );
        }

        if (!this.Specialization) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال التخصص "
          );
        }

        if (!this.Year) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال سنة الحصول على المؤهل "
          );
        }

        if (!this.Place) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال مكان الحصول على المؤهل "
          );
        }

        let token = atob(T);

        let schema = {
          ScientificDegreeId: this.ScientificDegreeId,
          Specialization: this.Specialization,
          Year: this.Year,
          Place: this.Place
        };

        if (this.btn === "new") {
          let result = await axios.post(
            `${env.HR()}/api/qualifications/${employeeId}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        } else {
          let result = await axios.put(
            `${env.HR()}/api/qualifications/${this.idTable}`,
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
        this.fullName = localStorage.getItem("name");
        let T = localStorage.getItem("Nannotoken");
        // let id = localStorage.getItem("id");
        let employeeId = this.$route.params.id;
        if (employeeId == "new") {
          return;
        }
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/qualifications?employeeId=${employeeId}`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        this.tableData = result.data.data.qualifications;
        this.ScientificDegrees = result.data.data.scientificDegrees;
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
      this.ScientificDegreeId = "";
      this.ScientificDegrees = [];
      this.Specialization = "";
      this.Year = "";
      this.Place = "";
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
      (this.btn = "Edit"),
        (this.ScientificDegreeId = item.scientificDegreeId),
        (this.Specialization = item.specialization),
        (this.Year = item.year),
        (this.Place = item.place);
      this.idTable = item.id;
    },

    handleDelete(item) {
      Swal.fire({
        title: "هل انت متأكد؟",
        text: ` سيتم حذف   ${item.scientificDegreeName} من النظام هل انت متأكد`,
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
              `${env.HR()}/api/qualifications/${item.id}`,
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
