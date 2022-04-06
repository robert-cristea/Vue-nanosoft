<template>
  <router-view></router-view>
</template>

<script>
export default {};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Vazirmatn&display=swap');
.selection.dropdown {
  border: none !important;
  border-bottom: 1px solid rgba(34, 36, 38, 0.15) !important;
}

.md-field.md-theme-default {
  margin-top: 0 !important;
}

.md-layout-item-time {
  margin-top: 30px !important;
  margin-bottom: 30px !important;
}

.md-layout-item-time-custom {
  margin-top: 6px !important;
}

.md-layout-item-time .monthly-picker .flexbox {
  flex-direction: row-reverse !important;
}

.md-layout-item-time .monthly-picker {
  margin-top: -4px;
}

.monthly-picker-head {
  position: absolute;
  z-index: 1;
  top: -15px;
  font-size: 15px;
}

.monthly-picker-head.active {
  top: -35px;
  font-size: 13px;
}

.monthly-picker {
  position: absolute;
  width: 100%;
}
.monthly-picker .month-year-display {
  border: 0 !important;
  box-shadow: none !important;
  border-bottom: 1px solid !important;
  border-color: #d9d9d9 !important;
}

.date-popover.visible {
  max-width: 100% !important;
}

.input-must-rtl {
  display: flex !important;
  min-height: 2.71428571em !important;
  padding-right: 0 !important;
}
.input-must-rtl .dropdown.icon {
  left: 0 !important;
  right: initial !important;
}
.input-must-rtl .text.default {
  left: 0 !important;
  /* right: -25px !important; */
  color: #000 !important;
}

.input-must-rtl .search {
  padding-right: 0 !important;
}

.input-must-rtl .menu .item {
  text-align: right !important;
}

.md-datepicker.md-focused label {
  margin-right: 0 !important;
}

.md-datepicker.md-has-value label {
  margin-right: 0 !important;
}
</style>
