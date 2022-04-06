<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <ValidationObserver>
          <form>
            <md-card class="p-25">
              <md-card-content>
                <div class="md-layout">
                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-datepicker v-model="datefrom">
                      <label class="mr-28">من تاريخ</label>
                    </md-datepicker>
                  </div>

                  <div class="md-layout-item md-size-30 mt-25 ml-15">
                    <md-datepicker v-model="dateto">
                      <label class="mr-28">الى تاريخ</label>
                    </md-datepicker>
                  </div>

                  <!-- <div class="md-layout-item md-size-30 mt-25 ml-15">
                                        <model-list-select
                      class="input-must-rtl"
                      :list="users"
                      v-model="user"
                      option-value="id"
                      option-text="name"
                      placeholder="اسم المستخدم"
                    ></model-list-select>
                  </div> -->

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field>
                      <label>نوع العملية</label>

                      <md-select v-model="Action">
                        <md-option value="create">اضافة</md-option>
                        <md-option value="update">تعديل</md-option>
                        <md-option value="Delete">حذف</md-option>
                        <md-option value="Confirm">اعتماد</md-option>
                        <md-option value="unconfirm">الغاء الإعتماد</md-option>
                        <md-option value="Close">اغلاق</md-option>
                        <md-option value="Open">فتح</md-option>
                        <md-option value="Other">اخرى</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field>
                      <label>الواجهة</label>
                      <md-select v-model="Actionss">
                        <md-option v-for="t in types" :key="t" :value="t">{{
                          t
                        }}</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 ml-15 mtb-25">
                    <md-field>
                      <label>ترتيب النتائج</label>

                      <md-select v-model="rank_results">
                        <md-option value="0">الأحدث</md-option>
                        <md-option value="1">الأقدم</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-100 mtb-20 center-content">
                    <md-button @click="Search" class="md-success btn_nanosoft"
                      >بحث</md-button
                    >
                    <md-button @click="Clear" class="md-info btn_nanosoft"
                      >جديد</md-button
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
        <md-card-header class="md-card-header-text md-card-header-green">
          <div class="card-text">
            <h4 class="title">البحث</h4>
          </div>
        </md-card-header>
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
              <md-table-cell md-label="اسم المستخدم">
                {{ item.userName }}
              </md-table-cell>

              <md-table-cell md-label="التاريخ">
                {{ convert(item.dateTime) }}
              </md-table-cell>

              <md-table-cell md-label="واجهة">{{ item.type }}</md-table-cell>

              <md-table-cell
                v-if="item.action == 'Create'"
                md-label="نوع العملية"
                >اضافة</md-table-cell
              >

              <md-table-cell
                v-if="item.action == 'Update'"
                md-label="نوع العملية"
                >تعديل</md-table-cell
              >

              <md-table-cell
                v-if="item.action == 'Delete'"
                md-label="نوع العملية"
                >حذف</md-table-cell
              >

              <md-table-cell
                v-if="item.action == 'Confirm'"
                md-label="نوع العملية"
                >اعتماد</md-table-cell
              >

              <md-table-cell
                v-if="item.action == 'Unconfirm'"
                md-label="نوع العملية"
                >الغاء الإعتماد</md-table-cell
              >

              <md-table-cell
                v-if="item.action == 'Close'"
                md-label="نوع العملية"
                >اغلاق</md-table-cell
              >

              <md-table-cell v-if="item.action == 'Open'" md-label="نوع العملية"
                >فتح</md-table-cell
              >

              <md-table-cell
                v-if="item.action == 'Other'"
                md-label="نوع العملية"
                >اخرى</md-table-cell
              >

              <md-table-cell md-label="بيان النشاط">
                {{ item.message }}
              </md-table-cell>

              <md-table-cell md-label>
                <div class="md-just-icon md-info md-simple"></div>
                <!-- <md-button
                  class="md-just-icon md-warning md-simple"
                  @click.native="handleEdit(item)"
                >
                  <md-icon>dvr</md-icon>
                </md-button>-->
                <!-- <md-button
                  class="md-just-icon md-danger md-simple"
                  @click.native="handleDelete(item)"
                >
                  <md-icon>close</md-icon>
                </md-button>-->
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
    </div>
  </div>
</template>

<script>
import axios from "../../../../components/service/HTTP";
import { Pagination } from "@/components";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
// import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required, numeric, regex, confirmed } from "vee-validate/dist/rules";
import env from "../../../../../env";
extend("required", required);
extend("numeric", numeric);
extend("regex", regex);
extend("confirmed", confirmed);
// import { ModelListSelect } from "vue-search-select";
export default {
  async created() {
    await this.init();
  },
  components: {
    Pagination
    // SlideYDownTransition
    // ModelListSelect,
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      return this.tableData;
      // if (this.searchedData.length > 0) {
      //   result = this.searchedData;
      // }
      // return result.slice(this.from, this.to);
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
    }
  },
  data() {
    return {
      Actionss: "",
      types: [],
      footerTable: [],
      users: [],
      user: "",
      rank_results: "",
      Action: "",
      datefrom: "",
      dateto: "",
      deductibleType: "",
      //////////////
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
        perPage: 25,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["Titel", "Severity", "Status"],
      tableData: [],
      searchedData: [],
      fuseSearch: null
    };
  },
  methods: {
    Clear() {
      this.datefrom = null;
      this.dateto = null;
      this.user = "";
      this.Action = "";
      this.rank_results = "";
    },
    convert(event) {
      // console.warn("event date :::", event);
      try {
        let d = new Date(event);
        if (isNaN(d.getFullYear()) === true) {
          return "-";
        }
        return (
          d.getFullYear() +
          "-" +
          (d.getMonth() + 1) +
          "-" +
          d.getDate() +
          " , " +
          d.getHours() +
          ":" +
          d.getMinutes()
        );
      } catch (error) {}
    },
    async init() {
      try {
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(`${env.HR()}/api/users`, {
          headers: { Authorization: "Bearer " + token }
        });
        let result2 = await axios.get(`${env.HR()}/api/activities`, {
          headers: { Authorization: "Bearer " + token }
        });
        this.types = result2.data.data.types;
        this.users = result.data.data.users;
        await this.Search();
      } catch (error) {
        return this.notifyVue(
          "top",
          "center",
          "danger",
          "الرجاء اعادة تسجيل الدخول"
        );
      }
    },
    async Search() {
      try {
        this.tableData = [];
        let T = localStorage.getItem("Nannotoken");
        let token = atob(T);
        let result = await axios.get(
          `${env.HR()}/api/activities/filter?UserId=${this.user}&Action=${
            this.Action
          }&From=${this.convert2(this.datefrom)}&To=${this.convert2(
            this.dateto
          )}&SortType=${this.rank_results}&pageSize=${
            this.pagination.perPage
          }&CurrentPage=${this.pagination.currentPage}&Type=${this.Actionss}`,
          { headers: { Authorization: "Bearer " + token } }
        );
        this.tableData = result.data.data.results;
        this.pagination.total = result.data.data.total;
        this.pagination.currentPage = result.data.data.currentPage;
        this.id = "";
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
    convert2(event) {
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
    async DeleteUser() {
      try {
        let tocken = localStorage.getItem("Nannotoken");
        let result = await axios.delete(
          env.URL() + "Nanosoft/category/" + this.id,
          { headers: { authorization: tocken } }
        );
        let index = this.tableData.indexOf(element => element.id === this.id);
        this.tableData.splice(index, 1);
        // console.log(this.tableData);

        if (result.status === 200) {
          this.isUpdate = false;
          this.item = "";
          this.Name = "";
          return Swal.fire({
            title: `!`,
            text: "Category Deleted",
            buttonsStyling: false,
            confirmButtonClass: "md-button md-success",
            type: "success"
          });
        }
      } catch (error) {
        // console.log(error);
        Swal.fire({
          title: "Try again!",
          text: `${error.response.data.Message}`,
          type: "success",
          confirmButtonClass: "md-button md-success",
          buttonsStyling: false
        });
      }
    },

    handleEdit(item) {
      const offsetTop = document.getElementById("#content");
      scroll({
        top: offsetTop,
        behavior: "smooth"
      });
      this.isUpdate = true;
      this.item = item;
      this.Name = item.Name;
      this.id = item._id;
    },
    handleDelete(item) {
      Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this!`,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "md-button md-success btn-fill",
        cancelButtonClass: "md-button md-danger btn-fill",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false
      }).then(result => {
        if (result.value) {
          this.deleteRow(item);
          Swal.fire({
            title: "Deleted!",
            text: `You deleted ${item.name}`,
            type: "success",
            confirmButtonClass: "md-button md-success btn-fill",
            buttonsStyling: false
          });
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
  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["Titel", "SystemVersion"],
      threshold: 0.3
    });
  },
  watch: {
    "pagination.perPage"() {
      this.pagination.currentPage = 1;
      this.Search();
    },
    "pagination.currentPage"() {
      this.Search();
    },

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
