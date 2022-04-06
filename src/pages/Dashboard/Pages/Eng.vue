<template>
  <div>
    <!----------  form ------------->

    <div class="md-layout">
      <div class="md-layout-item">
        <ValidationObserver id="#content">
          <form>
            <md-card>
              <md-card-header class="md-card-header-text md-card-header-green">
                <div class="card-text">
                  <h4 class="title">Support Engineer</h4>
                </div>
              </md-card-header>
              <md-card-content>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Name</label
                  >
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
                        <md-input v-model="Name" type="text"></md-input>

                        <slide-y-down-transition>
                          <md-icon class="error" v-show="failed">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Title</label
                  >
                  <div class="md-layout-item md-size-40">
                    <ValidationProvider
                      name="Title"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <md-input v-model="Title" type="text"></md-input>

                        <slide-y-down-transition>
                          <md-icon class="error" v-show="failed">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>
                  <!-- <label class="md-layout-item md-size-20 md-label-on-right">
              <code>required</code>
                  </label>-->
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Email</label
                  >
                  <div class="md-layout-item md-size-40">
                    <ValidationProvider
                      name="email"
                      rules="required|email"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <md-input v-model="Email" type="email"></md-input>

                        <slide-y-down-transition>
                          <md-icon class="error" v-show="failed">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Password</label
                  >
                  <div class="md-layout-item md-size-40">
                    <ValidationProvider
                      name="Password"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <md-input v-model="Password" type="text"></md-input>

                        <slide-y-down-transition>
                          <md-icon class="error" v-show="failed">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Phone</label
                  >
                  <div class="md-layout-item md-size-40">
                    <ValidationProvider
                      name="Phone"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <md-input v-model="Phone" type="text"></md-input>

                        <slide-y-down-transition>
                          <md-icon class="error" v-show="failed">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >User profile</label
                  >
                  <div class="md-layout-item md-size-40">
                    <ValidationProvider
                      name="IsAdmin"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <md-select
                          v-model="IsAdmin"
                          name="IsAdmin"
                          id="IsAdmin"
                        >
                          <md-option value="Support">Support</md-option>
                          <md-option value="Admin">Admin</md-option>
                          <md-option value="Guest">Guest</md-option>
                        </md-select>
                      </md-field>
                    </ValidationProvider>
                  </div>
                </div>
              </md-card-content>
              <md-card-actions class="text-center">
                <md-button @click="submit" class="md-success">Save</md-button>
                <md-button @click="DeleteUser" v-if="isUpdate" class="md-danger"
                  >Delete</md-button
                >
              </md-card-actions>
            </md-card>
          </form>
        </ValidationObserver>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>assignment</md-icon>
            </div>
            <h4 class="title">Support engineers</h4>
          </md-card-header>
          <md-card-content>
            <md-card-content>
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

                <label class="md-layout-item md-size-10 md-form-label"
                  >Email</label
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

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >User profile</label
                  >
                  <div class="md-layout-item md-size-40">
                    <ValidationProvider
                      name="IsAdminSearch"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <md-select
                          v-model="IsAdminSearch"
                          name="IsAdminSearch"
                          id="IsAdminSearch"
                        >
                          <md-option value="Support">Support</md-option>
                          <md-option value="Admin">Admin</md-option>
                          <md-option value="Guest">Guest</md-option>
                        </md-select>
                      </md-field>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
            </md-card-content>

            <md-table
              :value="queriedData"
              :md-sort.sync="currentSort"
              :md-sort-order.sync="currentSortOrder"
              :md-sort-fn="customSort"
              class="paginated-table table-striped table-hover"
            >
              <md-table-toolbar>
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
              </md-table-toolbar>
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Name" md-sort-by="Name">
                  {{ item.Name }}
                </md-table-cell>
                <md-table-cell md-label="Email" md-sort-by="Email">
                  {{ item.Email }}
                </md-table-cell>
                <md-table-cell md-label="Title" md-sort-by="Title">{{
                  item.Title
                }}</md-table-cell>
                <md-table-cell md-label="Phone">{{ item.Phone }}</md-table-cell>
                <md-table-cell md-label="Role">{{
                  item.IsAdmin
                }}</md-table-cell>
                <md-table-cell md-label="Created At" md-sort-by="createdAt">{{
                  item.createdAt.split("T")[0]
                }}</md-table-cell>
                <md-table-cell md-label="Actions">
                  <md-button
                    class="md-just-icon md-warning md-simple"
                    @click.native="handleEdit(item)"
                  >
                    <md-icon>dvr</md-icon>
                  </md-button>
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
import Modal from "./modal.vue";
import env from "../../../../env";
extend("required", required);
extend("numeric", numeric);
extend("regex", regex);
extend("confirmed", confirmed);

export default {
  async created() {
    let tocken = localStorage.getItem("Nannotoken");
    let Engneeiers = await axios.get(env.URL() + "Nanosoft/Get/Eng/", {
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
      showModal: false,
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
          env.URL() + "Nanosoft/delete/Eng/" + this.id,
          { headers: { authorization: tocken } }
        );
        let index = this.tableData.indexOf(element => element.id === this.id);
        this.tableData.splice(index, 1);
        // console.log(this.tableData);

        if (result.status === 200) {
          this.isUpdate = false;

          this.item = "";
          return Swal.fire({
            title: `!`,
            text: "Engineer Deleted",
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
      this.item = item;
      this.Name = item.Name;
      this.Email = item.Email;
      this.Title = item.Title;
      this.Phone = item.Phone;
      this.IsAdmin = item.IsAdmin;
      this.isUpdate = true;
      this.id = item._id;
    },
    async submit() {
      try {
        let tocken = localStorage.getItem("Nannotoken");
        let schema = {
          Title: this.Title,
          Email: this.Email,
          Titel: this.Title,
          Password: this.Password,
          Phone: this.Phone,
          Name: this.Name,
          IsAdmin: this.IsAdmin
        };
        let result;
        if (this.isUpdate === false) {
          result = await axios.post(
            env.URL() + "Nanosoft/Create/Support/eng/",
            schema,
            { headers: { authorization: tocken } }
          );
        } else {
          result = await axios.patch(
            env.URL() + "Nanosoft/Update/Support/Eng/" + this.id,
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
            text: "Engineer created",
            buttonsStyling: false,
            confirmButtonClass: "md-button md-success",
            type: "success"
          });
        }
        let dataResult = this.tableData.find(
          element => element._id === this.id
        );
        this.isUpdate = false;
        dataResult.Name = result.data.result.Name;
        dataResult.Email = result.data.result.Email;
        dataResult.Title = result.data.result.Title;
        dataResult.Phone = result.data.result.Phone;
        dataResult.IsAdmin = result.data.result.IsAdmin;
        this.Name = "";
        this.Email = "";
        this.Title = "";
        this.Phone = "";
        this.Password = "";
        this.IsAdmin = "";
        this.isUpdate = false;
        this.id = "";
        return Swal.fire({
          title: `Good job!`,
          text: "Engineer Updated",
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

<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}

.text-center {
  justify-content: center !important;
}
</style>
