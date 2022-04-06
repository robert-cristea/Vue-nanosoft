<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header class="md-card-header-text md-card-header-green">
            <div class="card-text">
              <h4 class="title">البيانات المالية</h4>
            </div>
          </md-card-header>
          <form>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-size-30 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>شهر المرتب</label>
                    <md-input disabled v-model="MonthDate"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رقم الملاك الوظيفي</label>
                    <md-input disabled v-model="JobNumber"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>الإسم</label>
                    <md-input disabled v-model="EmployeeName"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رقم الملف المالي</label>
                    <md-input disabled v-model="FileNumber"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>اسم المصرف</label>
                    <md-input disabled v-model="BankName"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>اسم الفرع</label>
                    <md-input disabled v-model="BankBranchName"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رقم الحساب</label>
                    <md-input disabled v-model="AccountNumber"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>المرتب الأساسي</label>
                    <md-input disabled v-model="BasicSalary"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>المرتب الأساسي المحال من المالية</label>
                    <md-input v-model="NewBasicSalary"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>نسبة خصم الراتب</label>
                    <md-input v-model="SalaryPercentage"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ساعات العمل</label>
                    <md-input disabled v-model="WorkHours"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ساعات الحضور</label>
                    <md-input disabled v-model="PresentHours"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>الدرجة الحالية</label>
                    <md-input disabled v-model="Degree"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>العلاوة الحالية</label>
                    <md-input disabled v-model="Bonus"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>الدرجة المالية</label>
                    <md-input disabled v-model="FinancialDegree"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>العلاوة المالية</label>
                    <md-input disabled v-model="FinancialBonuse"></md-input>
                  </md-field>
                </div>
              </div>
            </md-card-content>
          </form>
        </md-card>
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header class="md-card-header-text md-card-header-green">
            <div class="card-text">
              <h4 class="title">العلاوات والمكافآت</h4>
            </div>
          </md-card-header>
          <form>
            <md-card-content>
              <div class="md-layout">
                <div
                  v-for="(all, index) in allownce"
                  :key="index"
                  class="md-layout-item md-size-30 mb-25 ml-15"
                >
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>{{ all.typesBonuse }}</label>
                    <md-input disabled v-model="all.value"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mb-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>اجمالي العلاوات</label>
                    <md-input disabled v-model="SumAllownce"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mb-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>مكافأة خاضعة للجهاد</label>
                    <md-input v-model="JihadTaxableReward"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mb-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>مكافأة خاضعة لكافة الضرائب</label>
                    <md-input v-model="TaxableReward"></md-input>
                  </md-field>
                </div>
              </div>
            </md-card-content>
          </form>
        </md-card>
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header class="md-card-header-text md-card-header-green">
            <div class="card-text">
              <h4 class="title">العمل الإضافي</h4>
            </div>
          </md-card-header>
          <form>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-size-30 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ساعات الإضافي العادي</label>
                    <md-input disabled v-model="NormalOvertime"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>قيمة العمل الإضافي العادي</label>
                    <md-input disabled v-model="NormalOvertimeValue"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ساعات الإضافي الممتاز</label>
                    <md-input disabled v-model="ExcellentOvertime"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>قيمة العمل الإضافي الممتاز</label>
                    <md-input
                      disabled
                      v-model="ExcellentOvertimeValue"
                    ></md-input>
                  </md-field>
                </div>
              </div>
            </md-card-content>
          </form>
        </md-card>
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header class="md-card-header-text md-card-header-green">
            <div class="card-text">
              <h4 class="title">أخرى</h4>
            </div>
          </md-card-header>
          <form>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-size-30 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ساعات الغياب</label>
                    <md-input v-model="AbsencHours"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>خصم الغياب</label>
                    <md-input disabled v-model="AbsencValue"></md-input>
                  </md-field>
                </div>
              </div>
            </md-card-content>
          </form>
        </md-card>
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header class="md-card-header-text md-card-header-green">
            <div class="card-text">
              <h4 class="title">الخصميات</h4>
            </div>
          </md-card-header>
          <form>
            <md-card-content>
              <div class="md-layout ">
                <div class="md-layout-item md-size-30 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>قيمة الإستقطاعات</label>
                    <md-input v-model="PremiumAdvance"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>حصة الضمان</label>
                    <md-input disabled v-model="WarrantyTax"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>حصة التضامن</label>
                    <md-input disabled v-model="SolidarityTax"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>حصة الجهاد</label>
                    <md-input disabled v-model="JihadTax"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>حصة جهة العمل</label>
                    <md-input disabled v-model="EmployerTax"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>حصة الخزانة</label>
                    <md-input disabled v-model="CabinetTax"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mtb-25">
                  <md-field>
                    <label>نوع الضمان</label>
                    <md-select disabled v-model="WarrantyType">
                      <md-option value="2">مخفض </md-option>
                      <md-option value="3">ضمان عادي</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>مرتب مقدم</label>
                    <md-input v-model="PrepaidSalary"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>خصميات اخرى</label>
                    <md-input v-model="OtherDiscounts"></md-input>
                  </md-field>
                </div>
              </div>
            </md-card-content>
          </form>
        </md-card>
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header class="md-card-header-text md-card-header-green">
            <div class="card-text">
              <h4 class="title">الإجماليات</h4>
            </div>
          </md-card-header>
          <form>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-size-30 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>اجمالي الخصميات</label>
                    <md-input disabled v-model="TotalDiscounts"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>اجمالي الفروقات</label>
                    <md-input v-model="Differences"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>اجمالي المرتب</label>
                    <md-input disabled v-model="TotalSalary"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>الراتب الخاضع للضريبة</label>
                    <md-input disabled v-model="TaxableSalary"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>صافي المرتب</label>
                    <md-input disabled v-model="NetSalary"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ملاحظة</label>
                    <md-input v-model="Note"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ملاحظة الخصميات</label>
                    <md-input v-model="DiscountsNote"></md-input>
                  </md-field>
                </div>

                <div
                  class="md-layout-item md-size-100 mt-25 mtb-25 center-content"
                >
                  <md-button @click="Save" class="md-success btn_nanosoft"
                    >حفظ</md-button
                  >
                  <md-button class="md-info btn_nanosoft">طباعة</md-button>
                  <md-button @click="gobBack" class="md-black btn_nanosoft"
                    >رجوع</md-button
                  >
                </div>
              </div>
            </md-card-content>
          </form>
        </md-card>
      </div>
    </div>

    <!-- <div class="md-layout-item">
      <md-card>

        <md-card-header class="md-card-header-text md-card-header-green">
          <div class="card-text">
            <h4 class="title">مقارنة المرتبات</h4>
          </div>
        </md-card-header>
        
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
            :md-sort.sync="currentSort"
            :md-sort-order.sync="currentSortOrder"
            :md-sort-fn="customSort"
            class="paginated-table table-striped table-hover mt-25"
          >
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="المقارنة حسب">{{
                item.compareBy
              }}</md-table-cell>

              <md-table-cell md-label="الشهر الحالي">{{
                item.currentMonthValue
              }}</md-table-cell>

              <md-table-cell md-label="الشهر السابق">{{
                item.previousMonthValue
              }}</md-table-cell>

              <md-table-cell md-label="الفارق">{{
                item.difference
              }}</md-table-cell>

              <md-table-cell md-label>
                <div class="md-just-icon md-info md-simple"></div>
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
    </div> -->
  </div>
</template>

<script>
import axios from "../../../../components/service/HTTP";
// import { Pagination } from "@/components";
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
    // Pagination,
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
      MonthDate: null,
      JobNumber: 0,
      EmployeeName: "",
      FileNumber: 0,
      BankName: "",
      BankBranchName: "",
      AccountNumber: 0,
      BasicSalary: 0,
      NewBasicSalary: 0,
      SalaryPercentage: 0,
      WorkHours: 0,
      PresentHours: 0,
      Degree: 0,
      Bonus: 0,

      SumAllownce: "",

      NormalOvertime: 0,
      NormalOvertimeValue: 0,
      ExcellentOvertime: 0,
      ExcellentOvertimeValue: 0,
      TotalSalary: 0,
      AbsencHours: 0,
      AbsencValue: 0,
      VacationTypeDiscountValue: 0,
      YearlyVacationDiscountHours: 0,
      YearlyVacationDiscountValue: 0,

      SanctionHours: 0,
      SanctionValue: 0,
      Differences: 0,
      AdvanceRest: 0,
      PremiumAdvance: 0,
      WarrantyTax: 0,
      SolidarityTax: 0,
      JihadTax: 0,
      EmployerTax: 0,
      CabinetTax: 0,
      WarrantyType: "1",
      PrepaidSalary: 0,
      JihadTaxableReward: 0,
      TaxableReward: 0,
      OtherDiscounts: 0,
      NetSalary: 0,

      TotalDiscounts: 0,
      TaxableSalary: 0,
      Note: "",
      DiscountsNote: "",

      EmployeeId: "",
      SalaryStatus: "1",
      GetLatestSalary: true,

      FinancialDegree: 0,
      FinancialBonuse: 0,

      tableData: [],
      allownce: [],

      pagination: {
        perPage: 5,
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
  watch: {
    NewBasicSalary() {
      var sum =
        parseFloat(this.NewBasicSalary) +
        parseFloat(this.SumAllownce) +
        parseFloat(this.NormalOvertimeValue) +
        parseFloat(this.ExcellentOvertimeValue);
      this.TotalSalary = sum;
      if (this.WarrantyType == "2") {
        this.WarrantyTax = this.TotalSalary * (1.125 / 100);
      } else {
        this.WarrantyTax = this.TotalSalary * (3.75 / 100);
      }
      this.SolidarityTax = this.TotalSalary * (1 / 100);
      this.TaxableSalary =
        this.TotalSalary - this.SolidarityTax - this.WarrantyTax;

      this.JihadTax = this.TaxableSalary * (3 / 100);

      if (this.WarrantyType == "2") {
        this.EmployerTax = this.TotalSalary * (3.15 / 100);
      } else {
        this.EmployerTax = this.TotalSalary * (10.5 / 100);
      }

      this.CabinetTax = this.TotalSalary * (0.75 / 100);

      this.TotalDiscounts =
        parseFloat(this.WarrantyTax) +
        parseFloat(this.SolidarityTax) +
        parseFloat(this.JihadTax) +
        parseFloat(this.AbsencValue) +
        parseFloat(this.PremiumAdvance) +
        parseFloat(this.PrepaidSalary);

      this.NetSalary = this.TotalSalary - this.TotalDiscounts;
      //اجمالي المرتب - اجمالي الخصميات = صافي المرتب

      this.TotalSalary = this.round(this.TotalSalary, 2);
      this.WarrantyTax = this.round(this.WarrantyTax, 2);
      this.SolidarityTax = this.round(this.SolidarityTax, 2);
      this.TaxableSalary = this.round(this.TaxableSalary, 2);
      this.JihadTax = this.round(this.JihadTax, 2);
      this.NetSalary = this.round(this.NetSalary, 2);
      this.EmployerTax = this.round(this.EmployerTax, 2);
      this.CabinetTax = this.round(this.CabinetTax, 2);
      this.TotalDiscounts = this.round(this.TotalDiscounts, 2);
    },

    PremiumAdvance() {
      this.TotalDiscounts =
        parseFloat(this.WarrantyTax) +
        parseFloat(this.SolidarityTax) +
        parseFloat(this.JihadTax) +
        parseFloat(this.AbsencValue) +
        parseFloat(this.PremiumAdvance) +
        parseFloat(this.PrepaidSalary);
      this.TotalDiscounts = this.round(this.TotalDiscounts, 2);
    },

    PrepaidSalary() {
      this.TotalDiscounts =
        parseFloat(this.WarrantyTax) +
        parseFloat(this.SolidarityTax) +
        parseFloat(this.JihadTax) +
        parseFloat(this.AbsencValue) +
        parseFloat(this.PremiumAdvance) +
        parseFloat(this.PrepaidSalary);
      this.TotalDiscounts = this.round(this.TotalDiscounts, 2);
    }
  },

  methods: {
    round(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
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

    minusDate(d) {
      const date = new Date(d);
      date.setDate(date.getDate() - 25);
      return date;
    },

    minusOneMonth(d) {
      const date = new Date(d);
      date.setMonth(date.getMonth() - 1);
      return date;
    },

    async Save() {
      try {
        let T = localStorage.getItem("Nannotoken");

        let token = atob(T);
        let schema = {
          NewBasicSalary: this.NewBasicSalary,
          SalaryPercentage: this.SalaryPercentage,
          NormalOvertime: this.NormalOvertime,
          ExcellentOvertime: this.ExcellentOvertime,
          AbsencHours: this.AbsencHours,
          VacationTypeDiscountValue: this.VacationTypeDiscountValue,
          SanctionHours: this.SanctionHours,
          SanctionHours: this.SanctionHours,
          Differences: this.Differences,
          PremiumAdvance: this.PremiumAdvance,
          PrepaidSalary: this.PrepaidSalary,
          JihadTaxableReward: this.JihadTaxableReward,
          TaxableReward: this.TaxableReward,
          OtherDiscounts: this.OtherDiscounts,
          Note: this.Note,
          DiscountsNote: this.DiscountsNote
        };

        let id = this.$route.params.id;
        let result = await axios.put(`${env.HR()}/api/Salaries/${id}`, schema, {
          headers: { Authorization: "Bearer " + token }
        });

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

        let id = this.$route.params.id;
        let result = await axios.get(`${env.HR()}/api/Salaries/${id}`, {
          headers: { Authorization: "Bearer " + token }
        });

        this.EmployeeId = result.data.data.employeeId;
        this.allownce = result.data.data.allownce;
        this.SumAllownce = result.data.data.sumAllownce;

        (this.MonthDate = this.convert(result.data.data.monthDate)),
          (this.JobNumber = result.data.data.jobNumber),
          (this.EmployeeName = result.data.data.employeeName),
          (this.FileNumber = result.data.data.fileNumber),
          (this.BankName = result.data.data.bankName),
          (this.BankBranchName = result.data.data.bankBranchName),
          (this.AccountNumber = result.data.data.accountNumber),
          (this.BasicSalary = result.data.data.basicSalary),
          (this.NewBasicSalary = result.data.data.newBasicSalary),
          (this.SalaryPercentage = result.data.data.salaryPercentage),
          (this.WorkHours = result.data.data.workHours),
          (this.PresentHours = result.data.data.presentHours),
          (this.Degree = result.data.data.degree),
          (this.Bonus = result.data.data.bonus);
        this.FinancialDegree = result.data.data.financialDegree;
        this.FinancialBonuse = result.data.data.financialBonuse;

        this.NormalOvertime = result.data.data.normalOvertime;
        this.NormalOvertimeValue = result.data.data.normalOvertimeValue;
        this.ExcellentOvertime = result.data.data.excellentOvertime;
        this.ExcellentOvertimeValue = result.data.data.excellentOvertimeValue;
        this.TotalSalary = result.data.data.totalSalary;
        this.AbsencHours = result.data.data.absencHours;
        this.AbsencValue = result.data.data.absencValue;
        this.VacationTypeDiscountValue =
          result.data.data.vacationTypeDiscountValue;
        this.YearlyVacationDiscountHours =
          result.data.data.yearlyVacationDiscountHours;
        this.YearlyVacationDiscountValue =
          result.data.data.yearlyVacationDiscountValue;

        this.SanctionHours = result.data.data.sanctionHours;
        this.SanctionValue = result.data.data.sanctionValue;
        this.Differences = result.data.data.differences;
        this.AdvanceRest = result.data.data.advanceRest;
        this.PremiumAdvance = result.data.data.premiumAdvance;
        this.WarrantyTax = result.data.data.warrantyTax;
        this.SolidarityTax = result.data.data.solidarityTax;
        this.JihadTax = result.data.data.jihadTax;
        this.EmployerTax = result.data.data.employerTax;
        this.CabinetTax = result.data.data.cabinetTax;
        this.WarrantyType = result.data.data.warrantyType;
        this.PrepaidSalary = result.data.data.prepaidSalary;
        this.JihadTaxableReward = result.data.data.jihadTaxableReward;
        this.TaxableReward = result.data.data.taxableReward;
        this.OtherDiscounts = result.data.data.otherDiscounts;
        this.NetSalary = result.data.data.netSalary;

        this.TotalDiscounts = result.data.data.totalDiscounts;
        this.TaxableSalary = result.data.data.taxableSalary;
        this.Note = result.data.data.note;
        this.DiscountsNote = result.data.data.discountsNote;

        // let result_differences = await axios.get(`${env.HR()}/api/Salaries/comparisons/${id}`, {
        //   headers: { Authorization: "Bearer " + token },
        // });

        // this.tableData = result_differences.data.data;
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
      this.$router.push("/pages/confirm_salary");
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
  }
};
</script>

<style>
.mb-25 {
  margin-bottom: 10px;
}
</style>
