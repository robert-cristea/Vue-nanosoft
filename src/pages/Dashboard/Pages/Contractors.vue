<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>assignment</md-icon>
            </div>
            <h4 class="title">Contracted</h4>
          </md-card-header>
          <md-card-content>
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
                    >
                      {{ item }}
                    </md-option>
                  </md-select>
                </md-field>
              </md-table-toolbar>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Email" md-sort-by="Email">{{
                  item.Email
                }}</md-table-cell>
                <md-table-cell md-label="Full Name" md-sort-by="Full Name">{{
                  item.FullName
                }}</md-table-cell>
                <md-table-cell
                  md-label="IsContractor"
                  md-sort-by="IsContractor"
                  >{{
                    item.IsContractor === false
                      ? "Not Contractor"
                      : "Contractor"
                  }}</md-table-cell
                >
                <md-table-cell md-label="Phone">{{ item.Phone }}</md-table-cell>
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
                        <div class="md-table-head-label">
                          {{ item }}
                        </div>
                      </div>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </md-card-content>
          <md-card-actions md-alignment="space-between">
            <div class="">
              <p class="card-category">
                Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
              </p>
            </div>
            <pagination
              class="pagination-no-border pagination-success"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="total"
            >
            </pagination>
          </md-card-actions>
        </md-card>
      </div>
    </div>
    <!----------  form ------------->

    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submit)">
        <md-card>
          <md-card-header class="md-card-header-text md-card-header-green">
            <div class="card-text">
              <h4 class="title">Contracted</h4>
            </div>
          </md-card-header>
          <md-card-content>
            <md-switch v-model="switch1">is Contracted</md-switch>
          </md-card-content>
          <md-card-actions class="text-center">
            <md-button type="submit" class="md-success">
              Save
            </md-button>
          </md-card-actions>
        </md-card>
      </form>
    </ValidationObserver>
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
extend("required", required);
import env from "../../../../env";
extend("numeric", numeric);
extend("regex", regex);
extend("confirmed", confirmed);
export default {
  async created() {
    let tocken = localStorage.getItem("Nannotoken");
    let result = await axios.get(env.URL() + "Nanosoft/getAll/users", {
      headers: { authorization: tocken }
    });
    //  console.log(result.data);
    this.tableData = result.data.result;
    this.ticket = result.data.result;
    this.TicktType = TicketType.data.result;
  },
  components: {
    Pagination
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
      switch1: false,
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
      number: "",
      url: "",
      equal: "",
      equalTo: "",
      ticket: [],
      currentSort: "Titel",
      currentSortOrder: "asc",
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      footerTable: [
        "Email",
        "Full Name",
        "Is Contractor",
        "Phone",
        "createdAt",
        "Action"
      ],
      searchQuery: "",
      propsToSearch: ["Titel", "Severity", "Status"],
      tableData: [],
      searchedData: [],
      fuseSearch: null
    };
  },
  methods: {
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
      this.item = item;
      this.switch1 = item.IsContractor;
    },
    async submit() {
      try {
        let tocken = localStorage.getItem("Nannotoken");
        let schema = {
          id: this.item._id,
          status: this.switch1
        };
        // console.log(schema);

        let result = await axios.put(
          env.URL() + "Nanosoft/UserIs/Contractor",
          schema,
          { headers: { authorization: tocken } }
        );
        if (result.status === 200) {
          this.item = "";
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

.text-center {
  justify-content: center !important;
}
</style>
