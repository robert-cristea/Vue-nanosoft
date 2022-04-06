<template>
  <div>
    <div class="md-layout-item md-size-100 mt-30 center-content">
      <md-button @click="personal_data" class="btn_nanosoft"
        >البيانات الشخصية</md-button
      >
      <md-button @click="Functional_data" class="md-success btn_nanosoft"
        >البيانات الوظيفية</md-button
      >
      <md-button @click="Financial_data" class="btn_nanosoft"
        >البيانات المالية</md-button
      >
      <md-button @click="Qualifications_" class="btn_nanosoft"
        >المؤهلات العلمية</md-button
      >
      <md-button @click="Vacation" class="btn_nanosoft"
        >أرصدة وخصميات الإجازات السنوية</md-button
      >
      <md-button @click="Assignment" class="btn_nanosoft"
        >الإنتداب لجهة اخرى</md-button
      >
      <md-button @click="EmployeeDocuments" class="btn_nanosoft"
        >مستندات الموظف</md-button
      >
    </div>

    <div class="md-layout">
      <div class="md-layout-item">
        <form>
          <md-card class="p-25">
            <md-card-content>
              <div class="md-layout mt-25">
                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="employeeId != 'new'"
                >
                  <md-field>
                    <label>الموظف</label>
                    <md-input v-model="fullName" disabled></md-input>
                  </md-field>
                </div>

                <div
                  style="position: relative"
                  class="md-layout-item md-size-30 ml-15 mt-25"
                >
                  <p
                    style="position: absolute; top: -2px; right: 2px; color: red"
                    class="validate"
                  >
                    *
                  </p>

                  <model-list-select
                    class="input-must-rtl"
                    :list="departmentsAndUnites"
                    v-model="DepartmentId"
                    option-value="id"
                    option-text="name"
                    placeholder="الإدرات/المكاتب"
                  ></model-list-select>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <button
                      @click="clear_SectionId"
                      type="button"
                      class="
                        md-button
                        md-icon-button
                        md-dense
                        md-input-action
                        md-clear
                        md-theme-default
                      "
                      tabindex="-1"
                    >
                      <div class="md-ripple">
                        <div class="md-button-content">
                          <i
                            class="
                              md-icon
                              md-icon-font
                              md-icon-image
                              md-theme-default
                            "
                            ><svg
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                              ></path>
                              <path d="M0 0h24v24H0z" fill="none"></path></svg
                          ></i>
                        </div>
                      </div>
                    </button>
                    <label>الأقسام والمشروعات</label>
                    <md-select v-model="SectionId">
                      <md-option
                        v-for="department in departmentsLoad"
                        v-bind:key="department.id"
                        :value="department.id"
                        >{{ department.name }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <button
                      @click="clear_UnitId"
                      type="button"
                      class="
                        md-button
                        md-icon-button
                        md-dense
                        md-input-action
                        md-clear
                        md-theme-default
                      "
                      tabindex="-1"
                    >
                      <div class="md-ripple">
                        <div class="md-button-content">
                          <i
                            class="
                              md-icon
                              md-icon-font
                              md-icon-image
                              md-theme-default
                            "
                            ><svg
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                              ></path>
                              <path d="M0 0h24v24H0z" fill="none"></path></svg
                          ></i>
                        </div>
                      </div>
                    </button>
                    <label>الوحدات</label>
                    <md-select v-model="UnitId">
                      <md-option
                        v-for="department in loadUnits"
                        v-bind:key="department.id"
                        :value="department.id"
                        >{{ department.name }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>
                <!-- 
                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>الوحدة التنظيمية</label>
                    <md-select v-model="dep">
                      <md-option
                        v-for="department in departments"
                        v-bind:key="department.id"
                        :value="department.id"
                      >
                        {{ department.number }}-{{
                        department.name
                        }}
                      </md-option>
                    </md-select>
                  </md-field>
                </div>-->

                <!-- <div class="md-layout-item md-size-30 ml-15 mt-25" v-if="parintDepartmentName!=''">
                  <md-field>
                    <label>الوحدة التنظيمية المباشرة:</label>
                    <md-input v-model="parintDepartmentName" disabled></md-input>
                  </md-field>
                </div>-->

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>الوضع الحالي</label>
                    <md-select v-model="CurrentSituation">
                      <md-option value="1">مستمر</md-option>
                      <md-option value="2">منقطع</md-option>
                      <md-option value="3">إيقاف مؤقت</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div
                  v-if="currentSituationTrue"
                  class="md-layout-item md-size-30 ml-15 mt-25"
                >
                  <md-field>
                    <label>سبب الإيقاف</label>
                    <md-input v-model="SuspentionNote"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-datepicker v-model="StartingDate">
                    <label class="mr-28">تاريخ المباشرة</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <p class="validate">*</p>
                    <label>نوع التوظيف</label>
                    <md-select v-model="JobType">
                      <md-option value="1">تعيين</md-option>
                      <md-option value="2">عقد</md-option>
                      <md-option value="3">ندب</md-option>
                      <md-option value="5">عقد مصنف</md-option>
                      <md-option value="6">إعارة</md-option>
                      <md-option value="7">عقد متعاون</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>الوظيفة</label>
                    <md-input v-model="EMp"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-datepicker v-model="jobDate">
                    <label class="mr-28">تاريخ شغل الوظيفة</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>رقم الملف الشخصي</label>
                    <md-input v-model="EmPNumber"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>مكان العمل</label>
                    <md-input v-model="PlaceWorking"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>طريقة شغل الوظيفة</label>
                    <md-select v-model="State">
                      <md-option value="false">لايوجد</md-option>
                      <md-option value="true">منتقل</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-show="State == 'true'"
                >
                  <md-datepicker v-model="DateTransfer">
                    <label class="mr-28">تاريخ صدور قرار النقل</label>
                  </md-datepicker>
                </div>
                <div
                  v-if="State == 'true'"
                  class="md-layout-item md-size-30 ml-15 mt-25"
                >
                  <md-field>
                    <label>جهة العمل السابقة</label>
                    <md-input v-model="PreviousEmployer"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-datepicker v-model="StartingDateAtWork">
                    <label class="mr-28">تاريخ مباشرة العمل بالجهة</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>المؤهل العلمي</label>
                    <md-select v-model="ScientificDegreeId">
                      <md-option
                        v-for="ScientificDegrees in ScientificDegrees"
                        v-bind:key="ScientificDegrees.key"
                        :value="ScientificDegrees.key"
                        >{{ ScientificDegrees.value }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>التخصص</label>
                    <md-input v-model="Specialization"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>جهة إصدار المؤهل</label>
                    <md-input
                      v-model="CertificateProviderOrganization"
                    ></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>سنة الحصول على المؤهل</label>
                    <md-input v-model="ScientificDegreeYear"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>الدرجة الحالية</label>
                    <md-select v-model="CurrentGrade">
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

                <div
                  v-if="JobType != 3"
                  class="md-layout-item md-size-30 ml-15 mt-25"
                >
                  <md-field>
                    <label>سبب الدرجة الحالية</label>
                    <md-select v-model="ReasonForCurrentGrade">
                      <md-option value="1">ترقية اعتيادية</md-option>
                      <md-option value="2">ترقية تشجيعية</md-option>
                      <md-option value="3">تسوية</md-option>
                      <md-option value="4">حكم محكمة</md-option>
                      <md-option value="5">درجة المؤهل</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>العلاوة الإدارية</label>
                    <md-select v-model="CurrentBonus">
                      <md-option value="0">0</md-option>
                      <md-option value="1">1</md-option>
                      <md-option value="2">2</md-option>
                      <md-option value="3">3</md-option>
                      <md-option value="4">4</md-option>
                      <md-option value="5">5</md-option>
                      <md-option value="6">6</md-option>
                      <md-option value="7">7</md-option>
                      <md-option value="8">8</md-option>
                      <md-option value="9">9</md-option>
                      <md-option value="10">10</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-datepicker class="nader" v-model="LastGradeUpdate">
                    <label class="mr-28">تاريخ الدرجة الحالية</label>
                  </md-datepicker>
                </div>

                <!-- <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-datepicker v-model="LastBonusUpdate">
                    <label class="mr-28">تاريخ العلاوة الإدارية</label>
                  </md-datepicker>
                </div>-->

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>شهر العلاوة السنوية</label>
                    <md-select v-model="BonusDueDate">
                      <md-option value="1">يناير</md-option>
                      <md-option value="2">فبراير</md-option>
                      <md-option value="3">مارس</md-option>
                      <md-option value="4">ابريل</md-option>
                      <md-option value="5">مايو</md-option>
                      <md-option value="6">يونيو</md-option>
                      <md-option value="7">يوليو</md-option>
                      <md-option value="8">أغسطس</md-option>
                      <md-option value="9">سبتمبر</md-option>
                      <md-option value="10">أكتوبر</md-option>
                      <md-option value="11">نوفمبر</md-option>
                      <md-option value="12">ديسمبر</md-option>
                    </md-select>
                    <!-- <md-input v-model="" max=12 type="number"> </md-input> -->
                  </md-field>
                </div>

                <div
                  class="md-layout-item md-layout-item-time md-size-30 ml-15"
                  style="position: relative"
                >
                  <h4
                    class="monthly-picker-head"
                    :class="{ active: upgradeDueDate }"
                  >
                    تاريخ استحقاق الترقية
                  </h4>
                  <vue-monthly-picker
                    class="monthly-picker"
                    alignment="right"
                    v-model="upgradeDueDate"
                  />
                </div>
                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>الملاحظات</label>
                    <md-input v-model="Notes"></md-input>
                  </md-field>
                </div>

                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="JobType == 2"
                >
                  <md-datepicker v-model="EmploymentDate">
                    <label class="mr-28">تاريخ التعاقد</label>
                  </md-datepicker>
                </div>

                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="JobType == 2"
                >
                  <md-datepicker v-model="ContractDateFrom">
                    <label class="mr-28">تاريخ بداية العقد</label>
                  </md-datepicker>
                </div>
                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="JobType == 2"
                >
                  <md-datepicker v-model="ContractDateTo">
                    <label class="mr-28">تاريخ نهاية العقد</label>
                  </md-datepicker>
                </div>
                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="JobType == 3"
                >
                  <md-field>
                    <label>الجهة المنتدب منها</label>
                    <md-input v-model="PreviousEmployer"></md-input>
                  </md-field>
                </div>
                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="JobType == 3"
                >
                  <md-datepicker v-model="DelegationEndDate">
                    <label class="mr-28">تاريخ نهاية الندب</label>
                  </md-datepicker>
                </div>
                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="JobType == 3"
                >
                  <md-field>
                    <label>الوظيفة المنتدب اليها</label>
                    <md-input v-model="TheJobAssignedTo"></md-input>
                  </md-field>
                </div>

                <!-- <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>علاوة الندب</label>
                    <md-input v-model="scarBonus"></md-input>
                  </md-field>
                </div>-->

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-checkbox v-model="sttt">ندب لدرجة</md-checkbox>
                </div>
                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="JobType == 3 || JobType == 6"
                >
                  <md-field>
                    <label>احتساب المرتبات والعلاوات</label>
                    <md-select v-model="CalculateSalariesAndBonus">
                      <md-option value="true">نعم</md-option>
                      <md-option value="false">لا</md-option>
                    </md-select>
                  </md-field>
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

    <div v-if="sttt == true" class="md-layout">
      <div class="md-layout-item">
        <form>
          <md-card>
            <md-card-header class="md-card-header-text md-card-header-green">
              <div class="card-text">
                <h4 class="title">بيانات الندب</h4>
              </div>
            </md-card-header>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-datepicker v-model="EmploymentDate">
                    <label class="mr-28">تاريخ الندب</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>درجة الندب</label>
                    <md-select v-model="scarDegree">
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

                <!-- <div class="md-layout-item md-size-30 ml-15 mt-25">
            <md-datepicker v-model="scarDegreeDate">
              <label class="mr-28">تاريخ درجة الندب</label>
            </md-datepicker>
          </div>-->
                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>سبب الندب</label>
                    <md-input v-model="causeOfScarring"></md-input>
                  </md-field>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item">
        <form>
          <md-card v-if="JobType == 1">
            <md-card-header class="md-card-header-text md-card-header-green">
              <div class="card-text">
                <h4 class="title">بيانات التعين</h4>
              </div>
            </md-card-header>
            <md-card-content>
              <div class="md-layout">
                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="JobType == 1"
                >
                  <md-datepicker v-model="EmploymentDate">
                    <label class="mr-28">تاريخ قرار التعيين</label>
                  </md-datepicker>
                </div>
                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="JobType == 1"
                >
                  <md-field>
                    <label>رقم قرار التعيين</label>
                    <md-input v-model="DesignationDecisionNumber"></md-input>
                  </md-field>
                </div>
                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="JobType == 1"
                >
                  <md-field>
                    <label>جهة اصدار التعيين</label>
                    <md-input v-model="Appointment"></md-input>
                  </md-field>
                </div>
                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="JobType == 1"
                >
                  <md-field>
                    <label>الوضع الوظيفي عند التعيين</label>
                    <md-input v-model="JobStatusAppointment"></md-input>
                  </md-field>
                </div>
                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="JobType == 1"
                >
                  <md-field>
                    <label>المؤهل العلمي عند التعيين</label>
                    <md-input v-model="ScientificAppointment"></md-input>
                  </md-field>
                </div>

                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="JobType == 1"
                >
                  <md-field>
                    <label>التخصص</label>
                    <md-input v-model="SpecializationAppointment"></md-input>
                  </md-field>
                </div>

                <div
                  v-if="JobType == 1"
                  class="md-layout-item md-size-30 ml-15 mt-25"
                >
                  <md-field>
                    <label>سنة الحصول على المؤهل</label>
                    <md-input v-model="ScientificAppointmentYear"></md-input>
                  </md-field>
                </div>

                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="JobType == 1"
                >
                  <md-field>
                    <label>الجهة المانحة للمؤهل</label>
                    <md-input v-model="SourceScientific"></md-input>
                  </md-field>
                </div>

                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="JobType == 1"
                >
                  <md-field>
                    <label>الدرجة عند التوظيف</label>
                    <md-select v-model="GradeAppointment">
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

                <div class="md-layout-item md-size-30 ml-15 mt-25">
                  <md-field>
                    <label>العلاوة عند التوظيف</label>
                    <md-select v-model="StartingBonus">
                      <md-option value="0">0</md-option>
                      <md-option value="1">1</md-option>
                      <md-option value="2">2</md-option>
                      <md-option value="3">3</md-option>
                      <md-option value="4">4</md-option>
                      <md-option value="5">5</md-option>
                      <md-option value="6">6</md-option>
                      <md-option value="7">7</md-option>
                      <md-option value="8">8</md-option>
                      <md-option value="9">9</md-option>
                      <md-option value="10">10</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div
                  class="md-layout-item md-size-30 ml-15 mt-25"
                  v-if="JobType == 1"
                >
                  <md-checkbox v-model="Exp">خبرات سابقة</md-checkbox>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
    </div>

    <div class="md-layout-item md-size-100 md-medium-size-100">
      <md-card>
        <!-- Exp ==true?'الخبرات':'-', -->
        <md-card-content>
          <collapse
            :collapse="['تقدير الكفاءة لآخر ثلاث سنوات']"
            icon="keyboard_arrow_down"
            color-collapse="success"
          >
            <template slot="md-collapse-pane-1">
              <div class="md-layout">
                <md-field class="md-layout-item md-size-30">
                  <label>السنة</label>
                  <md-input v-model="NumberOfTheYear" disabled></md-input>
                </md-field>

                <md-field class="md-layout-item md-size-30">
                  <label>تقدير</label>
                  <md-select v-model="Efficiency">
                    <md-option value="5">ممتاز</md-option>
                    <md-option value="4">جيد جداً</md-option>
                    <md-option value="3">جيد</md-option>
                    <md-option value="2">متوسط</md-option>
                    <md-option value="1">ضعيف</md-option>
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout">
                <md-field class="md-layout-item md-size-30">
                  <label>السنة</label>
                  <md-input v-model="NumberOfTheYearTwo" disabled></md-input>
                </md-field>
                <md-field class="md-layout-item md-size-30">
                  <label>تقدير</label>
                  <md-select v-model="EfficiencyTwo">
                    <md-option value="5">ممتاز</md-option>
                    <md-option value="4">جيد جداً</md-option>
                    <md-option value="3">جيد</md-option>
                    <md-option value="2">متوسط</md-option>
                    <md-option value="1">ضعيف</md-option>
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout">
                <md-field class="md-layout-item md-size-30">
                  <label>السنة</label>
                  <md-input v-model="NumberOfTheYearThree" disabled></md-input>
                </md-field>
                <md-field class="md-layout-item md-size-30">
                  <label>تقدير</label>
                  <md-select v-model="EfficiencyThree">
                    <md-option value="5">ممتاز</md-option>
                    <md-option value="4">جيد جداً</md-option>
                    <md-option value="3">جيد</md-option>
                    <md-option value="2">متوسط</md-option>
                    <md-option value="1">ضعيف</md-option>
                  </md-select>
                </md-field>
              </div>
            </template>
            <!-- <template slot="md-collapse-pane-1">
              <md-table class="mt-25" :value="tableEx" v-if="Exp==true">
                <md-table-row slot="md-table-row" slot-scope="{  }">
                  <md-table-cell md-label="مكان العمل السابق"> <md-field><md-input></md-input></md-field>
                  </md-table-cell>
                  <md-table-cell md-label="الوظيفة"><md-field><md-input></md-input></md-field></md-table-cell>
                  <md-table-cell md-label="من"><md-field><md-input></md-input></md-field></md-table-cell>
                  <md-table-cell md-label="إلى"><md-field><md-input></md-input></md-field></md-table-cell>
                  <md-table-cell md-label="المجموع"><md-field><md-input></md-input></md-field></md-table-cell>
                  <md-table-cell md-label="حسبت"><md-field><md-input></md-input></md-field> </md-table-cell>
                  <md-table-cell md-label="لم تحتسب"><md-field><md-input></md-input></md-field></md-table-cell>
                  <md-table-cell md-label="تاريخ الاحتساب"><md-field><md-input></md-input></md-field></md-table-cell>
                </md-table-row>
              </md-table>
            </template>-->
          </collapse>
        </md-card-content>
      </md-card>
    </div>

    <div class="md-layout">
      <div class="md-layout-item">
        <form>
          <md-card>
            <md-card-header class="md-card-header-text md-card-header-green">
              <div class="card-text">
                <h4 class="title">بيانات وظيفية أخرى</h4>
              </div>
            </md-card-header>
            <form>
              <md-card-content>
                <div class="md-layout">
                  <div class="md-layout-item md-size-30 ml-15 mt-25">
                    <md-field>
                      <p class="validate">*</p>
                      <label>الدوام الرسمي</label>
                      <md-select v-model="shiftName">
                        <md-option
                          v-for="shift in shifts"
                          v-bind:key="shift.key"
                          :value="shift.key"
                          >{{ shift.value }}</md-option
                        >
                      </md-select>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-30 ml-15 mt-25">
                    <md-field>
                      <label>الصفة الوظيفية بالملاك</label>
                      <md-select v-model="JobTitleID">
                        <md-option
                          v-for="JobTitle in JobTitle"
                          v-bind:key="JobTitle.id"
                          :value="JobTitle.id"
                          >{{ JobTitle.name }}</md-option
                        >
                      </md-select>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-30 ml-15 mt-25">
                    <md-field>
                      <label>رقم الوظيفة بالملاك</label>
                      <md-input v-model="JobNumber"></md-input>
                    </md-field>
                  </div>

                  <div
                    class="md-layout-item md-size-30 ml-15 mt-25"
                    v-if="IsManager == false"
                  >
                    <md-field>
                      <label>مخول</label>
                      <md-select v-model="IsManager">
                        <md-option value="true">نعم</md-option>
                        <md-option value="false">لا</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mt-25" v-else>
                    <md-field>
                      <label>مخول</label>
                      <md-select v-model="IsManager" disabled>
                        <md-option value="true">نعم</md-option>
                        <md-option value="false">لا</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mt-25">
                    <md-field>
                      <label>صفة الرئيس المباشر</label>
                      <md-select v-model="DirectManagerJobTitleId">
                        <md-option
                          v-for="JobTitle in Mangers"
                          v-bind:key="JobTitle.id"
                          :value="JobTitle.id"
                          >{{ JobTitle.name }}</md-option
                        >
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mt-25">
                    <md-field>
                      <label>الزيادة الشهرية للإجازة السنوية</label>
                      <md-input v-model="MonthlyIncreaseOfVacation"></md-input>
                    </md-field>
                  </div>
                </div>
              </md-card-content>
            </form>
          </md-card>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../../../../components/service/HTTP.js";
import env, { NULL } from "../../../../../../env";
import { Collapse } from "@/components";
// import maskedinput from "vue-masked-input";
import { ModelListSelect } from "vue-search-select";
import moment from "moment";
export default {
  components: {
    Collapse,
    // maskedinput,
    ModelListSelect
  },
  data() {
    return {
      errorMessage: "",
      Mangers: [],
      departmentsAndUnites: [],
      DepartmentId: "",
      SectionId: "",
      departmentsLoad: [],
      UnitId: "",
      loadUnits: [],
      employeeId: "",
      DateTime: "",
      NumberOfTheYear: "2019",
      Efficiency: "",
      NumberOfTheYearTwo: "2020",
      EfficiencyTwo: "",
      NumberOfTheYearThree: "2021",
      EfficiencyThree: "",
      sttt: false,
      ScientificAppointmentYear: "",
      Appointment: "",
      JobStatusAppointment: "",
      ScientificAppointment: "",
      SpecializationAppointment: "",
      SourceScientific: "",
      GradeAppointment: "",
      // DesignationResolutionDate: null,
      tableEx: [
        { yearName: "2019", Sate: 1 },
        { yearName: "2020", Sate: 2 },
        { yearName: "2021", Sate: 3 }
      ],
      Exp: false,
      ScientificDegreeYear: "",
      CertificateProviderOrganization: "",
      Specialization: "",
      causeOfScarring: "",
      upgradeDueDate: "",
      ReasonForCurrentGrade: "",
      scarDegreeDate: "",
      scarBonus: "",
      scarDegree: "",
      DateTransfer: "",
      jobDate: "",
      StartingDateAtWork: null,
      ScientificDegrees: [],
      State: false,
      id: "",
      fullName: "",
      employmentType: "1",
      departments: "",
      dep: "",
      EMp: "",
      EmPNumber: "",
      PlaceWorking: "",
      shifts: "",
      shiftName: "",
      JobTitle: "",
      JobTitleID: "",
      CurrentSituation: "",
      currentSituationTrue: false,
      JobNumber: null,
      StartingDate: "",
      MonthlyIncreaseOfVacation: "",
      JobType: "",
      IsManager: "",
      IsManager2: "",
      SuspentionNote: "",
      DirectManagerJobTitleId: "",
      parintDepartmentName: "",
      StartingGrade: null,
      StartingBonus: null,
      CurrentGrade: null,
      CurrentBonus: null,
      LastGradeUpdate: "",
      LastBonusUpdate: "",
      BonusDueDate: "",
      Notes: "",
      EmploymentDate: "",
      DesignationDecisionNumber: "",
      DesignationIssuer: "",
      ContractDateFrom: "",
      ContractDateTo: "",
      PreviousEmployer: "",
      ScientificDegreeId: "",
      TheJobAssignedTo: "",
      DelegationEndDate: "",
      CalculateSalariesAndBonus: false
    };
  },

  async created() {
    this.init();
  },

  watch: {
    async DepartmentId() {
      try {
        this.SectionId = "";
        this.UnitId = "";
        if (!this.DepartmentId) {
          return;
        }
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/departments/${this.DepartmentId}/load`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.departmentsLoad = result.data.data;
        this.JobTitles();
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.message
        );
      }
    },
    async SectionId() {
      try {
        if (!this.SectionId) {
          return;
        }
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/departments/${this.SectionId}/loadUnits`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.loadUnits = result.data.data;
        this.JobTitles();
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.message
        );
      }
    },
    async departmentId() {
      try {
        if (this.updateStatus === true) {
          return (this.updateStatus = false);
        }
        if (!this.departmentId) {
          return;
        }
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/departments/${this.departmentId}/preloadAsChild`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.number = result.data.data.number;
        this.code = result.data.data.code;
        this.JobTitles();
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.message
        );
      }
    },
    CurrentSituation() {
      if (this.CurrentSituation == "2" || this.CurrentSituation == "3") {
        this.currentSituationTrue = true;
      } else {
        this.currentSituationTrue = false;
      }
    }
  },
  methods: {
    async JobTitles() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let id = "";
        if (this.DepartmentId) {
          id = this.DepartmentId;
        }
        if (this.SectionId) {
          id = this.SectionId;
        }
        if (this.UnitId) {
          id = this.UnitId;
        }
        if (!id) {
          return;
        }
        if (id !== "00000000-0000-0000-0000-000000000000") {
          let result_JobTitle = await axios.get(
            `${env.HR()}/api/JobTitle/${id}/load`,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
          this.JobTitle = result_JobTitle.data.data;

          let resultMangers = await axios.get(
            `${env.HR()}/api/JobTitle/${id}/LoadDirectManagerJobTitles`,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
          this.Mangers = resultMangers.data.data;
        }
      } catch (error) {
        return this.notifyVue("top", "center", "danger", error);
      }
    },
    convert(event) {
      try {
        let d = new Date(event);
        if (isNaN(d.getFullYear()) === true) {
          return "-";
        }
        return d.getFullYear() + "-" + (d.getMonth() + 1);
      } catch (error) {}
    },
    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let departmentsAndUnites = await axios.get(
          `${env.HR()}/api/departments/LoadManagement`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.departmentsAndUnites = departmentsAndUnites.data.data;
        let employeeId = this.$route.params.id;
        this.employeeId = employeeId;
        if (employeeId == "new") {
          return;
        }
        let result = await axios.get(
          `${env.HR()}/api/qualifications?employeeId=${employeeId}`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.ScientificDegrees = result.data.data.scientificDegrees;

        // let id = localStorage.getItem("id");
        if (employeeId) {
          let result_employee = await axios.get(
            `${env.HR()}/api/hr/employees/${employeeId}/LoadJobInfo`,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
          this.ScientificDegreeYear =
            result_employee.data.data.scientificDegreeYear == null
              ? null
              : result_employee.data.data.scientificDegreeYear.split("T")[0];
          this.Specialization = result_employee.data.data.specialization;
          this.upgradeDueDate = result_employee.data.data.upgradeDueDate;

          this.ReasonForCurrentGrade =
            result_employee.data.data.reasonForCurrentGrade;
          this.scarDegreeDate =
            result_employee.data.data.scarDegreeDate == null
              ? null
              : result_employee.data.data.scarDegreeDate.split("T")[0];
          this.departments = result_employee.data.data.departments;
          this.shifts = result_employee.data.data.shifts;
          this.scarBonus = result_employee.data.data.scarBonus;
          this.causeOfScarring = result_employee.data.data.causeOfScarring;
          this.parintDepartmentName =
            result_employee.data.data.parintDepartmentName;
          this.ScientificAppointmentYear =
            result_employee.data.data.scientificAppointmentYear == null
              ? ""
              : result_employee.data.data.scientificAppointmentYear.split(
                  "T"
                )[0];
          this.DesignationDecisionNumber =
            result_employee.data.data.DesignationDecisionNumber;
          this.Appointment = result_employee.data.data.appointment;
          this.JobStatusAppointment =
            result_employee.data.data.jobStatusAppointment;
          this.ScientificAppointment =
            result_employee.data.data.scientificAppointment;
          this.SpecializationAppointment =
            result_employee.data.data.specializationAppointment;
          // this.scientificDegreeYear =
          //   result_employee.data.data.scientificDegreeYear;
          this.SourceScientific = result_employee.data.data.sourceScientific;
          this.CertificateProviderOrganization =
            result_employee.data.data.certificateProviderOrganization;
          this.GradeAppointment = result_employee.data.data.gradeAppointment;
          this.scarDegree = result_employee.data.data.scarDegree;
          // this.dep = result_employee.data.data.managementId;
          this.EMp = result_employee.data.data.job;
          this.IsManager2 = result_employee.data.data.IsManager;
          this.EmPNumber = result_employee.data.data.profileNumber;
          (this.PlaceWorking = result_employee.data.data.workplace),
            (this.shiftName = result_employee.data.data.shiftId);
          this.JobTitle = result_employee.data.data.nationalNumber;
          this.SuspentionNote = result_employee.data.data.suspentionNote;
          this.JobTitleID = result_employee.data.data.jobTitleId;
          this.CurrentSituation = result_employee.data.data.currentSituation;
          this.fullName = result_employee.data.data.fullName;
          this.JobNumber = result_employee.data.data.jobNumber;
          this.Exp = result_employee.data.data.isPreviousExperiences;
          if (result_employee.data.data.startingDateAtWork != null) {
            this.StartingDateAtWork = new Date(
              result_employee.data.data.startingDateAtWork
            );
          }

          this.DateTransfer =
            result_employee.data.data.dateTransfer == null
              ? ""
              : result_employee.data.data.dateTransfer.split("T")[0];
          this.jobDate =
            result_employee.data.data.jobDate == null
              ? ""
              : result_employee.data.data.jobDate.split("T")[0];
          if (result_employee.data.data.startingDate != null) {
            this.StartingDate = result_employee.data.data.startingDate.split(
              "T"
            )[0];
          }
          this.MonthlyIncreaseOfVacation =
            result_employee.data.data.monthlyIncreaseOfVacation;
          this.JobType = result_employee.data.data.jobType;
          this.DirectManagerJobTitleId =
            result_employee.data.data.directManagerJobTitleId;
          this.IsManager = result_employee.data.data.isManager;
          this.StartingGrade = result_employee.data.data.startingGrade;
          this.StartingBonus = result_employee.data.data.startingBonus;
          this.CurrentGrade = result_employee.data.data.currentGrade;
          this.CurrentBonus = result_employee.data.data.currentBonus;
          this.DepartmentId = result_employee.data.data.departmentId;
          setTimeout(() => {
            this.SectionId = result_employee.data.data.sectionId;
            this.UnitId = result_employee.data.data.unitId;
          }, 1000);

          // this.NumberOfTheYear = result_employee.data.data.numberOfTheYear;
          this.Efficiency = result_employee.data.data.efficiency;
          // this.NumberOfTheYearTwo =
          //   result_employee.data.data.numberOfTheYearTwo;
          this.EfficiencyTwo = result_employee.data.data.efficiencyTwo;
          // this.NumberOfTheYearThree =
          //   result_employee.data.data.numberOfTheYearThree;
          this.EfficiencyThree = result_employee.data.data.efficiencyThree;
          if (result_employee.data.data.lastGradeUpdate != null) {
            this.LastGradeUpdate = result_employee.data.data.lastGradeUpdate.split(
              "T"
            )[0];
          }
          if (result_employee.data.data.lastBonusUpdate != null) {
            this.LastBonusUpdate = new Date(
              result_employee.data.data.lastBonusUpdate
            );
          }
          if (result_employee.data.data.bonusDueDate != null) {
            this.BonusDueDate = result_employee.data.data.bonusDueDate;
          }

          // if (result_employee.data.data.designationResolutionDate != null) {
          //   this.DesignationResolutionDate = result_employee.data.data.designationResolutionDate;
          // }

          this.Notes = result_employee.data.data.notes;

          if (result_employee.data.data.employmentDate != null) {
            this.EmploymentDate = new Date(
              result_employee.data.data.employmentDate
            );
          }
          this.DesignationDecisionNumber = env.NULL(
            result_employee.data.data.designationDecisionNumber
          );
          this.DesignationIssuer = env.NULL(
            result_employee.data.data.designationIssuer
          );
          if (result_employee.data.data.contractDateFrom != null) {
            this.ContractDateFrom = new Date(
              result_employee.data.data.contractDateFrom
            );
          }

          if (result_employee.data.data.contractDateTo != null) {
            this.ContractDateTo = new Date(
              result_employee.data.data.contractDateTo
            );
          }
          (this.PreviousEmployer = env.NULL(
            result_employee.data.data.previousEmployer
          )),
            (this.ScientificDegreeId = env.NULL(
              result_employee.data.data.scientificDegreeId
            )),
            (this.TheJobAssignedTo = env.NULL(
              result_employee.data.data.theJobAssignedTo
            ));
          if (result_employee.data.data.delegationEndDate != null) {
            this.DelegationEndDate = new Date(
              result_employee.data.data.delegationEndDate
            );
          }
          this.CalculateSalariesAndBonus =
            result_employee.data.data.calculateSalariesAndBonus;
          this.State =
            result_employee.data.data.jobDescription == 1 ? "true" : "false";
          if (
            this.causeOfScarring != null ||
            this.scarDegree != null ||
            this.EmploymentDate != ""
          ) {
            this.sttt = true;
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
    },

    clear_SectionId() {
      this.SectionId = "";
    },

    clear_UnitId() {
      this.UnitId = "";
    },
    async Save() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        if (!this.DepartmentId == "00000000-0000-0000-0000-000000000000") {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء اختيار الإدرات/المكاتب "
          );
        }

        if (!this.JobType) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء اختيار نوع التوظيف "
          );
        }

        // if (!this.StartingDateAtWork) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء اختيار تاريخ مباشرة العمل بالجهة "
        //   );
        // }

        if (this.shiftName == "00000000-0000-0000-0000-000000000000") {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال الدوام الرسمي "
          );
        }

        let schema = {
          Specialization: this.Specialization,
          upgradeDueDate:
            this.upgradeDueDate != null
              ? moment(this.upgradeDueDate).format("YYYY/MM/DD hh:mm:ss")
              : "",
          ReasonForCurrentGrade: this.ReasonForCurrentGrade,
          scarBonus: this.scarBonus,
          scarDegree: this.scarDegree,
          // DepartmentId: this.dep,
          ShiftId: this.shiftName,
          NumberOfTheYear: this.NumberOfTheYear,
          Efficiency: this.Efficiency,
          NumberOfTheYearTwo: this.NumberOfTheYearTwo,
          EfficiencyTwo: this.EfficiencyTwo,
          NumberOfTheYearThree: this.NumberOfTheYearThree,
          EfficiencyThree: this.EfficiencyThree,
          CurrentSituation: this.CurrentSituation,
          SuspentionNote: this.SuspentionNote,
          JobNumber: this.JobNumber,
          JobTitleId: this.JobTitleID,
          IsPreviousExperiences: this.Exp,
          DirectManagerJobTitleId: this.DirectManagerJobTitleId,
          StartingDate: this.StartingDate,
          MonthlyIncreaseOfVacation: this.MonthlyIncreaseOfVacation,
          JobType: this.JobType,
          IsManager: this.IsManager,
          JobDescription: this.State == "true" ? "Transfer" : "",
          jobDate: new Date(this.jobDate),
          StartingDateAtWork:
            this.StartingDateAtWork != null
              ? moment(this.StartingDateAtWork).format("YYYY-MM-DD")
              : "",
          DateTransfer: new Date(this.DateTransfer),
          causeOfScarring: this.causeOfScarring,
          // scientificDegreeYear: this.scientificDegreeYear,
          //التعيين
          ScientificAppointmentYear: this.ScientificAppointmentYear,
          Appointment: this.Appointment,
          JobStatusAppointment: this.JobStatusAppointment,
          ScientificAppointment: this.ScientificAppointment,
          SpecializationAppointment: this.SpecializationAppointment,
          scientificDegreeYear: this.ScientificDegreeYear,
          CertificateProviderOrganization: this.CertificateProviderOrganization,
          GradeAppointment: this.GradeAppointment,
          StartingGrade: this.StartingGrade,
          StartingBonus: this.StartingBonus,
          CurrentGrade: this.CurrentGrade,
          CurrentBonus: this.CurrentBonus,
          LastGradeUpdate: this.LastGradeUpdate,
          LastBonusUpdate: this.LastBonusUpdate,
          BonusDueDate: this.BonusDueDate,
          Notes: this.Notes,
          EmploymentDate: this.EmploymentDate,
          DesignationDecisionNumber: this.DesignationDecisionNumber,
          // DesignationResolutionDate: this.DesignationResolutionDate,
          DesignationIssuer: this.DesignationIssuer,
          scarDegreeDate: new Date(this.scarDegreeDate),
          //العقد
          ContractDateFrom: this.ContractDateFrom,
          ContractDateTo: this.ContractDateTo,
          Job: this.EMp,
          ProfileNumber: this.EmPNumber,
          Workplace: this.PlaceWorking,
          //الندب
          DepartmentId: this.DepartmentId,
          UnitId: this.UnitId == "" ? null : this.UnitId,
          SectionId: this.SectionId == "" ? null : this.SectionId,
          PreviousEmployer: this.PreviousEmployer,
          ScientificDegreeId: this.ScientificDegreeId,
          TheJobAssignedTo: this.TheJobAssignedTo,
          DelegationEndDate: this.DelegationEndDate,
          CalculateSalariesAndBonus: this.CalculateSalariesAndBonus
        };
        let employeeId = this.$route.params.id;
        let result = await axios.put(
          `${env.HR()}/api/hr/employees/${employeeId}/job-info`,
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

<style>
.label_date {
  font-size: 0.6875rem !important;
  top: -0.8rem !important;
  right: -25px !important;
}
</style>
