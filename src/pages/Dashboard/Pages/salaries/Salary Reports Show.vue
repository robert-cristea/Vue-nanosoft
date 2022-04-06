<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <form>
          <md-card class="p-25">
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>تاريخ الشهر</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رقم الملاك الوظيفي</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>الإسم</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رقم الملف</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ساعات الغياب</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>خصم الغياب</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ساعات العمل</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ساعات الحضور</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>المرتب الأساسي</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ساعات الإضافي العادي</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>قيمة العمل الإضافي العادي</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ساعات الإضافي الممتاز</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>قيمة العمل الإضافي الممتاز</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ساعات العقوبة</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>خصم العقوبة</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>مرتب مقدم</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>قسط السلفة</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>مكافأة خاضعة للجهاد</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>مكافأة خاضعة لكافة الضرائب</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>خصميات آخرى</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>صافي المرتب</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-50 ml-15 mt-25">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ملاحظة</label>
                    <md-input disabled v-model="balance"></md-input>
                  </md-field>
                </div>

                <div
                  class="md-layout-item md-size-100 mt-25 mtb-25 center-content"
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
  </div>
</template>

<script>
import axios from "../../../../components/service/HTTP";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import moment from "moment";
import env from "../../../../../env";
export default {
  async created() {
    this.init();
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
      id: localStorage.getItem("idTable"),
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
      balance: "",
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

    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let id = localStorage.getItem("idTable");

        let token = atob(T);

        if (id == "") {
          let result_new = await axios.get(`${env.HR()}/api/hr/Vacations/new`, {
            headers: { Authorization: "Bearer " + token }
          });
          this.tableData = result_new.data.data.allVacations;
          this.employees = result_new.data.data.employees;
          this.Type = result_new.data.data.types;
        } else {
          let result = await axios.get(`${env.HR()}/api/hr/Vacations/${id}`, {
            headers: { Authorization: "Bearer " + token }
          });

          this.EmployeeId = result.data.data.employeeId;
          (this.TypeId = result.data.data.typeId),
            (this.StartOn = new Date(result.data.data.startOn)),
            (this.FinishOn = new Date(result.data.data.finishOn)),
            (this.Note = result.data.data.note);
          this.balance = result.data.data.vacationInfo.balance;
          this.employeeFullName = result.data.data.employeeFullName;
          this.employees = result.data.data.employees;
          this.Type = result.data.data.types;
          this.tableData = result.data.data.employeeVacations;

          // this.tableData = result.data.data;
        }
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
      this.$router.push("/pages/holidays");
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
