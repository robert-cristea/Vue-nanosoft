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
                      <label>اسم اللجنة</label>
                      <md-input v-model="Name"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field>
                      <label>نوع اللجنة</label>
                      <md-select v-model="TypeCommittee">
                        <md-option value="1">لجنة دائمة</md-option>
                        <md-option value="2">لجنة غير دائمة</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field>
                      <label>وضع اللجنة</label>
                      <md-select v-model="CommitteeState">
                        <md-option value="1">ثم اعتماد اللجنة</md-option>
                        <md-option value="2">ثم الغاء اعتماد اللجنة</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>رقم القرار</label>
                      <md-input v-model="DecisionNumber"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-datepicker v-model="DateFrom">
                      <label class="mr-28">التاريخ من</label>
                    </md-datepicker>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-datepicker v-model="DateTo">
                      <label class="mr-28">التاريخ الى</label>
                    </md-datepicker>
                  </div>

                  <div
                    class="
                      md-layout-item md-size-100
                      mt-25
                      mtb-25
                      center-content
                    "
                  >
                    <md-button @click="Search" class="md-success btn_nanosoft"
                      >بحث</md-button
                    >
                    <md-button @click="New" class="md-info btn_nanosoft"
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
              <md-table-cell md-label="الإسم">{{ item.name }}</md-table-cell>

              <md-table-cell md-label="تاريخ صلاحية اللجنة">{{
                convert(item.committeeDate) != null &&
                convert(item.committeeDate) == "1970-1-1"
                  ? ""
                  : convert(item.committeeDate)
              }}</md-table-cell>

              <md-table-cell md-label="رقم القرار">{{
                item.decisionNumber
              }}</md-table-cell>

              <md-table-cell
                v-if="item.committeeState == 0"
                md-label="وضع اللجنة"
              ></md-table-cell>

              <md-table-cell
                v-if="item.committeeState == 1"
                md-label="وضع اللجنة"
                >تم اعتماد اللجنة</md-table-cell
              >

              <md-table-cell
                v-if="item.committeeState == 2"
                md-label="وضع اللجنة"
                >تم الغاء اعتماد اللجنة</md-table-cell
              >

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
    // this.init();
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
      TypeCommittee: "",
      CommitteeState: "",
      DecisionNumber: "",
      DateFrom: null,
      DateTo: null,

      tableData: [],
      btn: "new",
      idTable: "",

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

    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
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

        if (this.DateFrom == null) {
          this.DateFrom = "";
        } else {
          this.convert(this.DateFrom);
        }
        if (this.DateTo == null) {
          this.DateTo = "";
        } else {
          this.convert(this.DateTo);
        }
        let result = await axios.get(
          `${env.HR()}/api/committees/filter?Name=${this.Name}&TypeCommittee=${
            this.TypeCommittee
          }&CommitteeState=${this.CommitteeState}&DecisionNumber=${
            this.DecisionNumber
          }&DateFrom=${this.DateFrom}&DateTo=${this.DateTo}`,
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

    New() {
      localStorage.setItem("idTable", "");
      this.$router.push("/pages/Committees/new");
    },

    handleEdit(item) {
      this.$router.push("Committees/" + item.id);
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
              `${env.HR()}/api/committees/${item.id}`,
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
            return this.notifyVue(
              "top",
              "center",
              "danger",
              error.response.data.message
              // error.response.data.errors[
              //   Object.keys(error.response.data.errors)
              // ][0]
            );
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
  }
};
</script>
