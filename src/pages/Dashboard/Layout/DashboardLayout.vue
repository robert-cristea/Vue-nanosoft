<template>
  <div
    class="wrapper"
    :class="[
      { 'nav-open': $sidebar.showSidebar },
      { rtl: $route.meta.rtlActive }
    ]"
  >
    <notifications></notifications>
    <side-bar
      :active-color="sidebarBackground"
      :background-image="sidebarBackgroundImage"
      :data-background-color="sidebarBackgroundColor"
    >
      <mobile-menu></mobile-menu>
      <template slot="links">
        <sidebar-item
          v-if="$route.meta.rtlActive"
          :link="{ name: 'الإعدادت الرئيسية' }"
        >
          <sidebar-item
            :link="{ name: 'الصلاحيات', path: '/pages/Permissions' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'المستخدمين', path: '/pages/users' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'أنشطة المستخدمين', path: '/pages/UserActivities' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'إعدادات النظام', path: '/pages/Settings' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item v-if="$route.meta.rtlActive" :link="{ name: 'القوائم' }">
          <sidebar-item
            :link="{ name: 'المصارف', path: '/pages/banks' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'فروع المصرف', path: '/pages/Bank branches' }"
          ></sidebar-item>

          <sidebar-item
            :link="{
              name: 'انواع العلاوات',
              path: '/pages/types_of_allowance'
            }"
          ></sidebar-item>

          <sidebar-item
            :link="{
              name: 'انواع المستندات',
              path: '/pages/types of documents'
            }"
          ></sidebar-item>

          <sidebar-item
            :link="{
              name: 'انواع التقييمات',
              path: '/pages/types_of_evaluation'
            }"
          ></sidebar-item>

          <sidebar-item
            :link="{
              name: 'انواع الإجازات',
              path: '/pages/types of vacations'
            }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'المؤهلات العلمية', path: '/pages/Certifications' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'المحاكم', path: '/pages/Courts' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'الجنسيات', path: '/pages/nationalities' }"
          ></sidebar-item>
        </sidebar-item>

        <sidebar-item
          v-if="$route.meta.rtlActive"
          :link="{ name: 'الشؤون الإدارية' }"
        >
          <sidebar-item
            :link="{
              name: 'الهيكلية الإدارية',
              path: '/pages/organization_structure'
            }"
          ></sidebar-item>

          <sidebar-item
            :link="{
              name: 'تصنيف الفروع',
              path: '/pages/branch_classification'
            }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'الصفة الوظيفية', path: '/pages/job_title' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'الموظفين', path: '/pages/employees' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'انتهاء الخدمة', path: '/pages/end_of_service' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'الدرجات والعلاوات', path: '/pages/job_stages' }"
          ></sidebar-item>

          <sidebar-item
            :link="{
              name: 'حركات الموظفين',
              path: '/pages/employee_transactions'
            }"
          ></sidebar-item>

          <sidebar-item
            :link="{
              name: 'حركات ترقيات الموظفين',
              path: '/pages/employee_promotion_transactions'
            }"
          ></sidebar-item>
        </sidebar-item>

        <sidebar-item
          v-if="$route.meta.rtlActive"
          :link="{ name: ' الحضور والإنصراف' }"
        >
          <sidebar-item
            :link="{ name: 'دوام العمل الرسمي', path: '/pages/shifts' }"
          ></sidebar-item>
        </sidebar-item>

        <sidebar-item
          v-if="$route.meta.rtlActive"
          :link="{ name: 'المتغيرات الشهرية' }"
        >
          <sidebar-item
            :link="{ name: 'الإجازات', path: '/pages/vacations' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'طلبات الإجازات', path: '/pages/vacation_requests' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'الأعذار', path: '/pages/excuses' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'العطل', path: '/pages/holidays' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'اللجان', path: '/pages/Committees' }"
          ></sidebar-item>

          <sidebar-item
            :link="{
              name: 'علاوات الموظف',
              path: '/pages/employee_allowances'
            }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'المكافآت', path: '/pages/Rewards' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'العمل الإضافي', path: '/pages/OverTime' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'الإستقطاعات', path: '/pages/Deductions' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'التقييمات', path: '/pages/evaluation' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'جدول الحضور والإنصراف', path: '/pages/Time-sheet' }"
          ></sidebar-item>
        </sidebar-item>

        <sidebar-item v-if="$route.meta.rtlActive" :link="{ name: 'المرتبات' }">
          <sidebar-item
            :link="{ name: 'إعداد المرتبات', path: '/pages/salary' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'اعتماد المرتبات', path: '/pages/confirm_salary' }"
          ></sidebar-item>

          <sidebar-item
            :link="{
              name: 'الدرجات المالية للموظف',
              path: '/pages/Financial_grades'
            }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'جدول المرتبات', path: '/pages/salary_Table' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'الفروقات', path: '/pages/differences' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: 'تقارير المرتبات', path: '/pages/Salary_Reports' }"
          ></sidebar-item>

          <sidebar-item
            :link="{
              name: 'مقارنة المرتبات',
              path: '/pages/salary_comparison'
            }"
          ></sidebar-item>
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :colorBg.sync="sidebarBackgroundColor"
        :sidebarMini.sync="sidebarMini"
        :sidebarImg.sync="sidebarImg"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>

      <div
        :class="{ content: !$route.meta.hideContent }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
// import PerfectScrollbar from "perfect-scrollbar";
// import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

// function initScrollbar(className) {
//   if (hasElement(className)) {
//     new PerfectScrollbar(`.${className}`);
//     document.getElementsByClassName(className)[0].scrollTop = 0;
//   } else {
//     // try to init it later in case this component is loaded async
//     setTimeout(() => {
//       initScrollbar(className);
//     }, 100);
//   }
// }

// function reinitScrollbar() {
//   let docClasses = document.body.classList;
//   let isWindows = navigator.platform.startsWith("Win");
//   if (isWindows) {
//     // if we are on windows OS we activate the perfectScrollbar function
//     initScrollbar("sidebar");
//     initScrollbar("sidebar-wrapper");
//     initScrollbar("main-panel");

//     docClasses.add("perfect-scrollbar-on");
//   } else {
//     docClasses.add("perfect-scrollbar-off");
//   }
// }

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import MobileMenu from "./Extra/MobileMenu.vue";
import FixedPlugin from "../../FixedPlugin.vue";
// import UserMenu from "./Extra/UserMenu.vue";
import { ZoomCenterTransition } from "vue2-transitions";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    FixedPlugin,
    MobileMenu,
    // UserMenu,
    ZoomCenterTransition
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
      role: "",
      sidebarBackgroundColor: "white",
      sidebarBackground: "green",
      sidebarBackgroundImage: "./img/sidebar-2.jpg",
      sidebarMini: true,
      sidebarImg: true
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    }
  },
  updated() {
    // reinitScrollbar();
  },
  mounted() {
    // reinitScrollbar();
  },
  watch: {
    sidebarMini() {
      this.minimizeSidebar();
    }
  }
};
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}
.main-panel .zoomIn {
  animation-name: zoomIn95;
}
@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}
.main-panel .zoomOut {
  animation-name: zoomOut95;
}

.rtl .sidebar .nav .nav .nav-link .sidebar-mini,
.rtl .sidebar .user .user-info div .nav .nav-link .sidebar-mini {
  margin-right: 0 !important;
  float: right !important;
  margin-left: 15px !important;
  display: none;
}
</style>
