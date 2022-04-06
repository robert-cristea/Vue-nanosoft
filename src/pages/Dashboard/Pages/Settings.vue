<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100 mx-auto md-medium-size-100">
      <tabs
        :tab-name="['الإعدادات', 'بيانات الجهة', 'حول النظام']"
        :tab-icon="['settings', 'location_on', 'help']"
        class="page-subcategories"
        nav-pills-icons
        plain
        color-button="success"
      >
        <!-- here you can add your content for tab-content -->
        <template slot="tab-pane-1">
          <md-card>
            <md-card-content>
              <div class="md-layout center-content">
                <div class="md-layout-item md-size-25 ml-15 mtb-25">
                  <md-field>
                    <label>اللغة الإفتراضية</label>
                    <md-select v-model="lang">
                      <md-option value="ar-LY">اللغة العربية</md-option>
                      <md-option value="en-US">اللغة الإنجليزي</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-25 ml-15 mtb-25">
                  <!-- <md-field>
                    <label>الصفة الوظيفية العليا</label>
                    <md-select v-model="headJopId">
                      <md-option
                        v-for="classification in headJop"
                        v-bind:key="classification.id"
                        :value="classification.id"
                      >{{classification.name}}</md-option>
                    </md-select>
                  </md-field> -->
                  <md-checkbox v-model="linkingByAccounting">
                    الربط مع نظام إدارة الحسابات
                  </md-checkbox>
                </div>

                <div class="md-layout-item md-size-25 ml-15 mtb-25">
                  <md-checkbox v-model="linkingByWarehouse">
                    الربط مع نظام إدارة المخازن
                  </md-checkbox>
                </div>

                <!-- <div class="md-layout-item md-size-25 ml-15 mtb-25">
                  <ValidationProvider name="name" rules="required" v-slot="{ passed, failed }">
                    <md-field
                      :class="[
                            { 'md-error': failed },
                            { 'md-valid': passed },
                          ]"
                    >
                      <label>بداية الرقم التسلسلي للصادر الداخلي</label>

                      <md-input v-model="serialNumberBegining" type="email"></md-input>
                      <slide-y-down-transition>
                        <md-icon class="error" v-show="failed">close</md-icon>
                      </slide-y-down-transition>
                      <slide-y-down-transition>
                        <md-icon class="success" v-show="passed">done</md-icon>
                      </slide-y-down-transition>
                    </md-field>
                  </ValidationProvider>
                </div> -->
                <div class="md-layout-item md-size-25 ml-15 mtb-25">
                  <md-datepicker v-model="startingDate">
                    <label class="mr-28">تاريخ البداية</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 mt-25 center-content">
                  <md-checkbox v-model="CalculateSalriesFromTimeSheet"
                    >عدم احتساب المرتب من جدول الحضور والإنصراف</md-checkbox
                  >
                </div>

                <!-- <div class="md-layout-item md-size-25 ml-15 mtb-25">
                  <md-checkbox v-model="sentToArchiveJobTitle">تحويل المراسلات إلى المحفوظات</md-checkbox>
                </div> -->

                <div
                  class="md-layout-item md-size-100 mt-25 mtb-25 center-content"
                >
                  <md-button
                    @click="SaveSetings"
                    class="md-success btn_nanosoft"
                    >حفظ</md-button
                  >
                </div>
              </div>
            </md-card-content>
          </md-card>
        </template>
        <template slot="tab-pane-2">
          <md-card>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-size-25 ml-15 mtb-25">
                  <ValidationProvider name="name" rules="required">
                    <md-field>
                      <label>اسم الجهة</label>
                      <md-input v-model="fullName" type="email"></md-input>
                    </md-field>
                  </ValidationProvider>
                </div>
                <div class="md-layout-item md-size-25 ml-15 mtb-25">
                  <md-field>
                    <label>الوصف الوظيفي لعمل الجهة</label>
                    <md-input v-model="shortName" type="email"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-25 ml-15 mtb-25">
                  <ValidationProvider name="name" rules="required">
                    <md-field>
                      <label>الإسم الإنجليزي</label>
                      <md-input v-model="englishName" type="email"></md-input>
                    </md-field>
                  </ValidationProvider>
                </div>
                <!-- <div class="md-layout-item md-size-25 ml-15 mtb-25">
                      <ValidationProvider name="name" rules="required" v-slot="{ passed, failed }">
                        <md-field
                          :class="[
                                { 'md-error': failed },
                                { 'md-valid': passed },
                              ]"
                        >
                          <label></label>
                          <md-input v-model="fullName" type="email"></md-input>
                          <slide-y-down-transition>
                            <md-icon class="error" v-show="failed">close</md-icon>
                          </slide-y-down-transition>
                          <slide-y-down-transition>
                            <md-icon class="success" v-show="passed">done</md-icon>
                          </slide-y-down-transition>
                        </md-field>
                      </ValidationProvider>
                    </div> -->

                <div class="md-layout-item md-size-25 ml-15 mtb-25">
                  <ValidationProvider name="name" rules="required">
                    <md-field>
                      <label>العنوان</label>
                      <md-input v-model="address" type="email"></md-input>
                    </md-field>
                  </ValidationProvider>
                </div>
                <div class="md-layout-item md-size-25 ml-15 mtb-25">
                  <ValidationProvider name="Name" rules="required">
                    <md-field>
                      <label>رقم الهاتف</label>
                      <md-input v-model="phone" type="number"></md-input>
                    </md-field>
                  </ValidationProvider>
                </div>

                <div class="md-layout-item md-size-25 ml-15 mtb-25">
                  <ValidationProvider name="Name" rules="required">
                    <md-field>
                      <label>البريد الإلكتروني</label>
                      <md-input v-model="email" type="email"></md-input>
                    </md-field>
                  </ValidationProvider>
                </div>

                <div class="md-layout-item md-size-25 ml-15 mtb-25">
                  <ValidationProvider name="Name" rules="required">
                    <md-field>
                      <label>الفاكس</label>
                      <md-input v-model="fax" type="number"></md-input>
                    </md-field>
                  </ValidationProvider>
                </div>

                <div class="md-layout-item md-size-25 ml-15 mtb-25">
                  <ValidationProvider name="Name" rules="required">
                    <md-field>
                      <label>الموقع الإلكتروني</label>
                      <md-input v-model="web"></md-input>
                    </md-field>
                  </ValidationProvider>
                </div>

                <div
                  class="md-layout-item md-size-20 mt-25 mtb-25 center-content"
                >
                  <md-button @click="InfoSave" class="md-success btn_nanosoft"
                    >حفظ</md-button
                  >
                </div>
                <!-- <div class="md-layout-item md-size-20 mt-25 mtb-25  center-content">
                 <label for="file-upload" class="custom-file-upload">
                 إضافة مرفقات
              </label>
              <input id="file-upload" type="file" @change="onFileChange" />
                </div> -->
              </div>
            </md-card-content>
          </md-card>
        </template>
        <template slot="tab-pane-3">
          <md-card>
            <md-card-header>
              <br />
              <br />

              <h3 class="title">نظام "بياناتي" لإدارة الموارد البشرية</h3>
              <br />
              <h3 class="title">الإصدار: 1.3.7</h3>
              <br />
              <h3 class="title">البريد الإلكتروني: info@nanosoft.ly</h3>
              <br />
              <h3 class="title">الموقع: www.nanosoft.ly</h3>
              <br />
              <br />
              <br />
            </md-card-header>

            <!-- <md-card-content>
             
            </md-card-content> -->
          </md-card>
        </template>
        <template slot="tab-pane-4">
          <md-card>
            <md-card-header>
              <h4 class="title">Help center</h4>
              <p class="category">More information here</p>
            </md-card-header>

            <md-card-content>
              Completely synergize resource taxing relationships via premier
              niche markets. Professionally cultivate one-to-one customer
              service with robust ideas. Dynamically innovate resource-leveling
              customer service for state of the art customer service.
            </md-card-content>
          </md-card>
        </template>
      </tabs>
    </div>
  </div>
</template>
<script>
import { Tabs } from "@/components";
import env from "../../../../env";
import axios from "../../../components/service/HTTP";
// import { ModelListSelect } from "vue-search-select";
// import "vue-search-select/dist/VueSearchSelect.css";
import { SlideYDownTransition } from "vue2-transitions";
export default {
  created() {
    this.init();
  },
  components: {
    Tabs
    // ModelListSelect,
    // SlideYDownTransition
  },
  data() {
    return {
      show: false,
      startingDate: "",
      CalculateSalriesFromTimeSheet: false,
      linkingByWarehouse: false,
      departments: [],
      linkingByAccounting: false,
      files: [],
      sentToArchiveJobTitle: false,
      outgoingSerialNumber: "",
      serialNumberBegining: "",
      lang: "",
      headJopId: "",
      headJop: "",
      archiveJobTitleId: "",
      fullName: "",
      shortName: "",
      englishName: "",
      address: "",
      phone: "",
      email: "",
      fax: "",
      web: "",
      organizations: [],
      organizationsId: ""
    };
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      files[0].size;
      if (!files.length) return;
      let schema = {
        name: files[0].name,
        file: files[0],
        id: Math.random(),
        size: files[0].size
      };
      return this.files.push(schema);
    },
    async SaveSetings() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        if (!this.lang) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال اسم الوحدة التنظيمية"
          );
        }
        if (!this.startingDate) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال اسم الوحدة التنظيمية"
          );
        }
        let schema = {
          startingDate: new Date(this.startingDate),
          CalculateSalriesFromTimeSheet: this.CalculateSalriesFromTimeSheet,
          linkingByWarehouse: this.linkingByWarehouse,
          linkingByAccounting: this.linkingByAccounting,
          defaultCulture: this.lang
        };
        let result = await axios.put(`${env.HR()}/api/Setting`, schema, {
          headers: { Authorization: "Bearer " + token }
        });

        this.notifyVue(
          "top",
          "center",
          "success",
          "تم الحفظ بنجاح سيتم تسجيل الخروج "
        );
        setTimeout(() => {
          this.$router.replace("/"); //window.location.href = '#/'
        }, 5000);
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.errors[Object.keys(error.response.data.errors)][0]
        );
      }
    },
    async InfoSave() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        // if (this.organizationsId==='') {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء ادخال  بايانات الجهة"
        //   );
        // }
        if (!this.fullName) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال  اسم الجهة"
          );
        }
        // if (!this.shortName) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء ادخال الوصف الوظيفي لعمل الجهة"
        //   );
        // }
        // if (!this.englishName) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء ادخال اسم الإنجليزي"
        //   );
        // }
        // if (!this.address) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء ادخال اسم العنوان"
        //   );
        // }
        // if (this.phone.length!==10) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، رقم الهاتف يجب ان يكون 10 ارقام"
        //   );
        // }
        // if (!this.email) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء ادخال البريد الإلكتروني"
        //   );
        // }
        // if (!this.fax) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء ادخال الفاكس"
        //   );
        // }
        // if (!this.web) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء ادخال رابط الموقع"
        //   );
        // }

        // if (!this.files[0]) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء ارفاق الملف"
        //   );
        // }
        // let shortName = this.departments.find(el=> el.id===this.organizationsId)
        let form = new FormData();
        form.append("ShortName", this.shortName == null ? "" : this.shortName);
        form.append("FullName", this.fullName);
        form.append(
          "EnglishName",
          this.englishName == null ? "" : this.englishName
        );
        form.append("Address", this.address == null ? "" : this.address);
        form.append("Phone", this.phone == null ? "" : this.phone);
        form.append("Email", this.email == null ? "" : this.email);
        form.append("Fax", this.fax);
        form.append("Web", this.web == null ? "" : this.web);
        form.append(
          "FilesToAdd",
          this.files[0] === undefined ? [] : this.files[0].file
        );
        // form.append("OrganizationId", this.organizationsId);
        let result = await axios.put(`${env.HR()}/api/companyinfos/web`, form, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data"
          }
        });
        return this.notifyVue("top", "center", "success", " تم الحفظ بنجاح ");
      } catch (error) {
        // console.log(error);

        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.message
        );
      }

      // let form = new FormData();
      //   form.append("JobNumber", this.jobNamber);
      //   form.append("FirstName", this.name);
      //   form.append("FatherName", this.fname);
      //   form.append("GrandFatherName", this.gname);
      //   form.append("LastName", this.lname);
      //   form.append("NationalNumber", this.nid);
      //   form.append("Phone", this.phone);
      //   form.append("Email", this.email);
      //   form.append(
      //     "BirthDate",
      //     moment(this.date).format("YYYY/MM/DD hh:mm:ss")
      //   );
      //   form.append("Residence", this.resdaint);
      //   form.append("DepartmentId", this.dep);
      //   form.append("JobTitleId", this.jobTitle);
      //   form.append("IsManager", this.isManager);
      //   form.append("DigitalSignature", this.files);
      //   form.append("Image", []);
      //   form.append("DeleteImage", false);
      //   if (this.id === "") {
      //     let result = await axios.post(
      //       `${env.Mail()}/api/employees/web`,
      //       form,
      //       {
      //         headers: {
      //           Authorization: "Bearer " + token,
      //           "Content-Type": "multipart/form-data"
      //         }
      //       }
      //     );
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
        if (!this.nameunit) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال اسم الوحدة التنظيمية"
          );
        }
        let schema = {
          Name: this.nameunit,
          Number: this.number,
          Code: this.code,
          ParentId: this.departmentId,
          DepartmentClassificationsId: this.classificationId
        };
        if (this.id === "") {
          let result = await axios.post(
            `${env.Mail()}/api/departments`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        } else {
          let result = await axios.put(
            `${env.Mail()}/api/departments/${this.id}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        }
        this.init();
        this.id = "";
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
        let resultOne2 = await axios.get(`${env.HR()}/api/companyinfos`, {
          headers: { Authorization: "Bearer " + token }
        });
        let resultOne = await axios.get(`${env.HR()}/api/Setting`, {
          headers: { Authorization: "Bearer " + token }
        });

        this.lang = resultOne.data.data.defaultCulture;
        this.linkingByAccounting = resultOne.data.data.linkingByAccounting;
        this.linkingByWarehouse = resultOne.data.data.linkingByWarehouse;
        this.startingDate = resultOne.data.data.startingDate.split("T")[0];
        this.CalculateSalriesFromTimeSheet =
          resultOne.data.data.calculateSalriesFromTimeSheet;
        this.fullName = resultOne2.data.data.fullName;
        this.shortName = resultOne2.data.data.shortName;
        this.englishName = resultOne2.data.data.englishName;
        this.address = resultOne2.data.data.address;
        this.phone = resultOne2.data.data.phone;
        this.email = resultOne2.data.data.email;
        this.fax = resultOne2.data.data.fax;
        this.web = resultOne2.data.data.web;
        this.organizationsId = resultOne2.data.data.organizationId;
        this.organizations = resultOne2.data.data.organizations;
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
  watch: {}
};
</script>
