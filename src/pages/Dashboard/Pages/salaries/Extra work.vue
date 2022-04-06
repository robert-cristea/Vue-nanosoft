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
                    ></model-list-select>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mt-25">
                    <md-field>
                      <p class="validate">*</p>
                      <label>نوع العمل الإضافي</label>
                      <md-select v-model="ExtraWorkType">
                        <md-option value="1">عمل إضافي عادي</md-option>
                        <md-option value="2">عمل إضافي ممتاز</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <p class="validate">*</p>
                      <label>ساعات العمل</label>
                      <md-input v-model="Hours" type="number"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <p class="validate">*</p>
                      <label>فيمة الساعة</label>
                      <md-input v-model="ValueHour" type="number"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>المجموع</label>
                      <md-input
                        disabled
                        v-model="SumValue"
                        type="number"
                      ></md-input>
                    </md-field>
                  </div>

                  <!-- <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-datepicker v-model="ExtraWorkDate">
                      <label class="mr-28">تاريخ شهر العمل الإضافي</label>
                    </md-datepicker>
                  </div> -->

                  <div
                    class="md-layout-item md-layout-item-time md-size-30 ml-15"
                    style="position: relative"
                  >
                    <h4
                      class="monthly-picker-head"
                      :class="{ active: ExtraWorkDate }"
                    >
                      تاريخ شهر العمل الإضافي
                    </h4>
                    <vue-monthly-picker
                      class="monthly-picker"
                      alignment="right"
                      v-model="ExtraWorkDate"
                    />
                  </div>

                  <!-- <div class="md-layout-item md-size-35 mt-25 ">
                  <md-checkbox v-model="ConfirmExtraWork"
                    >إعتماد احتساب العمل الاضافي</md-checkbox
                  >
                </div>-->

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
              ></model-list-select>
            </div>

            <!-- <div class="md-layout-item md-size-30 ml-15">
              <md-datepicker v-model="ExtraWorkDate_SH">
                <label class="mr-28">تاريخ شهر العمل الإضافي</label>
              </md-datepicker>
            </div> -->

            <div
              class="
                md-layout-item
                md-layout-item-time
                md-layout-item-time-custom
                md-size-30
                ml-15
              "
              style="position: relative"
            >
              <h4
                class="monthly-picker-head"
                :class="{ active: ExtraWorkDate_SH }"
              >
                تاريخ شهر العمل الإضافي
              </h4>
              <vue-monthly-picker
                class="monthly-picker"
                alignment="right"
                v-model="ExtraWorkDate_SH"
              />
            </div>

            <div class="md-layout-item md-size-30 ml-15">
              <md-button @click="Search" class="md-success btn_nanosoft"
                >بحث</md-button
              >
              <md-button @click="confirm" class="md-info btn_nanosoft"
                >إعتماد</md-button
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
              <md-table-cell>
                <div class="md-layout-item md-size-20 center-content">
                  <md-checkbox
                    v-model="item.isActive"
                    @change="add(item)"
                  ></md-checkbox>
                </div>
              </md-table-cell>
              <md-table-cell md-label="الموظف">
                {{ item.employeeName }}
              </md-table-cell>
              <md-table-cell
                v-if="item.extraWorkType != null"
                md-label="نوع العمل الإضافي"
                >{{
                  item.extraWorkType == 1 ? "عمل اضافي عادي" : "عمل اضافي ممتاز"
                }}</md-table-cell
              >
              <md-table-cell v-else md-label="نوع العمل الإضافي">
              </md-table-cell>

              <md-table-cell md-label="ساعات العمل">
                {{ item.hours }}
              </md-table-cell>
              <md-table-cell md-label="قيمة الساعة">
                {{ item.valueHour }}
              </md-table-cell>
              <md-table-cell md-label="المجموع">
                {{ item.sumValue }}
              </md-table-cell>
              <md-table-cell md-label="تاريخ شهر العمل الإضافي">
                {{ convert(item.extraWorkDate) }}
              </md-table-cell>

              <md-table-cell md-label="حالة العمل الإضافي">
                {{ item.confirmExtraWork == true ? "معتمد" : "غير معتمد" }}
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
    ModelListSelect,
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
    },
  },
  data() {
    return {
      errorMessage: "",
      EmployeeId: "",
      EmployeeSearch: "",
      Hours: 0,
      ValueHour: 0,
      SumValue: 0,
      ExtraWorkDate: null,
      ExtraWorkDate_SH: null,
      ConfirmExtraWork: false,
      TypeOfOverTime: "true",
      ExtraWorkType: "",
      Selected: [],
      tableData: [],
      btn: "new",
      idTable: "",
      employees: [],
      updateStatus: "",
      pagination: {
        perPage: 25,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      searchQuery: "",
      propsToSearch: ["Titel", "Severity", "Status"],
      searchedData: [],
      fuseSearch: null,
      currentSort: "Titel",
      currentSortOrder: "asc",
    };
  },
  watch: {
    Hours() {
      this.Calcolate();
    },
    ValueHour() {
      this.Calcolate();
    },
    ExtraWorkType() {
      this.Calcolate();
    },
  },
  methods: {
    Calcolate() {
      if (this.ExtraWorkType == "1") {
        this.SumValue = Number(this.Hours) * Number(this.ValueHour) * 1.5;
      }
      if (this.ExtraWorkType == "2") {
        this.SumValue = this.Hours * this.ValueHour * 2;
      }
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

    notifyVue(verticalAlign, horizontalAlign, type, message, time = 10000) {
      this.$notify({
        timeout: time,
        message: message,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: type,
      });
    },

    async Search() {
      try {
        this.tableData = [];
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        if (this.ExtraWorkDate_SH == null) {
          this.ExtraWorkDate_SH = "";
        } else {
          this.ExtraWorkDate_SH = this.convert(this.ExtraWorkDate_SH);
        }

        let result = await axios.get(
          `${env.HR()}/api/extraWorks/filter?EmployeeId=${
            this.EmployeeSearch
          }&ExtraTimeDate=${this.ExtraWorkDate_SH}`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        this.tableData = result.data.data;
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
            "عفواً، الرجاء ادخال الموظف "
          );
        }

        if (!this.Hours) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال ساعات العمل "
          );
        }

        if (!this.ValueHour) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال قيمة الساعة "
          );
        }

        if (!this.ExtraWorkType) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء اختيار نوع العمل الإضافي "
          );
        }

        let schema = {
          EmployeeId: this.EmployeeId,
          Hours: this.Hours,
          ValueHour: this.ValueHour,
          ExtraWorkDate: new Date(
            moment(this.ExtraWorkDate).format("YYYY/MM/DD hh:mm:ss")
          ),
          SumValue: this.SumValue,
          ConfirmExtraWork: this.ConfirmExtraWork,
          ExtraWorkType: this.ExtraWorkType,
        };

        if (this.btn === "new") {
          let result = await axios.post(`${env.HR()}/api/extraWorks`, schema, {
            headers: { Authorization: "Bearer " + token },
          });
        } else {
          let result = await axios.put(
            `${env.HR()}/api/extraWorks/${this.idTable}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
        }
        this.btn = "new";
        this.init();
        this.clear();
        return this.notifyVue("top", "center", "success", " تم الحفظ بنجاح ");
      } catch (error) {
        this.message(error);
      }
    },

    message(error) {
      if (error.response.data.message != undefined) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage =
          error.response.data.errors[
            Object.keys(error.response.data.errors)[0]
          ][0];
      }

      return this.notifyVue("top", "center", "danger", this.errorMessage);
    },

    async confirm() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let schema = {
          SelectedExtraWorks: this.Selected,
        };
        let result = await axios.patch(
          `${env.HR()}/api/extraWorks/confirm`,
          schema,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        this.tableData = [];
        return this.notifyVue(
          "top",
          "center",
          "success",
          " تم الإعتماد بنجاح "
        );
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.message
        );
      }
    },

    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(`${env.HR()}/api/extraWorks`, {
          headers: { Authorization: "Bearer " + token },
        });

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

    add(item) {
      if (item.isActive == true) {
        this.Selected.push(item.id);
      } else {
        for (let i = 0; i < this.Selected.length; i++) {
          if (this.Selected[i] == item.id) {
            this.Selected.splice(i, 1);
          }
        }
      }
    },

    clear() {
      (this.EmployeeId = ""),
        (this.Hours = 0),
        (this.ValueHour = 0),
        (this.SumValue = 0),
        (this.ExtraWorkDate = null),
        (this.ConfirmExtraWork = false),
        (this.tableData = []);
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
        confirmButtonClass: "md-button md-success",
      });
    },

    handleEdit(item) {
      const offsetTop = document.getElementById("#content");
      scroll({
        top: offsetTop,
        behavior: "smooth",
      });

      (this.EmployeeId = item.employeeId), (this.Hours = item.hours);
      this.ValueHour = item.valueHour;
      if (item.extraWorkDate !== null) {
        this.ExtraWorkDate = new Date(item.extraWorkDate);
      }
      (this.ConfirmExtraWork = item.confirmExtraWork), (this.btn = "Edit");
      this.ExtraWorkType = item.extraWorkType;
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
        buttonsStyling: false,
      }).then(async (result) => {
        if (result.value) {
          try {
            let T = localStorage.getItem("Nannotoken");
            let token = atob(T);
            let result = await axios.delete(
              `${env.HR()}/api/extraWorks/${item.id}`,
              {
                headers: { Authorization: "Bearer " + token },
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
                    this.message(error);

          }
        }
      });
    },
    deleteRow(item) {
      let indexToDelete = this.tableData.findIndex(
        (tableRow) => tableRow.id === item.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    },
  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["Titel", "SystemVersion"],
      threshold: 0.3,
    });
  },
};
</script>

<style scoped>
.mt-37 {
  margin-top: 37px;
}
</style>
