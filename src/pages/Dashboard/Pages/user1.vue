<template>
  <div>
    <!---------- section1  ------------->
    <div class="md-layout">
      <div class="md-layout-item">
        <ValidationObserver>
          <form>
            <md-card>
              <div>
                <md-card-content>
                  <div class="md-layout">
                    <div class="md-layout-item md-size-40">
                      <ValidationProvider
                        name="Name"
                        rules="required"
                        v-slot="{ passed, failed }"
                      >
                        <md-field
                          :class="[
                            { 'md-error': failed },
                            { 'md-valid': passed }
                          ]"
                        >
                          <md-input
                            placeholder="اسم المستخدم"
                            v-model="Name"
                            type="text"
                          ></md-input>

                          <slide-y-down-transition>
                            <md-icon class="error" v-show="failed"
                              >close</md-icon
                            >
                          </slide-y-down-transition>
                          <slide-y-down-transition>
                            <md-icon class="success" v-show="passed"
                              >done</md-icon
                            >
                          </slide-y-down-transition>
                        </md-field>
                      </ValidationProvider>
                    </div>

                    <md-table-toolbar>
                      <md-field>
                        <label for="movie">المجموعة</label>
                        <md-select v-model="movie" name="movie" id="movie">
                          <md-option value="fight-club">Fight Club</md-option>
                          <md-option value="godfather">Godfather</md-option>
                          <md-option value="godfather-ii"
                            >Godfather II</md-option
                          >
                          <md-option value="godfather-iii"
                            >Godfather III</md-option
                          >
                          <md-option value="godfellas">Godfellas</md-option>
                          <md-option value="pulp-fiction"
                            >Pulp Fiction</md-option
                          >
                          <md-option value="scarface">Scarface</md-option>
                        </md-select>
                      </md-field>
                    </md-table-toolbar>

                    <md-table-toolbar>
                      <md-field>
                        <label for="movie">الموظف</label>
                        <md-select v-model="movie" name="movie" id="movie">
                          <md-option value="fight-club">Fight Club</md-option>
                          <md-option value="godfather">Godfather</md-option>
                          <md-option value="godfather-ii"
                            >Godfather II</md-option
                          >
                          <md-option value="godfather-iii"
                            >Godfather III</md-option
                          >
                          <md-option value="godfellas">Godfellas</md-option>
                          <md-option value="pulp-fiction"
                            >Pulp Fiction</md-option
                          >
                          <md-option value="scarface">Scarface</md-option>
                        </md-select>
                      </md-field>
                    </md-table-toolbar>

                    <div class="md-layout-item md-size-40">
                      <ValidationProvider
                        name="Name"
                        rules="required"
                        v-slot="{ passed, failed }"
                      >
                        <md-field
                          :class="[
                            { 'md-error': failed },
                            { 'md-valid': passed }
                          ]"
                        >
                          <md-input
                            placeholder="اسم الدخول"
                            v-model="Name"
                            type="text"
                          ></md-input>

                          <slide-y-down-transition>
                            <md-icon class="error" v-show="failed"
                              >close</md-icon
                            >
                          </slide-y-down-transition>
                          <slide-y-down-transition>
                            <md-icon class="success" v-show="passed"
                              >done</md-icon
                            >
                          </slide-y-down-transition>
                        </md-field>
                      </ValidationProvider>
                    </div>

                    <div class="md-layout-item md-size-30">
                      <ValidationProvider
                        name="Name"
                        rules="required"
                        v-slot="{ passed, failed }"
                      >
                        <md-field
                          :class="[
                            { 'md-error': failed },
                            { 'md-valid': passed }
                          ]"
                        >
                          <md-input
                            placeholder="كلمة المرور"
                            v-model="Name"
                            type="text"
                          ></md-input>

                          <slide-y-down-transition>
                            <md-icon class="error" v-show="failed"
                              >close</md-icon
                            >
                          </slide-y-down-transition>
                          <slide-y-down-transition>
                            <md-icon class="success" v-show="passed"
                              >done</md-icon
                            >
                          </slide-y-down-transition>
                        </md-field>
                      </ValidationProvider>
                    </div>

                    <div class="md-layout-item md-size-30">
                      <ValidationProvider
                        name="Name"
                        rules="required"
                        v-slot="{ passed, failed }"
                      >
                        <md-field
                          :class="[
                            { 'md-error': failed },
                            { 'md-valid': passed }
                          ]"
                        >
                          <md-input
                            placeholder="تأكيد كلمة المرور"
                            v-model="Name"
                            type="text"
                          ></md-input>

                          <slide-y-down-transition>
                            <md-icon class="error" v-show="failed"
                              >close</md-icon
                            >
                          </slide-y-down-transition>
                          <slide-y-down-transition>
                            <md-icon class="success" v-show="passed"
                              >done</md-icon
                            >
                          </slide-y-down-transition>
                        </md-field>
                      </ValidationProvider>
                    </div>
                    <md-checkbox v-model="boolean1"> غير نشط </md-checkbox>

                    <md-button @click="submit" class="md-success btn_nanosoft"
                      >جديد</md-button
                    >
                    <md-button @click="submit" class="md-success btn_nanosoft"
                      >حفظ</md-button
                    >
                    <md-button @click="submit" class="md-success btn_nanosoft"
                      >حذف</md-button
                    >
                  </div>
                </md-card-content>
              </div>
            </md-card>
          </form>
        </ValidationObserver>
      </div>
    </div>
    <!---------- section2  ------------->

    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-content>
            <!-- <md-card-content>
              <div class="md-layout">
                <label class="md-layout-item md-size-10 md-form-label"
                  >Name</label
                >
                <div class="md-layout-item md-size-20">
                  <ValidationProvider
                    name="Title"
                    rules="required"
                    v-slot="{ passed, failed }"
                  >
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <md-input type="text"></md-input>
                    </md-field>
                  </ValidationProvider>
                </div>
               
              </div>
            </md-card-content> -->
            <!-- <md-button @click="refreach" class="md-success s">
          Refreach
            </md-button>-->
            <md-table
              :value="queriedData"
              :md-sort.sync="currentSort"
              :md-sort-order.sync="currentSortOrder"
              :md-sort-fn="customSort"
              class="paginated-table table-striped table-hover"
            >
              <!-- <md-table-toolbar>
                <md-field>
                  <label for="pages">Per page</label>
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

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="اسم المستخدم" md-sort-by="Name">
                  {{ item.Name }}
                </md-table-cell>

                <md-table-cell md-label="المجموعة" md-sort-by="Name">
                  {{ item.Name }}
                </md-table-cell>

                <md-table-cell md-label="الموظف" md-sort-by="Name">
                  {{ item.Name }}
                </md-table-cell>

                <md-table-cell md-label="حالة المستخدم" md-sort-by="Name">
                  {{ item.Name }}
                </md-table-cell>
              </md-table-row>
            </md-table>
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
  </div>
</template>

<script>
import axios from "axios";
import { Pagination } from "@/components";
import users from "./users";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required, numeric, regex, confirmed } from "vee-validate/dist/rules";
import env from "../../../../env";
extend("required", required);
extend("numeric", numeric);
extend("regex", regex);
extend("confirmed", confirmed);
export default {
  async created() {
    let tocken = localStorage.getItem("Nannotoken");
    let Engneeiers = await axios.get(env.URL() + "Nanosoft/category", {
      headers: { authorization: tocken }
    });
    this.tableData = Engneeiers.data.result;
  },
  components: {
    Pagination,
    SlideYDownTransition
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
        perPage: 5,
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
    async submit() {
      try {
        let tocken = localStorage.getItem("Nannotoken");
        let schema = {
          Name: this.Name
        };
        let result;
        if (this.isUpdate === false) {
          result = await axios.post(env.URL() + "Nanosoft/category/", schema, {
            headers: { authorization: tocken }
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
            type: "success"
          });
        }
        let dataResult = this.tableData.find(
          element => element._id === this.id
        );
        dataResult.Name = result.data.result.Name;
        this.isUpdate = false;
        this.Name = "";
        return Swal.fire({
          title: `Good job!`,
          text: "Category Updated",
          buttonsStyling: false,
          confirmButtonClass: "md-button md-success",
          type: "success"
        });
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
