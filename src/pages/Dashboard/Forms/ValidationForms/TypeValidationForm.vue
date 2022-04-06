<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submit)">
      <md-card>
        <md-card-header class="md-card-header-text md-card-header-green">
          <div class="card-text">
            <h4 class="title">Type Validation</h4>
          </div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout">
            <label class="md-layout-item md-size-20 md-form-label">
              Required Text
            </label>
            <div class="md-layout-item md-xsmall-size-100">
              <ValidationProvider
                name="required"
                rules="required"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input v-model="required" type="text"> </md-input>

                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
            <label class="md-layout-item md-size-20 md-label-on-right">
              <code>required</code>
            </label>
          </div>
          <div class="md-layout">
            <label class="md-layout-item md-size-20 md-form-label">
              Email
            </label>
            <div class="md-layout-item md-xsmall-size-100">
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input v-model="email" type="email"> </md-input>

                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
            <label class="md-layout-item md-size-20 md-label-on-right">
              <code>email="true"</code>
            </label>
          </div>
          <div class="md-layout">
            <label class="md-layout-item md-size-20 md-form-label">
              Number
            </label>
            <div class="md-layout-item md-xsmall-size-100">
              <ValidationProvider
                name="number"
                rules="required|numeric"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input v-model="number" type="text"> </md-input>

                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
            <label class="md-layout-item md-size-20 md-label-on-right">
              <code>number="true"</code>
            </label>
          </div>
          <div class="md-layout">
            <label class="md-layout-item md-size-20 md-form-label">
              Url
            </label>
            <div class="md-layout-item md-xsmall-size-100">
              <ValidationProvider
                name="url"
                :rules="{
                  required: true,
                  regex: /(https?:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])(:?\d*)\/?([a-z_\/0-9\-#.]*)\??([a-z_\/0-9\-#=&]*)/g
                }"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input v-model="url" type="text"> </md-input>

                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
            <label class="md-layout-item md-size-20 md-label-on-right">
              <code>url="true"</code>
            </label>
          </div>
          <div class="md-layout">
            <label class="md-layout-item md-size-20 md-form-label">
              Equal To
            </label>
            <div class="md-layout-item md-size-30 md-xsmall-size-100">
              <ValidationProvider
                name="equal"
                rules="required|confirmed:confirmation"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input v-model="equal" type="text"> </md-input>

                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
            <div class="md-layout-item md-size-30 md-xsmall-size-100">
              <ValidationProvider
                name="equalTo"
                rules="required"
                vid="confirmation"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input v-model="equalTo" type="text"> </md-input>

                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
            <label class="md-layout-item md-size-20 md-label-on-right">
              <code>equalTo="#idSource"</code>
            </label>
          </div>
        </md-card-content>

        <md-card-actions class="text-center">
          <md-button type="submit" class="md-success"
            >Validate Inputs
          </md-button>
        </md-card-actions>
      </md-card>
    </form>
  </ValidationObserver>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required, numeric, regex, confirmed } from "vee-validate/dist/rules";

extend("required", required);
extend("numeric", numeric);
extend("regex", regex);
extend("confirmed", confirmed);

export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      required: "",
      email: "",
      number: "",
      url: "",
      equal: "",
      equalTo: ""
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

.text-center {
  justify-content: center !important;
}
</style>
