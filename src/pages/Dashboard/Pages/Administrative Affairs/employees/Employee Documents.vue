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
      <md-button @click="Vacation" class="btn_nanosoft"
        >أرصدة وخصميات الإجازات السنوية</md-button
      >
      <md-button @click="Assignment" class="btn_nanosoft"
        >الإنتداب لجهة اخرى</md-button
      >
      <md-button @click="EmployeeDocuments" class="md-success btn_nanosoft"
        >مستندات الموظف</md-button
      >
    </div>

    <div class="md-layout">
      <div>
        <modal v-if="showModale" @close="showModale = false">
          <h3 slot="header">تفاصيل</h3>
          <div slot="body">
            <md-table
              :value="tableFiles"
              class="paginated-table table-striped table-hover mt-25"
            >
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="اسم المستند">
                  <a :href="item.url" target="_blank">
                    {{ item.id }}
                  </a>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
        </modal>
      </div>
      <div class="md-layout-item">
        <form>
          <md-card class="p-25">
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-size-30 ml-15 mtb-25">
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
                    <label>نوع المستند</label>
                    <md-select v-model="DocumentTypeId">
                      <md-option
                        v-for="DocumentType in DocumentType"
                        v-bind:key="DocumentType.id"
                        :value="DocumentType.id"
                        >{{ DocumentType.name }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mtb-25">
                  <md-field>
                    <label>رقم المستند</label>
                    <md-input v-model="number"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mtb-25">
                  <md-field>
                    <label>وصف المستند</label>
                    <md-input v-model="Description"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-datepicker v-model="DecisionDate" v-if="Isdisation">
                    <label class="mr-28">تاريخ القرار</label>
                  </md-datepicker>
                </div>
                <div
                  v-if="HaveExpireDate"
                  class="md-layout-item md-size-30 mt-25 ml-15"
                >
                  <md-datepicker v-model="ExpireDate">
                    <label class="mr-28">تاريخ الصلاحية</label>
                  </md-datepicker>
                </div>
                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-table
                    :value="files"
                    class="paginated-table table-striped table-hover"
                    style="max-height: 150px;"
                  >
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                      <md-table-cell md-label="اسم المستند">
                        {{ item.name }}
                      </md-table-cell>
                      <md-table-cell md-label>
                        <md-button
                          class="md-just-icon md-danger md-simple"
                          @click.native="deleteRow2(item)"
                        >
                          <md-icon>close</md-icon>
                        </md-button>
                      </md-table-cell>
                    </md-table-row>
                  </md-table>
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
                  <md-button class="md-black btn_nanosoft">
                    <label for="file-upload">إضافة ملف</label>
                    <input
                      id="file-upload"
                      type="file"
                      @change="onFileChange"
                      style=" display:none;visibility:hidden;"
                    />
                  </md-button>

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
            <div class="md-size-15 md-layout-item mt-25">
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
            class="paginated-table table-striped table-hover mt-25"
          >
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="نوع المستند">
                {{ item.documentTypeName }}
              </md-table-cell>

              <md-table-cell md-label="رقم المستند">
                {{ item.number }}
              </md-table-cell>

              <md-table-cell md-label="وصف المستند">
                {{ item.description }}
              </md-table-cell>

              <md-table-cell md-label="تاريخ القرار">
                {{
                  item.decisionDate == null ? "" : convert(item.decisionDate)
                }}
              </md-table-cell>

              <md-table-cell md-label="تاريخ الصلاحية">
                {{ item.expireDate == null ? "" : convert(item.expireDate) }}
              </md-table-cell>
              <md-table-cell md-label>
                <md-button
                  class="md-just-icon md-info md-simple"
                  @click.native="
                    showModale = true;
                    tableFiles = [];
                    tableFiles = item.files;
                  "
                >
                  <md-icon>attachment</md-icon>
                </md-button>
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
    </div>
  </div>
</template>

<script>
import axios from "../../../../../components/service/HTTP";
import { Pagination } from "@/components";
import users from "../../users";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import moment from "moment";
import modal from "../../modal2";
import env from "../../../../../../env";

export default {
  async created() {
    this.init();
  },
  components: {
    Pagination,
    modal
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
      Isdisation: false,
      showModale: false,
      tableFiles: [],
      employeeId: "",
      fullName: "",
      DocumentTypeId: "",
      number: "",
      DecisionDate: null,
      Description: "",
      ExpireDate: null,
      DocumentType: "",
      btn: "new",
      files: [],
      idTable: "",
      footerTable: [],
      HaveExpireDate: "",
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

  watch: {
    async DocumentTypeId() {
      try {
        for (var i = 0; i < this.DocumentType.length; i++) {
          if (this.DocumentType[i].id == this.DocumentTypeId) {
            this.HaveExpireDate = this.DocumentType[i].haveExpireDate;
            this.Isdisation = this.DocumentType[i].isDecision;
          }
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
    OpenFile() {},
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
    async Save() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let employeeId = this.$route.params.id;
        if (!this.DocumentTypeId) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال نوع المستند"
          );
        }

        let form = new FormData();
        form.append("DocumentTypeId", this.DocumentTypeId);
        form.append("Number", this.number);
        form.append(
          "DecisionDate",
          moment(this.DecisionDate).format("YYYY/MM/DD")
        );
        form.append("Description", this.Description);
        form.append("ExpireDate", moment(this.ExpireDate).format("YYYY-MM-DD"));
        form.append(
          "FileName",
          this.files.length === 0 ? [] : this.files[0].name
        );
        for (let index = 0; index < this.files.length; index++) {
          const element = this.files[index];
          form.append("FilesToAdd", element.file);
        }
        if (this.btn === "new") {
          let result = await axios.post(
            `${env.HR()}/api/employee-documents/web/${employeeId}`,
            form,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        } else {
          let result = await axios.put(
            `${env.HR()}/api/employee-documents/web/${this.idTable}`,
            form,
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
        // console.log(error);
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.errors[Object.keys(error.response.data.errors)][0]
        );
      }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      files[0].size;
      if (!files.length) return;
      let schema = {
        name: files[0].name,
        file: files[0],
        id: Math.random(),
        size: files[0].size
      };
      this.notifyVue("top", "center", "success", "تم رفع الملف بنجاح ");
      return this.files.unshift(schema);
    },
    async init() {
      try {
        this.tableFiles = [];
        this.files = [];
        this.fullName = localStorage.getItem("name");
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let employeeId = this.$route.params.id;
        if (employeeId == "new") {
          return;
        }

        let result = await axios.get(
          `${env.HR()}/api/employee-documents?employeeId=${employeeId}`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.DocumentType = result.data.data.documentTypes;
        this.tableData = result.data.data.documents;
      } catch (error) {
        // console.log(error);

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
      (this.DocumentTypeId = ""),
        (this.number = ""),
        (this.DecisionDate = null),
        (this.Description = ""),
        (this.ExpireDate = null),
        (this.btn = "new");
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
      this.DocumentTypeId = item.documentTypeId;
      this.number = item.number;
      if (item.decisionDate != null) {
        this.DecisionDate = new Date(item.decisionDate);
      } else {
        this.DecisionDate = "";
      }

      this.Description = env.NULL(item.description);

      if (item.expireDate != null) {
        this.ExpireDate = new Date(item.expireDate);
      } else {
        this.ExpireDate = "";
      }
      this.btn = "Edit";
      this.idTable = item.id;
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
              `${env.HR()}/api/employee-documents/${item.id}`,
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
    },
    deleteRow2(item) {
      let indexToDelete = this.files.findIndex(
        tableRow => tableRow.id === item.id
      );
      if (indexToDelete >= 0) {
        this.files.splice(indexToDelete, 1);
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
