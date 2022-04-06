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
                    <md-field>
                      <p class="validate">*</p>
                      <label>اسم العلاوة</label>
                      <md-select v-model="TypesBonuseId">
                        <md-option
                          v-for="Type in Types"
                          v-bind:key="Type.id"
                          :value="Type.id"
                          >{{ Type.name }}</md-option
                        >
                      </md-select>
                    </md-field>
                  </div>

                  <div
                    style="position: relative"
                    class="md-layout-item md-size-30 ml-15 mt-25"
                  >
                    <p
                      style="
                        position: absolute;
                        top: 10px;
                        right: 5px;
                        color: red;
                      "
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
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <p class="validate">*</p>

                      <label>قيمة</label>
                      <md-input v-model="Value"></md-input>
                    </md-field>
                  </div>

                  <!-- <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-datepicker v-model="BonusDate">
                      <label class="mr-28">تاريخ استحقاق العلاوة</label>
                    </md-datepicker>
                  </div> -->

                  <!-- <div class="md-layout-item md-size-30 ml-15">
                    <h4 class="">تاريخ استحقاق العلاوة</h4>
                    <month-picker
                      :no-default="true"
                      v-model="BonusDate"
                    ></month-picker>
                  </div> -->
                  <div
                    class="
                      md-layout-item md-layout-item-time md-size-30
                      ml-15
                      mt-25
                    "
                    style="position: relative"
                  >
                    <h4
                      class="monthly-picker-head"
                      :class="{ active: BonusDate }"
                    >
                      تاريخ استحقاق العلاوة
                    </h4>
                    <vue-monthly-picker
                      class="monthly-picker"
                      alignment="right"
                      v-model="BonusDate"
                    />
                  </div>

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

                    <md-button @click="confirm" class="md-success btn_nanosoft"
                      >اعتماد</md-button
                    >

                    <md-button @click="unconfirm" class="md-danger btn_nanosoft"
                      >ايقاف</md-button
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
            <h4 class="title">بحث</h4>
          </div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout">
            <!-- <div class="md-layout-item md-size-30 mt-25 ml-15">
              <md-datepicker v-model="BonusDate_sh">
                <label class="mr-28">تاريخ استحقاق العلاوة</label>
              </md-datepicker>
            </div> -->

            <!-- <div class="md-layout-item md-size-30 ml-15">
              <h4 class="">تاريخ استحقاق العلاوة</h4>
              <month-picker
                :no-default="true"
                v-model="BonusDate_sh_from"
              ></month-picker>
            </div> -->

            <div
              class="md-layout-item md-layout-item-time md-size-30 ml-15 mt-25"
              style="position: relative"
            >
              <h4 class="monthly-picker-head" :class="{ active: BonusDate_sh }">
                تاريخ استحقاق العلاوة
              </h4>
              <vue-monthly-picker
                class="monthly-picker"
                alignment="right"
                v-model="BonusDate_sh"
              />
            </div>

            <div class="md-layout-item md-size-30 ml-15 mt-25">
              <model-list-select
                class="input-must-rtl"
                :list="employees"
                v-model="EmployeeId_sh"
                option-value="key"
                option-text="value"
                placeholder="الموظف"
              >
              </model-list-select>
            </div>

            <div class="md-layout-item md-size-30 ml-15 mtb-25">
              <md-field>
                <label>اسم العلاوة</label>
                <md-select v-model="TypesBonuseId_sh">
                  <md-option
                    v-for="Type in Types"
                    v-bind:key="Type.id"
                    :value="Type.id"
                    >{{ Type.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>

            <div class="md-layout-item md-size-100 mt-25 mtb-25 center-content">
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
              <md-table-cell md-label="الاسم">{{
                item.employeeName
              }}</md-table-cell>

              <md-table-cell md-label="اسم العلاوة">{{
                item.typesBonuse
              }}</md-table-cell>

              <md-table-cell md-label="قيمة">{{ item.value }}</md-table-cell>

              <md-table-cell md-label="حالة الإعتماد">{{
                item.isActive === false ? "لا" : "نعم"
              }}</md-table-cell>

              <md-table-cell md-label="تاريخ استحقاق العلاوة">{{
                convert(item.bonusDate)
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
      selectedMonth: "",
      TypesBonuseId: "",
      EmployeeId: "",
      Value: 0,
      BonusDate: "",

      TypesBonuseId_sh: "",
      EmployeeId_sh: "",
      BonusDate_sh: null,

      Types: "",
      tableData: [],
      btn: "new",
      idTable: "",
      employees: [],
      updateStatus: "",

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

        // if (!this.EmployeeId && !this.Administration && !this.ClassificationsId  ) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء الإدخال "
        //   );
        // }

        if (this.BonusDate_sh == null) {
          this.BonusDate_sh = "";
        } else {
          this.BonusDate_sh = this.convert(this.BonusDate_sh);
        }

        let result = await axios.get(
          `${env.HR()}/api/employeeBonuses/filter?EmployeeId=${
            this.EmployeeId_sh
          }&TypesBonuseId=${this.TypesBonuseId_sh}&Date=${this.BonusDate_sh}`,
          {
            headers: { Authorization: "Bearer " + token }
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

        if (!this.TypesBonuseId) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال اسم العلاوة "
          );
        }

        if (!this.EmployeeId) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء اختيار الموظف   "
          );
        }

        if (!this.Value) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال قيمة "
          );
        }

        let token = atob(T);

        let schema = {
          EmployeeId: this.EmployeeId,
          TypesBonuseId: this.TypesBonuseId,
          Value: this.Value,
          BonusDate: new Date(
            moment(this.BonusDate).format("YYYY/MM/DD hh:mm:ss")
          )
        };

        if (this.btn === "new") {
          let result = await axios.post(
            `${env.HR()}/api/employeeBonuses`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        } else {
          let result = await axios.put(
            `${env.HR()}/api/employeeBonuses/${this.idTable}`,
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
        let result = await axios.get(`${env.HR()}/api/employeeBonuses/load`, {
          headers: { Authorization: "Bearer " + token }
        });

        this.tableData = result.data.data.employeeBonus;
        this.employees = result.data.data.employees;
        this.Types = result.data.data.typesBonuses;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    },

    async confirm() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        let result = await axios.patch(
          `${env.HR()}/api/employeeBonuses/${this.idTable}/confirm`,
          {},
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.init();
        return this.notifyVue("top", "center", "success", result.data.message);
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.message
        );
      }
    },

    async unconfirm() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        let result = await axios.patch(
          `${env.HR()}/api/employeeBonuses/${this.idTable}/unconfirm`,
          {},
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        return this.notifyVue("top", "center", "success", result.data.message);
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.message
        );
      }
    },

    clear() {
      (this.TypesBonuseId = ""),
        (this.EmployeeId = ""),
        (this.Value = 0),
        (this.BonusDate = null),
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

      this.btn = "Edit";
      this.idTable = item.id;

      this.TypesBonuseId = item.typesBonuseId;
      this.EmployeeId = item.employeeId;
      this.Value = item.value;
      this.BonusDate = new Date(item.bonusDate);
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
              `${env.HR()}/api/employeeBonuses/${item.id}`,
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

<style></style>
