<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <ValidationObserver v-slot="{ failed, passed }">
          <form>
            <md-card class="p-25">
              <div>
                <md-card-content>
                  <div class="md-layout">
                    <div class="md-layout-item md-size-30">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>اسم الدوام الرسمي</label>
                        <md-input v-model="Name"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>سماحية الدخول (بالدقائق)</label>
                        <md-input v-model="StartTimeMargin"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>سماحية الخروج (بالدقائق)</label>
                        <md-input v-model="FinishTimeMargin"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25">
                      <md-field>
                        <label>احتساب الحضور تلقائيا</label>

                        <md-select v-model="IsAttendedByDefault">
                          <md-option value="true"> نعم</md-option>
                          <md-option value="false">لا</md-option>
                        </md-select>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25">
                      <md-field>
                        <label>إلزام الحضور في الموعد</label>

                        <md-select v-model="MustAttendInTime">
                          <md-option value="true">نعم</md-option>
                          <md-option value="false">لا</md-option>
                        </md-select>
                      </md-field>
                    </div>

                    <div
                      class="md-layout-item md-size-100 center-content mt-25"
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
              </div>
            </md-card>
          </form>
        </ValidationObserver>
      </div>

      <div class="md-layout-item md-size-25">
        <form>
          <md-card class="p-25">
            <md-card-header class="md-card-header-text md-card-header-green">
              <div
                class="card-text"
                style="position: absolute; bottom: 129px; right: 12px"
              >
                <h4 class="title">السبت</h4>
              </div>
            </md-card-header>

            <div>
              <div class="md-layout">
                <div class="md-layout-item md-size-100">
                  <VueCtkDateTimePicker
                    format="HH:mm A"
                    :formatted="'HH:mm A'"
                    label="الحضور"
                    :only-time="true"
                    v-model="Saturday.Begin"
                  />
                </div>

                <div
                  class="md-layout-item md-size-100"
                  style="margin-top: 10px"
                >
                  <VueCtkDateTimePicker
                    format="HH:mm A"
                    :formatted="'HH:mm A'"
                    label="الإنصراف"
                    :only-time="true"
                    v-model="Saturday.End"
                  />
                </div>
              </div>
            </div>
          </md-card>
        </form>
      </div>

      <div class="md-layout-item md-size-25">
        <form>
          <md-card class="p-25">
            <md-card-header class="md-card-header-text md-card-header-green">
              <div
                class="card-text"
                style="position: absolute; bottom: 129px; right: 12px"
              >
                <h4 class="title">الأحد</h4>
              </div>
            </md-card-header>

            <div>
              <div class="md-layout">
                <div class="md-layout-item md-size-100">
                  <VueCtkDateTimePicker
                    format="HH:mm A"
                    :formatted="'HH:mm A'"
                    label="الحضور"
                    :only-time="true"
                    v-model="Sunday.Begin"
                  />
                </div>

                <div
                  class="md-layout-item md-size-100"
                  style="margin-top: 10px"
                >
                  <VueCtkDateTimePicker
                    format="HH:mm A"
                    :formatted="'HH:mm A'"
                    label="الإنصراف"
                    :only-time="true"
                    v-model="Sunday.End"
                  />
                </div>
              </div>
            </div>
          </md-card>
        </form>
      </div>

      <div class="md-layout-item md-size-25">
        <form>
          <md-card class="p-25">
            <md-card-header class="md-card-header-text md-card-header-green">
              <div
                class="card-text"
                style="position: absolute; bottom: 129px; right: 12px"
              >
                <h4 class="title">الإثنين</h4>
              </div>
            </md-card-header>

            <div>
              <div class="md-layout">
                <div class="md-layout-item md-size-100">
                  <VueCtkDateTimePicker
                    format="HH:mm A"
                    :formatted="'HH:mm A'"
                    label="الحضور"
                    :only-time="true"
                    v-model="Monday.Begin"
                  />
                </div>

                <div
                  class="md-layout-item md-size-100"
                  style="margin-top: 10px"
                >
                  <VueCtkDateTimePicker
                    format="HH:mm A"
                    :formatted="'HH:mm A'"
                    label="الإنصراف"
                    :only-time="true"
                    v-model="Monday.End"
                  />
                </div>
              </div>
            </div>
          </md-card>
        </form>
      </div>

      <div class="md-layout-item md-size-25">
        <form>
          <md-card class="p-25">
            <md-card-header class="md-card-header-text md-card-header-green">
              <div
                class="card-text"
                style="position: absolute; bottom: 129px; right: 12px"
              >
                <h4 class="title">الثلاثاء</h4>
              </div>
            </md-card-header>

            <div>
              <div class="md-layout">
                <div class="md-layout-item md-size-100">
                  <VueCtkDateTimePicker
                    format="HH:mm A"
                    :formatted="'HH:mm A'"
                    label="الحضور"
                    :only-time="true"
                    v-model="Tuesday.Begin"
                  />
                </div>

                <div
                  class="md-layout-item md-size-100"
                  style="margin-top: 10px"
                >
                  <VueCtkDateTimePicker
                    format="HH:mm A"
                    :formatted="'HH:mm A'"
                    label="الإنصراف"
                    :only-time="true"
                    v-model="Tuesday.End"
                  />
                </div>
              </div>
            </div>
          </md-card>
        </form>
      </div>

      <div class="md-layout-item md-size-25">
        <form>
          <md-card class="p-25">
            <md-card-header class="md-card-header-text md-card-header-green">
              <div
                class="card-text"
                style="position: absolute; bottom: 129px; right: 12px"
              >
                <h4 class="title">الإربعاء</h4>
              </div>
            </md-card-header>

            <div>
              <div class="md-layout">
                <div class="md-layout-item md-size-100">
                  <VueCtkDateTimePicker
                    format="HH:mm A"
                    :formatted="'HH:mm A'"
                    label="الحضور"
                    :only-time="true"
                    v-model="Wednesday.Begin"
                  />
                </div>

                <div
                  class="md-layout-item md-size-100"
                  style="margin-top: 10px"
                >
                  <VueCtkDateTimePicker
                    format="HH:mm A"
                    :formatted="'HH:mm A'"
                    label="الإنصراف"
                    :only-time="true"
                    v-model="Wednesday.End"
                  />
                </div>
              </div>
            </div>
          </md-card>
        </form>
      </div>

      <div class="md-layout-item md-size-25">
        <form>
          <md-card class="p-25">
            <md-card-header class="md-card-header-text md-card-header-green">
              <div
                class="card-text"
                style="position: absolute; bottom: 129px; right: 12px"
              >
                <h4 class="title">الخميس</h4>
              </div>
            </md-card-header>

            <div>
              <div class="md-layout">
                <div class="md-layout-item md-size-100">
                  <VueCtkDateTimePicker
                    format="HH:mm A"
                    :formatted="'HH:mm A'"
                    label="الحضور"
                    :only-time="true"
                    v-model="Thursday.Begin"
                  />
                </div>

                <div
                  class="md-layout-item md-size-100"
                  style="margin-top: 10px"
                >
                  <VueCtkDateTimePicker
                    format="HH:mm A"
                    :formatted="'HH:mm A'"
                    label="الإنصراف"
                    :only-time="true"
                    v-model="Thursday.End"
                  />
                </div>
              </div>
            </div>
          </md-card>
        </form>
      </div>

      <div class="md-layout-item md-size-25">
        <form>
          <md-card class="p-25">
            <md-card-header class="md-card-header-text md-card-header-green">
              <div
                class="card-text"
                style="position: absolute; bottom: 129px; right: 12px"
              >
                <h4 class="title">الجمعة</h4>
              </div>
            </md-card-header>

            <div>
              <div class="md-layout">
                <div class="md-layout-item md-size-100">
                  <VueCtkDateTimePicker
                    format="HH:mm A"
                    :formatted="'HH:mm A'"
                    label="الحضور"
                    :only-time="true"
                    v-model="Friday.Begin"
                  />
                </div>

                <div
                  class="md-layout-item md-size-100"
                  style="margin-top: 10px"
                >
                  <VueCtkDateTimePicker
                    format="HH:mm A"
                    :formatted="'HH:mm A'"
                    label="الإنصراف"
                    :only-time="true"
                    v-model="Friday.End"
                  />
                </div>
              </div>
            </div>
          </md-card>
        </form>
      </div>
    </div>
    <div class="md-layout-item">
      <md-card>
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
              <md-table-cell md-label="اسم الدوام الرسمي">{{
                item.name
              }}</md-table-cell>

              <md-table-cell md-label="احتساب الحضور تلقائيا">{{
                item.isAttendedByDefault == true ? "نعم" : "لا"
              }}</md-table-cell>

              <md-table-cell md-label="إلزام الحضور في الموعد">{{
                item.mustAttendInTime == true ? "نعم" : "لا"
              }}</md-table-cell>

              <md-table-cell md-label="سماحية الدخول (بالدقائق)">{{
                item.startTimeMargin
              }}</md-table-cell>

              <md-table-cell md-label="سماحية الخروج (بالدقائق)">{{
                item.finishTimeMargin
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
import axios from "../../../../components/service/HTTP.js";
import { Pagination } from "@/components";
import moment from "moment";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
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
      Name: "",
      StartTimeMargin: 0,
      FinishTimeMargin: 0,
      IsAttendedByDefault: false,
      MustAttendInTime: false,

      Saturday: {
        Begin: null,
        End: null
      },

      Sunday: {
        Begin: null,
        End: null
      },

      Monday: {
        Begin: null,
        End: null
      },

      Tuesday: {
        Begin: null,
        End: null
      },

      Wednesday: {
        Begin: null,
        End: null
      },

      Thursday: {
        Begin: null,
        End: null
      },

      Friday: {
        Begin: null,
        End: null
      },

      btn: "new",
      idTable: "",
      time: "",

      /////////////////
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
      fuseSearch: null,
      currentSort: "Titel",
      currentSortOrder: "asc"
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
            "عفواً، الرجاء ادخال اسم الدوام الرسمي"
          );
        }

        let schema = {
          Name: this.Name,
          StartTimeMargin: this.StartTimeMargin,
          FinishTimeMargin: this.FinishTimeMargin,
          IsAttendedByDefault: this.IsAttendedByDefault,
          MustAttendInTime: this.MustAttendInTime,

          Saturday:
            this.Saturday.Begin === null || this.Saturday.End === null
              ? null
              : {
                  Begin: this.Saturday.Begin.replace(/[AM-PM]/gi, ""),
                  End: this.Saturday.End.replace(/[AM-PM]/gi, "")
                },

          Sunday:
            this.Sunday.Begin === null || this.Sunday.End === null
              ? null
              : {
                  Begin: this.Sunday.Begin.replace(/[AM-PM]/gi, ""),
                  End: this.Sunday.End.replace(/[AM-PM]/gi, "")
                },

          Monday:
            this.Monday.Begin === null || this.Monday.End === null
              ? null
              : {
                  Begin: this.Monday.Begin.replace(/[AM-PM]/gi, ""),
                  End: this.Monday.End.replace(/[AM-PM]/gi, "")
                },

          Tuesday:
            this.Tuesday.Begin === null || this.Tuesday.End === null
              ? null
              : {
                  Begin: this.Tuesday.Begin.replace(/[AM-PM]/gi, ""),
                  End: this.Tuesday.End.replace(/[AM-PM]/gi, "")
                },

          Wednesday:
            this.Wednesday.Begin === null || this.Wednesday.End === null
              ? null
              : {
                  Begin: this.Wednesday.Begin.replace(/[AM-PM]/gi, ""),
                  End: this.Wednesday.End.replace(/[AM-PM]/gi, "")
                },

          Thursday:
            this.Thursday.Begin === null || this.Thursday.End === null
              ? null
              : {
                  Begin: this.Thursday.Begin.replace(/[AM-PM]/gi, ""),
                  End: this.Thursday.End.replace(/[AM-PM]/gi, "")
                },

          Friday:
            this.Friday.Begin === null || this.Friday.End === null
              ? null
              : {
                  Begin: this.Friday.Begin.replace(/[AM-PM]/gi, ""),
                  End: this.Friday.End.replace(/[AM-PM]/gi, "")
                }
        };

        if (this.btn === "new") {
          let result = await axios.post(`${env.HR()}/api/Shifts`, schema, {
            headers: { Authorization: "Bearer " + token }
          });
        } else {
          let result = await axios.put(
            `${env.HR()}/api/Shifts/${this.idTable}`,
            schema,
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
        let result = await axios.get(`${env.HR()}/api/Shifts`, {
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

    async handleEdit(item) {
      const offsetTop = document.getElementById("#content");
      scroll({
        top: offsetTop,
        behavior: "smooth"
      });
      this.clear();

      (this.Name = item.name),
        (this.StartTimeMargin = item.startTimeMargin),
        (this.FinishTimeMargin = item.finishTimeMargin),
        (this.IsAttendedByDefault = item.isAttendedByDefault),
        (this.MustAttendInTime = item.mustAttendInTime),
        (this.btn = "Edit");
      this.idTable = item.id;

      if (item.saturday != null) {
        this.Saturday.Begin = item.saturday.begin;
        this.Saturday.End = item.saturday.end;
      }
      this.Sunday.Begin = item.sunday.begin;
      this.Sunday.End = item.sunday.end;

      this.Monday.Begin = item.monday.begin;
      this.Monday.End = item.monday.end;

      this.Tuesday.Begin = item.tuesday.begin;
      this.Tuesday.End = item.tuesday.end;

      this.Wednesday.Begin = item.wednesday.begin;
      this.Wednesday.End = item.wednesday.end;

      this.Thursday.Begin = item.thursday.begin;
      this.Thursday.End = item.thursday.end;

      this.Friday.Begin = item.friday.begin;
      this.Friday.End = item.friday.end;
    },

    clear() {
      (this.Name = ""),
        (this.StartTimeMargin = 0),
        (this.FinishTimeMargin = 0),
        (this.IsAttendedByDefault = false),
        (this.MustAttendInTime = false),
        (this.btn = "new");

      this.Saturday.Begin = null;
      this.Saturday.End = null;

      this.Sunday.Begin = null;
      this.Sunday.End = null;

      this.Monday.Begin = null;
      this.Monday.End = null;

      this.Tuesday.Begin = null;
      this.Tuesday.End = null;

      this.Wednesday.Begin = null;
      this.Wednesday.End = null;

      this.Thursday.Begin = null;
      this.Thursday.End = null;

      this.Friday.Begin = null;
      this.Friday.End = null;
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
              `${env.HR()}/api/Shifts/${item.id}`,
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

<style>
.md-card {
  z-index: auto !important;
}

.md-card .md-card-header .card-icon,
.md-card .md-card-header .card-text {
  padding: 8px 15px 8px !important;
}
</style>
