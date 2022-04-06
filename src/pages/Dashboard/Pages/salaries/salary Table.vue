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
                    <md-field>
                      <label>الدرجة</label>
                      <md-select disabled v-model="Degree">
                        <md-option value="1">الدرجة الاولى</md-option>
                        <md-option value="2">الدرجة التانية</md-option>
                        <md-option value="3">الدرجة الثالتة</md-option>
                        <md-option value="4">الدرجة الرابعة</md-option>
                        <md-option value="5">الدرجة الخامسة</md-option>
                        <md-option value="6">الدرجة السادسة</md-option>
                        <md-option value="7">الدرجة السابعة</md-option>
                        <md-option value="8">الدرجة الثامنة</md-option>
                        <md-option value="9">الدرجة التاسعة</md-option>
                        <md-option value="10">الدرجة العاشرة</md-option>
                        <md-option value="11">الدرجة الحادية عشر</md-option>
                        <md-option value="12">الدرجة التانية عشر</md-option>
                        <md-option value="13">الدرجة الثالتة عشر</md-option>
                        <md-option value="14">الدرجة الرابعة عشر</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-20 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <p class="validate">*</p>
                      <label>بداية المربوط</label>
                      <md-input v-model="AssociatedStart"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-20 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <p class="validate">*</p>
                      <label>زيادة سنوية</label>
                      <md-input v-model="AnnualIncrease"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-20 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label style="direction: ltr">1 العلاوة</label>
                      <md-input disabled v-model="First"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-20 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label style="direction: ltr">2 العلاوة</label>
                      <md-input disabled v-model="Second"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-20 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label style="direction: ltr">3 العلاوة</label>
                      <md-input disabled v-model="Third"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-20 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label style="direction: ltr">4 العلاوة</label>
                      <md-input disabled v-model="Fourth"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-20 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label style="direction: ltr">5 العلاوة</label>
                      <md-input disabled v-model="Fifth"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-20 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label style="direction: ltr">6 العلاوة</label>
                      <md-input disabled v-model="Sixth"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-20 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label style="direction: ltr">7 العلاوة</label>
                      <md-input disabled v-model="Seventh"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-20 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label style="direction: ltr">8 العلاوة</label>
                      <md-input disabled v-model="Eighth"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-20 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label style="direction: ltr">9 العلاوة</label>
                      <md-input disabled v-model="Ninth"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-20 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label style="direction: ltr">10 العلاوة</label>
                      <md-input disabled v-model="Tenth"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-20 ml-15 mtb-25">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>زيادة عامة</label>
                      <md-input v-model="HousingAllowance"></md-input>
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
              <md-table-cell md-label="الدرجة">{{
                item.degreeString
              }}</md-table-cell>

              <md-table-cell md-label="بداية المربوط">{{
                item.associatedStart
              }}</md-table-cell>

              <md-table-cell md-label="زيادة سنوية">{{
                item.annualIncrease
              }}</md-table-cell>

              <md-table-cell md-label="العلاوة 1">{{
                item.first
              }}</md-table-cell>

              <md-table-cell
                md-label="العلاوة
               2
               "
                >{{ item.second }}</md-table-cell
              >

              <md-table-cell
                md-label="العلاوة
              3"
                >{{ item.third }}</md-table-cell
              >

              <md-table-cell
                md-label="العلاوة 
              4"
                >{{ item.fourth }}</md-table-cell
              >

              <md-table-cell
                md-label="العلاوة 
              5"
                >{{ item.fifth }}</md-table-cell
              >

              <md-table-cell
                md-label="العلاوة
              6"
                >{{ item.sixth }}</md-table-cell
              >

              <md-table-cell
                md-label="العلاوة
              7"
                >{{ item.seventh }}</md-table-cell
              >

              <md-table-cell
                md-label="العلاوة
              8"
                >{{ item.eighth }}</md-table-cell
              >

              <md-table-cell
                md-label="العلاوة
              9"
                >{{ item.ninth }}</md-table-cell
              >

              <md-table-cell
                md-label="العلاوة
              10"
                >{{ item.tenth }}</md-table-cell
              >

              <md-table-cell md-label="زيادة عامة">{{
                item.housingAllowance
              }}</md-table-cell>

              <md-table-cell md-label>
                <div class="md-just-icon md-info md-simple"></div>
                <md-button
                  class="md-just-icon md-warning md-simple"
                  @click.native="handleEdit(item)"
                >
                  <md-icon>dvr</md-icon>
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
      Degree: "",
      AssociatedStart: 0,
      AnnualIncrease: 0,
      First: 0,
      Second: 0,
      Third: 0,
      Fourth: 0,
      Fifth: 0,
      Sixth: 0,
      Seventh: 0,
      Eighth: 0,
      Ninth: 0,
      Tenth: 0,
      HousingAllowance: 0,

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

  watch: {
    AssociatedStart() {
      if (this.AssociatedStart != "") {
        if (this.AnnualIncrease == "") {
          this.AnnualIncrease = 0;
        }

        if (this.HousingAllowance == "") {
          this.HousingAllowance = 0;
        }
        (this.First =
          parseFloat(this.AssociatedStart) +
          parseFloat(this.AnnualIncrease) * 1 +
          parseFloat(this.HousingAllowance)),
          (this.Second =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 2 +
            parseFloat(this.HousingAllowance)),
          (this.Third =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 3 +
            parseFloat(this.HousingAllowance)),
          (this.Fourth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 4 +
            parseFloat(this.HousingAllowance)),
          (this.Fifth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 5 +
            parseFloat(this.HousingAllowance)),
          (this.Sixth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 6 +
            parseFloat(this.HousingAllowance)),
          (this.Seventh =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 7 +
            parseFloat(this.HousingAllowance)),
          (this.Eighth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 8 +
            parseFloat(this.HousingAllowance)),
          (this.Ninth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 9 +
            parseFloat(this.HousingAllowance)),
          (this.Tenth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 10 +
            parseFloat(this.HousingAllowance));
      } else {
        this.First = 0;
        this.Second = 0;
        this.Third = 0;
        this.Fourth = 0;
        this.Fifth = 0;
        this.Sixth = 0;
        this.Seventh = 0;
        this.Eighth = 0;
        this.Ninth = 0;
        this.Tenth = 0;
      }
    },

    AnnualIncrease() {
      if (this.AnnualIncrease != "") {
        if (this.AssociatedStart == "") {
          this.AssociatedStart = 0;
        }

        if (this.HousingAllowance == "") {
          this.HousingAllowance = 0;
        }
        (this.First =
          parseFloat(this.AssociatedStart) +
          parseFloat(this.AnnualIncrease) * 1 +
          parseFloat(this.HousingAllowance)),
          (this.Second =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 2 +
            parseFloat(this.HousingAllowance)),
          (this.Third =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 3 +
            parseFloat(this.HousingAllowance)),
          (this.Fourth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 4 +
            parseFloat(this.HousingAllowance)),
          (this.Fifth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 5 +
            parseFloat(this.HousingAllowance)),
          (this.Sixth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 6 +
            parseFloat(this.HousingAllowance)),
          (this.Seventh =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 7 +
            parseFloat(this.HousingAllowance)),
          (this.Eighth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 8 +
            parseFloat(this.HousingAllowance)),
          (this.Ninth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 9 +
            parseFloat(this.HousingAllowance)),
          (this.Tenth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 10 +
            parseFloat(this.HousingAllowance));
      }
    },

    HousingAllowance() {
      if (this.HousingAllowance != "") {
        if (this.AssociatedStart == "") {
          this.AssociatedStart = 0;
        }

        if (this.AnnualIncrease == "") {
          this.AnnualIncrease = 0;
        }

        (this.First =
          parseFloat(this.AssociatedStart) +
          parseFloat(this.AnnualIncrease) * 1 +
          parseFloat(this.HousingAllowance)),
          (this.Second =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 2 +
            parseFloat(this.HousingAllowance)),
          (this.Third =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 3 +
            parseFloat(this.HousingAllowance)),
          (this.Fourth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 4 +
            parseFloat(this.HousingAllowance)),
          (this.Fifth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 5 +
            parseFloat(this.HousingAllowance)),
          (this.Sixth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 6 +
            parseFloat(this.HousingAllowance)),
          (this.Seventh =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 7 +
            parseFloat(this.HousingAllowance)),
          (this.Eighth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 8 +
            parseFloat(this.HousingAllowance)),
          (this.Ninth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 9 +
            parseFloat(this.HousingAllowance)),
          (this.Tenth =
            parseFloat(this.AssociatedStart) +
            parseFloat(this.AnnualIncrease) * 10 +
            parseFloat(this.HousingAllowance));
      }
    }
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

    async Save() {
      try {
        let T = localStorage.getItem("Nannotoken");

        let token = atob(T);
        let schema = {
          Degree: this.Degree,
          AssociatedStart: parseFloat(this.AssociatedStart),
          AnnualIncrease: parseFloat(this.AnnualIncrease),
          First: this.First,
          Second: this.Second,
          Third: this.Third,
          Fourth: this.Fourth,
          Fifth: this.Fifth,
          Sixth: this.Sixth,
          Seventh: this.Seventh,
          Eighth: this.Eighth,
          Ninth: this.Ninth,
          Tenth: this.Tenth,
          HousingAllowance: parseFloat(this.HousingAllowance)
        };

        let id = this.idTable;
        let result = await axios.put(
          `${env.HR()}/api/salaryScales/${id}`,
          schema,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        this.init();
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
        let result = await axios.get(`${env.HR()}/api/salaryScales`, {
          headers: { Authorization: "Bearer " + token }
        });

        this.tableData = result.data.data.details;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    },

    handleEdit(item) {
      const offsetTop = document.getElementById("#content");
      scroll({
        top: offsetTop,
        behavior: "smooth"
      });

      this.Degree = item.degree;
      this.AssociatedStart = item.associatedStart;
      this.AnnualIncrease = item.annualIncrease;
      this.First = item.first;
      this.Second = item.second;
      this.Third = item.third;
      this.Fourth = item.fourth;
      this.Fifth = item.fifth;
      this.Sixth = item.sixth;
      this.Seventh = item.seventh;
      this.Eighth = item.eighth;
      this.Ninth = item.ninth;
      this.Tenth = item.tenth;
      this.HousingAllowance = item.housingAllowance;

      this.btn = "Edit";
      this.idTable = item.id;
    }
  }
};
</script>
