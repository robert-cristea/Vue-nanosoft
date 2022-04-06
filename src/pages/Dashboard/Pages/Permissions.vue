<template>
  <div>
    <!---------- section1  ------------->
    <div class="md-layout">
      <div class="md-layout-item">
        <ValidationObserver v-slot="{ passed, failed }">
          <form>
            <md-card class="p-25">
              <div>
                <md-card-content>
                  <div class="md-layout center-content">
                    <div class="md-layout-item md-size-50 text-align-center">
                      <md-field
                        class="input-width-60-center"
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <p class="validate">*</p>
                        <label>اسم المجموعة</label>
                        <md-input v-model="groupName" type="email"></md-input>
                      </md-field>
                      <div class="mt-25">
                        <md-button @click="Save" class="md-success btn_nanosoft"
                          >حفظ</md-button
                        >
                      </div>
                    </div>

                    <div class="md-layout-item md-size-50">
                      <md-table
                        :value="queriedData"
                        :md-sort.sync="currentSort"
                        :md-sort-order.sync="currentSortOrder"
                        :md-sort-fn="customSort"
                        class="paginated-table table-striped table-hover"
                      >
                        <md-table-row slot="md-table-row" slot-scope="{ item }">
                          <md-table-cell md-label="اسم المجموعة">{{
                            item.name
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
                    </div>
                  </div>
                </md-card-content>
              </div>
            </md-card>
          </form>
        </ValidationObserver>
      </div>
    </div>

    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-text md-card-header-green">
          <div class="card-text">
            <h4 class="title">الصلاحيات</h4>
          </div>
        </md-card-header>
        <md-card-content class="mt-25">
          <div class="md-layout mt-25 mb-25">
            <div class="md-layout-item md-size-15">
              <md-checkbox v-model="All">الكل</md-checkbox>
            </div>
          </div>

          <!-- <div class="md-layout mt-25 flex-content-left">
            <div class="md-layout-item md-size-15">
              <md-table-toolbar>
                <md-field>
                  <label for="pages">عدد النتائج</label>
                  <md-select v-model="pagination.perPage" name="pages" class="input-width-60">
                    <md-option
                      v-for="item in pagination.perPageOptions"
                      :key="item"
                      :label="item"
                      :value="item"
                    >{{ item }}</md-option>
                  </md-select>
                </md-field>
              </md-table-toolbar>
            </div>
          </div>-->
          <md-table
            :value="this.tableData2"
            :md-sort.sync="currentSort"
            :md-sort-order.sync="currentSortOrder"
            :md-sort-fn="customSort"
            class="paginated-table table-striped table-hover"
          >
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="اسم الصلاحية">{{
                RenameFunction(item.name)
              }}</md-table-cell>
              <md-table-cell md-label="الصلاحيات">
                <input
                  id="asdd"
                  type="checkbox"
                  class="checkboxv2"
                  v-model="item.permission.All"
                  @click="rowAll(item)"
                />
                <label for="asdd">الكل</label>
                <md-checkbox
                  v-show="item.permission.View.show"
                  v-model="item.permission.View.state"
                  >مشاهدة</md-checkbox
                >
                <md-checkbox
                  v-show="item.permission.Create.show"
                  v-model="item.permission.Create.state"
                  >إضافة</md-checkbox
                >
                <md-checkbox
                  v-show="item.permission.Edit.show"
                  v-model="item.permission.Edit.state"
                  >تعديل</md-checkbox
                >
                <md-checkbox
                  v-show="item.permission.Delete.show"
                  v-model="item.permission.Delete.state"
                  >حذف</md-checkbox
                >
                <md-checkbox
                  v-show="item.permission.Confirm.show"
                  v-model="item.permission.Confirm.state"
                  >موافقة</md-checkbox
                >
                <md-checkbox
                  v-show="item.permission.UnConfirm.show"
                  v-model="item.permission.UnConfirm.state"
                  >عدم موافقة</md-checkbox
                >
                <md-checkbox
                  v-show="item.permission.StampingMail.show"
                  v-model="item.permission.StampingMail.state"
                  >اضافة ختم</md-checkbox
                >
                <md-checkbox
                  v-show="item.permission.Save.show"
                  v-model="item.permission.Save.state"
                  >حفظ</md-checkbox
                >
                <md-checkbox
                  v-show="item.permission.Calculate.show"
                  v-model="item.permission.Calculate.state"
                  >احتساب</md-checkbox
                >
                <md-checkbox
                  v-show="item.permission.Closed.show"
                  v-model="item.permission.Closed.state"
                  >إيقاف</md-checkbox
                >
                <md-checkbox
                  v-show="item.permission.Release.show"
                  v-model="item.permission.Release.state"
                  >افراج</md-checkbox
                >
                <md-checkbox
                  v-show="item.permission.ClosedMounth.show"
                  v-model="item.permission.ClosedMounth.state"
                  >إغلاق شهر</md-checkbox
                >
                <md-checkbox
                  v-show="item.permission.Upgrade.show"
                  v-model="item.permission.Upgrade.state"
                  >ترقية</md-checkbox
                >

                <md-checkbox
                  v-show="item.permission.AddBonus.show"
                  v-model="item.permission.AddBonus.state"
                  >إضافة علاوة</md-checkbox
                >
                <md-checkbox
                  v-show="item.permission.Calculated.show"
                  v-model="item.permission.Calculated.state"
                  >اعتماد الاحتساب</md-checkbox
                >
                <md-checkbox
                  v-show="item.permission.Discount.show"
                  v-model="item.permission.Discount.state"
                  >موافقة</md-checkbox
                >
                <md-checkbox
                  v-show="item.permission.UnDiscount.show"
                  v-model="item.permission.UnDiscount.state"
                  >عدم الموافقة</md-checkbox
                >
                <md-checkbox
                  v-show="item.permission.Topup.show"
                  v-model="item.permission.Topup.state"
                  >منح الأرصدة المستحقة</md-checkbox
                >
              </md-table-cell>
              <md-table-cell style="width: 0px"> </md-table-cell>
            </md-table-row>
          </md-table>
          <div class="footer-table md-table">
            <table>
              <tfoot></tfoot>
            </table>
          </div>
        </md-card-content>
        <md-card-actions md-alignment="space-between">
          <div class></div>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>
<script>
import axios from "../../../components/service/HTTP";
import { Pagination } from "@/components";
import users from "./users";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
// import { SlideYDownTransition } from "vue2-transitions";
// import { extend } from "vee-validate";
// import { required, numeric, regex, confirmed } from "vee-validate/dist/rules";
import env from "../../../../env";
import permission from "./users.js";
// extend("required", required);
// extend("numeric", numeric);
// extend("regex", regex);
// extend("confirmed", confirmed);
export default {
  async created() {
    this.init();
    let T = localStorage.getItem("Nannotoken");
    let token = atob(T);
    let result = await axios.get(`${env.HR()}/api/usergroups`, {
      headers: { Authorization: "Bearer " + token },
    });
    this.tableData = result.data.data;
  },
  components: {
    // Pagination,
    // SlideYDownTransition,
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    returnValue(id, item) {
      let state = false;
      item.forEach((element) => {
        if (id === element) {
          state = true;
        }
      });
      return state;
    },
    quieryDate() {
      let result = this.tableData2;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
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
      All: false,
      tableData2: [],
      groupName: "",
      boolean1: "",
      id: "",
      isUpdate: false,
      IsAdmin: "Support",
      IsAdminSearch: false,
      Name: "",
      Title: "",
      Email: "",
      Password: "",
      Phone: "",
      currentSort: "Titel",
      currentSortOrder: "asc",
      pagination: {
        perPage: 10000,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      searchQuery: "",
      propsToSearch: ["Titel", "Severity", "Status"],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
    };
  },
  methods: {
    async Save() {
      try {
        let array = [];
        this.tableData2.forEach((ele) => {
          if (ele.permission.View.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "View",
            };
            array.push(schema);
          }
          if (ele.permission.Create.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "Create",
            };
            array.push(schema);
          }
          if (ele.permission.Edit.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "Edit",
            };
            array.push(schema);
          }
          if (ele.permission.Delete.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "Delete",
            };
            array.push(schema);
          }
          if (ele.permission.Confirm.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "Confirm",
            };
            array.push(schema);
          }
          if (ele.permission.UnConfirm.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "UnConfirm",
            };
            array.push(schema);
          }
          if (ele.permission.StampingMail.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "StampingMail",
            };
            array.push(schema);
          }
          if (ele.permission.Save.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "Save",
            };
            array.push(schema);
          }
          if (ele.permission.Calculate.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "Calculate",
            };
            array.push(schema);
          }
          if (ele.permission.Closed.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "Closed",
            };
            array.push(schema);
          }
          if (ele.permission.Release.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "Release",
            };
            array.push(schema);
          }
          if (ele.permission.ClosedMounth.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "ClosedMounth",
            };
            array.push(schema);
          }
          if (ele.permission.Calculated.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "Calculated",
            };
            array.push(schema);
          }
          if (ele.permission.Discount.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "Discount",
            };
            array.push(schema);
          }

          if (ele.permission.UnDiscount.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "UnDiscount",
            };
            array.push(schema);
          }

          if (ele.permission.Upgrade.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "Upgrade",
            };
            array.push(schema);
          }
          if (ele.permission.AddBonus.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "AddBonus",
            };
            array.push(schema);
          }
          if (ele.permission.Topup.state !== false) {
            let schema = {
              Type: ele.name,
              Permission: "Topup",
            };
            array.push(schema);
          }
        });
        let schema = {
          Name: this.groupName,
          Abilities: array,
        };
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        if (this.id !== "") {
          let result = await axios.put(
            `${env.HR()}/api/usergroups/${this.id}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
        } else {
          let result = await axios.post(`${env.HR()}/api/usergroups`, schema, {
            headers: { Authorization: "Bearer " + token },
          });
        }
        this.refrach();
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
    RenameFunction(name) {
      try {
        if (name === "ExtraWorks") {
          return "العمل الإضافي";
        }

        if (name === "User") {
          return "المستحدمين";
        }

        if (name === "CompanyInfo") {
          return "بيانات الجهة";
        }
        if (name === "JobTitle") {
          return "الصفة الوظيفية";
        }
        if (name === "DigitalStamp") {
          return "الأختام الإلكترونية";
        }
        if (name === "DepartmentClassifications") {
          return "تصنيف الفروع";
        }
        if (name === "Department") {
          return "الهيكلية الإدارية";
        }
        if (name === "Employee") {
          return "الموظفين";
        }
        if (name === "MailTemplate") {
          return "قوالب المراسلات";
        }
        if (name === "IncomingMail") {
          return "وارد المراسلات الخارجية";
        }
        if (name === "OutcomingGeneralLeagueFile") {
          return "ملف الدوري الخارجي";
        }
        if (name === "IncomingMailsSent") {
          return "وارد خارجي";
        }
        if (name === "IncomingGeneralLeagueFile") {
          return "ملف الدوري الداخلي";
        }
        if (name === "OutgoingMail") {
          return "صادر المراسلات الخارجية";
        }
        if (name === "InternalMail") {
          return "المراسلات الداخلية";
        }
        if (name === "Classification") {
          return "تصنيفات المراسلات";
        }
        if (name === "Sector") {
          return "القطاعات";
        }
        if (name === "Body") {
          return "الجهات";
        }
        if (name === "Activity") {
          return "أنشطة المستخدمين";
        }
        if (name === "Settings") {
          return "الإعدادات";
        }
        if (name === "UserGroup") {
          return "الصلاحيات";
        }
        if (name === "VacationRecord") {
          return "أرصدة وخصميات الإجازات السنوية";
        }

        if (name === "ScientificDegree") {
          return "المؤهلات العلمية";
        }
        if (name === "Evaluation") {
          return "التقييمات";
        }
        if (name === "DocumentType") {
          return "أنواع المستندات";
        }
        if (name === "SalariesComparison") {
          return "مقارنة المرتبات";
        }
        if (name === "SalariesReports") {
          return "تقارير المرتبات";
        }
        if (name === "Salary") {
          return "المرتبات";
        }
        if (name === "VacationRequest") {
          return "طلبات الإجازات- الخدمات الذاتية ";
        }
        if (name === "ExcuseRequest") {
          return "طلبات الأعذار - الخدمات الذاتية";
        }
        if (name === "SalaryDifferences") {
          return "الفروقات";
        }
        if (name === "EmployeeVariable") {
          return "حركات الموظفين";
        }
        if (name === "EmployeePromotion") {
          return "حركات ترقيات الموظف";
        }
        if (name === "Committee") {
          return "اللجان";
        }
        if (name === "EvaluationType") {
          return "أنواع التقييمات";
        }
        if (name === "BankBranch") {
          return "فروع المصارف";
        }
        if (name === "Court") {
          return "المحاكم";
        }
        if (name === "TypesBonuse") {
          return "أنواع العلاوات";
        }
        if (name === "EmployeeBonus") {
          return "علاوات الموظفين";
        }
        if (name === "Bank") {
          return "المصارف";
        }
        if (name === "Deduction") {
          return "الإستقطاعات";
        }
        if (name === "SituationSettlement") {
          return "تسوية الوضع";
        }
        if (name === "EndService") {
          return "انتهاء الخدمة";
        }
        if (name === "Timesheet") {
          return "جدول الحضور والانصراف";
        }
        if (name === "Shift") {
          return "دوام العمل الرسمي";
        }
        if (name === "VacationType") {
          return "أنواع الإجازات";
        }
        if (name === "Vacation") {
          return "الإجازات";
        }
        if (name === "Nationality") {
          return "الجنسيات";
        }
        if (name === "Holiday") {
          return "العطل";
        }
        if (name === "Excuse") {
          return "الأعذار";
        }
        if (name === "Device") {
          return "الأجهزة";
        }
        if (name === "DsektopAppVacationRequest") {
          return "طلبات الإجازات";
        }
        if (name === "ScientificDegreesEmployee") {
          return "الدرجات المالية للموظف";
        }
        if (name === "SalaryScale") {
          return "جدول المرتبات";
        }
        return name;
      } catch (error) {}
    },
    async refrach() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(`${env.HR()}/api/usergroups`, {
          headers: { Authorization: "Bearer " + token },
        });
        this.tableData = result.data.data;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.errors[Object.keys(error.response.data.errors)][0]
        );
      }
    },
    customSort(value) {
      // return value.sort((a, b) => {
      //   const sortBy = this.currentSort;
      //   if (this.currentSortOrder === "desc") {
      //     return a[sortBy].localeCompare(b[sortBy]);
      //   }
      //   return b[sortBy].localeCompare(a[sortBy]);
      // });
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
      this.isUpdate = true;
      this.item = item;
      this.groupName = item.name;
      this.id = item.id;
      this.All = false;
      this.getThePremssion(this.id);
    },
    init() {
      try {
        let array = [];
        let result = permission;
        let rockStar = permission;
        for (let i = 0; i < result.length; i++) {
          let schema = {
            name: result[i].type,
            permission: {
              All: false,
              View: {
                state: false,
                show: false,
              },
              Create: {
                state: false,
                show: false,
              },
              Edit: {
                state: false,
                show: false,
              },
              Delete: {
                state: false,
                show: false,
              },
              Confirm: {
                state: false,
                show: false,
              },
              UnConfirm: {
                state: false,
                show: false,
              },
              StampingMail: {
                state: false,
                show: false,
              },
              Save: {
                state: false,
                show: false,
              },
              Calculate: {
                state: false,
                show: false,
              },
              Closed: {
                state: false,
                show: false,
              },
              Release: {
                state: false,
                show: false,
              },
              ClosedMounth: {
                state: false,
                show: false,
              },
              Calculated: {
                state: false,
                show: false,
              },
              Upgrade: {
                state: false,
                show: false,
              },
              AddBonus: {
                state: false,
                show: false,
              },
              UnDiscount: {
                state: false,
                show: false,
              },
              Discount: {
                state: false,
                show: false,
              },
              Topup: {
                state: false,
                show: false,
              },
            },
          };
          for (let index = 0; index < rockStar.length; index++) {
            if (result[i].type === rockStar[index].type) {
              //----ExtraWorks----//

              if (result[i].type === "ExtraWorks") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Confirm.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }

                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = false;
                }
              }

              ////////  User  /////////

              if (result[i].type === "User") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }

              if (result[i].type === "ScientificDegreesEmployee") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }

              if (result[i].type === "DsektopAppVacationRequest") {
                schema.permission.View.show = true;
                schema.permission.Discount.show = true;
                schema.permission.UnDiscount.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Discount") {
                  schema.permission.Discount.state = false;
                }
                if (rockStar[index].permission === "UnDiscount") {
                  schema.permission.UnDiscount.state = false;
                }
              }
              ///////////  UserGroup  ////////////
              if (result[i].type === "UserGroup") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              ///////////  Settings  ////////////
              if (result[i].type === "Settings") {
                schema.permission.View.show = true;
                schema.permission.Edit.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
              }
              ///////////  Activity  ////////////
              if (result[i].type === "Activity") {
                schema.permission.View.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
              }
              ////////   Body   ////////
              if (result[i].type === "Body") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              ////////   Sector   ////////
              if (result[i].type === "Sector") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              ////////   Classification   ////////
              if (result[i].type === "Classification") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              ////////   InternalMail   ////////
              if (result[i].type === "InternalMail") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.StampingMail.show = true;
                if (rockStar[index].permission === "StampingMail") {
                  schema.permission.StampingMail.state = false;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              ////////   OutgoingMail   ////////
              if (result[i].type === "OutgoingMail") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "StampingMail") {
                  schema.permission.StampingMail.state = false;
                  schema.permission.StampingMail.show = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              ////////   IncomingGeneralLeagueFile   ////////
              if (result[i].type === "IncomingGeneralLeagueFile") {
                schema.permission.View.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              ////////   IncomingMailsSent   ////////
              if (result[i].type === "IncomingMailsSent") {
                schema.permission.View.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              ////////   OutcomingGeneralLeagueFile   ////////
              if (result[i].type === "OutcomingGeneralLeagueFile") {
                schema.permission.View.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              ////////   IncomingMail   ////////
              if (result[i].type === "IncomingMail") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;

                if (rockStar[index].permission === "StampingMail") {
                  schema.permission.StampingMail.state = false;
                  schema.permission.StampingMail.show = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              ////////   MailTemplate   ////////
              if (result[i].type === "MailTemplate") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              ////////   Employee   ////////
              if (result[i].type === "Employee") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Upgrade.show = true;
                schema.permission.AddBonus.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
                if (rockStar[index].permission === "Upgrade") {
                  schema.permission.Upgrade.state = false;
                }
                if (rockStar[index].permission === "AddBonus") {
                  schema.permission.AddBonus.state = false;
                }
              }
              ////////   Department   ////////
              if (result[i].type === "Department") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              ////////   DepartmentClassifications   ////////
              if (result[i].type === "DepartmentClassifications") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              ////////   DigitalStamp   ////////
              if (result[i].type === "DigitalStamp") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Confirm.show = true;
                schema.permission.UnConfirm.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = false;
                }
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = false;
                }
              }
              ////////   JobTitle   ////////
              if (result[i].type === "JobTitle") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              ////////   CompanyInfo   ////////
              if (result[i].type === "CompanyInfo") {
                schema.permission.Save.show = true;
                schema.permission.View.show = true;

                if (rockStar[index].permission === "Save") {
                  schema.permission.Save.state = false;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
              }

              if (result[i].type === "VacationRecord") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Topup.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Topup") {
                  schema.permission.Topup.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }

              if (result[i].type === "ScientificDegree") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "Device") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "Excuse") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }

              if (result[i].type === "Holiday") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "Nationality") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "Vacation") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "VacationType") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }

              if (result[i].type === "Shift") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "Timesheet") {
                schema.permission.View.show = true;
                schema.permission.Confirm.show = true;
                schema.permission.UnConfirm.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = false;
                }
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = false;
                }
              }
              if (result[i].type === "EndService") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "Evaluation") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "DocumentType") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }

              if (result[i].type === "SalariesComparison") {
                schema.permission.View.show = true;
                // schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                // schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                // if (rockStar[index].permission === "Create") {
                //   schema.permission.Create.state = false;
                // }
                // if (rockStar[index].permission === "Edit") {
                //   schema.permission.Edit.state = false;
                // }
                // if (rockStar[index].permission === "Delete") {
                //   schema.permission.Delete.state = false;
                // }
              }
              if (result[i].type === "SituationSettlement") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "Deduction") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "Bank") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "SalariesReports") {
                schema.permission.View.show = true;
                // schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                // schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                // if (rockStar[index].permission === "Create") {
                //   schema.permission.Create.state = false;
                // }
                // if (rockStar[index].permission === "Edit") {
                //   schema.permission.Edit.state = false;
                // }
                // if (rockStar[index].permission === "Delete") {
                //   schema.permission.Delete.state = false;
                // }
              }
              if (result[i].type === "EmployeeBonus") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Confirm.show = true;
                schema.permission.UnConfirm.show = true;
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = false;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = false;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "TypesBonuse") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "Court") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "BankBranch") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "EvaluationType") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "SalaryScale") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
              }
              if (result[i].type === "Committee") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Confirm.show = true;
                schema.permission.UnConfirm.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = false;
                }
                if (rockStar[index].permission === "Unconfirm") {
                  schema.permission.UnConfirm.state = false;
                }
              }
              if (result[i].type === "EmployeePromotion") {
                schema.permission.View.show = true;
                // schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                // schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                // if (rockStar[index].permission === "Create") {
                //   schema.permission.Create.state = false;
                // }
                // if (rockStar[index].permission === "Edit") {
                //   schema.permission.Edit.state = false;
                // }
                // if (rockStar[index].permission === "Delete") {
                //   schema.permission.Delete.state = false;
                // }
              }

              if (result[i].type === "EmployeeVariable") {
                schema.permission.View.show = true;
                // schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                // if (rockStar[index].permission === "Create") {
                //   schema.permission.Create.state = false;
                // }
                // if (rockStar[index].permission === "Edit") {
                //   schema.permission.Edit.state = false;
                // }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "SalaryDifferences") {
                schema.permission.View.show = true;
                // schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Confirm.show = true;
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = false;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                // if (rockStar[index].permission === "Create") {
                //   schema.permission.Create.state = false;
                // }
                // if (rockStar[index].permission === "Edit") {
                //   schema.permission.Edit.state = false;
                // }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
              }
              if (result[i].type === "Salary") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Calculate.show = true;
                schema.permission.Closed.show = true;
                schema.permission.Release.show = true;
                schema.permission.ClosedMounth.show = true;
                schema.permission.Calculated.show = true;
                schema.permission.UnConfirm.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
                if (rockStar[index].permission === "Calculate") {
                  schema.permission.Delete.state = false;
                }
                if (rockStar[index].permission === "Closed") {
                  schema.permission.Delete.state = false;
                }
                if (rockStar[index].permission === "Release") {
                  schema.permission.Release.state = false;
                }
                if (rockStar[index].permission === "ClosedMounth") {
                  schema.permission.ClosedMounth.state = false;
                }
                if (rockStar[index].permission === "Calculated") {
                  schema.permission.Calculated.state = false;
                }
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = false;
                }
              }
              if (result[i].type === "ExcuseRequest") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.UnConfirm.show = true;
                schema.permission.Confirm.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = false;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = false;
                }
              }
              if (result[i].type === "VacationRequest") {
                schema.permission.UnConfirm.show = true;
                schema.permission.Confirm.show = true;
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = false;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = false;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = false;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = false;
                }
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = false;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = false;
                }
              }
            }
          }
          array.push(schema);
        }
        let filterd = [];
        let state = false;
        for (let index = 0; index < array.length; index++) {
          for (let i = 0; i < array.length; i++) {
            if (filterd[i] !== undefined) {
              if (filterd[i].name === array[index].name) {
                state = true;
              }
            }
          }
          if (state === false) {
            filterd.push(array[index]);
          }
          state = false;
        }
        this.tableData2 = filterd;
      } catch (error) {
        // console.log(error);
      }
    },
    async getThePremssion(id) {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(`${env.HR()}/api/usergroups/${id}`, {
          headers: { Authorization: "Bearer " + token },
        });
        this.tableData2 = result.data.data.abilities;
        let array = [];
        let rockStar = result.data.data.abilities;
        for (let i = 0; i < result.data.data.abilities.length; i++) {
          let schema = {
            name: result.data.data.abilities[i].type,
            permission: {
              All: false,
              View: {
                state: false,
                show: false,
              },
              Create: {
                state: false,
                show: false,
              },
              Edit: {
                state: false,
                show: false,
              },
              Delete: {
                state: false,
                show: false,
              },
              Confirm: {
                state: false,
                show: false,
              },
              UnConfirm: {
                state: false,
                show: false,
              },
              StampingMail: {
                state: false,
                show: false,
              },
              Save: {
                state: false,
                show: false,
              },
              Calculate: {
                state: false,
                show: false,
              },
              Closed: {
                state: false,
                show: false,
              },
              Release: {
                state: false,
                show: false,
              },
              ClosedMounth: {
                state: false,
                show: false,
              },
              Calculated: {
                state: false,
                show: false,
              },
              Upgrade: {
                state: false,
                show: false,
              },
              AddBonus: {
                state: false,
                show: false,
              },
              Discount: {
                state: false,
                show: false,
              },
              UnDiscount: {
                state: false,
                show: false,
              },
              Topup: {
                state: false,
                show: false,
              },
            },
          };
          for (let index = 0; index < rockStar.length; index++) {
            if (result.data.data.abilities[i].type === rockStar[index].type) {
              //----ExtraWorks----//

              if (result.data.data.abilities[i].type === "ExtraWorks") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Confirm.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }

                   if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = true;
                }
              }

              //////// User /////////
              if (result.data.data.abilities[i].type === "User") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ///////////  UserGroup  ////////////
              if (
                result.data.data.abilities[i].type ===
                "DsektopAppVacationRequest"
              ) {
                schema.permission.View.show = true;
                schema.permission.Discount.show = true;
                schema.permission.UnDiscount.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Discount") {
                  schema.permission.Discount.state = true;
                }
                if (rockStar[index].permission === "UnDiscount") {
                  schema.permission.UnDiscount.state = true;
                }
              }

              if (
                result.data.data.abilities[i].type ===
                "ScientificDegreesEmployee"
              ) {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }

              if (result.data.data.abilities[i].type === "UserGroup") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ///////////  Settings  ////////////
              if (result.data.data.abilities[i].type === "Settings") {
                schema.permission.View.show = true;
                schema.permission.Edit.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
              }
              ///////////  Activity  ////////////
              if (result.data.data.abilities[i].type === "Activity") {
                schema.permission.View.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
              }
              ////////   Body   ////////
              if (result.data.data.abilities[i].type === "Body") {
                schema.permission.View.show = true;
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   Sector   ////////
              if (result.data.data.abilities[i].type === "Sector") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   Classification   ////////
              if (result.data.data.abilities[i].type === "Classification") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   InternalMail   ////////
              if (result.data.data.abilities[i].type === "InternalMail") {
                schema.permission.StampingMail.show = true;
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "StampingMail") {
                  schema.permission.StampingMail.state = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   OutgoingMail   ////////
              if (result.data.data.abilities[i].type === "OutgoingMail") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "StampingMail") {
                  schema.permission.StampingMail.state = true;
                  schema.permission.StampingMail.show = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   IncomingGeneralLeagueFile   ////////
              if (
                result.data.data.abilities[i].type ===
                "IncomingGeneralLeagueFile"
              ) {
                schema.permission.View.show = true;
                if (rockStar[index].permission === "StampingMail") {
                  schema.permission.StampingMail.state = true;
                  schema.permission.StampingMail.show = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   IncomingMailsSent   ////////
              if (result.data.data.abilities[i].type === "IncomingMailsSent") {
                schema.permission.View.show = true;
                if (rockStar[index].permission === "StampingMail") {
                  schema.permission.StampingMail.state = true;
                  schema.permission.StampingMail.show = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   OutcomingGeneralLeagueFile   ////////
              if (
                result.data.data.abilities[i].type ===
                "OutcomingGeneralLeagueFile"
              ) {
                schema.permission.View.show = true;
                if (rockStar[index].permission === "StampingMail") {
                  schema.permission.StampingMail.state = true;
                  schema.permission.StampingMail.show = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   IncomingMail   ////////
              if (result.data.data.abilities[i].type === "IncomingMail") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "StampingMail") {
                  schema.permission.StampingMail.state = true;
                  schema.permission.StampingMail.show = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   MailTemplate   ////////
              if (result.data.data.abilities[i].type === "MailTemplate") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   Employee   ////////
              if (result.data.data.abilities[i].type === "Employee") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Upgrade.show = true;
                schema.permission.AddBonus.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
                if (rockStar[index].permission === "Upgrade") {
                  schema.permission.Upgrade.state = true;
                }
                if (rockStar[index].permission === "AddBonus") {
                  schema.permission.AddBonus.state = true;
                }
              }

              ////////   Department   ////////
              if (result.data.data.abilities[i].type === "Department") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   DepartmentClassifications   ////////
              if (
                result.data.data.abilities[i].type ===
                "DepartmentClassifications"
              ) {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   DigitalStamp   ////////
              if (result.data.data.abilities[i].type === "DigitalStamp") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Confirm.show = true;
                schema.permission.UnConfirm.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = true;
                }
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = true;
                }
              }
              ////////   JobTitle   ////////
              if (result.data.data.abilities[i].type === "JobTitle") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   CompanyInfo   ////////
              if (result.data.data.abilities[i].type === "CompanyInfo") {
                schema.permission.Save.show = true;
                schema.permission.View.show = true;
                if (rockStar[index].permission === "Save") {
                  schema.permission.Save.state = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
              }

              if (result.data.data.abilities[i].type === "VacationRecord") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Topup.show = true;
                if (rockStar[index].permission === "Topup") {
                  schema.permission.Topup.state = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }

              if (result.data.data.abilities[i].type === "ScientificDegree") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "Device") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "Salary") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Calculate.show = true;
                schema.permission.Closed.show = true;
                schema.permission.Release.show = true;
                schema.permission.ClosedMounth.show = true;
                schema.permission.Calculated.show = true;
                schema.permission.UnConfirm.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
                if (rockStar[index].permission === "Calculate") {
                  schema.permission.Calculate.state = true;
                }
                if (rockStar[index].permission === "Closed") {
                  schema.permission.Closed.state = true;
                }
                if (rockStar[index].permission === "Release") {
                  schema.permission.Release.state = true;
                }
                if (rockStar[index].permission === "ClosedMounth") {
                  schema.permission.ClosedMounth.state = true;
                }
                if (rockStar[index].permission === "Calculated") {
                  schema.permission.Calculated.state = true;
                }
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "Excuse") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }

              if (result.data.data.abilities[i].type === "Holiday") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "Nationality") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "Vacation") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "VacationType") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }

              if (result.data.data.abilities[i].type === "Shift") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "Timesheet") {
                schema.permission.View.show = true;
                schema.permission.Confirm.show = true;
                schema.permission.UnConfirm.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = true;
                }
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "EndService") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "Evaluation") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "DocumentType") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }

              if (result.data.data.abilities[i].type === "SalariesComparison") {
                schema.permission.View.show = true;
                // schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                // schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                // if (rockStar[index].permission === "Create") {
                //   schema.permission.Create.state = true;
                // }
                // if (rockStar[index].permission === "Edit") {
                //   schema.permission.Edit.state = true;
                // }
                // if (rockStar[index].permission === "Delete") {
                //   schema.permission.Delete.state = true;
                // }
              }
              if (
                result.data.data.abilities[i].type === "SituationSettlement"
              ) {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "Deduction") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "Bank") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "SalariesReports") {
                schema.permission.View.show = true;
                // schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                // schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                // if (rockStar[index].permission === "Create") {
                //   schema.permission.Create.state = true;
                // }
                // if (rockStar[index].permission === "Edit") {
                //   schema.permission.Edit.state = true;
                // }
                // if (rockStar[index].permission === "Delete") {
                //   schema.permission.Delete.state = true;
                // }
              }
              if (result.data.data.abilities[i].type === "EmployeeBonus") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Confirm.show = true;
                schema.permission.UnConfirm.show = true;
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = false;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = false;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "TypesBonuse") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "Court") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "BankBranch") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "EvaluationType") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "SalaryScale") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "Committee") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Confirm.show = true;
                schema.permission.UnConfirm.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = true;
                }
                if (rockStar[index].permission === "Unconfirm") {
                  schema.permission.UnConfirm.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "EmployeePromotion") {
                schema.permission.View.show = true;
                // schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                // schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                // if (rockStar[index].permission === "Create") {
                //   schema.permission.Create.state = true;
                // }
                // if (rockStar[index].permission === "Edit") {
                //   schema.permission.Edit.state = true;
                // }
                // if (rockStar[index].permission === "Delete") {
                //   schema.permission.Delete.state = true;
                // }
              }
              if (result.data.data.abilities[i].type === "EmployeePromotion") {
                schema.permission.View.show = true;
                // schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                // schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                // if (rockStar[index].permission === "Create") {
                //   schema.permission.Create.state = true;
                // }
                // if (rockStar[index].permission === "Edit") {
                //   schema.permission.Edit.state = true;
                // }
                // if (rockStar[index].permission === "Delete") {
                //   schema.permission.Delete.state = true;
                // }
              }
              if (result.data.data.abilities[i].type === "EmployeeVariable") {
                schema.permission.View.show = true;
                // schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                // if (rockStar[index].permission === "Create") {
                //   schema.permission.Create.state = true;
                // }
                // if (rockStar[index].permission === "Edit") {
                //   schema.permission.Edit.state = true;
                // }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "SalaryDifferences") {
                schema.permission.View.show = true;
                // schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Confirm.show = true;
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                // if (rockStar[index].permission === "Create") {
                //   schema.permission.Create.state = true;
                // }
                // if (rockStar[index].permission === "Edit") {
                //   schema.permission.Edit.state = true;
                // }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "ExcuseRequest") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.UnConfirm.show = true;
                schema.permission.Confirm.show = true;
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = true;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result.data.data.abilities[i].type === "VacationRequest") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.UnConfirm.show = true;
                schema.permission.Confirm.show = true;
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = true;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
            }
          }
          array.push(schema);
        }
        let filterd = [];
        let state = false;
        for (let index = 0; index < array.length; index++) {
          for (let i = 0; i < array.length; i++) {
            if (filterd[i] !== undefined) {
              if (filterd[i].name === array[index].name) {
                state = true;
              }
            }
          }
          if (state === false) {
            filterd.push(array[index]);
          }
          state = false;
        }
        this.tableData2 = filterd;
      } catch (error) {}
    },
    async submit() {
      try {
        let tocken = localStorage.getItem("Nannotoken");
        let schema = {
          Name: this.Name,
        };
        let result;
        if (this.isUpdate === false) {
          result = await axios.post(env.URL() + "Nanosoft/category/", schema, {
            headers: { authorization: tocken },
          });
        } else {
          result = await axios.patch(
            env.URL() + "Nanosoft/category/" + this.id,
            schema,
            { headers: { authorization: tocken } }
          );
        }
        if (this.isUpdate === false) {
          this.tableData.unshift(result.data.result);
          this.Title = "";
          this.Email = "";
          this.Title = "";
          this.Password = "";
          this.Phone = "";
          this.Name = "";
          this.IsAdmin = "";
          return Swal.fire({
            title: `Good job!`,
            text: "category created",
            buttonsStyling: false,
            confirmButtonClass: "md-button md-success",
            type: "success",
          });
        }
        let dataResult = this.tableData.find(
          (element) => element._id === this.id
        );
        dataResult.Name = result.data.result.Name;
        this.isUpdate = false;
        this.Name = "";
        return Swal.fire({
          title: `Good job!`,
          text: "Category Updated",
          buttonsStyling: false,
          confirmButtonClass: "md-button md-success",
          type: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Try again!",
          text: `${error.response.data.Message}`,
          type: "success",
          confirmButtonClass: "md-button md-success",
          buttonsStyling: false,
        });
      }
    },
    rowAll(item) {
      if (item.permission.All === false) {
        item.permission.View.state = true;
        item.permission.Create.state = true;
        item.permission.Edit.state = true;
        item.permission.Delete.state = true;
        item.permission.Confirm.state = true;
        item.permission.UnConfirm.state = true;
        item.permission.StampingMail.state = true;
        item.permission.Save.state = true;
        item.permission.Calculate.state = true;
        item.permission.Closed.state = true;
        item.permission.Release.state = true;
        item.permission.ClosedMounth.state = true;
        item.permission.Calculated.state = true;
        item.permission.Upgrade.state = true;
        item.permission.AddBonus.state = true;
        item.permission.Discount.state = true;
        item.permission.UnDiscount.state = true;
      } else {
        item.permission.Discount.state = false;
        item.permission.UnDiscount.state = false;
        item.permission.View.state = false;
        item.permission.Create.state = false;
        item.permission.Edit.state = false;
        item.permission.Delete.state = false;
        item.permission.Confirm.state = false;
        item.permission.UnConfirm.state = false;
        item.permission.StampingMail.state = false;
        item.permission.Save.state = false;
        item.permission.Calculate.state = false;
        item.permission.Closed.state = false;
        item.permission.Release.state = false;
        item.permission.ClosedMounth.state = false;
        item.permission.Calculated.state = false;
        item.permission.Upgrade.state = false;
        item.permission.AddBonus.state = false;
      }
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
    handleDelete(item) {
      Swal.fire({
        title: "هل انت متأكد؟",
        text: `سيتم الحذف من النظام هل انت متأكد  `,
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
              `${env.HR()}/api/usergroups/${item.id}`,
              {
                headers: { Authorization: "Bearer " + token },
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
    AllSelect() {
      try {
        let array = [];
        let result = permission;
        let rockStar = permission;
        for (let i = 0; i < result.length; i++) {
          let schema = {
            name: result[i].type,
            permission: {
              All: false,
              View: {
                state: false,
                show: false,
              },
              Create: {
                state: false,
                show: false,
              },
              Edit: {
                state: false,
                show: false,
              },
              Delete: {
                state: false,
                show: false,
              },
              Confirm: {
                state: false,
                show: false,
              },
              UnConfirm: {
                state: false,
                show: false,
              },
              StampingMail: {
                state: false,
                show: false,
              },
              Save: {
                state: false,
                show: false,
              },
              Calculate: {
                state: false,
                show: false,
              },
              Closed: {
                state: false,
                show: false,
              },
              Release: {
                state: false,
                show: false,
              },
              ClosedMounth: {
                state: false,
                show: false,
              },
              Calculated: {
                state: false,
                show: false,
              },
              Upgrade: {
                state: false,
                show: false,
              },
              AddBonus: {
                state: false,
                show: false,
              },
              Discount: {
                state: false,
                show: false,
              },
              UnDiscount: {
                state: false,
                show: false,
              },
              Topup: {
                state: false,
                show: false,
              },
            },
          };
          for (let index = 0; index < rockStar.length; index++) {
            if (result[i].type === rockStar[index].type) {
              ////////  User  /////////
              if (result[i].type === "User") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "DsektopAppVacationRequest") {
                schema.permission.View.show = true;
                schema.permission.Discount.show = true;
                schema.permission.UnDiscount.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Discount") {
                  schema.permission.Discount.state = true;
                }
                if (rockStar[index].permission === "UnDiscount") {
                  schema.permission.UnDiscount.state = true;
                }
              }

              if (result[i].type === "ScientificDegreesEmployee") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ///////////  UserGroup  ////////////
              if (result[i].type === "UserGroup") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ///////////  Settings  ////////////
              if (result[i].type === "Settings") {
                schema.permission.View.show = true;
                schema.permission.Edit.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
              }
              ///////////  Activity  ////////////
              if (result[i].type === "Activity") {
                schema.permission.View.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
              }
              ////////   Body   ////////
              if (result[i].type === "Body") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   Sector   ////////
              if (result[i].type === "Sector") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   Classification   ////////
              if (result[i].type === "Classification") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   InternalMail   ////////
              if (result[i].type === "InternalMail") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.StampingMail.show = true;
                if (rockStar[index].permission === "StampingMail") {
                  schema.permission.StampingMail.state = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   OutgoingMail   ////////
              if (result[i].type === "OutgoingMail") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "StampingMail") {
                  schema.permission.StampingMail.state = true;
                  schema.permission.StampingMail.show = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   IncomingGeneralLeagueFile   ////////
              if (result[i].type === "IncomingGeneralLeagueFile") {
                schema.permission.View.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   IncomingMailsSent   ////////
              if (result[i].type === "IncomingMailsSent") {
                schema.permission.View.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   OutcomingGeneralLeagueFile   ////////
              if (result[i].type === "OutcomingGeneralLeagueFile") {
                schema.permission.View.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   IncomingMail   ////////
              if (result[i].type === "IncomingMail") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;

                if (rockStar[index].permission === "StampingMail") {
                  schema.permission.StampingMail.state = true;
                  schema.permission.StampingMail.show = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   MailTemplate   ////////
              if (result[i].type === "MailTemplate") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   Employee   ////////
              if (result[i].type === "Employee") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Upgrade.show = true;
                schema.permission.AddBonus.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
                if (rockStar[index].permission === "Upgrade") {
                  schema.permission.Upgrade.state = true;
                }
                if (rockStar[index].permission === "AddBonus") {
                  schema.permission.AddBonus.state = true;
                }
              }
              ////////   Department   ////////
              if (result[i].type === "Department") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   DepartmentClassifications   ////////
              if (result[i].type === "DepartmentClassifications") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   DigitalStamp   ////////
              if (result[i].type === "DigitalStamp") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Confirm.show = true;
                schema.permission.UnConfirm.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = true;
                }
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = true;
                }
              }
              ////////   JobTitle   ////////
              if (result[i].type === "JobTitle") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;

                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              ////////   CompanyInfo   ////////
              if (result[i].type === "CompanyInfo") {
                schema.permission.Save.show = true;
                schema.permission.View.show = true;
                schema.permission.Save.state = true;
                if (rockStar[index].permission === "Save") {
                  schema.permission.Save.state = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
              }
              if (result[i].type === "VacationRecord") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Topup.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Topup") {
                  schema.permission.Topup.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }

              if (result[i].type === "ScientificDegree") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "Device") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "Excuse") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }

              if (result[i].type === "Holiday") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "Nationality") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "Vacation") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "VacationType") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "Salary") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Calculate.show = true;
                schema.permission.Closed.show = true;
                schema.permission.Release.show = true;
                schema.permission.ClosedMounth.show = true;
                schema.permission.Calculated.show = true;
                schema.permission.UnConfirm.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
                if (rockStar[index].permission === "Calculate") {
                  schema.permission.Calculate.state = true;
                }
                if (rockStar[index].permission === "Closed") {
                  schema.permission.Closed.state = true;
                }
                if (rockStar[index].permission === "Release") {
                  schema.permission.Release.state = true;
                }
                if (rockStar[index].permission === "ClosedMounth") {
                  schema.permission.ClosedMounth.state = true;
                }
                if (rockStar[index].permission === "Calculated") {
                  schema.permission.Calculated.state = true;
                }
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = true;
                }
              }
              if (result[i].type === "Shift") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "Timesheet") {
                schema.permission.View.show = true;
                schema.permission.Confirm.show = true;
                schema.permission.UnConfirm.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = true;
                }
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = true;
                }
              }
              if (result[i].type === "EndService") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "Evaluation") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "DocumentType") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }

              if (result[i].type === "SalariesComparison") {
                schema.permission.View.show = true;
                // schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                // schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                // if (rockStar[index].permission === "Create") {
                //   schema.permission.Create.state = true;
                // }
                // if (rockStar[index].permission === "Edit") {
                //   schema.permission.Edit.state = true;
                // }
                // if (rockStar[index].permission === "Delete") {
                //   schema.permission.Delete.state = true;
                // }
              }
              if (result[i].type === "SituationSettlement") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "Deduction") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "Bank") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "SalariesReports") {
                schema.permission.View.show = true;
                // schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                // schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                // if (rockStar[index].permission === "Create") {
                //   schema.permission.Create.state = true;
                // }
                // if (rockStar[index].permission === "Edit") {
                //   schema.permission.Edit.state = true;
                // }
                // if (rockStar[index].permission === "Delete") {
                //   schema.permission.Delete.state = true;
                // }
              }
              if (result[i].type === "EmployeeBonus") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Confirm.show = true;
                schema.permission.UnConfirm.show = true;
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = true;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "TypesBonuse") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "Court") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "BankBranch") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "EvaluationType") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "Committee") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Confirm.show = true;
                schema.permission.UnConfirm.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = true;
                }
                if (rockStar[index].permission === "Unconfirm") {
                  schema.permission.UnConfirm.state = true;
                }
              }

              if (result[i].type === "SalaryScale") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
              }
              if (result[i].type === "EmployeePromotion") {
                schema.permission.View.show = true;
                // schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                // schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                // if (rockStar[index].permission === "Create") {
                //   schema.permission.Create.state = true;
                // }
                // if (rockStar[index].permission === "Edit") {
                //   schema.permission.Edit.state = true;
                // }
                // if (rockStar[index].permission === "Delete") {
                //   schema.permission.Delete.state = true;
                // }
              }

              if (result[i].type === "EmployeeVariable") {
                schema.permission.View.show = true;
                // schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                // if (rockStar[index].permission === "Create") {
                //   schema.permission.Create.state = true;
                // }
                // if (rockStar[index].permission === "Edit") {
                //   schema.permission.Edit.state = true;
                // }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "SalaryDifferences") {
                schema.permission.View.show = true;
                // schema.permission.Create.show = true;
                // schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.Confirm.show = true;
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                // if (rockStar[index].permission === "Create") {
                //   schema.permission.Create.state = true;
                // }
                // if (rockStar[index].permission === "Edit") {
                //   schema.permission.Edit.state = true;
                // }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "ExcuseRequest") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.UnConfirm.show = true;
                schema.permission.Confirm.show = true;
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = true;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
              if (result[i].type === "VacationRequest") {
                schema.permission.View.show = true;
                schema.permission.Create.show = true;
                schema.permission.Edit.show = true;
                schema.permission.Delete.show = true;
                schema.permission.UnConfirm.show = true;
                schema.permission.Confirm.show = true;
                if (rockStar[index].permission === "UnConfirm") {
                  schema.permission.UnConfirm.state = true;
                }
                if (rockStar[index].permission === "Confirm") {
                  schema.permission.Confirm.state = true;
                }
                if (rockStar[index].permission === "View") {
                  schema.permission.View.state = true;
                }
                if (rockStar[index].permission === "Create") {
                  schema.permission.Create.state = true;
                }
                if (rockStar[index].permission === "Edit") {
                  schema.permission.Edit.state = true;
                }
                if (rockStar[index].permission === "Delete") {
                  schema.permission.Delete.state = true;
                }
              }
            }
          }
          array.push(schema);
        }
        let filterd = [];
        let state = false;
        for (let index = 0; index < array.length; index++) {
          for (let i = 0; i < array.length; i++) {
            if (filterd[i] !== undefined) {
              if (filterd[i].name === array[index].name) {
                state = true;
              }
            }
          }
          if (state === false) {
            filterd.push(array[index]);
          }
          state = false;
        }
        this.tableData2 = filterd;
      } catch (error) {
        // console.log(error);
      }
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
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    All() {
      if (this.All === true) {
        this.AllSelect();
      } else {
        this.init();
      }
    },
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    },
  },
};
</script>

<style lang="css" scoped>
.md-card .md-card-actions {
  border: 0;
  margin-left: 20px;
  margin-right: 20px;
}
.m {
  margin-right: 20px;
}
</style>
