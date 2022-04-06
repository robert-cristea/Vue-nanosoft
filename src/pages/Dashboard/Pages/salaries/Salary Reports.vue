<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <form>
          <md-card class="p-25">
            <md-card-content>
              <div class="md-layout">


  <div
                  class="md-layout-item md-layout-item-time md-size-30 ml-15 mt-25"
                  style="position: relative"
                >
                  <h4 class="monthly-picker-head" :class="{ active: monthDate }">
                   شهر المرتب
                  </h4>
                  <vue-monthly-picker
                    class="monthly-picker"
                    alignment="right"
                    v-model="monthDate"
                  />
                </div>



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

                <!-- <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-datepicker v-model="From">
                    <label class="mr-28">من تاريخ الشهر</label>
                  </md-datepicker>
                </div> -->

                <div
                  class="md-layout-item md-layout-item-time md-size-30 mt-25 ml-15"
                  style="position: relative"
                >
                  <h4 class="monthly-picker-head" :class="{ active: StartOn }">
                    من تاريخ الشهر
                  </h4>
                  <vue-monthly-picker
                    class="monthly-picker"
                    alignment="right"
                    v-model="StartOn"
                  />
                </div>

                <!-- <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-datepicker v-model="From">
                    <label class="mr-28">الى تاريخ الشهر</label>
                  </md-datepicker>
                </div> -->
                <div
                  class="md-layout-item md-layout-item-time md-size-30 mt-25 ml-15"
                  style="position: relative"
                >
                  <h4 class="monthly-picker-head" :class="{ active: FinishOn }">
                    الى تاريخ الشهر
                  </h4>
                  <vue-monthly-picker
                    class="monthly-picker"
                    alignment="right"
                    v-model="FinishOn"
                  />
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>التصنيفات الإدارية</label>
                    <md-select v-model="StartingGrade">
                      <md-option
                        v-for="Type in Types"
                        v-bind:key="Type.id"
                        :value="Type.id"
                        >{{ Type.name }}
                      </md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>الإدارة/المكتب</label>
                    <md-select v-model="StartingBonus">
                      <md-option
                        v-for="Type in Types"
                        v-bind:key="Type.id"
                        :value="Type.id"
                        >{{ Type.name }}
                      </md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>القسم/المشروع</label>
                    <md-select v-model="StartingBonus">
                      <md-option
                        v-for="Type in Types"
                        v-bind:key="Type.id"
                        :value="Type.id"
                        >{{ Type.name }}
                      </md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>المصرف</label>
                    <md-select v-model="StartingBonus">
                      <md-option
                        v-for="Type in Types"
                        v-bind:key="Type.id"
                        :value="Type.id"
                        >{{ Type.name }}
                      </md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>اسم الفرع</label>
                    <md-select v-model="StartingBonus">
                      <md-option
                        v-for="Type in Types"
                        v-bind:key="Type.id"
                        :value="Type.id"
                        >{{ Type.name }}
                      </md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>حالة المرتب</label>

                    <md-select v-model="sttt">
                      <md-option value="1">في الإحتساب</md-option>
                      <md-option value="2">اعتماد الإحتساب</md-option>
                      <md-option value="3">في الإفراج</md-option>
                      <md-option value="4">افراج</md-option>
                      <md-option value="5">اغلاق</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>خصم الغياب</label>

                    <md-select v-model="CurrentPage">
                      <md-option value="true">نعم</md-option>
                      <md-option value="false">لا</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>حالة الموظف</label>

                    <md-select v-model="CurrentPage">
                      <md-option value="1">موقوف</md-option>
                      <md-option value="2">غير موقوف</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>نوع التقرير</label>

                    <md-select v-model="st">
                      <md-option value="1">كشف المرتبات</md-option>
                      <md-option value="2">كشف تجميعي للحوافظ</md-option>
                      <md-option value="3">الحافظة المصرفية</md-option>
                      <md-option value="4">كشف مرتبات الشهر</md-option>
                      <md-option value="5">إستمارة صرف الرواتب</md-option>
                      <md-option value="6">بطاقة المرتب الشهرية</md-option>
                      <md-option value="7">كشف ضريبة الجهاد</md-option>
                      <md-option value="8">كشف حصر التضامن</md-option>
                      <md-option value="9"
                        >كشف حصر الإشتراكات الضمانية</md-option
                      >
                      <md-option value="10">كشف خصم الغياب</md-option>
                      <md-option value="11">كشف الموقوفين</md-option>
                      <md-option value="12">تقرير علاوات الموظف</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-50 mt-25">
                  <md-checkbox v-model="isActive"
                    >اظهار آخر مرتب لكل موظف</md-checkbox
                  >
                </div>

                <div
                  class="md-layout-item md-size-100 mt-25 mtb-25 center-content"
                >
                  <md-button @click="Save" class="md-success btn_nanosoft"
                    >بحث</md-button
                  >

                 <md-button @click="generateReport" class="md-info btn_nanosoft">
                         طباعة 
              </md-button>
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

          <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="false"
          :paginate-elements-by-height="1400"
          filename="Staff Report"
          :pdf-quality="2"
          :manual-pagination="true"
          pdf-format="a2"
          pdf-orientation="portrait"
          pdf-content-width="100%"
          ref="html2Pdf"
          @progress="progressPdf"
        >    

  <section class="pdf-container d-flex" slot="pdf-content">
            <!-- PDF Content Here -->
                <div class="md-layout  mt-25">

                   <div class="md-layout-item md-size-30 ">
            <h4 class="text-left" style="margin-left: 50px">
              التاريخ : {{ convert(new Date()) }}
            </h4>
             </div>
                
                 <div class="md-layout-item md-size-30 mt-25">
            <h3 class="text-center ">كشف تجميعي للحوافظ</h3>
            <h4 class="text-center "> {{convert_Month(monthDate)}} عن شهر </h4>
             </div>

             <div class="md-layout-item md-size-30 ">
            <h3 class="text-right"  >اسم الجهة</h3>
            <h4 class="text-right"  >الوصف الوظيفي لعمل الجهة</h4>
               </div>
             
            </div>
            <md-card-content style="padding: 16px 30px">
                    <md-table
                    dir="rtl"
            :value="staffReportData"
            :md-sort.sync="currentSort"
            :md-sort-order.sync="currentSortOrder"
            :md-sort-fn="customSort"
            class="paginated-table table-striped table-hover mt-25"
          >
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell style="width: 400px" md-label="اسم المصرف">{{
                item.bankBranchName
              }}</md-table-cell>

              <md-table-cell style="width: 200px"  md-label="العدد">{{
                item.count
              }}</md-table-cell>

              <md-table-cell md-label="القيمة">{{
                item.value
              }}</md-table-cell>

             
              <md-table-cell md-label>
                <div class="md-just-icon md-info md-simple"></div>
                <!-- <md-button
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
                </md-button>  -->
               </md-table-cell>
            </md-table-row>
          </md-table> 

            </md-card-content>
          </section>        

          </vue-html2pdf>

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

         <!-- <md-table
            :value="staffReportData"
            :md-sort.sync="currentSort"
            :md-sort-order.sync="currentSortOrder"
            :md-sort-fn="customSort"
            class="paginated-table table-striped table-hover mt-25"
          >
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="اسم المصرف">{{
                item.bankBranchName
              }}</md-table-cell>

              <md-table-cell md-label="العدد">{{
                item.count
              }}</md-table-cell>

              <md-table-cell md-label="القيمة">{{
                item.value
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
          </md-table>  -->
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
import VueHtml2pdf from "vue-html2pdf";
// import { AtomSpinner } from "epic-spinners";
// import StepProgress from "vue-step-progress";
import "vue-step-progress/dist/main.css";

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
    // this.init();
  },
  components: {
    Pagination,
    ModelListSelect,
    VueHtml2pdf,
    // AtomSpinner,
    // StepProgress,
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

      monthDate:null,
      st:"",

      pdfLoadingActive: false,
      mySteps: ["بدء التحميل", "جارى التحميل", "تم التحميل"],
      currentStep: 0,
      staffReportData: [],
      
      isActive: false,
      id: localStorage.getItem("idTable"),

      one: true,
      tow: false,

      IsAll: false,
      IsAllEmployees: false,
      EmployeeId: "00000000-0000-0000-0000-000000000000",
      TypeId: "00000000-0000-0000-0000-000000000000",
      StartOn: null,
      FinishOn: null,
      Note: "",
      Type: "",
      employeeFullName: "",
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
      currentSortOrder: "asc",
      CurrentPage: "",
      Types: [],
      StartingBonus: "",
      StartingGrade: "",
      dateFrom: "",
      dateTo: ""
    };
  },

  watch: {
    one() {
      if (this.one == "true") {
        this.tow = false;
      }
      if (this.one == "false") {
        this.tow = true;
      }
    }
  },

  methods: {

   
    async  generateReport() {
      if (this.st == 2){
      this.pdfLoadingActive = true;
 try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/Salaries/getPortfolioCollection/${this.convert(this.monthDate)}`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        this.staffReportData = result.data.data;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }

      this.$refs.html2Pdf.generatePdf();
    }
    },

     progressPdf(event) {
      event == 70 ? setTimeout(() => (this.currentStep = 1), 3000) : "";
      event == 100 ? (this.currentStep = 2) : "";
      event == 100
        ? setTimeout(() => (this.pdfLoadingActive = false), 500)
        : "";
      event == 100 ? setTimeout(() => (this.currentStep = 0), 600) : "";
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


convert_Month(event) {
      try {
        let d = new Date(event);
        if (isNaN(d.getFullYear()) === true) {
          return "-";
        }
        return (
          d.getFullYear() + "-" + (d.getMonth() + 1) 
        
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
      let id = localStorage.getItem("idTable");
      try {
        let T = localStorage.getItem("Nannotoken");

        // if (!this.EmployeeId && IsAllEmployees ==false ) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء اختيار الموظف   "
        //   );
        // }

        if (!this.StartOn) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء تحديد التاريخ "
          );
        }

        if (!this.FinishOn) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء تحديد التاريخ "
          );
        }

        // if (!this.TypeId && IsAllEmployees ==false) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء اختيار نوع الإجازة "
        //   );
        // }

        let token = atob(T);

        let schema = {
          IsAllEmployees: this.IsAllEmployees,
          EmployeeId: this.EmployeeId,
          TypeId: this.TypeId,
          StartOn: moment(this.StartOn).format("YYYY/MM/DD hh:mm:ss"),
          FinishOn: moment(this.FinishOn).format("YYYY/MM/DD hh:mm:ss"),
          Note: this.Note
        };

        if (this.btn === "new" && id === "") {
          let result = await axios.post(
            `${env.HR()}/api/hr/Vacations`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        } else {
          let result = await axios.put(
            `${env.HR()}/api/hr/Vacations/${id}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        }
        this.btn = "new";
        this.$router.push("/pages/holidays");
        // this.init();
        // this.clear();
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

    // async init() {
    //   try {
    //     let T = localStorage.getItem("Nannotoken");
    //     let id = localStorage.getItem("idTable");

    //     let token = atob(T);

    //     if (id == "") {
    //       let result_new = await axios.get(`${env.HR()}/api/hr/Vacations/new`, {
    //         headers: { Authorization: "Bearer " + token },
    //       });
    //         this.tableData = result_new.data.data.allVacations;
    //       this.employees = result_new.data.data.employees;
    //       this.Type = result_new.data.data.types;
    //     } else {
    //       let result = await axios.get(`${env.HR()}/api/hr/Vacations/${id}`, {
    //         headers: { Authorization: "Bearer " + token },
    //       });

    //       this.EmployeeId = result.data.data.employeeId;
    //       (this.TypeId = result.data.data.typeId),
    //         (this.StartOn = new Date(result.data.data.startOn)),
    //         (this.FinishOn = new Date(result.data.data.finishOn)),
    //         (this.Note = result.data.data.note);
    //           this.balance = result.data.data.vacationInfo.balance;
    //           this.employeeFullName = result.data.data.employeeFullName;
    //       this.employees = result.data.data.employees;
    //       this.Type = result.data.data.types;
    //         this.tableData = result.data.data.employeeVacations;

    //       // this.tableData = result.data.data;
    //     }
    //   } catch (error) {
    //     return this.notifyVue(
    //       "top",
    //       "center",
    //       "danger",
    //       "الرجاء اعادة تسجيل الدخول"
    //     );
    //   }
    // },

    gobBack() {
      this.$router.push("/pages/evaluation");
    },

    clear() {
      (this.IsAllEmployees = false),
        (this.EmployeeId = ""),
        (this.TypeId = ""),
        (this.StartOn = null),
        (this.FinishOn = null),
        (this.Note = ""),
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

      (this.IsAllEmployees = item.isAllEmployees),
        (this.EmployeeId = item.employeeId),
        (this.TypeId = item.typeId),
        (this.StartOn = new Date(item.startOn)),
        (this.FinishOn = new Date(item.finishOn)),
        (this.Note = item.note),
        (this.btn = "Edit");
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
              `${env.HR()}/api/hr/Vacations/${item.id}`,
              {
                headers: { Authorization: "Bearer " + token }
              }
            );
            this.deleteRow(item);
            // this.init();
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

  // watch: {
  //    IsAllEmployees() {
  //     try {
  //         if(this.IsAllEmployees == true){
  //         this.IsAll = true;
  //         }
  //         else {
  //         this.IsAll = false;
  //         }

  //     } catch (error) {

  //       return this.notifyVue(
  //         "top",
  //         "center",
  //         "danger",
  //         "الرجاء اعادة تسجيل الدخول"
  //       );
  //     }
  //   },
  // },

  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["Titel", "SystemVersion"],
      threshold: 0.3
    });
  }
};
</script>

<style>
 .md-table-head .md-table-head-label {
    padding-right: 0 !important;
}
</style>