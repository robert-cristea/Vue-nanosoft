<template>
  <div>
    <div class="md-layout-item md-size-100 mt-30 center-content">
      <md-button @click="personal_data" class="  btn_nanosoft"
        >البيانات الشخصية</md-button
      >
      <md-button @click="Functional_data" class="  btn_nanosoft"
        >البيانات الوظيفية</md-button
      >
      <md-button @click="Financial_data" class=" md-success btn_nanosoft"
        >البيانات المالية</md-button
      >
      <md-button @click="Qualifications_" class="  btn_nanosoft"
        >المؤهلات العلمية</md-button
      >
      <md-button @click="Vacation" class=" btn_nanosoft">
        أرصدة وخصميات الإجازات السنوية</md-button
      >
      <md-button @click="Assignment" class=" btn_nanosoft"
        >الإنتداب لجهة اخرى</md-button
      >
      <md-button @click="EmployeeDocuments" class=" btn_nanosoft"
        >مستندات الموظف</md-button
      >
    </div>

    <div class="md-layout">
      <div class="md-layout-item">
        <form>
          <md-card class="p-25">
            <md-card-content>
              <div class="md-layout ">
                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field>
                    <label>الموظف</label>
                    <md-input
                      v-model="fullName"
                      v-if="employeeId != 'new'"
                      disabled
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رقم الملف المالي</label>
                    <md-input v-model="FileNumber"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>الرقم المالي</label>
                    <md-input v-model="FinancialNumber"></md-input>
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
                  <md-field>
                    <label>آلية سداد المرتب</label>
                    <md-select v-model="PaymentMethod">
                      <md-option value="1">نقدي</md-option>
                      <md-option value="2">صك</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field>
                    <label>المصرف</label>
                    <md-select v-model="BankId">
                      <md-option
                        v-for="Bank in Bank"
                        v-bind:key="Bank.key"
                        :value="Bank.key"
                        >{{ Bank.value }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field>
                    <label>فروع المصارف</label>
                    <md-select v-model="BankBranchId">
                      <md-option
                        v-for="BankBranch in BankBranch"
                        v-bind:key="BankBranch.key"
                        :value="BankBranch.key"
                        >{{ BankBranch.value }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رقم الحساب</label>
                    <md-input v-model="AccountNumber"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رقم الضمان</label>
                    <md-input v-model="SecurityNumber"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field>
                    <label>نوع الضمان</label>
                    <md-select v-model="WarrantyType">
                      <md-option value="2">مخفض</md-option>
                      <md-option value="3">ضمان عادي</md-option>
                    </md-select>
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

                <!-- <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>علاوة عائلة</label>
                        <md-input v-model="FamilyAllowance"></md-input>
                      </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>علاوة قيادة</label>
                        <md-input v-model="LeadershipAllowance"></md-input>
                      </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>علاوة اشراف</label>
                        <md-input v-model="SupervisionAllowance"></md-input>
                      </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>علاوة لجنة دائمة</label>
                        <md-input
                          v-model="StandingCommitteAllowance"
                        ></md-input>
                      </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>علاوة ندب</label>
                        <md-input v-model="DelegationAllowance"></md-input>
                      </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>علاوة لجنة غير دائمة</label>
                        <md-input v-model="CommitteAllowance"></md-input>
                      </md-field>
                  </div>
 -->
                <div
                  v-if="GetWorktimeFromTimesheet == false"
                  class="md-layout-item md-size-30 mt-25 ml-15"
                >
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>ساعات العمل الشهرية</label>
                    <md-input v-model="TotalWorktime"></md-input>
                  </md-field>
                </div>

                <div
                  v-if="GetBasicSalaryFromTable == true"
                  class="md-layout-item md-size-30 mt-25 ml-15"
                >
                  <md-field>
                    <label>المرتب الأساسي</label>
                    <md-input disabled v-model="BasicSalary"></md-input>
                  </md-field>
                </div>

                <div
                  v-if="GetBasicSalaryFromTable == false"
                  class="md-layout-item md-size-30 mt-25 ml-15"
                >
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>المرتب الأساسي</label>
                    <md-input v-model="BasicSalary"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 center-content">
                  <md-checkbox v-model="GetWorktimeFromTimesheet"
                    >احتساب اجمالي ساعات العمل من جدول الحضور</md-checkbox
                  >
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25 ">
                  <md-checkbox v-model="GetBasicSalaryFromTable">
                    الإحتساب من جدول المرتبات</md-checkbox
                  >
                </div>

                <div class="md-layout-item md-size-100 mt-25 center-content">
                  <md-button @click="Save" class="md-success btn_nanosoft"
                    >حفظ</md-button
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
import axios from "../../../../../components/service/HTTP.js";
import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required, numeric, regex, confirmed } from "vee-validate/dist/rules";
import env from "../../../../../../env";
extend("required", required);
extend("numeric", numeric);
extend("regex", regex);
extend("confirmed", confirmed);
export default {
  async created() {
    this.init();
  },

  data() {
    return {
      id: "",
      fullName: "",
      FileNumber: "",
      FinancialNumber: "",
      SalaryPercentage: 0,
      BankId: "",
      Bank: "",
      BankBranchId: "",
      BankBranch: "",
      AccountNumber: "",
      SecurityNumber: "",
      PaymentMethod: "",
      WarrantyType: 0,
      FamilyAllowance: 0,
      LeadershipAllowance: 0,
      SupervisionAllowance: 0,
      StandingCommitteAllowance: 0,
      CommitteAllowance: 0,
      DelegationAllowance: 0,
      TotalWorktime: null,
      BasicSalary: 0,
      GetWorktimeFromTimesheet: false,
      GetBasicSalaryFromTable: false,
      FinancialDegree: 0,
      FinancialBonuse: 0,
      errorMessage: ""
    };
  },

  watch: {
    async BankId() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result_BankBranch = await axios.get(
          `${env.HR()}/api/bank-branches/load/${this.BankId}`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        this.BankBranch = result_BankBranch.data.data;
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
    async Save() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let employeeId = this.$route.params.id;
        let token = atob(T);

        if (!this.BasicSalary && this.GetBasicSalaryFromTable == false) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال المرتب الأساسي"
          );
        }

        if (this.SalaryPercentage == "" || this.SalaryPercentage == null) {
          this.SalaryPercentage = 0;
        }

        let schema = {
          FileNumber: this.FileNumber,
          FinancialNumber: this.FinancialNumber,
          SalaryPercentage: this.SalaryPercentage,
          BankId: this.BankId,
          BankBranchId: this.BankBranchId,
          AccountNumber: this.AccountNumber,
          SecurityNumber: this.SecurityNumber,
          WarrantyType: this.WarrantyType,
          PaymentMethod: this.PaymentMethod,
          FamilyAllowance: this.FamilyAllowance,
          LeadershipAllowance: this.LeadershipAllowance,
          SupervisionAllowance: this.SupervisionAllowance,
          StandingCommitteAllowance: this.StandingCommitteAllowance,
          CommitteAllowance: this.CommitteAllowance,
          DelegationAllowance: this.DelegationAllowance,
          TotalWorktime: this.TotalWorktime,
          BasicSalary: this.BasicSalary,
          GetWorktimeFromTimesheet: this.GetWorktimeFromTimesheet,
          GetBasicSalaryFromTable: this.GetBasicSalaryFromTable
        };

        let result = await axios.put(
          `${env.HR()}/api/hr/employees/${employeeId}/finantial-info`,
          schema,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

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

    async init() {
      try {
        let employeeId = this.$route.params.id;
        if (employeeId == "new") {
          return;
        }
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        if (employeeId !== "") {
          let result = await axios.get(
            `${env.HR()}/api/hr/employees/LoadFinancialInfo/${employeeId}`,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );

          this.Bank = result.data.data.banks;
          this.fullName = result.data.data.fullName;
          (this.FileNumber = result.data.data.fileNumber),
            (this.FinancialNumber = result.data.data.financialNumber),
            (this.SalaryPercentage = result.data.data.salaryPercentage),
            (this.BankId = result.data.data.bankId),
            (this.BankBranchId = result.data.data.bankBranchId),
            (this.AccountNumber = result.data.data.accountNumber),
            (this.SecurityNumber = result.data.data.securityNumber),
            (this.WarrantyType = result.data.data.warrantyType),
            (this.PaymentMethod = result.data.data.salaryPaymentMethod),
            (this.FamilyAllowance = result.data.data.familyAllowance),
            (this.LeadershipAllowance = result.data.data.leadershipAllowance),
            (this.SupervisionAllowance = result.data.data.supervisionAllowance),
            (this.StandingCommitteAllowance =
              result.data.data.standingCommitteAllowance),
            (this.CommitteAllowance = result.data.data.committeAllowance),
            (this.DelegationAllowance = result.data.data.delegationAllowance),
            (this.TotalWorktime = result.data.data.totalWorktime),
            (this.BasicSalary = result.data.data.basicSalary),
            (this.GetWorktimeFromTimesheet =
              result.data.data.getWorktimeFromTimesheet),
            (this.GetBasicSalaryFromTable =
              result.data.data.getBasicSalaryFromTable);
          this.FinancialDegree = result.data.data.financialDegree;
          this.FinancialBonuse = result.data.data.financialBonuse;
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
