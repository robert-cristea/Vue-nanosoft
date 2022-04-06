<template>
  <div>
    <div class="md-layout-item md-size-100 mt-30 center-content">
      <md-button @click="personal_data" class="md-success btn_nanosoft"
        >البيانات الشخصية</md-button
      >
      <md-button
        @click="Functional_data"
        v-if="employeeId != 'new'"
        class="btn_nanosoft"
        >البيانات الوظيفية</md-button
      >
      <md-button
        @click="Financial_data"
        v-if="employeeId != 'new'"
        class="btn_nanosoft"
        >البيانات المالية</md-button
      >
      <md-button
        @click="Qualifications_"
        v-if="employeeId != 'new'"
        class="btn_nanosoft"
        >المؤهلات العلمية</md-button
      >
      <md-button
        @click="Vacation"
        v-if="employeeId != 'new'"
        class="btn_nanosoft"
        >أرصدة وخصميات الإجازات السنوية</md-button
      >
      <md-button
        @click="Assignment"
        v-if="employeeId != 'new'"
        class="btn_nanosoft"
        >الإنتداب لجهة اخرى</md-button
      >
      <md-button
        @click="EmployeeDocuments"
        v-if="employeeId != 'new'"
        class="btn_nanosoft"
        >مستندات الموظف</md-button
      >
    </div>

    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <form>
            <md-card-content>
              <div class="md-layout mt-25">
                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>الرقم الوطني</label>
                    <md-input v-model="nid" type="number"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>الإسم</label>
                    <md-input v-model="name"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>اسم الاب</label>
                    <md-input v-model="fname"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>اسم الجد</label>
                    <md-input v-model="gname"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>اللقب</label>
                    <md-input v-model="lname"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>الاسم باللغة اللاتينية</label>
                    <md-input v-model="EnglishName"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field>
                    <label>الجنس</label>

                    <md-select v-model="gender">
                      <md-option value="1">ذكر</md-option>
                      <md-option value="2">انثى</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field>
                    <label>نوع الجنسية</label>

                    <md-select v-model="NationalityType">
                      <md-option value="1">وطني</md-option>
                      <md-option value="2">اجنبي</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div
                  v-if="NationalityType == '1'"
                  class="md-layout-item md-size-30 mt-25 ml-15"
                >
                  <md-field>
                    <label>الجنسية</label>

                    <md-select v-model="NationalityId">
                      <md-option
                        v-for="Nationality_Libyan in Nationality_Libyan"
                        v-bind:key="Nationality_Libyan.id"
                        :value="Nationality_Libyan.id"
                        >{{ Nationality_Libyan.name }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>

                <div
                  v-if="NationalityType == '2'"
                  class="md-layout-item md-size-30 mt-25 ml-15"
                >
                  <md-field>
                    <label>الجنسية</label>

                    <md-select v-model="NationalityId">
                      <md-option
                        v-for="Nationality_Foreigner in Nationality_Foreigner"
                        v-bind:key="Nationality_Foreigner.id"
                        :value="Nationality_Foreigner.id"
                        >{{ Nationality_Foreigner.name }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>

                <div
                  v-if="NationalityType == '2'"
                  class="md-layout-item md-size-30 mt-25 ml-15"
                >
                  <md-datepicker v-model="VisaExpiryDate">
                    <label class="mr-28">تاريخ انتهاء صلاحية التأشيرة</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>العنوان</label>
                    <md-input v-model="Address"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رقم الهاتف</label>
                    <md-input v-model="phone" type="number"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-datepicker v-model="date">
                    <label class="mr-28">تاريخ الميلاد</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>مكان الميلاد</label>
                    <md-input v-model="Place"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>اسم الأم</label>
                    <md-input v-model="mother"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field>
                    <label>الحالة الإجتماعية</label>

                    <md-select v-model="Status">
                      <md-option value="1">اعزب</md-option>
                      <md-option value="2">متزوج/ة</md-option>
                      <md-option value="3">مطلق/ة</md-option>
                      <md-option value="4">متزوج ويعول</md-option>
                      <md-option value="5">ارملة</md-option>
                      <md-option value="6">ارملة وتعول</md-option>
                      <md-option value="7">ارمل</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div
                  v-if="Status == 2 || Status == 4"
                  class="md-layout-item md-size-30 mt-25 ml-15"
                >
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>اسم الزوج/ة</label>
                    <md-input v-model="wife_name"></md-input>
                  </md-field>
                </div>

                <div
                  v-if="Status == 2 || Status == 4"
                  class="md-layout-item md-size-30 mt-25 ml-15"
                >
                  <md-field>
                    <label>جنسية الزوج/ة</label>

                    <md-select v-model="Nationality">
                      <md-option value="1">ليبية</md-option>
                      <md-option value="2">اجنبية</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div
                  v-if="Status == 4 || Status == 6"
                  class="md-layout-item md-size-30 mt-25 ml-15"
                >
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>عدد الأطفال</label>
                    <md-input v-model="children" type="number"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>البريد الإلكتروني</label>
                    <md-input v-model="email" type="email"></md-input>
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
              <h4 class="title">بيانات كتيب العائلة</h4>
            </div>
          </md-card-header>
          <form>
            <md-card-content>
              <div class="md-layout mt-25">
                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>السجل المدني المسؤول</label>
                    <md-input v-model="Register"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رقم القيد</label>
                    <md-input v-model="numberID"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رقم ورقة العائلة</label>
                    <md-input v-model="numberPage"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-datepicker v-model="dateCardF">
                    <label class="mr-28">تاريخ الإصدار</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>مكان الإصدار</label>
                    <md-input v-model="placeCardF"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رقم كتيب العائلة</label>
                    <md-input v-model="numberBook"></md-input>
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
              <h4 class="title">بيانات البطاقة الشخصية</h4>
            </div>
          </md-card-header>
          <form>
            <md-card-content>
              <div class="md-layout mt-25">
                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رقم البطاقة الشخصية</label>
                    <md-input v-model="idCard"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-datepicker v-model="dateCard">
                    <label class="mr-28">تاريخ إصدارالبطاقة</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>مكان الإصدار</label>
                    <md-input v-model="placeCard"></md-input>
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
              <h4 class="title">بيانات جواز السفر</h4>
            </div>
          </md-card-header>

          <form>
            <md-card-content>
              <div class="md-layout mt-25">
                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>الرقم الالي للجواز</label>
                    <md-input v-model="numberAuto"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-datepicker v-model="datePassport">
                    <label class="mr-28">تاريخ الإصدار</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>مكان الإصدار</label>
                    <md-input v-model="placePassport"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 mt-25 ml-15">
                  <md-field
                    :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  >
                    <label>رقم الجواز</label>
                    <md-input v-model="IDPassport"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-100 mt-50 center-content">
                  <md-button @click="Save" class="md-success btn_nanosoft"
                    >حفظ</md-button
                  >
                  <md-button @click="gobBack" class="md-info btn_nanosoft"
                    >رجوع</md-button
                  >
                </div>
              </div>
            </md-card-content>
          </form>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "../../../../../components/service/HTTP";
import moment from "moment";
import env from "../../../../../../env";
export default {
  async created() {
    localStorage.setItem("name", "");
    this.init();
  },

  data() {
    return {
      employeeId: "",
      nid: "",
      name: "",
      EnglishName: "",
      fname: "",
      gname: "",
      lname: "",
      gender: "",
      NationalityType: "",
      NationalityId: "",
      VisaExpiryDate: "",
      Address: "",
      phone: "",
      date: "",
      Place: "",
      mother: "",
      Status: "",
      wife_name: "",
      Nationality: "",
      children: "",
      email: "",
      Register: "",
      numberID: "",
      numberPage: "",
      dateCardF: "",
      placeCardF: "",
      numberBook: "",
      idCard: "",
      dateCard: "",
      placeCard: "",
      numberAuto: "",
      datePassport: "",
      placePassport: "",
      IDPassport: "",
      Nationality_Libyan: [],
      Nationality_Foreigner: [],
      errorMessage: "",
      ///////
      id: ""
    };
  },

  watch: {
    async NationalityType() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        let result_Nationality = await axios.get(
          `${env.HR()}/api/Nationalities`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.Nationality_Foreigner = [];
        this.Nationality_Libyan = [];

        for (var i = 0; i < result_Nationality.data.data.length; i++) {
          if (result_Nationality.data.data[i].type == "1") {
            this.Nationality_Libyan.push(result_Nationality.data.data[i]);
            if (this.NationalityType == "1") {
              this.NationalityId = result_Nationality.data.data[i].id;
            }
          } else {
            this.Nationality_Foreigner.push(result_Nationality.data.data[i]);
          }
        }
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
    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        this.employeeId = this.$route.params.id;
        let employeeId = this.$route.params.id;
        if (employeeId == "new") {
          return;
        }
        //   let result_Nationality = await axios.get(
        //     `${env.HR()}/api/Nationalities`,
        //     {
        //       headers: { Authorization: "Bearer " + token },
        //     }
        //   );
        // this.Nationality_comb = result_Nationality.data.data;

        if (employeeId) {
          let result = await axios.get(
            `${env.HR()}/api/hr/employees/${employeeId}/LoadPersonalInfo`,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );

          this.nid = env.NULL(result.data.data.nationalNumber);
          this.name = env.NULL(result.data.data.firstName);
          this.EnglishName = env.NULL(result.data.data.EnglishName);
          this.fname = env.NULL(result.data.data.fatherName);
          this.gname = env.NULL(result.data.data.grandFatherName);
          this.lname = env.NULL(result.data.data.lastName);
          this.gender = env.NULL(result.data.data.gender);
          this.NationalityType = env.NULL(result.data.data.nationalityType);
          this.NationalityId = env.NULL(result.data.data.nationalityID);
          localStorage.setItem("name", result.data.data.fullName);
          if (result.data.data.visaExpiryDate != null) {
            this.VisaExpiryDate = new Date(result.data.data.visaExpiryDate);
          }

          this.Address = env.NULL(result.data.data.address);
          this.phone = env.NULL(result.data.data.phone);

          if (result.data.data.birthDate != null) {
            this.date = new Date(result.data.data.birthDate);
          }
          this.Place = env.NULL(result.data.data.birthPlace);
          this.mother = env.NULL(result.data.data.motherName);
          this.Status = env.NULL(result.data.data.socialStatus);
          this.wife_name = env.NULL(result.data.data.nameMarried);
          this.Nationality = result.data.data.nationalityMarried;
          this.children = result.data.data.childerCount;
          this.email = env.NULL(result.data.data.email);
          this.Register = env.NULL(result.data.data.bookletCivilRegister);
          this.numberID = env.NULL(
            result.data.data.bookletRegistrationFamilyNumber
          );
          this.numberPage = env.NULL(result.data.data.bookletFamilyNumber);
          if (result.data.data.bookletIssueDate != null) {
            this.dateCardF = new Date(result.data.data.bookletIssueDate);
          }
          this.placeCardF = env.NULL(result.data.data.bookletIssuePlace);
          this.numberBook = env.NULL(result.data.data.bookletNumber);

          this.idCard = env.NULL(result.data.data.identificationCardNumber);
          if (result.data.data.identificationCardIssueDate != null) {
            this.dateCard = new Date(
              result.data.data.identificationCardIssueDate
            );
          }
          this.placeCard = env.NULL(
            result.data.data.identificationCardIssuePlace
          );

          this.numberAuto = env.NULL(result.data.data.passportAutoNumber);
          if (result.data.data.passportIssueDate != null) {
            this.datePassport = new Date(result.data.data.passportIssueDate);
          }
          this.placePassport = env.NULL(result.data.data.passportIssuePlace);
          this.IDPassport = env.NULL(result.data.data.passportNumber);
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

    async Save() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        if (this.nid.length !== 12 && this.nid != "") {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرقم الوطني يجب ان يكون 12 الرقم"
          );
        }
        if (!this.name) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال الاسم "
          );
        }

        if (!this.gender) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء اختيار الجنس"
          );
        }

        if (!this.NationalityType) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء اختيار نوع الجنسية"
          );
        }

        if (!this.date) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            " عفواً، الرجاء ادخال تاريخ الميلاد يجب ان يكون اكبر من 18 السنة"
          );
        }

        let form = new FormData();

        form.append("NationalNumber", this.nid);
        form.append("FirstName", this.name);
        form.append("EnglishName", this.EnglishName);
        form.append("FatherName", this.fname);
        form.append("GrandFatherName", this.gname);
        form.append("LastName", this.lname);
        form.append("gender", this.gender);
        form.append("NationalityType", this.NationalityType);
        form.append("NationalityId", this.NationalityId);
        form.append(
          "VisaExpiryDate",
          moment(this.visaExpiryDate).format("YYYY/MM/DD hh:mm:ss")
        );
        form.append("address", this.Address);
        form.append("Phone", this.phone);
        form.append(
          "BirthDate",
          moment(this.date).format("YYYY/MM/DD hh:mm:ss")
        );
        form.append("BirthPlace", this.Place);
        form.append("MotherName", this.mother);
        form.append("SocialStatus", this.Status);

        form.append("NameMarried", this.wife_name);
        form.append("NationalityMarried", this.Nationality);
        form.append("ChildrenCount", this.children);

        form.append("Email", this.email);

        form.append("BookletCivilRegister", this.Register);
        form.append("BookletRegistrationFamilyNumber", this.numberID);
        form.append("BookletFamilyNumber", this.numberPage);
        form.append("BookletIssueDate", this.dateCardF);
        form.append("BookletIssuePlace", this.placeCardF);
        form.append("BookletNumber", this.numberBook);

        form.append("IdentificationCardNumber", this.idCard);
        form.append("IdentificationCardIssueDate", this.dateCard);
        form.append("IdentificationCardIssuePlace", this.placeCard);

        form.append("PassportAutoNumber", this.numberAuto);
        form.append("PassportIssueDate", this.datePassport);
        form.append("PassportIssuePlace", this.placePassport);
        form.append("PassportNumber", this.IDPassport);

        let employeeId = this.$route.params.id;
        if (employeeId == "new") {
          let result_ = await axios.post(
            `${env.HR()}/api/hr/Employees/web`,
            form,
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data"
              }
            }
          );
          this.$router.replace("/pages/employee/info/" + result_.data.data.id);
          this.employeeId = result_.data.data.id;
        } else {
          let result = await axios.put(
            `${env.HR()}/api/hr/employees/${employeeId}/personal-info/web`,
            form,
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data"
              }
            }
          );
        }
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
