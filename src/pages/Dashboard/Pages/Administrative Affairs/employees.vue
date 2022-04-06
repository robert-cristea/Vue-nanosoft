<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <ValidationObserver v-slot="{ passed, failed }">
          <form>
            <md-card class="p-25">
              <md-card-content>
                <div class="md-layout">
                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <model-list-select
                      class="input-must-rtl"
                      :list="employees"
                      v-model="FullName"
                      option-value="value"
                      option-text="value"
                      placeholder="الموظف"
                    >
                    </model-list-select>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>رقم الملاك الوظيفي</label>
                      <md-input v-model="JobNumber"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mt-25">
                    <model-list-select
                      class="input-must-rtl"
                      :list="departments"
                      v-model="DepartmentId"
                      option-value="id"
                      option-text="name"
                      placeholder="يتبع لـ"
                    ></model-list-select>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <label>الرقم الوطني</label>
                      <md-input v-model="NationalNumber"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-field>
                      <label>تصنيف الفروع</label>
                      <md-select v-model="DepartmentClassificationsId">
                        <md-option
                          v-for="departmentClassification in departmentClassification"
                          v-bind:key="departmentClassification.id"
                          :value="departmentClassification.id"
                          >{{ departmentClassification.name }}</md-option
                        >
                      </md-select>
                    </md-field>
                  </div>

                  <div
                    v-if="searchE"
                    class="md-layout-item md-size-30 mt-25 ml-15"
                  >
                    <md-field>
                      <label>نوع التوظيف</label>
                      <md-select v-model="JobType">
                        <md-option value="1">تعيين</md-option>
                        <md-option value="2">عقد</md-option>
                        <md-option value="3">ندب</md-option>
                        <md-option value="4">نقل</md-option>
                        <md-option value="5">عقد مصنف</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div
                    v-if="searchE"
                    class="md-layout-item md-size-30 mt-25 ml-15"
                  >
                    <md-field>
                      <label>المؤهلات العلمية</label>
                      <md-select v-model="ScientificDegreeId">
                        <md-option
                          v-for="scientificDegrees in scientificDegrees"
                          v-bind:key="scientificDegrees.key"
                          :value="scientificDegrees.key"
                          >{{ scientificDegrees.value }}</md-option
                        >
                      </md-select>
                    </md-field>
                  </div>

                  <!-- <div
                    v-if="searchE"
                    class="md-layout-item md-size-30 mt-25 ml-15"
                  >
                    <md-datepicker v-model="StartingDateFrom">
                      <label class="mr-28">تاريخ المباشرة من</label>
                    </md-datepicker>
                  </div> -->

                  <!-- <div
                    v-if="searchE"
                    class="md-layout-item md-size-30 mt-25 ml-15"
                  >
                    <md-datepicker v-model="StartingDateTo">
                      <label class="mr-28">تاريخ المباشرة الى</label>
                    </md-datepicker>
                  </div> -->

                  <div
                    v-if="searchE"
                    class="md-layout-item md-size-30 mt-25 ml-15"
                  >
                    <md-field>
                      <label>ترتيب النتائج</label>
                      <md-select v-model="SortBy">
                        <md-option value="0">ترتيب الأسماء تصاعديا</md-option>
                        <md-option value="1">ترتيب الأسماء تنازليا</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <!-- <div
                    v-if="searchE"
                    class="md-layout-item md-size-30 mt-25 ml-15"
                  >
                    <md-field>
                      <label>إستحقاق الترقيات والعلاوة</label>
                      <md-select v-model="BonusDueDateFilterType">
                        <md-option value="1"
                          >موظفين اقترب استحقاقهم لعلاوة</md-option
                        >
                        <md-option value="2">موظفين يستحقون علاوة</md-option>
                        <md-option value="3">موظفين يستحقون ترقية</md-option>
                      </md-select>
                    </md-field>
                  </div> -->

                  <!-- <div
                    v-if="searchE"
                    class="md-layout-item md-size-30 mt-25 ml-15"
                  >
                    <md-field>
                      <label>نوع انتهاء الخدمة</label>
                      <md-select v-model="TypeOfEndService">
                        <md-option value="1">استقالة</md-option>
                        <md-option value="2">فصل من الخدمة</md-option>
                        <md-option value="3">تقاعد</md-option>
                        <md-option value="4">تقاعد اختياري</md-option>
                        <md-option value="5">وفاة</md-option>
                        <md-option value="6">انهاء ندب</md-option>
                        <md-option value="7">نقل</md-option>
                      </md-select>
                    </md-field>
                  </div> -->

                  <!-- <div
                    v-if="searchE"
                    class="md-layout-item md-size-30 mt-25 ml-15"
                  >
                    <md-field>
                      <label>اظهار المقتربين من التقاعد</label>
                      <md-select v-model="MustRetireSoon">
                        <md-option value="true">نعم</md-option>
                        <md-option value="false">لا</md-option>
                      </md-select>
                    </md-field>
                  </div> -->

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field>
                      <label>نوع التقرير</label>

                      <md-select v-model="CurrentReport">
                        <md-option value="1">قوائم الموظفين</md-option>
                        <md-option value="2"
                          >تقرير بأعداد الموظفين حسب الإدارة</md-option
                        >
                        <md-option value="3">بطاقة الموظف</md-option>
                        <md-option value="4">تقرير برصيد الإجازات</md-option>
                        <md-option value="5">تقرير الغياب</md-option>
                        <md-option value="6"
                          >تقرير العلاوات والترقيات</md-option
                        >
                      </md-select>
                    </md-field>
                  </div>

                  <div
                    class="md-layout-item md-size-30 mt-25"
                    style="padding-right: 0"
                  >
                    <md-checkbox v-model="searchE">بحث متقدم</md-checkbox>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25">
                    <md-checkbox @click="show_" v-model="show"
                      >عرض تفاصيل الموظف</md-checkbox
                    >
                  </div>
                  <div class="md-layout-item md-size-100 mt-25 center-content">
                    <md-button @click="Search" class="md-success btn_nanosoft"
                      >بحث</md-button
                    >
                    <md-button @click="New" class="md-info btn_nanosoft"
                      >جديد</md-button
                    >

                    <md-button @click="Clear" class="md-black btn_nanosoft"
                      >إفراغ الحقول</md-button
                    >
                  </div>
                </div>
              </md-card-content>
            </md-card>
          </form>
        </ValidationObserver>
      </div>
    </div>

    <div v-show="!show" class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-text md-card-header-green">
          <div class="card-text">
            <h4 class="title">البحث</h4>
          </div>
        </md-card-header>

        <md-card-content>
          <div
            class="md-layout flex-content-left"
            style="justify-content: space-between"
          >
            <div class="md-layout-item md-size-20">
              <md-table>
                <md-table-toolbar>
                  <md-field>
                    <label for="pages">عدد النتائج</label>
                    <md-select v-model="pagination.perPage" name="pages">
                      <md-option value="25">25</md-option>
                      <md-option value="50">50</md-option>
                      <md-option value="75">75</md-option>
                      <md-option value="100">100</md-option>
                    </md-select>
                  </md-field>
                </md-table-toolbar>
              </md-table>
            </div>
            <div class="md-layout-item md-size-20">
              <md-button @click="generateReport" class="md-info btn_nanosoft">
                طباعة PDF
              </md-button>
              <div v-if="pdfLoadingActive" class="overlay-pdf">
                <h3 class="head-loading-pdf">جارى تحميل الملف</h3>
                <atom-spinner
                  class="pdfLoading"
                  :animation-duration="1000"
                  :size="160"
                  color="#4caf50"
                />
                <div style="width: 50%">
                  <step-progress
                    :steps="mySteps"
                    :current-step="currentStep"
                    :line-thickness="50"
                    :active-color="'#4caf50'"
                    :passive-color="'#999999'"
                  ></step-progress>
                </div>
                <!-- <looping-rhombuses-spinner
                  :animation-duration="2500"
                  :rhombus-size="23"
                  color="#4caf50"
                /> -->
              </div>
              <!-- <vue-excel-xlsx
                :data="queriedData"
                :columns="columns"
                :file-name="'filename'"
                :file-type="'xlsx'"
                :sheet-name="'sheetname'"
                class="excel-container"
              >
                <md-button class="md-info btn_nanosoft">
                  استخراج Excel
                </md-button>
              </vue-excel-xlsx> -->
            </div>
          </div>

          <md-table
            :value="queriedData"
            :md-sort.sync="currentSort"
            :md-sort-order.sync="currentSortOrder"
            :md-sort-fn="customSort"
            class="paginated-table table-striped table-hover mt-25"
          >
            <!-- style="display: none" -->
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="الرقم الوطني">
                <p @click="handleEdit(item)">
                  {{ item.personalInfo.nationalNumber }}
                </p>
              </md-table-cell>

              <md-table-cell md-label="الإسم الرباعي">
                <p @click="handleEdit(item)">
                  {{ item.personalInfo.fullName }}
                </p>
              </md-table-cell>

              <md-table-cell class="jobNumber" md-label="رقم الملاك الوظيفي">
                <p
                  @click="handleEdit(item)"
                  style="position: absolute; left: 83px; bottom: -23px"
                >
                  {{ item.jobInfo.jobNumber }}
                </p>
              </md-table-cell>

              <md-table-cell md-label="الإدارة">
                <p @click="handleEdit(item)">
                  {{ item.jobInfo.managementName }}
                </p>
              </md-table-cell>

              <md-table-cell md-label="الصفة الوظيفية">
                <p @click="handleEdit(item)">
                  {{ item.jobInfo.jobTitle }}
                </p>
              </md-table-cell>

              <md-table-cell md-label="رقم الهاتف">
                <p @click="handleEdit(item)">
                  {{ item.personalInfo.phone }}
                </p>
              </md-table-cell>

              <md-table-cell md-label="تاريخ الميلاد">
                <p @click="handleEdit(item)">
                  {{ convert(item.personalInfo.birthDate) }}
                </p>
              </md-table-cell>

              <md-table-cell md-label="الدوام الرسمي">
                <p @click="handleEdit(item)">
                  {{ item.jobInfo.shiftName }}
                </p>
              </md-table-cell>

              <md-table-cell md-label="الصفة">
                <p @click="handleEdit(item)">
                  {{ item.jobInfo.isManager == true ? "مدير" : "موظف عادي" }}
                </p>
              </md-table-cell>

              <md-table-cell
                v-if="item.jobInfo.jobType == 1"
                md-label="نوع التوظيف"
              >
                <p @click="handleEdit(item)">تعيين</p>
              </md-table-cell>

              <md-table-cell
                v-if="item.jobInfo.jobType == 2"
                md-label="نوع التوظيف"
              >
                <p @click="handleEdit(item)">عقد</p>
              </md-table-cell>

              <md-table-cell
                v-if="item.jobInfo.jobType == 3"
                md-label="نوع التوظيف"
              >
                <p @click="handleEdit(item)">ندب</p>
              </md-table-cell>

              <md-table-cell
                v-if="item.jobInfo.jobType == 4"
                md-label="نوع التوظيف"
              >
                <p @click="handleEdit(item)">نقل</p>
              </md-table-cell>

              <md-table-cell
                v-if="item.jobInfo.jobType == 5"
                md-label="نوع التوظيف"
              >
                <p @click="handleEdit(item)">عقد مصنف</p>
              </md-table-cell>

              <md-table-cell md-label="تاريخ المباشرة">
                <p @click="handleEdit(item)">
                  {{ convert(item.jobInfo.startingDate) }}
                </p>
              </md-table-cell>

              <md-table-cell md-label="ساعات العمل الشهرية">
                <p @click="handleEdit(item)">
                  {{ item.financialInfo.totalWorktime }}
                </p>
              </md-table-cell>

              <!-- <md-table-cell md-label="التفعيل بالبريد الالكتروني">{{
                item.jobTitle
              }}</md-table-cell>-->

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
                    v-for="(item, i) in footerTable"
                    :key="i"
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

        <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="false"
          :preview-modal="false"
          :paginate-elements-by-height="1400"
          filename="Staff Report"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a2"
          pdf-orientation="portrait"
          pdf-content-width="100%"
          :html-to-pdf-options="htmlToPdfOptions"
          ref="html2Pdf"
          @progress="progressPdf"
          @beforeDownload="beforeDownload($event)"
        >
          <section
            class="pdf-container d-flex"
            slot="pdf-content"
            style="direction: rtl"
          >
            <!-- PDF Content Here -->
            
            <md-card-content class="redirect-dir">
              <div style="padding:25pt">
                <md-table
                  :value="pdfData"
                  :md-sort.sync="currentSort"
                  :md-sort-order.sync="currentSortOrder"
                  :md-sort-fn="customSort"
                  class="
                    custome-paginated-table
                    table-bordered table-hover
                    mt-25
                  "
                >
                  <!-- style="display: none" -->
                  <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="ر.ت">
                      <p>-</p>
                    </md-table-cell>

                    <md-table-cell class="jobNumber" md-label="الرقم">
                      <p>
                        {{ item.jobInfo.jobNumber }}
                      </p>
                    </md-table-cell>

                    <md-table-cell md-label="الإسم">
                      <p>
                        {{ item.personalInfo.fullName }}
                      </p>
                    </md-table-cell>

                    <md-table-cell md-label="الرقم الوطني">
                      <p>
                        {{ item.personalInfo.nationalNumber }}
                      </p>
                    </md-table-cell>

                    <md-table-cell md-label="تاريخ المباشرة">
                      <p>
                        {{ convert(item.jobInfo.startingDate) }}
                      </p>
                    </md-table-cell>

                    <md-table-cell md-label="الإدارة">
                      <p>
                        {{ item.jobInfo.managementName }}
                      </p>
                    </md-table-cell>
                    <md-table-cell md-label="الصفة الوظيفية">
                      <p>
                        {{ item.jobInfo.jobTitle }}
                      </p>
                    </md-table-cell>

                    <md-table-cell
                      v-if="item.jobInfo.jobType == 1"
                      md-label="نوع التوظيف"
                    >
                      <p>تعيين</p>
                    </md-table-cell>

                    <md-table-cell
                      v-else-if="item.jobInfo.jobType == 2"
                      md-label="نوع التوظيف"
                    >
                      <p>عقد</p>
                    </md-table-cell>

                    <md-table-cell
                      v-else-if="item.jobInfo.jobType == 3"
                      md-label="نوع التوظيف"
                    >
                      <p>ندب</p>
                    </md-table-cell>

                    <md-table-cell
                      v-else-if="item.jobInfo.jobType == 4"
                      md-label="نوع التوظيف"
                    >
                      <p>نقل</p>
                    </md-table-cell>

                    <md-table-cell
                      v-else-if="item.jobInfo.jobType == 5"
                      md-label="نوع التوظيف"
                    >
                      <p>عقد مصنف</p>
                    </md-table-cell>

                    <md-table-cell v-else md-label="نوع التوظيف">
                      <p>-</p>
                    </md-table-cell>

                    <md-table-cell md-label="الحالة الإجتماعية">
                      <p>
                        {{ item.personalInfo.socialStatus }}
                      </p>
                    </md-table-cell>

                    <md-table-cell md-label="تاريخ الميلاد">
                      <p>
                        {{ convert(item.personalInfo.birthDate) }}
                      </p>
                    </md-table-cell>

                    <md-table-cell md-label="المؤهل">
                      <p>-</p>
                    </md-table-cell>

                    <md-table-cell md-label="الدرجة الوظيفية">
                      <p>
                        {{
                          item.jobInfo.isManager == true ? "مدير" : "موظف عادي"
                        }}
                      </p>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
              </div>
            </md-card-content>
            <h3 class="text-center" style="font-family: Amiri-Regular; text-decoration: underline dotted black">توقيع رئيس قسم الموارد البشرية</h3>
          </section>
        </vue-html2pdf>

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

    <!------------ btn ------------------>

    <div
      v-if="show == true"
      class="md-layout-item md-size-100 mt-30 center-content"
    >
      <md-button
        @click="personalInfo"
        class="btn_nanosoft"
        :class="{ 'md-success': one }"
        >البيانات الشخصية</md-button
      >

      <md-button
        @click="jobInfo"
        class="btn_nanosoft"
        :class="{ 'md-success': two }"
        >البيانات الوظيفية</md-button
      >

      <md-button
        @click="FinancialInfo"
        class="btn_nanosoft"
        :class="{ 'md-success': eight }"
        >البيانات المالية</md-button
      >

      <md-button
        @click="Qualifications"
        class="btn_nanosoft"
        :class="{ 'md-success': three }"
        >المؤهلات العلمية</md-button
      >

      <md-button
        @click="vacation"
        class="btn_nanosoft"
        :class="{ 'md-success': four }"
        >أرصدة وخصميات الإجازات السنوية</md-button
      >

      <md-button
        @click="Assignment"
        class="btn_nanosoft"
        :class="{ 'md-success': five }"
        >الإنتداب لجهة اخرى</md-button
      >

      <md-button
        @click="Employee_Documents"
        class="btn_nanosoft"
        :class="{ 'md-success': seven }"
        >مستندات الموظف</md-button
      >
    </div>

    <!------------ Table details ------------------>
    <div v-if="show == true" class="md-layout">
      <div
        class="
          md-layout-item md-xlarge-size-30 md-large-size-30 md-medium-size-30
        "
      >
        <md-card>
          <md-card-header class="md-card-header-text md-card-header-green">
            <div class="card-text">
              <h4 class="title">الموظفين</h4>
            </div>
          </md-card-header>

          <md-card-content>
            <!-- <div class="md-layout flex-content-left">
            <div class="md-size-100 md-layout-item ">
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
          </div> -->

            <md-table
              :value="queriedData"
              :md-sort.sync="currentSort"
              :md-sort-order.sync="currentSortOrder"
              :md-sort-fn="customSort"
              class="paginated-table table-striped table-hover mt-25"
            >
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell
                  @click.native="handleEdit(item)"
                  md-label="الإسم الرباعي"
                  >{{ item.personalInfo.fullName }}</md-table-cell
                >
                <md-table-cell md-label>
                  <div class="md-just-icon md-info md-simple"></div>
                  <!-- <md-button
                    class="md-just-icon md-warning md-simple"
                    @click.native="handleEdit(item)"
                  >
                    <md-icon>dvr</md-icon>
                  </md-button> -->
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
                      <div
                        class="md-table-head-container md-ripple md-disabled"
                      >
                        <div class="md-table-head-label">{{ item }}</div>
                      </div>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div> -->
          </md-card-content>
          <md-card-actions md-alignment="space-between">
            <!-- <div class>
              <p class="card-category">
                Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
              </p>
            </div> -->
            <pagination
              class="pagination-no-border pagination-success"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="total"
            ></pagination>
          </md-card-actions>
        </md-card>
      </div>

      <!--  personalInfo  -->
      <div
        v-show="one"
        class="
          md-layout-item md-xlarge-size-70 md-large-size-70 md-medium-size-70
        "
      >
        <div class="md-layout">
          <div class="md-layout-item">
            <md-card>
              <form>
                <md-card-content>
                  <div class="md-layout mt-25">
                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>الرقم الوطني</label>
                        <md-input v-model="nid" type="number"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>الإسم</label>
                        <md-input v-model="name"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>اسم الاب</label>
                        <md-input v-model="fname"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>اسم الجد</label>
                        <md-input v-model="gname"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>اللقب</label>
                        <md-input v-model="lname"></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
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
                        <label class="mr-28"
                          >تاريخ انتهاء صلاحية التأشيرة</label
                        >
                      </md-datepicker>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>العنوان</label>
                        <md-input v-model="Address"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>مكان الميلاد</label>
                        <md-input v-model="Place"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>عدد الأطفال</label>
                        <md-input v-model="children" type="number"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>السجل المدني المسؤول</label>
                        <md-input v-model="Register"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>رقم القيد</label>
                        <md-input v-model="numberID"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>مكان الإصدار</label>
                        <md-input v-model="placeCardF"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>مكان الإصدار</label>
                        <md-input v-model="placePassport"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>رقم الجواز</label>
                        <md-input v-model="IDPassport"></md-input>
                      </md-field>
                    </div>

                    <div
                      class="md-layout-item md-size-100 mt-50 center-content"
                    >
                      <md-button
                        @click="Save_personalInfo"
                        class="md-success btn_nanosoft"
                        >حفظ</md-button
                      >
                    </div>
                  </div>
                </md-card-content>
              </form>
            </md-card>
          </div>
        </div>
      </div>

      <!--   jobInfo  -->
      <div
        v-show="two"
        class="
          md-layout-item md-xlarge-size-70 md-large-size-70 md-medium-size-70
        "
      >
        <div class="md-layout">
          <div class="md-layout-item">
            <form>
              <md-card class="p-25">
                <md-card-content>
                  <div class="md-layout mt-25">
                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="idTable != ''"
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
                        style="
                          position: absolute;
                          top: -2px;
                          right: 2px;
                          color: red;
                        "
                        class="validate"
                      >
                        *
                      </p>

                      <model-list-select
                        class="input-must-rtl"
                        :list="departments"
                        v-model="DepartmentId_jobInfo"
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
                                  <path
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  ></path></svg
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
                                  <path
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  ></path></svg
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
                        <md-select v-model="JobType_jobInfo">
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
                        <md-select v-model="ScientificDegreeId_jobInfo">
                          <md-option
                            v-for="ScientificDegrees in scientificDegrees"
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
                      v-if="JobType_jobInfo != 3"
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
                      <md-datepicker v-model="LastGradeUpdate">
                        <label class="mr-28">تاريخ الدرجة الحالية</label>
                      </md-datepicker>
                    </div>

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
                      </md-field>
                    </div>

                    <div
                      class="
                        md-layout-item md-layout-item-time md-size-30
                        ml-15
                      "
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
                      v-if="JobType_jobInfo == 2"
                    >
                      <md-datepicker v-model="EmploymentDate">
                        <label class="mr-28">تاريخ التعاقد</label>
                      </md-datepicker>
                    </div>

                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="JobType_jobInfo == 2"
                    >
                      <md-datepicker v-model="ContractDateFrom">
                        <label class="mr-28">تاريخ بداية العقد</label>
                      </md-datepicker>
                    </div>
                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="JobType_jobInfo == 2"
                    >
                      <md-datepicker v-model="ContractDateTo">
                        <label class="mr-28">تاريخ نهاية العقد</label>
                      </md-datepicker>
                    </div>
                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="JobType_jobInfo == 3"
                    >
                      <md-field>
                        <label>الجهة المنتدب منها</label>
                        <md-input v-model="PreviousEmployer"></md-input>
                      </md-field>
                    </div>
                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="JobType_jobInfo == 3"
                    >
                      <md-datepicker v-model="DelegationEndDate">
                        <label class="mr-28">تاريخ نهاية الندب</label>
                      </md-datepicker>
                    </div>
                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="JobType_jobInfo == 3"
                    >
                      <md-field>
                        <label>الوظيفة المنتدب اليها</label>
                        <md-input v-model="TheJobAssignedTo"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 ml-15 mt-25">
                      <md-checkbox v-model="sttt">ندب لدرجة</md-checkbox>
                    </div>
                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="JobType_jobInfo == 3 || JobType_jobInfo == 6"
                    >
                      <md-field>
                        <label>احتساب المرتبات والعلاوات</label>
                        <md-select v-model="CalculateSalariesAndBonus">
                          <md-option value="true">نعم</md-option>
                          <md-option value="false">لا</md-option>
                        </md-select>
                      </md-field>
                    </div>
                    <div
                      class="md-layout-item md-size-100 mt-25 center-content"
                    >
                      <md-button
                        @click="Save_jobInfo"
                        class="md-success btn_nanosoft"
                        >حفظ</md-button
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
                <md-card-header
                  class="md-card-header-text md-card-header-green"
                >
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
              <md-card v-if="JobType_jobInfo == 1">
                <md-card-header
                  class="md-card-header-text md-card-header-green"
                >
                  <div class="card-text">
                    <h4 class="title">بيانات التعين</h4>
                  </div>
                </md-card-header>
                <md-card-content>
                  <div class="md-layout">
                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="JobType_jobInfo == 1"
                    >
                      <md-datepicker v-model="EmploymentDate">
                        <label class="mr-28">تاريخ قرار التعيين</label>
                      </md-datepicker>
                    </div>
                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="JobType_jobInfo == 1"
                    >
                      <md-field>
                        <label>رقم قرار التعيين</label>
                        <md-input
                          v-model="DesignationDecisionNumber"
                        ></md-input>
                      </md-field>
                    </div>
                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="JobType_jobInfo == 1"
                    >
                      <md-field>
                        <label>جهة اصدار التعيين</label>
                        <md-input v-model="Appointment"></md-input>
                      </md-field>
                    </div>
                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="JobType_jobInfo == 1"
                    >
                      <md-field>
                        <label>الوضع الوظيفي عند التعيين</label>
                        <md-input v-model="JobStatusAppointment"></md-input>
                      </md-field>
                    </div>
                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="JobType_jobInfo == 1"
                    >
                      <md-field>
                        <label>المؤهل العلمي عند التعيين</label>
                        <md-input v-model="ScientificAppointment"></md-input>
                      </md-field>
                    </div>

                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="JobType_jobInfo == 1"
                    >
                      <md-field>
                        <label>التخصص</label>
                        <md-input
                          v-model="SpecializationAppointment"
                        ></md-input>
                      </md-field>
                    </div>

                    <div
                      v-if="JobType_jobInfo == 1"
                      class="md-layout-item md-size-30 ml-15 mt-25"
                    >
                      <md-field>
                        <label>سنة الحصول على المؤهل</label>
                        <md-input
                          v-model="ScientificAppointmentYear"
                        ></md-input>
                      </md-field>
                    </div>

                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="JobType_jobInfo == 1"
                    >
                      <md-field>
                        <label>الجهة المانحة للمؤهل</label>
                        <md-input v-model="SourceScientific"></md-input>
                      </md-field>
                    </div>

                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="JobType_jobInfo == 1"
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
                      v-if="JobType_jobInfo == 1"
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
                      <md-input
                        v-model="NumberOfTheYearTwo"
                        disabled
                      ></md-input>
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
                      <md-input
                        v-model="NumberOfTheYearThree"
                        disabled
                      ></md-input>
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
              </collapse>
            </md-card-content>
          </md-card>
        </div>

        <div class="md-layout">
          <div class="md-layout-item">
            <form>
              <md-card>
                <md-card-header
                  class="md-card-header-text md-card-header-green"
                >
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
                          <md-input v-model="JobNumber_jobInfo"></md-input>
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
                          <md-input
                            v-model="MonthlyIncreaseOfVacation"
                          ></md-input>
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

      <!-- FinancialInfo -->
      <div
        v-show="eight"
        class="
          md-layout-item md-xlarge-size-70 md-large-size-70 md-medium-size-70
        "
      >
        <div class="md-layout">
          <div class="md-layout-item">
            <form>
              <md-card class="p-25">
                <md-card-content>
                  <div class="md-layout">
                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="idTable != ''"
                    >
                      <md-field>
                        <label>الموظف</label>
                        <md-input v-model="fullName" disabled></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>رقم الملف المالي</label>
                        <md-input v-model="FileNumber"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>الرقم المالي</label>
                        <md-input v-model="FinancialNumber"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>رقم الحساب</label>
                        <md-input v-model="AccountNumber"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>الدرجة المالية</label>
                        <md-input disabled v-model="FinancialDegree"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>العلاوة المالية</label>
                        <md-input disabled v-model="FinancialBonuse"></md-input>
                      </md-field>
                    </div>

                    <div
                      v-if="GetWorktimeFromTimesheet == false"
                      class="md-layout-item md-size-30 mt-25 ml-15"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>المرتب الأساسي</label>
                        <md-input v-model="BasicSalary"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-50 mt-25">
                      <md-checkbox v-model="GetWorktimeFromTimesheet"
                        >احتساب اجمالي ساعات العمل من جدول الحضور</md-checkbox
                      >
                    </div>

                    <div class="md-layout-item md-size-40 mt-25">
                      <md-checkbox v-model="GetBasicSalaryFromTable">
                        الإحتساب من جدول المرتبات</md-checkbox
                      >
                    </div>

                    <div
                      class="md-layout-item md-size-100 mt-25 center-content"
                    >
                      <md-button
                        @click="Save_FinancialInfo"
                        class="md-success btn_nanosoft"
                        >حفظ</md-button
                      >
                    </div>
                  </div>
                </md-card-content>
              </md-card>
            </form>
          </div>
        </div>
      </div>

      <!-- Qualifications -->

      <div
        v-show="three"
        class="
          md-layout-item md-xlarge-size-70 md-large-size-70 md-medium-size-70
        "
      >
        <div class="md-layout">
          <div class="md-layout-item">
            <form>
              <md-card class="p-25">
                <md-card-content>
                  <div class="md-layout">
                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="idTable != ''"
                    >
                      <md-field>
                        <label>الموظف</label>
                        <md-input v-model="fullName" disabled></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-size-30 ml-15 mtb-25">
                      <md-field>
                        <label>المؤهل العلمي</label>
                        <md-select v-model="ScientificDegreeId_Qualifications">
                          <md-option
                            v-for="ScientificDegrees in ScientificDegrees"
                            v-bind:key="ScientificDegrees.key"
                            :value="ScientificDegrees.key"
                            >{{ ScientificDegrees.value }}</md-option
                          >
                        </md-select>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 ml-15 mtb-25">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>التخصص</label>
                        <md-input
                          v-model="Specialization_Qualifications"
                        ></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 ml-15 mtb-25">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>سنة الحصول على المؤهل</label>
                        <md-input v-model="Year"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 ml-15 mtb-25">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>مكان الحصول على المؤهل</label>
                        <md-input v-model="Place_Qualifications"></md-input>
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
                      <md-button
                        @click="Save_Qualifications"
                        class="md-success btn_nanosoft"
                        >حفظ</md-button
                      >
                      <md-button
                        @click="clear_Qualifications"
                        class="md-info btn_nanosoft"
                        >جديد</md-button
                      >

                      <!-- <md-button class="md-success btn_nanosoft">حفظ كملف إكسل</md-button>
                  <md-button class="md-success btn_nanosoft">تحميل من ملف إكسل</md-button>-->
                    </div>
                  </div>
                </md-card-content>
              </md-card>
            </form>
          </div>
        </div>

        <div class="md-layout-item">
          <md-card>
            <md-card-content>
              <div class="md-layout flex-content-left">
                <!-- <div class="md-size-30 md-layout-item mt-25">
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
            </div> -->
              </div>

              <md-table
                :value="queriedData_Qualifications"
                :md-sort.sync="currentSort"
                :md-sort-order.sync="currentSortOrder"
                :md-sort-fn="customSort"
                class="paginated-table table-striped table-hover mt-25"
              >
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="المؤهل العلمي">
                    {{ item.scientificDegreeName }}
                  </md-table-cell>

                  <md-table-cell md-label="التخصص">
                    {{ item.specialization }}
                  </md-table-cell>

                  <md-table-cell md-label="سنة الحصول على المؤهل">
                    {{ item.year }}
                  </md-table-cell>

                  <md-table-cell md-label="مكان الحصول على المؤهل">
                    {{ item.place }}
                  </md-table-cell>

                  <md-table-cell md-label>
                    <div class="md-just-icon md-info md-simple"></div>
                    <md-button
                      class="md-just-icon md-warning md-simple"
                      @click.native="handleEdit_Qualifications(item)"
                    >
                      <md-icon>dvr</md-icon>
                    </md-button>
                    <md-button
                      class="md-just-icon md-danger md-simple"
                      @click.native="handleDelete_Qualifications(item)"
                    >
                      <md-icon>close</md-icon>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
              <div class="footer-table md-table">
                <!-- <table>
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
            </table> -->
              </div>
            </md-card-content>
            <!-- <md-card-actions md-alignment="space-between">
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
        </md-card-actions> -->
          </md-card>
        </div>
      </div>

      <!-- vacation -->

      <div
        v-show="four"
        class="
          md-layout-item md-xlarge-size-70 md-large-size-70 md-medium-size-70
        "
      >
        <div class="md-layout">
          <div class="md-layout-item">
            <form>
              <md-card class="p-25">
                <md-card-content>
                  <div class="md-layout">
                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="idTable != ''"
                    >
                      <md-field>
                        <label>الموظف</label>
                        <md-input v-model="fullName" disabled></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>رصيد الإجازة السنوي</label>
                        <md-input disabled v-model="balance"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>الرصيد المستحق إلى نهاية السنة</label>
                        <md-input disabled v-model="worth"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field>
                        <label>نوع الحركة</label>
                        <md-select v-model="Type">
                          <md-option value="1">إضافة رصيد</md-option>
                          <md-option value="2"
                            >خصم من رصيد الإجازة السنوية</md-option
                          >
                        </md-select>
                      </md-field>
                    </div>

                    <div
                      class="md-layout-item md-size-30 mt-25 ml-15"
                      v-if="Type != '1'"
                    >
                      <md-datepicker v-model="From">
                        <label class="mr-28">من تاريخ</label>
                      </md-datepicker>
                    </div>

                    <div
                      class="md-layout-item md-size-30 mt-25 ml-15"
                      v-if="Type != '1'"
                    >
                      <md-datepicker v-model="To">
                        <label class="mr-28">إلى تاريخ</label>
                      </md-datepicker>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>عدد الأيام</label>
                        <md-input v-model="Days"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>ملاحظة</label>
                        <md-input v-model="Note"></md-input>
                      </md-field>
                    </div>

                    <div
                      class="md-layout-item md-size-100 mt-50 center-content"
                    >
                      <md-button
                        @click="Save_vacation"
                        class="md-success btn_nanosoft"
                        >حفظ</md-button
                      >
                      <md-button
                        @click="clear_vacation"
                        class="md-info btn_nanosoft"
                        >جديد</md-button
                      >
                    </div>
                  </div>
                </md-card-content>
              </md-card>
            </form>
          </div>
        </div>

        <div class="md-layout-item">
          <md-card>
            <md-card-content>
              <!-- <div class="md-layout flex-content-left">
            <div class="md-layout-item md-size-">
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
          </div> -->
              <md-table
                :value="queriedData_vacation"
                :md-sort.sync="currentSort"
                :md-sort-order.sync="currentSortOrder"
                :md-sort-fn="customSort"
                class="paginated-table table-striped table-hover mt-25"
              >
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="نوع الحركة">{{
                    item.type == 2
                      ? "خصم من رصيد الإجازة السنوية"
                      : "إضافة رصيد"
                  }}</md-table-cell>

                  <md-table-cell md-label="من تاريخ">
                    {{ convert(item.from) }}
                  </md-table-cell>

                  <md-table-cell md-label="الى تاريخ">
                    {{ convert(item.to) }}
                  </md-table-cell>

                  <md-table-cell md-label="عدد الأيام">{{
                    item.days
                  }}</md-table-cell>

                  <md-table-cell md-label="ملاحظة">{{
                    item.note
                  }}</md-table-cell>

                  <md-table-cell md-label>
                    <div class="md-just-icon md-info md-simple"></div>
                    <md-button
                      class="md-just-icon md-warning md-simple"
                      @click.native="handleEdit_vacation(item)"
                    >
                      <md-icon>dvr</md-icon>
                    </md-button>
                    <md-button
                      class="md-just-icon md-danger md-simple"
                      @click.native="handleDelete_vacation(item)"
                    >
                      <md-icon>close</md-icon>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
              <div class="footer-table md-table">
                <!-- <table>
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
            </table> -->
              </div>
            </md-card-content>
            <!-- <md-card-actions md-alignment="space-between">
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
        </md-card-actions> -->
          </md-card>
        </div>
      </div>

      <!-- Assignment -->

      <div
        v-show="five"
        class="
          md-layout-item md-xlarge-size-70 md-large-size-70 md-medium-size-70
        "
      >
        <div class="md-layout">
          <div class="md-layout-item">
            <form>
              <md-card class="p-25">
                <md-card-content>
                  <div class="md-layout">
                    <div
                      class="md-layout-item md-size-30 ml-15 mt-25"
                      v-if="idTable != ''"
                    >
                      <md-field>
                        <label>الموظف</label>
                        <md-input v-model="fullName" disabled></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>الجهة المنتدب إليها</label>
                        <md-input v-model="DelegatedTo"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-datepicker v-model="From_Assignment">
                        <label class="mr-28">تاريخ بداية الندب</label>
                      </md-datepicker>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-datepicker v-model="To_Assignment">
                        <label class="mr-28">تاريخ انتهاء الندب</label>
                      </md-datepicker>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field>
                        <label>نوع الندب</label>
                        <md-select>
                          <md-option value="1">ندب مع الوظيفة</md-option>
                          <md-option value="2">ندب تام</md-option>
                        </md-select>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-50 mt-25 mt-25">
                      <md-checkbox
                        v-model="CalculateSalariesAndBonus_Assignment"
                        >احتساب المرتبات والعلاوات</md-checkbox
                      >
                    </div>
                    <div
                      class="md-layout-item md-size-100 mt-25 center-content"
                    >
                      <md-button
                        @click="Save_Assignment"
                        class="md-success btn_nanosoft"
                        >حفظ</md-button
                      >
                      <md-button
                        @click="clear_Assignment"
                        class="md-info btn_nanosoft"
                        >جديد</md-button
                      >
                    </div>
                  </div>
                </md-card-content>
              </md-card>
            </form>
          </div>
        </div>

        <div class="md-layout-item">
          <md-card>
            <md-card-content>
              <!-- <div class="md-layout flex-content-left">
            <div class="md-layout-item md-size-15">
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
          </div> -->
              <md-table
                :value="queriedData_Assignment"
                :md-sort.sync="currentSort"
                :md-sort-order.sync="currentSortOrder"
                :md-sort-fn="customSort"
                class="paginated-table table-striped table-hover mt-25"
              >
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="الجهة المنتدب إليها">{{
                    item.delegatedTo
                  }}</md-table-cell>

                  <md-table-cell md-label="تاريخ بداية الندب">{{
                    convert(item.from)
                  }}</md-table-cell>

                  <md-table-cell md-label="تاريخ انتهاء الندب">{{
                    convert(item.to)
                  }}</md-table-cell>

                  <md-table-cell md-label="احتساب المرتبات والعلاوات">{{
                    item.calculateSalariesAndBonus === false ? "لا" : "نعم"
                  }}</md-table-cell>
                  <md-table-cell md-label>
                    <div class="md-just-icon md-info md-simple"></div>
                    <md-button
                      class="md-just-icon md-warning md-simple"
                      @click.native="handleEdit_Assignment(item)"
                    >
                      <md-icon>dvr</md-icon>
                    </md-button>
                    <md-button
                      class="md-just-icon md-danger md-simple"
                      @click.native="handleDelete_Assignment(item)"
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
            <!-- <md-card-actions md-alignment="space-between">
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
        </md-card-actions> -->
          </md-card>
        </div>
      </div>

      <!-- Employee_Documents -->

      <div
        v-show="seven"
        class="
          md-layout-item md-xlarge-size-70 md-large-size-70 md-medium-size-70
        "
      >
        <div class="md-layout">
          <div class="md-layout-item">
            <div>
              <modal v-if="showModale" @close="showModale = false">
                <h3 slot="header">تفاصيل</h3>
                <div slot="body">
                  <md-table
                    :value="tableFiles"
                    class="paginated-table table-striped table-hover mt-25"
                  >
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                      <md-table-cell md-label="اسم المستند">
                        <a :href="item.url" target="_blank">
                          {{ item.id }}
                        </a>
                      </md-table-cell>
                    </md-table-row>
                  </md-table>
                </div>
              </modal>
            </div>
            <div class="md-layout-item">
              <form>
                <md-card class="p-25">
                  <md-card-content>
                    <div class="md-layout">
                      <div
                        class="md-layout-item md-size-30 ml-15 mt-25"
                        v-if="idTable != ''"
                      >
                        <md-field>
                          <label>الموظف</label>
                          <md-input v-model="fullName" disabled></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-30 ml-15 mtb-25">
                        <md-field>
                          <label>نوع المستند</label>
                          <md-select v-model="DocumentTypeId">
                            <md-option
                              v-for="DocumentType in DocumentType"
                              v-bind:key="DocumentType.id"
                              :value="DocumentType.id"
                              >{{ DocumentType.name }}</md-option
                            >
                          </md-select>
                        </md-field>
                      </div>

                      <div class="md-layout-item md-size-30 ml-15 mtb-25">
                        <md-field>
                          <label>رقم المستند</label>
                          <md-input v-model="number"></md-input>
                        </md-field>
                      </div>

                      <div class="md-layout-item md-size-30 ml-15 mtb-25">
                        <md-field>
                          <label>وصف المستند</label>
                          <md-input v-model="Description"></md-input>
                        </md-field>
                      </div>

                      <div class="md-layout-item md-size-30 mt-25 ml-15">
                        <md-datepicker v-model="DecisionDate" v-if="Isdisation">
                          <label class="mr-28">تاريخ القرار</label>
                        </md-datepicker>
                      </div>
                      <div
                        v-if="HaveExpireDate"
                        class="md-layout-item md-size-30 mt-25 ml-15"
                      >
                        <md-datepicker v-model="ExpireDate">
                          <label class="mr-28">تاريخ الصلاحية</label>
                        </md-datepicker>
                      </div>
                      <div class="md-layout-item md-size-30 mt-25 ml-15">
                        <md-table
                          :value="files"
                          class="paginated-table table-striped table-hover"
                          style="max-height: 150px"
                        >
                          <md-table-row
                            slot="md-table-row"
                            slot-scope="{ item }"
                          >
                            <md-table-cell md-label="اسم المستند">
                              {{ item.name }}
                            </md-table-cell>
                            <md-table-cell md-label>
                              <md-button
                                class="md-just-icon md-danger md-simple"
                                @click.native="deleteRow2(item)"
                              >
                                <md-icon>close</md-icon>
                              </md-button>
                            </md-table-cell>
                          </md-table-row>
                        </md-table>
                      </div>
                      <div
                        class="
                          md-layout-item md-size-100
                          mt-25
                          mtb-25
                          center-content
                        "
                      >
                        <md-button
                          @click="Save_Employee_Documents"
                          class="md-success btn_nanosoft"
                          >حفظ</md-button
                        >
                        <md-button
                          @click="clear_Employee_Documents"
                          class="md-info btn_nanosoft"
                          >جديد</md-button
                        >
                        <md-button class="md-black btn_nanosoft">
                          <label for="file-upload">إضافة ملف</label>
                          <input
                            id="file-upload"
                            type="file"
                            @change="onFileChange"
                            style="display: none; visibility: hidden"
                          />
                        </md-button>
                      </div>
                    </div>
                  </md-card-content>
                </md-card>
              </form>
            </div>
          </div>
        </div>
        <div class="md-layout-item">
          <md-card>
            <md-card-content>
              <div class="md-layout flex-content-left">
                <div class="md-size-15 md-layout-item">
                  <!-- <md-table-toolbar>
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
              </md-table-toolbar> -->
                </div>
              </div>

              <md-table
                :value="queriedData_Employee_Documents"
                class="paginated-table table-striped table-hover mt-25"
              >
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="نوع المستند">
                    {{ item.documentTypeName }}
                  </md-table-cell>

                  <md-table-cell md-label="رقم المستند">
                    {{ item.number }}
                  </md-table-cell>

                  <md-table-cell md-label="وصف المستند">
                    {{ item.description }}
                  </md-table-cell>

                  <md-table-cell md-label="تاريخ القرار">
                    {{
                      item.decisionDate == null
                        ? ""
                        : convert(item.decisionDate)
                    }}
                  </md-table-cell>

                  <md-table-cell md-label="تاريخ الصلاحية">
                    {{
                      item.expireDate == null ? "" : convert(item.expireDate)
                    }}
                  </md-table-cell>
                  <md-table-cell md-label>
                    <md-button
                      class="md-just-icon md-info md-simple"
                      @click.native="
                        showModale = true;
                        tableFiles = [];
                        tableFiles = item.files;
                      "
                    >
                      <md-icon>attachment</md-icon>
                    </md-button>
                    <md-button
                      class="md-just-icon md-warning md-simple"
                      @click.native="handleEdit_Employee_Documents(item)"
                    >
                      <md-icon>dvr</md-icon>
                    </md-button>
                    <md-button
                      class="md-just-icon md-danger md-simple"
                      @click.native="handleDelete_Employee_Documents(item)"
                    >
                      <md-icon>close</md-icon>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-card-content>
            <!-- <md-card-actions md-alignment="space-between">
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
        </md-card-actions> -->
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueHtml2pdf from "vue-html2pdf";
import axios from "../../../../components/service/HTTP";
import modal from "../modal2";
import {
  AtomSpinner,
  HollowDotsSpinner,
  LoopingRhombusesSpinner,
} from "epic-spinners";
import StepProgress from "vue-step-progress";
import "vue-step-progress/dist/main.css";
import { Pagination } from "@/components";
import { ModelListSelect } from "vue-search-select";
import { Collapse } from "@/components";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import moment from "moment";
// import { SlideYDownTransition } from "vue2-transitions";
import state from "../../../../components/service/state";
import { extend } from "vee-validate";
import { required, numeric, regex, confirmed } from "vee-validate/dist/rules";
import "../../../../assets/Fonts/Amiri/Amiri-Regular-normal";
import env from "../../../../../env";
extend("required", required);
extend("numeric", numeric);
extend("regex", regex);
extend("confirmed", confirmed);
export default {
  async created() {
    await this.init();
    if (state.state == true) {
      this.FullName = state.FullName;
      this.NationalNumber = state.NationalNumber;
      this.JobNumber = state.JobNumber;
      this.DepartmentClassificationsId = state.DepartmentClassificationsId;
      this.DepartmentId = state.DepartmentId;
      this.JobType = state.JobType;
      this.ScientificDegreeId = state.ScientificDegreeId;
      this.StartingDateFrom = state.StartingDateFrom;
      this.StartingDateTo = state.StartingDateTo;
      this.SortBy = state.SortBy;
      this.BonusDueDateFilterType = state.BonusDueDateFilterType;
      this.TypeOfEndService = state.TypeOfEndService;
      this.MustRetireSoon = state.MustRetireSoon;
      this.pagination.perPage = state.perPage;
      this.pagination.currentPage = state.currentPage;
      this.Search();
    }
  },
  components: {
    Pagination,
    ModelListSelect,
    VueHtml2pdf,
    Collapse,
    modal,
    AtomSpinner,
    StepProgress,
    // LoopingRhombusesSpinner,
    // HollowDotsSpinner,
    // SlideYDownTransition,
  },
  computed: {
    queriedData() {
      return this.tableData;
    },

    queriedData_Qualifications() {
      return this.tableData_Qualifications;
    },

    queriedData_vacation() {
      return this.tableData_vacation;
    },

    queriedData_Assignment() {
      return this.tableData_Assignment;
    },

    queriedData_Employee_Documents() {
      return this.tableData_Employee_Documents;
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
      return this.pagination.total;
    },
  },
  data() {
    return {
      pdfLoadingActive: false,
      mySteps: ["بدء التحميل", "جارى التحميل", "تم التحميل"],
      currentStep: 1,
      staffReportData: [],
      CurrentReport: "",
      companyName: "",
      companyDesc: "",
      htmlToPdfOptions: {
        margin: [80, 0, 30, 0],
        filename: `Staff Report.pdf`,
        jsPDF: {
          format: "a2",
          orientation: "portrait",
        },
        html2canvas: {
            scale: 1,
            useCORS: true,
            dpi: 300,
            letterRendering: true
        },
      },
      one: true,
      two: false,
      three: false,
      four: false,
      five: false,
      seven: false,
      eight: false,

      show: false,
      searchE: "",
      NationalNumber: "",
      FullName: "",
      JobNumber: "",
      DepartmentClassificationsId: "",
      DepartmentId: "",
      JobType: "",
      ScientificDegreeId: "",
      StartingDateFrom: "",
      StartingDateTo: "",
      SortBy: "0",
      BonusDueDateFilterType: "",
      PageSize: null,
      TypeOfEndService: "",
      MustRetireSoon: false,
      departments: [],
      departmentClassification: "",
      scientificDegrees: "",
      currentSort: "Titel",
      currentSortOrder: "asc",
      footerTable: [
        "Email",
        "Full Name",
        "Is Contractor",
        "Phone",
        "createdAt",
        "Action",
      ],
      idTable: "",
      /// personalInfo

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

      //jobInfo

      Mangers: [],
      departmentsAndUnites: [],
      DepartmentId_jobInfo: "",
      SectionId: "",
      departmentsLoad: [],
      UnitId: "",
      loadUnits: [],
      // employeeId_jobInfo: "",
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
        { yearName: "2021", Sate: 3 },
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
      ScientificDegrees_jobInfo: [],
      State: false,
      id: "",
      fullName: "",
      employmentType: "1",
      // departments_jobInfo: "",
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
      JobNumber_jobInfo: null,
      StartingDate: "",
      MonthlyIncreaseOfVacation: "",
      JobType_jobInfo: "",
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
      ScientificDegreeId_jobInfo: "",
      TheJobAssignedTo: "",
      DelegationEndDate: "",
      CalculateSalariesAndBonus: false,

      //--------FinancialInfo--------//

      fullName_FinancialInfo: "",
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

      //--------Qualifications--------//

      ScientificDegreeId_Qualifications: "",
      ScientificDegrees: [],
      Specialization_Qualifications: "",
      Year: "",
      Place_Qualifications: "",
      tableData_Qualifications: [],
      btn_Qualifications: "new",
      idTable_Qualifications: "",
      fullName_Qualifications: "",

      //--------Vacation--------//

      // fullName_Vacation: "",
      // id: "",
      Type: "",
      From: "",
      To: "",
      Days: "",
      Note: "",
      btn_Vacation: "new",
      idTable_Vacation: "",
      balance: "",
      worth: "",
      tableData_vacation: [],

      //--------Assignment--------//

      DelegatedTo: "",
      From_Assignment: "",
      To_Assignment: "",
      CalculateSalariesAndBonus_Assignment: false,
      btn_Assignment: "new",
      idTable_Assignment: "",
      tableData_Assignment: [],

      //--------Employee Documents--------//

      Isdisation: false,
      showModale: false,
      tableFiles: [],
      // employeeId: "",
      // fullName: "",
      DocumentTypeId: "",
      number: "",
      DecisionDate: null,
      Description: "",
      ExpireDate: null,
      DocumentType: "",
      btn_Employee_Documents: "new",
      files: [],
      idTable_Employee_Documents: "",
      // footerTable: [],
      tableData_Employee_Documents: [],
      HaveExpireDate: "",

      //--------employees--------//

      updateStatus: "",
      employees: [],

      pagination: {
        perPage: 25,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      searchQuery: "",
      propsToSearch: ["Titel", "Severity", "Status"],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
      pdfData: [],
    };
  },
  methods: {
    async beforeDownload({ html2pdf, options, pdfContent }) {
      // const el = document.getElementById("getTtttt").innerText;
      console.warn("elelel ::::", pdfContent.querySelector("h3"));
      
      await html2pdf()
        .set(options)
        .set({pagebreak: {avoid: 'tr'}})
        .from(pdfContent)
        .toPdf()
        .get("pdf")
        .then((pdf) => {
          console.log("===============================");
            console.log(pdf.getFontList());
            console.log("width : " + pdf.internal.pageSize.getWidth())
            console.log("height : " + pdf.internal.pageSize.getHeight())
            console.log(pdf)  
        
          pdf.setFont("Amiri-Regular");
          // pdf.setR2L(true);
          pdf.setLanguage('ar-KW');
          const totalPages = pdf.internal.getNumberOfPages();
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(30);
            pdf.setTextColor(150);
            pdf.text(this.companyName, pdf.internal.pageSize.getWidth() * 0.4, 40, {lang:'ar'})
            pdf.text(this.companyDesc, pdf.internal.pageSize.getWidth() * 0.3, 60, {lang:'ar'})
          }
        })
        .save();
    },
    generateReport() {
      this.pdfLoadingActive = true;
      this.$refs.html2Pdf.generatePdf();
    },
    convert(event) {
      try {
        let d = new Date(event);
        if (isNaN(d.getFullYear()) === true) {
          return "-";
        }
        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      } catch (error) {}
    },
    async pdfSearch() {
      let T = localStorage.getItem("Nannotoken");
      let token = atob(T);

      let result = await axios.get(
        `${env.HR()}/api/hr/employees/filter?FullName=${
          this.FullName
        }&NationalNumber=${this.NationalNumber}&JobNumber=${
          this.JobNumber
        }&DepartmentClassificationsId=${
          this.DepartmentClassificationsId
        }&DepartmentId=${this.DepartmentId}&JobType=${
          this.JobType
        }&ScientificDegreeId=${this.ScientificDegreeId}&StartingDateFrom=${
          this.StartingDateFrom
        }&StartingDateTo=${this.StartingDateTo}&SortBy=${
          this.SortBy
        }&BonusDueDateFilterType=${
          this.BonusDueDateFilterType
        }&TypeOfEndService=${this.TypeOfEndService}&MustRetireSoon=${
          this.MustRetireSoon
        }&PageSize=10000
        `,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      this.pdfData = result.data.data.results;
    },
    async Search() {
      await this.pdfSearch();
      try {
        
        this.tableData = [];
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        let result = await axios.get(
          `${env.HR()}/api/hr/employees/filter?FullName=${
            this.FullName
          }&NationalNumber=${this.NationalNumber}&JobNumber=${
            this.JobNumber
          }&DepartmentClassificationsId=${
            this.DepartmentClassificationsId
          }&DepartmentId=${this.DepartmentId}&JobType=${
            this.JobType
          }&ScientificDegreeId=${this.ScientificDegreeId}&StartingDateFrom=${
            this.StartingDateFrom
          }&StartingDateTo=${this.StartingDateTo}&SortBy=${
            this.SortBy
          }&BonusDueDateFilterType=${
            this.BonusDueDateFilterType
          }&TypeOfEndService=${this.TypeOfEndService}&MustRetireSoon=${
            this.MustRetireSoon
          }&PageSize=${this.pagination.perPage}&currentPage=${
            this.pagination.currentPage
          }`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        this.tableData = result.data.data.results;
        this.pagination.total = result.data.data.total;
        this.SaveState();
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    },
    SaveState() {
      state.state = true;
      state.FullName = this.FullName;
      state.NationalNumber = this.NationalNumber;
      state.JobNumber = this.JobNumber;
      state.DepartmentClassificationsId = this.DepartmentClassificationsId;
      state.DepartmentId = this.DepartmentId;
      state.JobType = this.JobType;
      state.ScientificDegreeId = this.ScientificDegreeId;
      state.StartingDateFrom = this.StartingDateFrom;
      state.StartingDateTo = this.StartingDateTo;
      state.SortBy = this.SortBy;
      state.BonusDueDateFilterType = this.BonusDueDateFilterType;
      state.TypeOfEndService = this.TypeOfEndService;
      state.MustRetireSoon = this.MustRetireSoon;
      state.perPage = this.pagination.perPage;
      state.currentPage = this.pagination.currentPage;
    },

    personalInfo() {
      this.one = true;
      this.two = false;
      this.three = false;
      this.four = false;
      this.five = false;
      this.seven = false;
      this.eight = false;
    },
    jobInfo() {
      this.one = false;
      this.two = true;
      this.three = false;
      this.four = false;
      this.five = false;
      this.seven = false;
      this.eight = false;
    },
    FinancialInfo() {
      this.one = false;
      this.two = false;
      this.three = false;
      this.four = false;
      this.five = false;
      this.seven = false;
      this.eight = true;
    },
    async Qualifications() {
      this.one = false;
      this.two = false;
      this.three = true;
      this.four = false;
      this.five = false;
      this.seven = false;
      this.eight = false;

      if (this.idTable == "") {
        return;
      }

      try {
        let T = localStorage.getItem("Nannotoken");

        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/qualifications?employeeId=${this.idTable}`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        this.tableData_Qualifications = result.data.data.qualifications;
        this.ScientificDegrees = result.data.data.scientificDegrees;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    },

    async vacation() {
      this.one = false;
      this.two = false;
      this.three = false;
      this.four = true;
      this.five = false;
      this.seven = false;
      this.eight = false;

      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        if (this.idTable == "") {
          return;
        }
        let result = await axios.get(
          `${env.HR()}/api/vacation-records?employeeId=${this.idTable}`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        let result_ = await axios.get(
          `${env.HR()}/api/hr/employees/${this.idTable}/vacation-info`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        this.balance = result_.data.data.balance;
        this.worth = result_.data.data.worth;
        this.tableData_vacation = result.data.data;
        this.fullName = localStorage.getItem("name");
      } catch (error) {
        return this.notifyVue("top", "center", "danger", error);
      }
    },

    async Assignment() {
      this.one = false;
      this.two = false;
      this.three = false;
      this.four = false;
      this.five = true;
      this.seven = false;
      this.eight = false;

      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        if (this.idTable == "") {
          return;
        }
        let result = await axios.get(
          `${env.HR()}/api/delegations?employeeId=${this.idTable}`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        this.tableData_Assignment = result.data.data;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    },

    async Employee_Documents() {
      this.one = false;
      this.two = false;
      this.three = false;
      this.four = false;
      this.five = false;
      this.seven = true;
      this.eight = false;

      try {
        this.tableFiles = [];
        this.files = [];
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        if (this.idTable == "") {
          return;
        }

        let result = await axios.get(
          `${env.HR()}/api/employee-documents?employeeId=${this.idTable}`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        this.DocumentType = result.data.data.documentTypes;
        this.tableData_Employee_Documents = result.data.data.documents;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    },

    show_() {
      if (this.show == true) {
        this.show = false;
      } else {
        this.show = true;
      }
      // localStorage.setItem("show", this.show);
    },

    async Save_personalInfo() {
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

        // if (employeeId == "new") {
        //   let result_ = await axios.post(
        //     `${env.HR()}/api/hr/Employees/web`,
        //     form,
        //     {
        //       headers: {
        //         Authorization: "Bearer " + token,
        //         "Content-Type": "multipart/form-data"
        //       }
        //     }
        //   );
        //   this.$router.replace("/pages/employee/info/" + result_.data.data.id);
        //   this.employeeId = result_.data.data.id;
        // } else {
        let result = await axios.put(
          `${env.HR()}/api/hr/employees/${this.idTable}/personal-info/web`,
          form,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // }
        return this.notifyVue("top", "center", "success", " تم الحفظ بنجاح ");
      } catch (error) {
        this.message(error);
      }
    },

    async Save_jobInfo() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        if (
          !this.DepartmentId_jobInfo == "00000000-0000-0000-0000-000000000000"
        ) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء اختيار الإدرات/المكاتب "
          );
        }

        if (!this.JobType_jobInfo) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء اختيار نوع التوظيف "
          );
        }

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
          upgradeDueDate: this.upgradeDueDate,
          ReasonForCurrentGrade: this.ReasonForCurrentGrade,
          scarBonus: this.scarBonus,
          scarDegree: this.scarDegree,
          ShiftId: this.shiftName,
          NumberOfTheYear: this.NumberOfTheYear,
          Efficiency: this.Efficiency,
          NumberOfTheYearTwo: this.NumberOfTheYearTwo,
          EfficiencyTwo: this.EfficiencyTwo,
          NumberOfTheYearThree: this.NumberOfTheYearThree,
          EfficiencyThree: this.EfficiencyThree,
          CurrentSituation: this.CurrentSituation,
          SuspentionNote: this.SuspentionNote,
          JobNumber: this.JobNumber_jobInfo,
          JobTitleId: this.JobTitleID,
          IsPreviousExperiences: this.Exp,
          DirectManagerJobTitleId: this.DirectManagerJobTitleId,
          StartingDate: this.StartingDate,
          MonthlyIncreaseOfVacation: this.MonthlyIncreaseOfVacation,
          JobType: this.JobType_jobInfo,
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
          DepartmentId: this.DepartmentId_jobInfo,
          UnitId: this.UnitId == "" ? null : this.UnitId,
          SectionId: this.SectionId == "" ? null : this.SectionId,
          PreviousEmployer: this.PreviousEmployer,
          ScientificDegreeId: this.ScientificDegreeId_jobInfo,
          TheJobAssignedTo: this.TheJobAssignedTo,
          DelegationEndDate: this.DelegationEndDate,
          CalculateSalariesAndBonus: this.CalculateSalariesAndBonus,
        };
        let result = await axios.put(
          `${env.HR()}/api/hr/employees/${this.idTable}/job-info`,
          schema,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        return this.notifyVue("top", "center", "success", " تم الحفظ بنجاح ");
      } catch (error) {
        this.message(error);
      }
    },

    async Save_FinancialInfo() {
      try {
        let T = localStorage.getItem("Nannotoken");
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
          GetBasicSalaryFromTable: this.GetBasicSalaryFromTable,
        };

        let result = await axios.put(
          `${env.HR()}/api/hr/employees/${this.idTable}/finantial-info`,
          schema,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        return this.notifyVue("top", "center", "success", " تم الحفظ بنجاح ");
      } catch (error) {
        this.message(error);
      }
    },
    async Save_Qualifications() {
      try {
        let T = localStorage.getItem("Nannotoken");

        if (!this.ScientificDegreeId_Qualifications) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال المؤهل العلمي "
          );
        }

        if (!this.Specialization_Qualifications) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال التخصص "
          );
        }

        if (!this.Year) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال سنة الحصول على المؤهل "
          );
        }

        if (!this.Place_Qualifications) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال مكان الحصول على المؤهل "
          );
        }

        let token = atob(T);

        let schema = {
          ScientificDegreeId: this.ScientificDegreeId_Qualifications,
          Specialization: this.Specialization_Qualifications,
          Year: this.Year,
          Place: this.Place_Qualifications,
        };

        if (this.btn_Qualifications === "new") {
          let result = await axios.post(
            `${env.HR()}/api/qualifications/${this.idTable}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
        } else {
          let result = await axios.put(
            `${env.HR()}/api/qualifications/${this.idTable_Qualifications}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
        }
        this.btn_Qualifications = "new";

        try {
          let T = localStorage.getItem("Nannotoken");

          let token = atob(T);
          let result = await axios.get(
            `${env.HR()}/api/qualifications?employeeId=${this.idTable}`,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );

          this.tableData_Qualifications = result.data.data.qualifications;
          this.ScientificDegrees = result.data.data.scientificDegrees;
        } catch (error) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "الرجاء اعادة تسجيل الدخول"
          );
        }

        this.clear_Qualifications();
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

    async Save_vacation() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        if (!this.Type) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال نوع الحركة"
          );
        }

        if (this.Type != "1") {
          if (!this.From || !this.To) {
            return this.notifyVue(
              "top",
              "center",
              "danger",
              "عفواً، الرجاء ادخال التاريخ"
            );
          }
        }

        if (!this.Days) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال الأيام"
          );
        }

        let schema = {
          Type: this.Type,
          From:
            this.Type == "1"
              ? "2022-03-23"
              : moment(this.From).format("YYYY-MM-DD"),
          To:
            this.Type == "1"
              ? "2022-03-23"
              : moment(this.To).format("YYYY-MM-DD"),
          Days: this.Days,
          Note: this.Note,
        };

        if (this.btn_Vacation === "new") {
          let result = await axios.post(
            `${env.HR()}/api/vacation-records/employees/${this.idTable}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
        } else {
          let result = await axios.put(
            `${env.HR()}/api/vacation-records/${this.idTable_Vacation}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
        }

        try {
          let T = localStorage.getItem("Nannotoken");
          let token = atob(T);
          if (this.idTable == "") {
            return;
          }
          let result = await axios.get(
            `${env.HR()}/api/vacation-records?employeeId=${this.idTable}`,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );

          this.tableData_vacation = result.data.data;
        } catch (error) {
          return this.notifyVue("top", "center", "danger", error);
        }

        this.clear_vacation();
        this.btn_Vacation = "new";
        return this.notifyVue("top", "center", "success", " تم الحفظ بنجاح ");
      } catch (error) {
        let result =
          error.response.data.errors[
            Object.keys(error.response.data.errors)[0]
          ];
        return this.notifyVue("top", "center", "danger", result[0]);
      }
    },

    async Save_Assignment() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        if (!this.DelegatedTo) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال الجهة المنتدب إليها"
          );
        }
        if (!this.From_Assignment) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال تاريخ بداية الندب"
          );
        }

        if (!this.To_Assignment) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال تاريخ نهاية الندب"
          );
        }

        let schema = {
          DelegatedTo: this.DelegatedTo,
          From: moment(this.From_Assignment).format("YYYY-MM-DD"),
          To: moment(this.To_Assignment).format("YYYY-MM-DD"),
          CalculateSalariesAndBonus: this.CalculateSalariesAndBonus_Assignment,
        };

        if (this.btn_Assignment === "new") {
          let result = await axios.post(
            `${env.HR()}/api/delegations/${this.idTable}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
        } else {
          let result = await axios.put(
            `${env.HR()}/api/delegations/${this.idTable_Assignment}`,
            schema,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
        }
        this.Assignment();
        this.clear_Assignment();
        this.btn_Assignment = "new";

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

    async Save_Employee_Documents() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        if (!this.DocumentTypeId) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال نوع المستند"
          );
        }

        let form = new FormData();
        form.append("DocumentTypeId", this.DocumentTypeId);
        form.append("Number", this.number);
        form.append(
          "DecisionDate",
          moment(this.DecisionDate).format("YYYY/MM/DD")
        );
        form.append("Description", this.Description);
        form.append("ExpireDate", moment(this.ExpireDate).format("YYYY-MM-DD"));
        form.append(
          "FileName",
          this.files.length === 0 ? [] : this.files[0].name
        );
        for (let index = 0; index < this.files.length; index++) {
          const element = this.files[index];
          form.append("FilesToAdd", element.file);
        }
        if (this.btn_Employee_Documents === "new") {
          let result = await axios.post(
            `${env.HR()}/api/employee-documents/web/${this.idTable}`,
            form,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
        } else {
          let result = await axios.put(
            `${env.HR()}/api/employee-documents/web/${
              this.idTable_Employee_Documents
            }`,
            form,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
        }
        this.Employee_Documents();
        this.clear_Employee_Documents();
        this.btn_Employee_Documents = "new";
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

    clear_Qualifications() {
      this.ScientificDegreeId_Qualifications = "";
      this.ScientificDegrees = [];
      this.Specialization_Qualifications = "";
      this.Year = "";
      this.Place_Qualifications = "";
      this.btn_Qualifications = "new";
    },

    clear_vacation() {
      (this.Type = ""),
        (this.From = null),
        (this.To = null),
        (this.Days = ""),
        (this.Note = "");
      this.btn = "new";
    },

    clear_Assignment() {
      this.DelegatedTo = "";
      this.From_Assignment = null;
      this.To_Assignment = null;
      this.CalculateSalariesAndBonus_Assignment = false;
      this.btn_Assignment = "new";
    },

    clear_Employee_Documents() {
      (this.DocumentTypeId = ""),
        (this.number = ""),
        (this.DecisionDate = null),
        (this.Description = ""),
        (this.ExpireDate = null),
        (this.btn_Employee_Documents = "new");
    },

    Clear() {
      state.state = false;
      this.FullName = "";
      this.NationalNumber = "";
      this.JobNumber = "";
      this.DepartmentClassificationsId = "";
      this.DepartmentId = "";
      this.JobType = "";
      this.ScientificDegreeId = "";
      this.StartingDateFrom = "";
      this.StartingDateTo = "";
      this.SortBy = "";
      this.BonusDueDateFilterType = "";
      this.TypeOfEndService = "";
      this.MustRetireSoon = "";
    },

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      files[0].size;
      if (!files.length) return;
      let schema = {
        name: files[0].name,
        file: files[0],
        id: Math.random(),
        size: files[0].size,
      };
      this.notifyVue("top", "center", "success", "تم رفع الملف بنجاح ");
      return this.files.unshift(schema);
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
    New() {
      this.$router.push("employee/info/new");
    },

    handleEdit_Qualifications(item) {
      (this.btn_Qualifications = "Edit"),
        (this.ScientificDegreeId_Qualifications = item.scientificDegreeId),
        (this.Specialization_Qualifications = item.specialization),
        (this.Year = item.year),
        (this.Place_Qualifications = item.place);
      this.idTable_Qualifications = item.id;
    },

    async handleEdit_vacation(item) {
      (this.Type = item.type),
        (this.From = new Date(item.from)),
        (this.To = new Date(item.to)),
        (this.Days = item.days),
        (this.Note = env.NULL(item.note));
      this.btn_Vacation = "Edit";
      this.idTable_Vacation = item.id;
    },

    handleEdit_Assignment(item) {
      this.DelegatedTo = item.delegatedTo;
      this.From_Assignment = new Date(item.from);
      this.To_Assignment = new Date(item.to);
      this.CalculateSalariesAndBonus_Assignment =
        item.calculateSalariesAndBonus;
      this.idTable_Assignment = item.id;
      this.btn_Assignment = "Edit";
    },

    handleEdit_Employee_Documents(item) {
      this.DocumentTypeId = item.documentTypeId;
      this.number = item.number;
      if (item.decisionDate != null) {
        this.DecisionDate = new Date(item.decisionDate);
      } else {
        this.DecisionDate = "";
      }

      this.Description = env.NULL(item.description);

      if (item.expireDate != null) {
        this.ExpireDate = new Date(item.expireDate);
      } else {
        this.ExpireDate = "";
      }

      this.btn_Employee_Documents = "Edit";
      this.idTable_Employee_Documents = item.id;
    },

    async handleEdit(item) {
      if (this.show == false) {
        this.$router.push("employee/info/" + item.personalInfo.id);
      } else {
        try {
          this.personalInfo();
          let T = localStorage.getItem("Nannotoken");
          let token = atob(T);
          let result = await axios.get(
            `${env.HR()}/api/hr/Employees/${item.personalInfo.id}`,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );

          this.idTable = result.data.data.personalInfo.id;

          /// personalInfo

          this.nid = env.NULL(result.data.data.personalInfo.nationalNumber);
          this.name = env.NULL(result.data.data.personalInfo.firstName);
          this.EnglishName = env.NULL(
            result.data.data.personalInfo.EnglishName
          );
          this.fname = env.NULL(result.data.data.personalInfo.fatherName);
          this.gname = env.NULL(result.data.data.personalInfo.grandFatherName);
          this.lname = env.NULL(result.data.data.personalInfo.lastName);
          this.gender = env.NULL(result.data.data.personalInfo.gender);
          this.NationalityType = env.NULL(
            result.data.data.personalInfo.nationalityType
          );
          this.NationalityId = env.NULL(
            result.data.data.personalInfo.nationalityID
          );
          localStorage.setItem("name", result.data.data.personalInfo.fullName);
          if (result.data.data.personalInfo.visaExpiryDate != null) {
            this.VisaExpiryDate = new Date(
              result.data.data.personalInfo.visaExpiryDate
            );
          }

          this.Address = env.NULL(result.data.data.personalInfo.address);
          this.phone = env.NULL(result.data.data.personalInfo.phone);

          if (result.data.data.personalInfo.birthDate != null) {
            this.date = new Date(result.data.data.personalInfo.birthDate);
          }
          this.Place = env.NULL(result.data.data.personalInfo.birthPlace);
          this.mother = env.NULL(result.data.data.personalInfo.motherName);
          this.Status = env.NULL(result.data.data.personalInfo.socialStatus);
          this.wife_name = env.NULL(result.data.data.personalInfo.nameMarried);
          this.Nationality = result.data.data.personalInfo.nationalityMarried;
          this.children = result.data.data.personalInfo.childerCount;
          this.email = env.NULL(result.data.data.personalInfo.email);
          this.Register = env.NULL(
            result.data.data.personalInfo.bookletCivilRegister
          );
          this.numberID = env.NULL(
            result.data.data.personalInfo.bookletRegistrationFamilyNumber
          );
          this.numberPage = env.NULL(
            result.data.data.personalInfo.bookletFamilyNumber
          );
          if (result.data.data.personalInfo.bookletIssueDate != null) {
            this.dateCardF = new Date(
              result.data.data.personalInfo.bookletIssueDate
            );
          }
          this.placeCardF = env.NULL(
            result.data.data.personalInfo.bookletIssuePlace
          );
          this.numberBook = env.NULL(
            result.data.data.personalInfo.bookletNumber
          );

          this.idCard = env.NULL(
            result.data.data.personalInfo.identificationCardNumber
          );
          if (
            result.data.data.personalInfo.identificationCardIssueDate != null
          ) {
            this.dateCard = new Date(
              result.data.data.personalInfo.identificationCardIssueDate
            );
          }
          this.placeCard = env.NULL(
            result.data.data.personalInfo.identificationCardIssuePlace
          );

          this.numberAuto = env.NULL(
            result.data.data.personalInfo.passportAutoNumber
          );
          if (result.data.data.personalInfo.passportIssueDate != null) {
            this.datePassport = new Date(
              result.data.data.personalInfo.passportIssueDate
            );
          }
          this.placePassport = env.NULL(
            result.data.data.personalInfo.passportIssuePlace
          );
          this.IDPassport = env.NULL(
            result.data.data.personalInfo.passportNumber
          );

          //----------------jobInfo-----------------//

          this.ScientificDegreeYear =
            result.data.data.jobInfo.scientificDegreeYear == null
              ? null
              : result.data.data.jobInfo.scientificDegreeYear.split("T")[0];
          this.Specialization = result.data.data.jobInfo.specialization;
          this.upgradeDueDate = result.data.data.jobInfo.upgradeDueDate;

          this.ReasonForCurrentGrade =
            result.data.data.jobInfo.reasonForCurrentGrade;
          this.scarDegreeDate =
            result.data.data.jobInfo.scarDegreeDate == null
              ? null
              : result.data.data.jobInfo.scarDegreeDate.split("T")[0];
          this.departments = result.data.data.jobInfo.departments;
          this.shifts = result.data.data.jobInfo.shifts;
          this.scarBonus = result.data.data.jobInfo.scarBonus;
          this.causeOfScarring = result.data.data.jobInfo.causeOfScarring;
          this.parintDepartmentName =
            result.data.data.jobInfo.parintDepartmentName;
          this.ScientificAppointmentYear =
            result.data.data.jobInfo.scientificAppointmentYear == null
              ? ""
              : result.data.data.jobInfo.scientificAppointmentYear.split(
                  "T"
                )[0];
          this.DesignationDecisionNumber =
            result.data.data.jobInfo.DesignationDecisionNumber;
          this.Appointment = result.data.data.jobInfo.appointment;
          this.JobStatusAppointment =
            result.data.data.jobInfo.jobStatusAppointment;
          this.ScientificAppointment =
            result.data.data.jobInfo.scientificAppointment;
          this.SpecializationAppointment =
            result.data.data.jobInfo.specializationAppointment;
          this.SourceScientific = result.data.data.jobInfo.sourceScientific;
          this.CertificateProviderOrganization =
            result.data.data.jobInfo.certificateProviderOrganization;
          this.GradeAppointment = result.data.data.jobInfo.gradeAppointment;
          this.scarDegree = result.data.data.jobInfo.scarDegree;
          this.EMp = result.data.data.jobInfo.job;
          this.IsManager2 = result.data.data.jobInfo.IsManager;
          this.EmPNumber = result.data.data.jobInfo.profileNumber;
          (this.PlaceWorking = result.data.data.jobInfo.workplace),
            (this.shiftName = result.data.data.jobInfo.shiftId);
          this.JobTitle = result.data.data.jobInfo.nationalNumber;
          this.SuspentionNote = result.data.data.jobInfo.suspentionNote;
          this.JobTitleID = result.data.data.jobInfo.jobTitleId;
          this.CurrentSituation = result.data.data.jobInfo.currentSituation;
          this.fullName = result.data.data.jobInfo.fullName;
          this.JobNumber_jobInfo = result.data.data.jobInfo.jobNumber;
          this.Exp = result.data.data.jobInfo.isPreviousExperiences;
          if (result.data.data.jobInfo.startingDateAtWork != null) {
            this.StartingDateAtWork = new Date(
              result.data.data.jobInfo.startingDateAtWork
            );
          }

          this.DateTransfer =
            result.data.data.jobInfo.dateTransfer == null
              ? ""
              : result.data.data.jobInfo.dateTransfer.split("T")[0];
          this.jobDate =
            result.data.data.jobInfo.jobDate == null
              ? ""
              : result.data.data.jobInfo.jobDate.split("T")[0];
          if (result.data.data.jobInfo.startingDate != null) {
            this.StartingDate =
              result.data.data.jobInfo.startingDate.split("T")[0];
          }
          this.MonthlyIncreaseOfVacation =
            result.data.data.jobInfo.monthlyIncreaseOfVacation;
          this.JobType_jobInfo = result.data.data.jobInfo.jobType;
          this.DirectManagerJobTitleId =
            result.data.data.jobInfo.directManagerJobTitleId;
          this.IsManager = result.data.data.jobInfo.isManager;
          this.StartingGrade = result.data.data.jobInfo.startingGrade;
          this.StartingBonus = result.data.data.jobInfo.startingBonus;
          this.CurrentGrade = result.data.data.jobInfo.currentGrade;
          this.CurrentBonus = result.data.data.jobInfo.currentBonus;
          this.DepartmentId_jobInfo = result.data.data.jobInfo.departmentId;
          setTimeout(() => {
            this.SectionId = result.data.data.jobInfo.sectionId;
            this.UnitId = result.data.data.jobInfo.unitId;
          }, 1000);

          this.Efficiency = result.data.data.jobInfo.efficiency;
          this.EfficiencyTwo = result.data.data.jobInfo.efficiencyTwo;
          this.EfficiencyThree = result.data.data.jobInfo.efficiencyThree;
          if (result.data.data.jobInfo.lastGradeUpdate != null) {
            this.LastGradeUpdate =
              result.data.data.jobInfo.lastGradeUpdate.split("T")[0];
          }
          if (result.data.data.jobInfo.lastBonusUpdate != null) {
            this.LastBonusUpdate = new Date(
              result.data.data.jobInfo.lastBonusUpdate
            );
          }
          if (result.data.data.jobInfo.bonusDueDate != null) {
            this.BonusDueDate = result.data.data.jobInfo.bonusDueDate;
          }

          this.Notes = result.data.data.jobInfo.notes;

          if (result.data.data.jobInfo.employmentDate != null) {
            this.EmploymentDate = new Date(
              result.data.data.jobInfo.employmentDate
            );
          }
          this.DesignationDecisionNumber = env.NULL(
            result.data.data.jobInfo.designationDecisionNumber
          );
          this.DesignationIssuer = env.NULL(
            result.data.data.jobInfo.designationIssuer
          );
          if (result.data.data.jobInfo.contractDateFrom != null) {
            this.ContractDateFrom = new Date(
              result.data.data.jobInfo.contractDateFrom
            );
          }

          if (result.data.data.jobInfo.contractDateTo != null) {
            this.ContractDateTo = new Date(
              result.data.data.jobInfo.contractDateTo
            );
          }
          (this.PreviousEmployer = env.NULL(
            result.data.data.jobInfo.previousEmployer
          )),
            (this.ScientificDegreeId_jobInfo = env.NULL(
              result.data.data.jobInfo.scientificDegreeId
            )),
            (this.TheJobAssignedTo = env.NULL(
              result.data.data.jobInfo.theJobAssignedTo
            ));
          if (result.data.data.jobInfo.delegationEndDate != null) {
            this.DelegationEndDate = new Date(
              result.data.data.jobInfo.delegationEndDate
            );
          }
          this.CalculateSalariesAndBonus =
            result.data.data.jobInfo.calculateSalariesAndBonus;
          this.State =
            result.data.data.jobInfo.jobDescription == 1 ? "true" : "false";

          if (
            this.causeOfScarring != null ||
            this.scarDegree != null ||
            this.EmploymentDate != ""
          ) {
            this.sttt = true;
          }

          //--------FinancialInfo--------//

          this.Bank = result.data.data.financialInfo.banks;
          this.fullName_FinancialInfo = result.data.data.financialInfo.fullName;
          (this.FileNumber = result.data.data.financialInfo.fileNumber),
            (this.FinancialNumber =
              result.data.data.financialInfo.financialNumber),
            (this.SalaryPercentage =
              result.data.data.financialInfo.salaryPercentage),
            (this.BankId = result.data.data.financialInfo.bankId),
            (this.BankBranchId = result.data.data.financialInfo.bankBranchId),
            (this.AccountNumber = result.data.data.financialInfo.accountNumber),
            (this.SecurityNumber =
              result.data.data.financialInfo.securityNumber),
            (this.WarrantyType = result.data.data.financialInfo.warrantyType),
            (this.PaymentMethod =
              result.data.data.financialInfo.salaryPaymentMethod),
            (this.FamilyAllowance =
              result.data.data.financialInfo.familyAllowance),
            (this.LeadershipAllowance =
              result.data.data.financialInfo.leadershipAllowance),
            (this.SupervisionAllowance =
              result.data.data.financialInfo.supervisionAllowance),
            (this.StandingCommitteAllowance =
              result.data.data.financialInfo.standingCommitteAllowance),
            (this.CommitteAllowance =
              result.data.data.financialInfo.committeAllowance),
            (this.DelegationAllowance =
              result.data.data.financialInfo.delegationAllowance),
            (this.TotalWorktime = result.data.data.financialInfo.totalWorktime),
            (this.BasicSalary = result.data.data.financialInfo.basicSalary),
            (this.GetWorktimeFromTimesheet =
              result.data.data.financialInfo.getWorktimeFromTimesheet),
            (this.GetBasicSalaryFromTable =
              result.data.data.financialInfo.getBasicSalaryFromTable);
          this.FinancialDegree = result.data.data.financialInfo.financialDegree;
          this.FinancialBonuse = result.data.data.financialInfo.financialBonuse;

          //--------Qualifications--------//

          this.fullName_Qualifications =
            result.data.data.financialInfo.fullName;
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
    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(`${env.HR()}/api/hr/employees/new`, {
          headers: { Authorization: "Bearer " + token },
        });
        this.departments = result.data.data.departments;
        this.departmentClassification =
          result.data.data.departmentClassifications;
        this.scientificDegrees = result.data.data.scientificDegrees;
        this.employees = result.data.data.employees;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    },

    //--------- jopInfo------------//

    async JobTitles() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let id = "";
        if (this.DepartmentId_jobInfo) {
          id = this.DepartmentId_jobInfo;
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
              headers: { Authorization: "Bearer " + token },
            }
          );
          this.JobTitle = result_JobTitle.data.data;

          let resultMangers = await axios.get(
            `${env.HR()}/api/JobTitle/${id}/LoadDirectManagerJobTitles`,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
          this.Mangers = resultMangers.data.data;
        }
      } catch (error) {
        return this.notifyVue("top", "center", "danger", error);
      }
    },

    clear_SectionId() {
      this.SectionId = "";
    },

    clear_UnitId() {
      this.UnitId = "";
    },

    handleDelete_Qualifications(item) {
      Swal.fire({
        title: "هل انت متأكد؟",
        text: ` سيتم حذف   ${item.scientificDegreeName} من النظام هل انت متأكد`,
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
              `${env.HR()}/api/qualifications/${item.id}`,
              {
                headers: { Authorization: "Bearer " + token },
              }
            );

            try {
              let T = localStorage.getItem("Nannotoken");

              let token = atob(T);
              let result = await axios.get(
                `${env.HR()}/api/qualifications?employeeId=${this.idTable}`,
                {
                  headers: { Authorization: "Bearer " + token },
                }
              );

              this.tableData_Qualifications = result.data.data.qualifications;
              this.ScientificDegrees = result.data.data.scientificDegrees;
            } catch (error) {
              return this.notifyVue(
                "top",
                "center",
                "danger",
                "الرجاء اعادة تسجيل الدخول"
              );
            }

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

    handleDelete_vacation(item) {
      Swal.fire({
        text: "سيتم الحذف هل انت متأكد ؟",
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
              `${env.HR()}/api/vacation-records/${item.id}`,
              {
                headers: { Authorization: "Bearer " + token },
              }
            );

            try {
              let T = localStorage.getItem("Nannotoken");
              let token = atob(T);
              if (this.idTable == "") {
                return;
              }
              let result = await axios.get(
                `${env.HR()}/api/vacation-records?employeeId=${this.idTable}`,
                {
                  headers: { Authorization: "Bearer " + token },
                }
              );

              this.tableData_vacation = result.data.data;
            } catch (error) {
              return this.notifyVue("top", "center", "danger", error);
            }
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

    handleDelete_Assignment(item) {
      Swal.fire({
        text: "سيتم الحذف هل انت متأكد ؟",
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
              `${env.HR()}/api/delegations/${item.id}`,
              {
                headers: { Authorization: "Bearer " + token },
              }
            );

            this.Assignment();
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

    handleDelete_Employee_Documents(item) {
      Swal.fire({
        text: "سيتم الحذف هل انت متأكد ؟",
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
              `${env.HR()}/api/employee-documents/${item.id}`,
              {
                headers: { Authorization: "Bearer " + token },
              }
            );

            this.Employee_Documents();

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

    handleDelete(item) {
      Swal.fire({
        text: "سيتم الحذف هل انت متأكد ؟",
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
              `${env.HR()}/api/hr/employees/${item.personalInfo.id}`,
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
    deleteRow(item) {
      let indexToDelete = this.tableData.findIndex(
        (tableRow) => tableRow.id === item.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    },
    deleteRow2(item) {
      let indexToDelete = this.files.findIndex(
        (tableRow) => tableRow.id === item.id
      );
      if (indexToDelete >= 0) {
        this.files.splice(indexToDelete, 1);
      }
    },
    staffReport() {
      let T = localStorage.getItem("Nannotoken");
      let token = atob(T);

      axios
        .get(`${env.HR()}/api/employeesReport/GetEmployeeList`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.staffReportData = res.data.data;
        });
    },
    progressPdf(event) {
      event == 70 ? setTimeout(() => (this.currentStep = 1), 3000) : "";
      event == 100 ? (this.currentStep = 2) : "";
      event == 100
        ? setTimeout(() => (this.pdfLoadingActive = false), 500)
        : "";
      event == 100 ? setTimeout(() => (this.currentStep = 0), 600) : "";
    },
    async getCompanyInfo() {
      let T = localStorage.getItem("Nannotoken");
      let token = atob(T);
      let resultOne2 = await axios.get(`${env.HR()}/api/companyinfos`, {
        headers: { Authorization: "Bearer " + token },
      });

      this.companyName = resultOne2.data.data.fullName;
      this.companyDesc = resultOne2.data.data.shortName;
    },
  },
  mounted() {
    this.staffReport();
    this.getCompanyInfo();
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["Titel", "SystemVersion"],
      threshold: 0.3,
    });
  },

  watch: {
    "pagination.perPage"() {
      this.Search();
    },
    "pagination.currentPage"() {
      this.Search();
    },
    tableData(newer) {},
    //--------- jopInfo------------//

    async DepartmentId_jobInfo() {
      try {
        this.SectionId = "";
        this.UnitId = "";
        if (!this.DepartmentId_jobInfo) {
          return;
        }
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/departments/${this.DepartmentId_jobInfo}/load`,
          {
            headers: { Authorization: "Bearer " + token },
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
            headers: { Authorization: "Bearer " + token },
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

    CurrentSituation() {
      if (this.CurrentSituation == "2" || this.CurrentSituation == "3") {
        this.currentSituationTrue = true;
      } else {
        this.currentSituationTrue = false;
      }
    },

    //--------FinancialInfo--------//

    async BankId() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result_BankBranch = await axios.get(
          `${env.HR()}/api/bank-branches/load/${this.BankId}`,
          {
            headers: { Authorization: "Bearer " + token },
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
    },

    async DocumentTypeId() {
      try {
        for (var i = 0; i < this.DocumentType.length; i++) {
          if (this.DocumentType[i].id == this.DocumentTypeId) {
            this.HaveExpireDate = this.DocumentType[i].haveExpireDate;
            this.Isdisation = this.DocumentType[i].isDecision;
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
  },
};
</script>
<style>
.mt-37 {
  margin-top: 37px;
}

.ui.selection.dropdown {
  min-height: 14px;
  margin-top: 0px;
}

.md-table-cell-container {
  width: 100% !important;
  /* text-align: center !important; */
}

thead tr th {
  text-align: start !important;
  margin-right: -30px !important;
  padding-left: 0 !important;
}

.excel-container {
  border: 0 !important;
  background: 0 !important;
}

.excel-container button {
  margin: 0 !important;
}

/* .margin-container td {
  margin-right: 30px !important;
} */

.jobNumber .md-table-cell-container {
  position: relative;
}

.overlay-pdf {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.head-loading-pdf {
  color: #4caf50;
  font-weight: bold;
}

.step-progress__wrapper-after {
  transform-origin: right center !important;
}

.custome-paginated-table .md-table-cell {
  /* text-align: center !important; */
}

.custome-paginated-table .md-table-head .md-table-head-container {
  text-align: center !important;
}

.custome-paginated-table .md-table-cell p {
  width: 100%;
  text-align: center;
  margin-right: 10px !important;
}

#getTtttt {
  font-family: "Almarai", sans-serif !important;
}

.pdf-container table {
  width: 1190pt;
}

/* .pdfLoading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
} */

@import url('https://fonts.googleapis.com/css2?family=Tajawal&display=swap');

#testfont {
  font-family: 'Tajawal';
}

</style>
