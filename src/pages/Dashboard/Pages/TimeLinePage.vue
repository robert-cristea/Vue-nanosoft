<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>assignment</md-icon>
            </div>
            <h4 class="title">Ticket Center</h4>
          </md-card-header>
          <md-card-content>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-size-20">
                  <ValidationProvider
                    name="Title"
                    rules="required"
                    v-slot="{ passed, failed }"
                  >
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <md-input
                        v-model="number"
                        placeholder="Ticket Number"
                        type="number"
                      ></md-input>
                    </md-field>
                  </ValidationProvider>
                </div>

                <div class="md-layout-item md-size-20">
                  <ValidationProvider
                    name="Catagories"
                    rules="required"
                    v-slot="{ passed, failed }"
                  >
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <md-select
                        v-model="sevarity"
                        name="Catagories"
                        id="Catagories"
                        placeholder="Severity"
                      >
                        <md-option value="High">High</md-option>
                        <md-option value="Medium">Medium</md-option>
                        <md-option value="Low">Low</md-option>
                      </md-select>
                    </md-field>
                  </ValidationProvider>
                </div>

                <div class="md-layout-item md-size-20">
                  <ValidationProvider
                    name="Catagories"
                    rules="required"
                    v-slot="{ passed, failed }"
                  >
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <md-select
                        v-model="status"
                        name="Catagories"
                        id="Catagories"
                        placeholder="Status"
                      >
                        <md-option value="Registered">Registered</md-option>
                        <md-option value="Waiting">Waiting</md-option>
                        <md-option value="In-Progress">In-Progress</md-option>
                        <md-option value="Answered">Answered</md-option>
                        <md-option value="Closed">Closed</md-option>
                      </md-select>
                    </md-field>
                  </ValidationProvider>
                </div>
                <div class="md-layout-item md-size-20">
                  <ValidationProvider
                    name="Catagories"
                    rules="required"
                    v-slot="{ passed, failed }"
                  >
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <md-select
                        v-model="Catagory"
                        name="Catagories"
                        id="Catagories"
                        placeholder="Categories"
                      >
                        <md-option
                          v-for="category in data2.categories"
                          v-bind:key="category._id"
                          :value="category._id"
                          >{{ category.Name }}</md-option
                        >
                      </md-select>
                    </md-field>
                  </ValidationProvider>
                </div>
                <div class="md-layout-item md-size-20">
                  <ValidationProvider
                    name="Catagories"
                    rules="required"
                    v-slot="{ passed, failed }"
                  >
                    <md-field
                      :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                    >
                      <md-select
                        v-model="Impact"
                        name="Impact"
                        id="Impact"
                        placeholder="Incident Severity"
                      >
                        <md-option
                          v-for="impact in data2.impacts"
                          v-bind:key="impact._id"
                          :value="impact._id"
                          >{{ impact.Name }}</md-option
                        >
                      </md-select>
                    </md-field>
                  </ValidationProvider>
                </div>

                <div class="md-layout-item md-size-100">
                  <ValidationProvider name="Catagories" rules="required">
                    <div class="ss">
                      <md-button @click="Search" class="md-success"
                        >Search</md-button
                      >
                    </div>
                  </ValidationProvider>
                </div>
              </div>
            </md-card-content>

            <md-button @click="refreach" class="md-success s"
              >Refresh</md-button
            >
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
              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
                :style="{
                  'background-color':
                    item.Status === 'Registered'
                      ? 'withe'
                      : item.Status === 'Answered'
                      ? '#90EE90'
                      : item.Status === 'Closed'
                      ? '#90EE90'
                      : ''
                }"
              >
                <md-table-cell
                  md-label="Ticket number"
                  md-sort-by="ticketNumber"
                >
                  {{ item.ticketNumber }}
                </md-table-cell>
                <md-table-cell md-label="Title" md-sort-by="Titel">
                  <a @click="$router.push('ticket/' + item._id)">
                    {{ item.Titel }}
                  </a>
                </md-table-cell>
                <md-table-cell md-label="Severity" md-sort-by="Severity">
                  {{ item.Severity }}
                </md-table-cell>
                <md-table-cell md-label="Category" md-sort-by="Category">
                  {{ item.category === undefined ? "" : item.category.Name }}
                </md-table-cell>
                <md-table-cell md-label="Incident Severity" md-sort-by="Impact">
                  {{ item.Impact === undefined ? "" : item.Impact.Name }}
                </md-table-cell>
                <md-table-cell md-label="Status" md-sort-by="Status">{{
                  item.Status
                }}</md-table-cell>
                <md-table-cell md-label="Created At" md-sort-by="createdAt">{{
                  item.createdAt.split("T")[0]
                }}</md-table-cell>
                <md-table-cell md-label="Actions">
                  <md-button
                    v-if="role === 'Admin'"
                    class="md-just-icon md-simple md-primary mr"
                    @click.native="OpenAssignr(item)"
                  >
                    <md-icon>person</md-icon>
                    <md-tooltip md-direction="top">Assign</md-tooltip>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
            <div class="footer-table md-table">
              <table>
                <tfoot>
                  <tr>
                    <!-- <th v-for="item in footerTable" :key="item.name" class="md-table-head">
                      <div class="md-table-head-container md-ripple md-disabled">
                        <div class="md-table-head-label">{{ item }}</div>
                      </div>
                    </th> -->
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
    <!----------  form ------------->
    <div id="app">
      <modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">Assign to engneeiers</h3>

        <div slot="body">
          <div class="md-layout">
            <label class="md-layout-item md-size-20 md-form-label">id</label>
            <div class="md-layout-item md-size-50">
              <ValidationProvider
                name="SystemVersion"
                rules="required"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input v-model="SystemVersion" type="number"></md-input>
                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
          </div>

          <div class="md-layout">
            <label class="md-layout-item md-size-20 md-form-label">Name</label>
            <div class="md-layout-item md-size-50">
              <ValidationProvider
                name="SystemVersion"
                rules="required"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input v-model="SystemVersion" type="text"></md-input>
                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
          </div>
          <el-table :data="Engners" height="400">
            <el-table-column prop="_id" label="id"></el-table-column>
            <el-table-column prop="Name" label="Name"></el-table-column>
            <el-table-column label="Assigne" prop="assgin">
              <template slot-scope="scope">
                <el-button @click="assgine(scope.row, scope.$index)">{{
                  scope.row.assgin === true ? "Assigned" : "Assign"
                }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </modal>
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
extend("required", required);
extend("numeric", numeric);
extend("regex", regex);
extend("confirmed", confirmed);
import env from "../../../../env";
export default {
  async created() {
    if (localStorage.getItem("role")) {
      this.role = localStorage.getItem("role");
    } else {
      this.$router.replace("/login");
    }
    let tocken = localStorage.getItem("Nannotoken");
    this.refreach();
    let Engneeiers = await axios.get(env.URL() + "Nanosoft/Get/SupportEng/", {
      headers: { authorization: tocken }
    });
    this.Engners = Engneeiers.data.result;
    this.Engners.forEach(element => {
      element["assgin"] = false;
    });
    let IG = await axios.get(env.URL() + "Nanosoft/impactAndCategory", {
      headers: { authorization: tocken }
    });
    this.data2 = IG.data;
  },
  components: {
    Pagination,
    SlideYDownTransition,
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
      number: "",
      sevarity: "",
      status: "",
      Catagory: "",
      Impact: "",
      data2: {},
      role: "",
      tid: "",
      showModal: false,
      SearchWord: "",
      SystemName2: "System Name",
      item: "",
      Engners: [{ _id: "", Name: "Choose" }],
      TicktType: [{ _id: "", Name: "Choose" }],
      Systems: [{ _id: "", Name: "Choose" }],
      ticketType: "",
      Engnneir: "",
      Status: "",
      Severity: "",
      SystemVersion: "",
      Description: "",
      SystemName: "",
      Title: "",
      email: "",
      url: "",
      equal: "",
      equalTo: "",
      Answer: "",
      ticket: [],
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
    async Search() {
      try {
        let tocken = localStorage.getItem("Nannotoken");
        let schema = {
          number: this.number,
          severity: this.sevarity,
          Impact: this.Impact,
          category: this.Catagory,
          status: this.status
        };
        let result = await axios.post(
          env.URL() + "Nanosoft/search/center",
          schema,
          { headers: { authorization: tocken } }
        );
        this.tableData = result.data.result;
        this.ticket = result.data.result;
      } catch (error) {}
    },
    async getAssegned() {
      try {
        this.Engners.forEach(element => {
          element.assgin = false;
          return;
        });
        let assi = {};
        let tocken = localStorage.getItem("Nannotoken");
        let assine = await axios.get(
          env.URL() + "Nanosoft/assigne/" + this.tid,
          { headers: { authorization: tocken } }
        );

        if (assine.status === 200) {
          assine.data.result.forEach(el => {
            this.Engners.forEach(element => {
              assi = element;
              if (element._id === el.engId) {
                // console.log(element);
                element.assgin = true;
                return;
              }
            });
          });
          this.Engners.push(assi);
          this.Engners.pop();
        }
      } catch (error) {
        // console.log(error);
      }
    },
    OpenAssignr(item) {
      try {
        this.showModal = true;
        this.tid = item._id;
        this.getAssegned();
      } catch (error) {}
    },
    async assgine(row, index) {
      try {
        // console.log(row.assgin);

        if (row.assgin === false) {
          let schema = {
            id: this.tid,
            eng: row._id
          };
          let tocken = localStorage.getItem("Nannotoken");
          let Engneeiers = await axios.post(
            env.URL() + "Nanosoft/assigne",
            schema,
            { headers: { authorization: tocken } }
          );
          if (Engneeiers.status === 200) {
            this.Engners.forEach(element => {
              if (element._id === row._id) {
                element.assgin = !element.assgin;
              }
              this.Engners.push(row);
              this.Engners.pop();
            });
          }
          return;
        }
        let schema = {
          id: this.tid,
          eng: row._id
        };
        let tocken = localStorage.getItem("Nannotoken");
        let Engneeiers = await axios.post(
          env.URL() + "Nanosoft/asssigne",
          schema,
          { headers: { authorization: tocken } }
        );
        this.Engners.forEach(element => {
          if (element._id === row._id) {
            element.assgin = !element.assgin;
          }
        });
        this.Engners.push(row);
        this.Engners.pop();
        //
      } catch (error) {
        // console.log(error);
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
    async Search1() {
      try {
        if (this.SearchWord === "") {
          return;
        }
        let tocken = localStorage.getItem("Nannotoken");
        this.tableData = [];
        let schema = {
          text: this.SearchWord
        };
        let result = await axios.post(
          env.URL() + "Nanosoft/Search/knowlegbase/",
          schema,
          { headers: { authorization: tocken } }
        );
        this.tableData = result.data.result;
      } catch (error) {
        // console.log(error);
      }
    },
    async refreach() {
      try {
        this.tableData = [];
        let tocken = localStorage.getItem("Nannotoken");
        let result = await axios.get(env.URL() + "Nanosoft/get/tickets", {
          headers: { authorization: tocken }
        });
        this.number = "";
        this.sevarity = "";
        this.Impact = "";
        this.Catagory = "";
        this.status = "";
        this.tableData = result.data.result;
        this.ticket = result.data.result;
      } catch (error) {
        // console.log(error);
      }
    },
    handleEdit(item) {
      this.Status = item.Status;
      this.item = item;
      this.Title = item.Titel;
      this.SystemVersion = item.SystemVersion;
      this.Description = item.Description;
      this.SystemName = item.SystemType._id;
      this.Severity = item.Severity;

      this.ticketType = item.Type._id;
      this.Engnneir = item.AssigendTo._id;
      this.Answer = item.FormalAnser;
    },
    async submit() {
      try {
        let engnnee = "";
        this.Engners.forEach(element => {
          if (element._id === this.Engnneir) {
            return (engnnee = element);
          }
        });
        if (engnnee === undefined) {
          return;
        }

        let tocken = localStorage.getItem("Nannotoken");
        let schema = {
          id: this.item._id,
          SystemType: this.SystemName,
          Titel: this.Title,
          Type: this.ticketType,
          SystemVersion: this.SystemVersion,
          Severity: this.Severity,
          Description: this.Description,
          EngName: engnnee.Name,
          EngId: this.Engnneir,
          FormalAnser: this.Answer
        };
        let result = await axios.patch(
          env.URL() + "Nanosoft/update/ticket",
          schema,
          { headers: { authorization: tocken } }
        );
        if (result.status === 200) {
          this.item = "";
          this.tableData = [];
          let result = await axios.get(env.URL() + "Nanosoft/get/tickets", {
            headers: { authorization: tocken }
          });
          this.tableData = result.data.result;
          return Swal.fire({
            title: `Good job!`,
            text: "The tickt updated",
            buttonsStyling: false,
            confirmButtonClass: "md-button md-success",
            type: "success"
          });
        }
      } catch (error) {
        // console.log(error);
        Swal.fire({
          title: "Try again!",
          text: "your changes has not been updated.",
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
.mr {
  margin-right: 15px;
}
.s {
  width: 10%;
}
.text-center {
  justify-content: center !important;
}
.ss {
  text-align: center;
  margin-top: 20px;
}
</style>
