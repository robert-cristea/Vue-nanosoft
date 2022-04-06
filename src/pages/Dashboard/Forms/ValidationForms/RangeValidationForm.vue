<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submit)">
      <md-card>
        <md-card-header class="md-card-header-text md-card-header-green">
          <div class="card-text">
            <h4 class="title">Range Validation</h4>
          </div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout">
            <label class="md-layout-item md-size-20 md-form-label">
              Min Length
            </label>
            <div class="md-layout-item md-xsmall-size-100">
              <ValidationProvider
                name="minLength"
                rules="required|min:5"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input v-model="minLength" type="text"> </md-input>

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
              <code>minLength="5"</code>
            </label>
          </div>
          <div class="md-layout">
            <label class="md-layout-item md-size-20 md-form-label">
              Max Length
            </label>
            <div class="md-layout-item md-xsmall-size-100">
              <ValidationProvider
                name="maxLength"
                rules="required|max:4"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input v-model="maxLength" type="text"> </md-input>

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
              <code>maxLength="5"</code>
            </label>
          </div>
          <div class="md-layout">
            <label class="md-layout-item md-size-20 md-form-label">
              Range
            </label>
            <div class="md-layout-item md-xsmall-size-100">
              <ValidationProvider
                name="range"
                rules="required|min:6|max:10"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input v-model="range" type="text"> </md-input>

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
              <code>range=[6,10]</code>
            </label>
          </div>
          <div class="md-layout">
            <label class="md-layout-item md-size-20 md-form-label">
              Min Value
            </label>
            <div class="md-layout-item md-xsmall-size-100">
              <ValidationProvider
                name="minValue"
                rules="required|min_value:6"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input v-model="minValue" type="text"> </md-input>

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
              <code>min="6"</code>
            </label>
          </div>
          <div class="md-layout">
            <label class="md-layout-item md-size-20 md-form-label">
              Max Value
            </label>
            <div class="md-layout-item md-xsmall-size-100">
              <ValidationProvider
                name="maxValue"
                rules="required|max_value:10"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input v-model="maxValue" type="text"> </md-input>

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
              <code>max="10"</code>
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
import {
  required,
  min,
  max,
  min_value,
  max_value
} from "vee-validate/dist/rules";

extend("required", required);
extend("min", min);
extend("max", max);
extend("min_value", min_value);
extend("max_value", max_value);

export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      minLength: "",
      maxLength: "",
      range: "",
      minValue: "",
      maxValue: ""
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
