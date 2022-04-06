<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submit)">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>contacts</md-icon>
          </div>
          <h4 class="title">Register Form</h4>
        </md-card-header>

        <md-card-content>
          <ValidationProvider
            name="email"
            rules="required|email"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label>Email Adress</label>
              <md-input v-model="email" type="email"> </md-input>

              <slide-y-down-transition>
                <md-icon class="error" v-show="failed">close</md-icon>
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon class="success" v-show="passed">done</md-icon>
              </slide-y-down-transition>
            </md-field>
          </ValidationProvider>

          <ValidationProvider
            name="password"
            rules="required|confirmed:confirmation"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label>Password</label>
              <md-input v-model="password" type="password"> </md-input>

              <slide-y-down-transition>
                <md-icon class="error" v-show="failed">close</md-icon>
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon class="success" v-show="passed">done</md-icon>
              </slide-y-down-transition>
            </md-field>
          </ValidationProvider>

          <ValidationProvider
            vid="confirmation"
            rules="required"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label>Confirm Password</label>
              <md-input v-model="confirmation" type="password"> </md-input>

              <slide-y-down-transition>
                <md-icon class="error" v-show="failed">close</md-icon>
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon class="success" v-show="passed">done</md-icon>
              </slide-y-down-transition>
            </md-field>
          </ValidationProvider>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-success">Register </md-button>
        </md-card-actions>
      </md-card>
    </form>
  </ValidationObserver>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required, email, confirmed } from "vee-validate/dist/rules";

extend("email", email);
extend("required", required);
extend("confirmed", confirmed);

export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      email: "",
      password: "",
      confirmation: ""
    };
  },
  methods: {
    submit() {
      alert("Form has been submitted!");
    }
  }
};
</script>
<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}
</style>
