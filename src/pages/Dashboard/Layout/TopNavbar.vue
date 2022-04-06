<template>
  <md-toolbar
    md-elevation="0"
    class="md-transparent"
    :class="{
      'md-toolbar-absolute md-white md-fixed-top': $route.meta.navbarAbsolute
    }"
  >
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-round md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <!-- <div class="md-autocomplete">
            <md-autocomplete
              class="search"
              v-model="selectedEmployee"
              :md-options="employees"
              :md-open-on-focus="false"
            >
              <label v-if="$route.meta.rtlActive">بحث...</label>
              <label v-else>Search...</label>
            </md-autocomplete>
          </div> -->
          <md-list>
            <md-list-item @click="Logout">
              <i class="material-icons">logout</i>
              <p class="hidden-lg hidden-md">logout</p>
            </md-list-item>

            <!-- <li class="md-list-item">
              <a
                v-on:click="notificationRead"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down direction="down">
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>notifications</md-icon>
                      <span class="notification">{{counter}}</span>
                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li v-for="ns in notificans" v-bind:key="ns._id">
                        <a>{{ns.text}} ({{convert(ns.createdAt)}})</a>
                      </li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li> -->
            <!-- <md-list-item href="#/pages/user">
              <i class="material-icons">person</i>
              <p class="hidden-lg hidden-md">Profile</p>
            </md-list-item> -->
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>
<script>
import env from "../../../../env.js";
import axios from "axios";
export default {
  created() {
    // this.getNotification();
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },
    disconnect() {
      this.isConnected = false;
    },
    // Fired when the server sends something on the "messageChannel" channel.
    NewTicketAssigned(data) {
      let id = localStorage.getItem("id");
      if (id === data.id) {
        // console.log('this is the data '+data);
        this.notifyVue("top", "center", data.text);
        this.notificans.unshift(data);
        this.counter = this.notificans.length;
      }
    }
  },
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      classicModal: false,
      noticeModal: false,
      smallAlertModal: false,
      notificans: [],
      counter: 0,
      selectedEmployee: "",
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ]
    };
  },
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.replace("/");
    },
    classicModalHide: function() {
      this.classicModal = false;
    },
    noticeModalHide: function() {
      this.noticeModal = false;
    },
    async notificationRead() {
      let tocken = localStorage.getItem("Nannotoken");
      let result = await axios.get(env.URL() + "Nanosoft/notificationIsRead/", {
        headers: { authorization: tocken }
      });
      this.counter = 0;
    },
    smallAlertModalHide: function() {
      this.smallAlertModal = false;
    },
    notifyVue(verticalAlign, horizontalAlign, message) {
      var color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        timeout: 2500,
        message: message,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[color]
      });
    },
    convert(event) {
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
          d.getMinutes() +
          ":" +
          d.getSeconds()
        );
      } catch (error) {}
    },
    // async getNotification() {
    //   try {
    //     let tocken = localStorage.getItem("Nannotoken");
    //     let result = await axios.get(
    //       env.URL() + "Nanosoft/getNotification/",
    //       { headers: { authorization: tocken } }
    //     );
    //     this.notificans = result.data.result
    //     this.counter = this.notificans.length
    //   } catch (error) {}
    // },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    }
  }
};
</script>
