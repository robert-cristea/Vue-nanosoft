<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <modal
          v-if="showModalsorce"
          @close="
            showModalsorce = false;
            SourceT = Source;
          "
        >
          <h3 slot="header"></h3>
          <div slot="body">
            <div class="md-layout-item md-size-100 ml-15 mt-25">
              <md-field
                :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
              >
                <label>سبب الإيقاف</label>
                <md-input v-model="SuspentionNote"></md-input>
              </md-field>
            </div>
          </div>
          <div slot="footer">
            <md-button @click="showModalsorce = false" class="md-danger"
              >الغاء</md-button
            >
            <md-button
              style="margin-right: 32px"
              @click="suspend"
              class="md-success"
              >متابعة</md-button
            >
          </div>
        </modal>

        <md-card>
          <md-card-header class="md-card-header-text md-card-header-green">
            <div class="card-text">
              <h4 class="title">البحث عن المرتبات المحتسبة</h4>
            </div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout">
              <!-- <div class="md-layout-item md-size-30 mt-25 ml-15">
                <md-datepicker v-model="MounthDate">
                  <label class="mr-28">شهر المرتب</label>
                </md-datepicker>
              </div> -->
              <div
                class="md-layout-item md-layout-item-time md-size-30 ml-15"
                style="position: relative"
              >
                <h4 class="monthly-picker-head" :class="{ active: MounthDate }">
                  شهر المرتب
                </h4>
                <vue-monthly-picker
                  class="monthly-picker"
                  alignment="right"
                  v-model="MounthDate"
                />
              </div>

              <div class="md-layout-item md-size-30 mt-25 ml-15">
                <md-datepicker v-model="PaymentDate">
                  <label class="mr-28">تاريخ الصرف </label>
                </md-datepicker>
              </div>

              <div class="md-layout-item md-size-30 ml-15 mt-25">
                <model-list-select
                  class="input-must-rtl"
                  :list="employees"
                  v-model="EmployeeId_shearch"
                  option-value="key"
                  option-text="value"
                  placeholder="الموظف"
                >
                </model-list-select>
              </div>

              <div class="md-layout-item md-size-30 ml-15 mt-25">
                <md-field>
                  <label>تصنيف الفروع</label>
                  <md-select v-model="ClassificationsId">
                    <md-option
                      v-for="dep in departmentClassifications"
                      v-bind:key="dep.id"
                      :value="dep.id"
                      >{{ dep.name }}</md-option
                    >
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout-item md-size-30 ml-15 mt-25">
                <md-field>
                  <label>الإدارة/المكتب</label>
                  <md-select v-model="Administration">
                    <md-option
                      v-for="departments in departments"
                      v-bind:key="departments.id"
                      :value="departments.id"
                      >{{ departments.name }}</md-option
                    >
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout-item md-size-30 ml-15 mt-25">
                <md-field>
                  <label>القسم/المشروع</label>
                  <md-select v-model="Section">
                    <md-option
                      v-for="depa_S in departments_Section"
                      v-bind:key="depa_S.id"
                      :value="depa_S.id"
                      >{{ depa_S.name }}</md-option
                    >
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout-item md-size-30 ml-15 mtb-25">
                <md-field>
                  <label>حالة المرتب</label>

                  <md-select v-model="SalaryStatus_search">
                    <md-option value="1">في الإحتساب</md-option>
                    <md-option value="2">إعتماد الإحتساب</md-option>
                    <md-option value="3">في الإفراج</md-option>
                    <md-option value="4">إفراج</md-option>
                    <md-option value="5">مغلق</md-option>
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout-item md-size-30 ml-15 mtb-25">
                <md-field>
                  <label>موقوف</label>
                  <md-select v-model="isSuspended">
                    <md-option value="true">نعم</md-option>
                    <md-option value="false">لا</md-option>
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout-item md-size-30 ml-15 mtb-25">
                <md-field>
                  <label>عدد النتائج</label>

                  <md-select v-model="PageSize">
                    <md-option value="000">All</md-option>
                    <md-option value="25">25</md-option>
                    <md-option value="50">50</md-option>
                    <md-option value="75">75</md-option>
                    <md-option value="100">100</md-option>
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout-item md-size-25 mt-25 center-content">
                <md-checkbox @click="show_" v-model="show"
                  >عرض تفاصيل المرتب</md-checkbox
                >
              </div>

              <div
                class="md-layout-item md-size-100 mt-25 mtb-25 center-content"
              >
                <md-button @click="Search" class="md-success btn_nanosoft"
                  >بحث</md-button
                >

                <md-button @click="close_month" class="md-danger btn_nanosoft"
                  >اغلاق الشهر</md-button
                >

                <md-button
                  v-if="show == true"
                  v-show="linkingByAccounting"
                  @click="calculated"
                  class="md-success btn_nanosoft"
                  >اعتماد الإحتساب</md-button
                >

                <md-button
                  v-if="show == true"
                  v-show="linkingByAccounting"
                  @click="returncalculated"
                  class="md-danger btn_nanosoft"
                  >الغاء الإعتماد</md-button
                >

                <md-button
                  v-if="show == true"
                  @click="tracking"
                  class="md-danger btn_nanosoft"
                  >ايقاف</md-button
                >

                <md-button
                  v-if="show == true"
                  @click="release"
                  class="md-success btn_nanosoft"
                  >افراج</md-button
                >
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>

    <div v-if="show == false" class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-text md-card-header-green">
          <div class="card-text">
            <h4 class="title">اعتماد المرتبات</h4>
          </div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout" v-if="show == false">
            <div class="md-layout-item md-size-100 mt-25 mtb-25 center-content">
              <md-button
                v-show="linkingByAccounting"
                @click="calculated"
                class="md-success btn_nanosoft"
                >اعتماد الإحتساب</md-button
              >

              <md-button
                v-show="linkingByAccounting"
                @click="returncalculated"
                class="md-danger btn_nanosoft"
                >الغاء الإعتماد</md-button
              >

              <md-button @click="tracking" class="md-danger btn_nanosoft"
                >ايقاف</md-button
              >

              <md-button @click="release" class="md-success btn_nanosoft"
                >افراج</md-button
              >
            </div>
          </div>

          <div class="md-layout flex-content-left">
            <div class="md-size-15 md-layout-item">
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

          <div v-show="show_select" class="md-layout ">
            <div class="md-layout-item md-size-100">
              <md-checkbox @change="selectAll" v-model="All"
                >اختيار الكل</md-checkbox
              >
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
              <md-table-cell>
                <div class="md-layout-item md-size-20 center-content">
                  <md-checkbox
                    v-model="item.isActive"
                    @change="add(item)"
                  ></md-checkbox>
                </div>
              </md-table-cell>

              <md-table-cell
                @click.native="handleEdit(item)"
                md-label="رقم الملاك الوظيفي"
                >{{ item.jobNumber }}</md-table-cell
              >

              <md-table-cell
                @click.native="handleEdit(item)"
                md-label="الإسم الرباعي"
                >{{ item.employeeName }}</md-table-cell
              >

              <md-table-cell
                @click.native="handleEdit(item)"
                md-label="الوحدة التنظيمية"
                >{{ item.departmentName }}</md-table-cell
              >

              <md-table-cell
                @click.native="handleEdit(item)"
                v-if="item.salaryState == '0'"
                md-label="حالة المرتب"
              >
              </md-table-cell>

              <md-table-cell
                @click.native="handleEdit(item)"
                v-if="item.salaryState == '1'"
                md-label="حالة المرتب"
              >
                في الإحتساب
              </md-table-cell>

              <md-table-cell
                @click.native="handleEdit(item)"
                v-if="item.salaryState == '2'"
                md-label="حالة المرتب"
              >
                إعتماد الإحتساب
              </md-table-cell>

              <md-table-cell
                @click.native="handleEdit(item)"
                v-if="item.salaryState == '3'"
                md-label="حالة المرتب"
              >
                في الإفراج
              </md-table-cell>

              <md-table-cell
                @click.native="handleEdit(item)"
                v-if="item.salaryState == '4'"
                md-label="حالة المرتب"
              >
                إفراج
              </md-table-cell>

              <md-table-cell
                @click.native="handleEdit(item)"
                v-if="item.salaryState == '5'"
                md-label="حالة المرتب"
              >
                مغلق
              </md-table-cell>

              <md-table-cell
                @click.native="handleEdit(item)"
                md-label="المرتب الأساسي"
                >{{ item.basicSalary }}</md-table-cell
              >

              <md-table-cell
                @click.native="handleEdit(item)"
                md-label="موقوف"
                >{{ item.isSuspended == false ? "لا" : "نعم" }}</md-table-cell
              >

              <md-table-cell
                @click.native="handleEdit(item)"
                md-label="معدل/غير معدل"
                >{{
                  item.isModified == false ? "غير معدل" : "معدل"
                }}</md-table-cell
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
    <!------------ btn ------------------>

    <div
      v-if="show == true"
      class="md-layout-item md-size-100 mt-30 center-content"
    >
      <md-button
        @click="changeActiveCard('one')"
        class="btn_nanosoft"
        :class="{ 'md-success': one }"
        >البيانات المالية</md-button
      >
      <md-button
        @click="changeActiveCard('two')"
        class="btn_nanosoft"
        :class="{ 'md-success': two }"
        >العلاوات والمكافآت</md-button
      >
      <md-button
        @click="changeActiveCard('three')"
        class="btn_nanosoft"
        :class="{ 'md-success': three }"
        >العمل الإضافي</md-button
      >

      <md-button
        @click="changeActiveCard('four')"
        class="btn_nanosoft"
        :class="{ 'md-success': four }"
        >أخرى</md-button
      >

      <md-button
        @click="changeActiveCard('five')"
        class="btn_nanosoft"
        :class="{ 'md-success': five }"
        >الخصميات</md-button
      >

      <md-button
        @click="changeActiveCard('seven')"
        class="btn_nanosoft"
        :class="{ 'md-success': seven }"
        >الإجماليات</md-button
      >
    </div>

    <!------------ details ------------------>
    <div v-if="show == true" class="md-layout">
      <div
        class="md-layout-item md-xlarge-size-30 md-large-size-30 md-medium-size-30"
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

            <div v-show="show_select" class="md-layout ">
              <div class="md-layout-item md-size-100">
                <md-checkbox @change="selectAll" v-model="All"
                  >اختيار الكل</md-checkbox
                >
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
                <md-table-cell>
                  <div class="md-layout-item md-size-20 center-content">
                    <md-checkbox
                      v-model="item.isActive"
                      @change="add(item)"
                    ></md-checkbox>
                  </div>
                </md-table-cell>

                <md-table-cell
                  @click.native="handleEdit(item)"
                  md-label="الإسم الرباعي"
                  >{{ item.employeeName }}</md-table-cell
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
            <div class="footer-table md-table">
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
            </div>
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

      <!-- First card -->
      <div
        class="md-layout-item md-xlarge-size-70  md-large-size-70 md-medium-size-70"
      >
        <div class="md-layout" v-if="one">
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>شهر المرتب</label>
                        <md-input disabled v-model="MonthDate_d"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>رقم الملاك الوظيفي</label>
                        <md-input disabled v-model="JobNumber"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>الإسم</label>
                        <md-input disabled v-model="EmployeeName"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>رقم الملف المالي</label>
                        <md-input disabled v-model="FileNumber"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>اسم المصرف</label>
                        <md-input disabled v-model="BankName"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>اسم الفرع</label>
                        <md-input disabled v-model="BankBranchName"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>رقم الحساب</label>
                        <md-input disabled v-model="AccountNumber"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>المرتب الأساسي</label>
                        <md-input disabled v-model="BasicSalary"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>المرتب الأساسي المحال من المالية</label>
                        <md-input v-model="NewBasicSalary"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>نسبة خصم الراتب</label>
                        <md-input v-model="SalaryPercentage"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>ساعات العمل</label>
                        <md-input disabled v-model="WorkHours"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>ساعات الحضور</label>
                        <md-input disabled v-model="PresentHours"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>الدرجة الحالية</label>
                        <md-input disabled v-model="Degree"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>العلاوة الحالية</label>
                        <md-input disabled v-model="Bonus"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
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
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>العلاوة المالية</label>
                        <md-input disabled v-model="FinancialBonuse"></md-input>
                      </md-field>
                    </div>

                    <div
                      class="md-layout-item md-size-100 mt-25 center-content"
                    >
                      <md-button @click="Save" class="md-success btn_nanosoft"
                        >حفظ</md-button
                      >
                      <md-button class="md-info btn_nanosoft">طباعة</md-button>
                    </div>
                  </div>
                </md-card-content>
              </form>
            </md-card>
          </div>
        </div>

        <div class="md-layout" v-if="two">
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>{{ all.typesBonuse }}</label>
                        <md-input disabled v-model="all.value"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mb-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>اجمالي العلاوات</label>
                        <md-input disabled v-model="SumAllownce"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mb-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>مكافأة خاضعة للجهاد</label>
                        <md-input v-model="JihadTaxableReward"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mb-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
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

        <div class="md-layout" v-if="three">
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>ساعات الإضافي العادي</label>
                        <md-input disabled v-model="NormalOvertime"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>قيمة العمل الإضافي العادي</label>
                        <md-input
                          disabled
                          v-model="NormalOvertimeValue"
                        ></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>ساعات الإضافي الممتاز</label>
                        <md-input
                          disabled
                          v-model="ExcellentOvertime"
                        ></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
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

        <div class="md-layout" v-if="four">
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>ساعات الغياب</label>
                        <md-input v-model="AbsencHours"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
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

        <div class="md-layout" v-if="five">
          <div class="md-layout-item">
            <md-card>
              <md-card-header class="md-card-header-text md-card-header-green">
                <div class="card-text">
                  <h4 class="title">الخصميات</h4>
                </div>
              </md-card-header>
              <form>
                <md-card-content>
                  <div class="md-layout">
                    <div class="md-layout-item md-size-30 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>قيمة الإستقطاعات</label>
                        <md-input v-model="PremiumAdvance"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>حصة الضمان</label>
                        <md-input disabled v-model="WarrantyTax"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>حصة التضامن</label>
                        <md-input disabled v-model="SolidarityTax"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>حصة الجهاد</label>
                        <md-input disabled v-model="JihadTax"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>حصة جهة العمل</label>
                        <md-input disabled v-model="EmployerTax"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>مرتب مقدم</label>
                        <md-input v-model="PrepaidSalary"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
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

        <div class="md-layout" v-if="seven">
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
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>اجمالي الخصميات</label>
                        <md-input disabled v-model="TotalDiscounts"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>اجمالي الفروقات</label>
                        <md-input v-model="Differences"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>اجمالي المرتب</label>
                        <md-input disabled v-model="TotalSalary"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>الراتب الخاضع للضريبة</label>
                        <md-input disabled v-model="TaxableSalary"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>صافي المرتب</label>
                        <md-input disabled v-model="NetSalary"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>ملاحظة</label>
                        <md-input v-model="Note"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-size-30 mt-25 ml-15">
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <label>ملاحظة الخصميات</label>
                        <md-input v-model="DiscountsNote"></md-input>
                      </md-field>
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
    </div>
  </div>
</template>

<script>
import axios from "../../../../components/service/HTTP";
import { Tabs } from "@/components";
import { Pagination } from "@/components";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import moment from "moment";
import { ModelListSelect } from "vue-search-select";
// import { SlideYDownTransition } from "vue2-transitions";
// import { extend } from "vee-validate";
// import { required, numeric, regex, confirmed } from "vee-validate/dist/rules";
import env from "../../../../../env";
import Modal from "../modal.vue";
// extend("required", required);
// extend("numeric", numeric);
// extend("regex", regex);
// extend("confirmed", confirmed);
export default {
  async created() {
    this.init();
  },
  components: {
    Pagination,
    ModelListSelect,
    Modal
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
      one: true,
      two: false,
      three: false,
      four: false,
      five: false,
      seven: false,

      All: false,
      show: false,
      show_select: false,
      idTable: "",

      MonthDate_d: "",
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

      EmployeeId_shearch: "",
      ClassificationsId: "",
      Administration: "",
      Section: "",
      DeparatmentId: "",
      MounthDate: "",
      PaymentDate: null,
      IsTimeSheet: false,
      SuspentionNote: "",
      showModalsorce: false,
      isSuspended: null,

      linkingByAccounting: false,

      SalaryStatus_search: "",

      tableData: [],
      employees: [],
      departmentClassifications: [],
      departments: [],
      departments_Section: [],
      Selected: [],

      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["Titel", "Severity", "Status"],
      searchedData: [],
      fuseSearch: null,
      currentSort: "Titel",
      currentSortOrder: "asc",
      PageSize: ""
    };
  },

  watch: {
    async Administration() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/Departments/${this.Administration}/load`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        (this.Section = ""), (this.departments_Section = result.data.data);
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    },

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
    changeActiveCard(item) {
      if (item == "one") {
        this.one = true;
        this.two = false;
        this.three = false;
        this.four = false;
        this.five = false;
        this.seven = false;
      } else if (item == "two") {
        this.one = false;
        this.two = true;
        this.three = false;
        this.four = false;
        this.five = false;
        this.seven = false;
      } else if (item == "three") {
        this.one = false;
        this.two = false;
        this.three = true;
        this.four = false;
        this.five = false;
        this.seven = false;
      } else if (item == "four") {
        this.one = false;
        this.two = false;
        this.three = false;
        this.four = true;
        this.five = false;
        this.seven = false;
      } else if (item == "five") {
        this.one = false;
        this.two = false;
        this.three = false;
        this.four = false;
        this.five = true;
        this.seven = false;
      } else if (item == "seven") {
        this.one = false;
        this.two = false;
        this.three = false;
        this.four = false;
        this.five = false;
        this.seven = true;
      }
    },

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

    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    },

    firstday(d) {
      const date = new Date(d);
      date.setDate(1);
      return date;
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

    // day(){
    //     this.firstday (this.MounthDate);
    // },
    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        // if (localStorage.getItem("show") != null) {
        //   this.show = localStorage.getItem("show");
        // }
        let result = await axios.get(`${env.HR()}/api/Salaries`, {
          headers: { Authorization: "Bearer " + token }
        });
        this.employees = result.data.data.employees;
        this.departmentClassifications =
          result.data.data.departmentClassifications;
        this.departments = result.data.data.departments;

        let result_Setting = await axios.get(`${env.HR()}/api/Setting`, {
          headers: { Authorization: "Bearer " + token }
        });
        this.linkingByAccounting = result_Setting.data.data.linkingByAccounting;
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
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

        let result = await axios.put(
          `${env.HR()}/api/Salaries/${this.idTable}`,
          schema,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.Search();

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

    async Search() {
      try {
        this.tableData = [];
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        // if (!this.EmployeeId && !this.Administration && !this.ClassificationsId  ) {
        //   return this.notifyVue(
        //     "top",
        //     "center",
        //     "danger",
        //     "عفواً، الرجاء الإدخال "
        //   );
        // }

        if (this.MounthDate == null) {
          this.MounthDate = "";
        } else {
          this.MounthDate = this.convert(this.firstday(this.MounthDate));
        }

        if (this.Section == "") {
          this.DeparatmentId = this.Administration;
        } else {
          this.DeparatmentId = this.Section;
        }

        let result = await axios.get(
          `${env.HR()}/api/Salaries/filter?EmployeeId=${
            this.EmployeeId_shearch
          }&MounthDate=${this.MounthDate}&ClassificationsId=${
            this.ClassificationsId
          }&DeparatmentId=${this.DeparatmentId}&SalaryStatus=${
            this.SalaryStatus_search
          }&PageSize=${this.PageSize}&IsSuspend=${this.isSuspended}`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        for (let i = 0; i < result.data.data.salaries.results.length; i++) {
          let schema = {
            id: result.data.data.salaries.results[i].id,
            jobNumber: result.data.data.salaries.results[i].jobNumber,
            employeeName: result.data.data.salaries.results[i].employeeName,
            departmentName: result.data.data.salaries.results[i].departmentName,
            salaryState: result.data.data.salaries.results[i].salaryState,
            basicSalary: result.data.data.salaries.results[i].basicSalary,
            isModified: result.data.data.salaries.results[i].isModified,
            isSuspended: result.data.data.salaries.results[i].isSuspended,
            isActive: false,

            monthDate: result.data.data.salaries.results[i].monthDate,
            EmployeeName: result.data.data.salaries.results[i].EmployeeName,
            fileNumber: result.data.data.salaries.results[i].fileNumber,
            bankName: result.data.data.salaries.results[i].bankName,
            bankBranchName: result.data.data.salaries.results[i].bankBranchName,
            accountNumber: result.data.data.salaries.results[i].accountNumber,
            basicSalary: result.data.data.salaries.results[i].basicSalary,
            newBasicSalary: result.data.data.salaries.results[i].newBasicSalary,
            salaryPercentage:
              result.data.data.salaries.results[i].salaryPercentage,
            workHours: result.data.data.salaries.results[i].workHours,
            presentHours: result.data.data.salaries.results[i].presentHours,
            degree: result.data.data.salaries.results[i].degree,
            bonus: result.data.data.salaries.results[i].bonus,
            financialDegree:
              result.data.data.salaries.results[i].financialDegree,
            financialBonuse:
              result.data.data.salaries.results[i].financialBonuse,

            normalOvertime: result.data.data.salaries.results[i].normalOvertime,
            normalOvertimeValue:
              result.data.data.salaries.results[i].normalOvertimeValue,
            excellentOvertime:
              result.data.data.salaries.results[i].excellentOvertime,
            excellentOvertimeValue:
              result.data.data.salaries.results[i].excellentOvertimeValue,
            totalSalary: result.data.data.salaries.results[i].totalSalary,
            absencHours: result.data.data.salaries.results[i].absencHours,
            absencValue: result.data.data.salaries.results[i].absencValue,
            vacationTypeDiscountValue:
              result.data.data.salaries.results[i].vacationTypeDiscountValue,
            yearlyVacationDiscountHours:
              result.data.data.salaries.results[i].yearlyVacationDiscountHours,
            yearlyVacationDiscountValue:
              result.data.data.salaries.results[i].yearlyVacationDiscountValue,

            sanctionHours: result.data.data.salaries.results[i].sanctionHours,
            sanctionValue: result.data.data.salaries.results[i].sanctionValue,
            differences: result.data.data.salaries.results[i].differences,
            AdvanceRest: result.data.data.salaries.results[i].AdvanceRest,
            premiumAdvance: result.data.data.salaries.results[i].premiumAdvance,
            warrantyTax: result.data.data.salaries.results[i].warrantyTax,
            solidarityTax: result.data.data.salaries.results[i].solidarityTax,
            jihadTax: result.data.data.salaries.results[i].jihadTax,
            employerTax: result.data.data.salaries.results[i].employerTax,
            cabinetTax: result.data.data.salaries.results[i].cabinetTax,
            warrantyType: result.data.data.salaries.results[i].warrantyType,
            prepaidSalary: result.data.data.salaries.results[i].prepaidSalary,
            jihadTaxableReward:
              result.data.data.salaries.results[i].jihadTaxableReward,
            taxableReward: result.data.data.salaries.results[i].taxableReward,
            otherDiscounts: result.data.data.salaries.results[i].otherDiscounts,
            netSalary: result.data.data.salaries.results[i].netSalary,
            totalDiscounts: result.data.data.salaries.results[i].totalDiscounts,
            taxableSalary: result.data.data.salaries.results[i].taxableSalary,
            note: result.data.data.salaries.results[i].note,
            discountsNote: result.data.data.salaries.results[i].discountsNote,

            sumAllownce: result.data.data.salaries.results[i].sumAllownce
          };
          this.tableData.push(schema);
          this.show_select = true;
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

    selectAll() {
      if (this.All === true)
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].isActive = true;
          this.add(this.tableData[i]);
        }
      else {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].isActive = false;
          this.add(this.tableData[i]);
        }
      }
    },

    async close_month() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        if (!this.MounthDate) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال تاريخ الشهر "
          );
        }

        if (!this.PaymentDate) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال تاريخ الصرف "
          );
        }

        let schema = {
          MonthDate: moment(this.MounthDate).format("YYYY/MM/DD hh:mm:ss"),
          PaymentDate: moment(this.PaymentDate).format("YYYY/MM/DD hh:mm:ss")
        };

        let result = await axios.patch(
          `${env.HR()}/api/Salaries/close`,
          schema,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        return this.notifyVue("top", "center", "success", result.data.message);
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          error.response.data.message
        );
      }
    },

    async calculated() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        if (!this.MounthDate) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال تاريخ الشهر "
          );
        }

        let schema = {
          MonthDate: this.MounthDate
        };

        let result = await axios.patch(
          `${env.HR()}/api/Salaries/calculated`,
          schema,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.All = false;
        this.Search();

        return this.notifyVue(
          "top",
          "center",
          "success",
          "تم اعتماد الإحتساب بنجاح"
        );
      } catch (error) {
        this.message(error);
      }
    },

    async returncalculated() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        if (!this.MounthDate) {
          return this.notifyVue(
            "top",
            "center",
            "danger",
            "عفواً، الرجاء ادخال تاريخ الشهر "
          );
        }

        let schema = {
          MonthDate: this.MounthDate
        };

        let result = await axios.patch(
          `${env.HR()}/api/Salaries/returncalculated`,
          schema,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.All = false;

        this.Search();

        return this.notifyVue("top", "center", "success", "تم إلغاء الإعتماد");
      } catch (error) {
        this.message(error);
      }
    },

    async suspend() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        let schema = {
          SelectedSalaries: this.Selected,
          SuspentionNote: this.SuspentionNote
        };
        this.showModalsorce = false;

        let result = await axios.patch(
          `${env.HR()}/api/Salaries/suspend`,
          schema,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.All = false;
        this.showModalsorce = false;
        this.Search();
        return this.notifyVue("top", "center", "success", result.data.message);
      } catch (error) {
        this.message(error);
      }
    },

    tracking() {
      this.showModalsorce = true;
      this.SuspentionNote = "";
    },

    async release() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);

        let schema = {
          SelectedSalaries: this.Selected
        };

        let result = await axios.patch(
          `${env.HR()}/api/Salaries/release`,
          schema,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        this.All = false;
        this.Search();
        return this.notifyVue("top", "center", "success", result.data.message);
      } catch (error) {
        this.message(error);
      }
    },

    add(item) {
      if (item.isActive == true) {
        this.Selected.push(item.id);
      } else {
        for (let i = 0; i < this.Selected.length; i++) {
          if (this.Selected[i] == item.id) {
            this.Selected.splice(i, 1);
          }
        }
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

    async handleEdit(item) {
      if (this.show == false) {
        this.$router.push("details_salary/" + item.id);
      } else {
        if (item.isActive == false) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }

        this.add(item);

        this.EmployeeId = item.employeeId;
        this.allownce = item.allownce;
        this.SumAllownce = item.sumAllownce;
        (this.MonthDate_d = this.convert(item.monthDate)),
          (this.JobNumber = item.jobNumber),
          (this.EmployeeName = item.employeeName),
          (this.FileNumber = item.fileNumber),
          (this.BankName = item.bankName),
          (this.BankBranchName = item.bankBranchName),
          (this.AccountNumber = item.accountNumber),
          (this.BasicSalary = item.basicSalary),
          (this.NewBasicSalary = item.newBasicSalary),
          (this.SalaryPercentage = item.salaryPercentage),
          (this.WorkHours = item.workHours),
          (this.PresentHours = item.presentHours),
          (this.Degree = item.degree),
          (this.Bonus = item.bonus);
        this.FinancialDegree = item.financialDegree;
        this.FinancialBonuse = item.financialBonuse;

        this.NormalOvertime = item.normalOvertime;
        this.NormalOvertimeValue = item.normalOvertimeValue;
        this.ExcellentOvertime = item.excellentOvertime;
        this.ExcellentOvertimeValue = item.excellentOvertimeValue;
        this.TotalSalary = item.totalSalary;
        this.AbsencHours = item.absencHours;
        this.AbsencValue = item.absencValue;
        this.VacationTypeDiscountValue = item.vacationTypeDiscountValue;
        this.YearlyVacationDiscountHours = item.yearlyVacationDiscountHours;
        this.YearlyVacationDiscountValue = item.yearlyVacationDiscountValue;

        this.SanctionHours = item.sanctionHours;
        this.SanctionValue = item.sanctionValue;
        this.Differences = item.differences;
        this.AdvanceRest = item.advanceRest;
        this.PremiumAdvance = item.premiumAdvance;
        this.WarrantyTax = item.warrantyTax;
        this.SolidarityTax = item.solidarityTax;
        this.JihadTax = item.jihadTax;
        this.EmployerTax = item.employerTax;
        this.CabinetTax = item.cabinetTax;
        this.WarrantyType = item.warrantyType;
        this.PrepaidSalary = item.prepaidSalary;
        this.JihadTaxableReward = item.jihadTaxableReward;
        this.TaxableReward = item.taxableReward;
        this.OtherDiscounts = item.otherDiscounts;
        this.NetSalary = item.netSalary;

        this.TotalDiscounts = item.totalDiscounts;
        this.TaxableSalary = item.taxableSalary;
        this.Note = item.note;
        this.DiscountsNote = item.discountsNote;
        this.idTable = item.id;
      }
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
              `${env.HR()}/api/Salaries/${item.id}`,
              {
                headers: { Authorization: "Bearer " + token }
              }
            );
            this.deleteRow(item);
            this.init();
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

<style>
.modal {
  height: 260px !important;
  width: 434px !important;
  z-index: 999;
  background: #ffffff;
  -webkit-box-shadow: 2px 2px 20px 1px;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.btn-close {
  z-index: 999;
  position: absolute;
  top: revert;
  left: 20px;
  right: auto;
  font-size: 24px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: red !important;
  background: transparent;
  display: none;
}

/* .md-card-tabs .md-list .md-list-item .md-list-item-button .md-icon {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: auto;
  height: auto;
  margin: 0;
  font-size: 30px !important;
  padding: 15px 0;
  display: none;
} */
</style>
