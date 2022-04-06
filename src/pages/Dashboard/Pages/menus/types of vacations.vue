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
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <p class="validate">*</p>

                      <label>الإسم</label>
                      <md-input v-model="Name"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mt-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>سقف الرصيد السنوي</label>
                      <md-input v-model="MaxPerYear"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mt-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>حد الطلب الأدنى</label>
                      <md-input v-model="MinimumDays"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mt-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>حد الطلب الأعلى</label>
                      <md-input v-model="MaximumDays"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mt-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>نسبة الخصم من الراتب</label>
                      <md-input v-model="SalaryDiscountRate"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25">
                    <md-field>
                      <label>الجنس</label>

                      <md-select v-model="Gender">
                        <md-option value="1">ذكر</md-option>
                        <md-option value="2">انثى</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25">
                    <md-field>
                      <label>تمنح لمرة واحدة فقط ؟</label>

                      <md-select v-model="OnceForLifetime">
                        <md-option value="true">نعم</md-option>
                        <md-option value="false">لا</md-option>
                      </md-select>
                    </md-field>
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

                    <md-button @click="clear" class="md-info btn_nanosoft"
                      >طباعة</md-button
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
              <md-table-cell md-label="اسم الإجازة">{{
                item.name
              }}</md-table-cell>

              <md-table-cell md-label="سقف الرصيد السنوي">{{
                item.maxPerYear
              }}</md-table-cell>

              <md-table-cell md-label="حد الطلب الأدنى">{{
                item.minimumDays
              }}</md-table-cell>

              <md-table-cell md-label="حد الطلب الأعلى">{{
                item.maximumDays
              }}</md-table-cell>

              <md-table-cell v-if="item.gender == 1" md-label="الجنس">
                ذكر
              </md-table-cell>

              <md-table-cell v-if="item.gender == 2" md-label="الجنس">
                انثى
              </md-table-cell>

              <md-table-cell v-if="item.gender == null" md-label="الجنس">
              </md-table-cell>

              <md-table-cell md-label="نسبة الخصم من المرتب">{{
                item.salaryDiscountRate
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
      Name: "",
      MaxPerYear: 0,
      MinimumDays: 0,
      MaximumDays: 0,
      SalaryDiscountRate: 0,
      Gender: "",
      OnceForLifetime: false,

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
      currentSort: "Titel",
      currentSortOrder: "asc",
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

        if (!this.Name) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال الإسم "
          );
        }

        let token = atob(T);

        let schema = {
          Name: this.Name,
          MaxPerYear: this.MaxPerYear,
          MinimumDays: this.MinimumDays,
          MaximumDays: this.MaximumDays,
          SalaryDiscountRate: this.SalaryDiscountRate,
          Gender: this.Gender,
          OnceForLifetime: this.OnceForLifetime
        };

        if (this.btn === "new") {
          let result = await axios.post(
            `${env.HR()}/api/hr/vacation-types`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        } else {
          let result = await axios.put(
            `${env.HR()}/api/hr/vacation-types/${this.idTable}`,
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
        let result = await axios.get(`${env.HR()}/api/hr/vacation-types`, {
          headers: { Authorization: "Bearer " + token }
        });

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

    clear() {
      (this.Name = ""),
        (this.MaxPerYear = 0),
        (this.MinimumDays = 0),
        (this.MaximumDays = 0),
        (this.SalaryDiscountRate = 0),
        (this.Gender = "");
      if (this.OnceForLifetime === false) {
        this.OnceForLifetime = false;
      }
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

      (this.Name = item.name),
        (this.MaxPerYear = item.maxPerYear),
        (this.MinimumDays = item.minimumDays),
        (this.MaximumDays = item.maximumDays),
        (this.SalaryDiscountRate = item.salaryDiscountRate),
        (this.Gender = item.gender),
        (this.OnceForLifetime = item.onceForLifetime);

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
              `${env.HR()}/api/hr/vacation-types/${item.id}`,
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
