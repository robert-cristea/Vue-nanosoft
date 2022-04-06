<template>
  <div class="md-layout text-center">
    <div
      class="
        md-layout-item
        md-size-33
        md-medium-size-50
        md-small-size-70
        md-xsmall-size-100
      "
    >
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <md-card>
            <md-card-content class="dir">
              <ValidationProvider
                name="email"
                rules="required"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input
                    class="center"
                    v-model="email"
                    type="text"
                    placeholder="اسم الدخول"
                  ></md-input>

                  <slide-y-down-transition>
                    <!-- <md-icon class="error" v-show="failed">close</md-icon> -->
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <!-- <md-icon class="success" v-show="passed">done</md-icon> -->
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>

              <ValidationProvider
                name="password"
                rules="required|min:1"
                v-slot="{ passed, failed }"
              >
                <md-field
                  class="dir"
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input
                    class="center"
                    v-model="password"
                    type="password"
                    placeholder="كلمة المرور"
                  ></md-input>

                  <slide-y-down-transition>
                    <!-- <md-icon class="error" v-show="failed">close</md-icon> -->
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <!-- <md-icon class="success" v-show="passed">done</md-icon> -->
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </md-card-content>

            <div
              class="
                aliignprogrespar
                md-layout-item md-size-50 md-small-size-100
              "
              v-if="network === true"
            >
              <md-progress-bar
                class="md-warning"
                md-mode="buffer"
                :md-value="buffer"
                :md-buffer="buffer"
              ></md-progress-bar>
            </div>
            <p style="color: red" v-else>{{ messageContent }}</p>
            <div class="md-card-actions" style="justify-content: center">
              <md-button type="submit" class="md-info">دخول</md-button>
            </div>
          </md-card>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required, email, min } from "vee-validate/dist/rules";
import axios from "axios";
import env from "../../../../env.js";
import Swal from "sweetalert2";

extend("email", email);
extend("required", required);
extend("min", min);

export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      buffer: 10,
      email: "",
      password: "",
      messageContent: "",
      network: false,
      soundurl: ""
    };
  },
  methods: {
    async submit() {
      try {
        if (this.password === "" || this.email === "") {
          return (this.messageContent = "Please enter Email and Password");
        }
        const Schema = {
          grant_type: "password",
          client_id: "client",
          client_secret: "!QA2ws3ed",
          AllowedScopes: "application",
          username: this.email,
          password: this.password
        };
        const params = new URLSearchParams();
        params.append("grant_type", "password");
        params.append("client_id", "client");
        params.append("client_secret", "!QA2ws3ed");
        params.append("AllowedScopes", "application");
        params.append("username", this.email);
        params.append("password", this.password);
        this.network = true;
        this.buffer = 50;
        let result = await axios.post(env.identity(), params, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        if (result.status === 200) {
          localStorage.setItem("Nannotoken", btoa(result.data.access_token));
          let responce = await axios.get(`${env.HR()}/api/Profile`, {
            headers: { Authorization: "Bearer " + result.data.access_token }
          });
          localStorage.setItem("eid", responce.data.data.employeeId);
          this.buffer = 100;
          setTimeout(() => {
            this.network = false;
            return this.$router.replace("pages/employees");
          }, 500);
        }
      } catch (error) {
        this.network = false;
        this.buffer = 100;
        this.messageContent = "البريد الإلكتروني أو كلمة المرور غير صحيحة";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}
.textalingeright {
  text-align: left;
}

.aliignprogrespar {
  justify-content: center;
  margin-left: 25%;
}
.dir {
  direction: rtl;
}
.m {
  margin-left: auto;
  margin-right: auto;
}
.iconpading {
  border-radius: 3px;
  background-color: #999999;
  padding: 15px;
  margin-top: -20px;
  /* margin-right: 15px; */
  float: left;
  background: linear-gradient(60deg, #66bb6a, #43a047);
}
.center {
  text-align: center;
}
// .back {
// }
.with {
  color: #ffffff;
  color: rgba(0, 0, 0, 0.54);
  color: var(--md-theme-default-icon-on-background, rgba(0, 0, 0, 0.54));
}
</style>
