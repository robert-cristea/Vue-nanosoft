<template>
  <div class="md-layout">
    <div class="md-layout-item md-small-size-100">
      <register-form></register-form>
    </div>
    <div class="md-layout-item md-small-size-100">
      <login-form></login-form>
    </div>
    <div class="md-layout-item md-size-100">
      <type-validation-form></type-validation-form>
    </div>
    <div class="md-layout-item md-size-100">
      <range-validation-form></range-validation-form>
    </div>
  </div>
</template>
<script>
import RegisterForm from "./ValidationForms/RegisterForm.vue";
import LoginForm from "./ValidationForms/LoginForm.vue";
import TypeValidationForm from "./ValidationForms/TypeValidationForm.vue";
import RangeValidationForm from "./ValidationForms/RangeValidationForm";

export default {
  components: {
    LoginForm,
    RegisterForm,
    TypeValidationForm,
    RangeValidationForm
  }
};
</script>
<style></style>
