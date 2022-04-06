import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/Dashboard/Pages/AuthLayout.vue";

// Dashboard pages
import Dashboard from "@/pages/Dashboard/Dashboard.vue";

// Pages
import User from "@/pages/Dashboard/Pages/UserProfile.vue";
import Pricing from "@/pages/Dashboard/Pages/Pricing.vue";
// import Login from "@/pages/Dashboard/Pages/Login.vue";
const Login = () => import("../pages/Dashboard/Pages/Login.vue");
import Register from "@/pages/Dashboard/Pages/Register.vue";
import Lock from "@/pages/Dashboard/Pages/Lock.vue";
import Settings from "@/pages/Dashboard/Pages/Settings.vue";
import Permissions from "@/pages/Dashboard/Pages/Permissions.vue";
import users from "@/pages/Dashboard/Pages/main settings/users.vue";
import AdminStructure from "../pages/Dashboard/Pages/Administrative Affairs/AdminStructure.vue";
import Jobtitle from "@/pages/Dashboard/Pages/Administrative Affairs/Job title.vue";
import employees from "@/pages/Dashboard/Pages/Administrative Affairs/employees.vue";
import new_employees from "@/pages/Dashboard/Pages/Administrative Affairs/employees/new_employees.vue";
import UserActivities from "@/pages/Dashboard/Pages/main settings/UserActivities.vue";
import Functionaldata from "@/pages/Dashboard/Pages/Administrative Affairs/employees/Functional data.vue";
import Financialdata from "@/pages/Dashboard/Pages/Administrative Affairs/employees/Financial data.vue";
import Qualifications from "@/pages/Dashboard/Pages/Administrative Affairs/employees/Qualifications.vue";
import Vacation from "@/pages/Dashboard/Pages/Administrative Affairs/employees/Vacation.vue";
import Assignment from "@/pages/Dashboard/Pages/Administrative Affairs/employees/Assignment.vue";
import EmployeeDocuments from "@/pages/Dashboard/Pages/Administrative Affairs/employees/Employee Documents.vue";
import Takedown from "@/pages/Dashboard/Pages/Administrative Affairs/Takedown.vue";
import Branchclassification from "@/pages/Dashboard/Pages/Administrative Affairs/Branch classification.vue";
import situation from "@/pages/Dashboard/Pages/Administrative Affairs/settling the situation.vue";
import Deductions from "@/pages/Dashboard/Pages/Administrative Affairs/Deductions.vue";
import employeeMovements from "@/pages/Dashboard/Pages/Administrative Affairs/employee movements.vue";
import employeePromotions from "@/pages/Dashboard/Pages/Administrative Affairs/employee promotions.vue";
import banks from "@/pages/Dashboard/Pages/menus/banks.vue";
import bankBranches from "@/pages/Dashboard/Pages/menus/Bank branches.vue";
import Types_of_bonuses from "@/pages/Dashboard/Pages/menus/Types of bonuses.vue";
import Nationality from "@/pages/Dashboard/Pages/menus/Nationality.vue";
import types_of_documents from "@/pages/Dashboard/Pages/menus/types of documents.vue";
import Types_of_reviews from "@/pages/Dashboard/Pages/menus/Types of reviews.vue";
import types_of_vacations from "@/pages/Dashboard/Pages/menus/types of vacations.vue";
import menus_Qualifications from "@/pages/Dashboard/Pages/menus/Qualifications.vue";
import Courts from "@/pages/Dashboard/Pages/menus/Courts.vue";
import shifts from "@/pages/Dashboard/Pages/Attendance and Departure/shifts.vue";
import holidays from "@/pages/Dashboard/Pages/monthly variables/holidays.vue";
import newHolidays from "@/pages/Dashboard/Pages/monthly variables/new holidays.vue";
import employee_bonuses from "@/pages/Dashboard/Pages/monthly variables/employee bonuses.vue";
import Vacation_requests from "@/pages/Dashboard/Pages/monthly variables/Vacation requests.vue";
import Rewards from "@/pages/Dashboard/Pages/monthly variables/Rewards.vue";
import State_holidays from "@/pages/Dashboard/Pages/monthly variables/State holidays.vue";
import excuses from "@/pages/Dashboard/Pages/monthly variables/excuses.vue";
import newExcuses from "@/pages/Dashboard/Pages/monthly variables/new excuses.vue";
import reviews from "@/pages/Dashboard/Pages/monthly variables/reviews.vue";
import newreviews from "@/pages/Dashboard/Pages/monthly variables/new reviews.vue";
import Committees from "@/pages/Dashboard/Pages/monthly variables/Committees.vue";
import new_Committees from "@/pages/Dashboard/Pages/monthly variables/new Committees.vue";
import Attendance_Departure from "@/pages/Dashboard/Pages/monthly variables/Attendance and Departure.vue";
import Financial_grades from "@/pages/Dashboard/Pages/salaries/Financial grades.vue";
import salary from "@/pages/Dashboard/Pages/salaries/salary.vue";
import confirm_salary from "@/pages/Dashboard/Pages/salaries/confirm salary.vue";
import details_salary from "@/pages/Dashboard/Pages/salaries/details salary.vue";
import Extra_work from "@/pages/Dashboard/Pages/salaries/Extra work.vue";
import salary_Table from "@/pages/Dashboard/Pages/salaries/salary Table.vue";
import differences from "@/pages/Dashboard/Pages/salaries/differences.vue";
import salary_comparison from "@/pages/Dashboard/Pages/salaries/salary comparison.vue";
import Salary_Reports from "@/pages/Dashboard/Pages/salaries/Salary Reports.vue";
import Salary_Reports_Show from "@/pages/Dashboard/Pages/salaries/Salary Reports Show.vue";
// Components pages
import Buttons from "@/pages/Dashboard/Components/Buttons.vue";
import GridSystem from "@/pages/Dashboard/Components/GridSystem.vue";
import Panels from "@/pages/Dashboard/Components/Panels.vue";
import SweetAlert from "@/pages/Dashboard/Components/SweetAlert.vue";
import Notifications from "@/pages/Dashboard/Components/Notifications.vue";
import Icons from "@/pages/Dashboard/Components/Icons.vue";
import Typography from "@/pages/Dashboard/Components/Typography.vue";

// Forms pages
import RegularForms from "@/pages/Dashboard/Forms/RegularForms.vue";
import ExtendedForms from "@/pages/Dashboard/Forms/ExtendedForms.vue";
import ValidationForms from "@/pages/Dashboard/Forms/ValidationForms.vue";
import Wizard from "@/pages/Dashboard/Forms/Wizard.vue";

// TableList pages
import RegularTables from "@/pages/Dashboard/Tables/RegularTables.vue";
import ExtendedTables from "@/pages/Dashboard/Tables/ExtendedTables.vue";
import PaginatedTables from "@/pages/Dashboard/Tables/PaginatedTables.vue";

// Maps pages
import GoogleMaps from "@/pages/Dashboard/Maps/GoogleMaps.vue";
import FullScreenMap from "@/pages/Dashboard/Maps/FullScreenMap.vue";
import VectorMaps from "@/pages/Dashboard/Maps/VectorMaps.vue";

// Calendar
import Calendar from "@/pages/Dashboard/Calendar.vue";
// Charts
import Charts from "@/pages/Dashboard/Charts.vue";
import Widgets from "@/pages/Dashboard/Widgets.vue";

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let componentsMenu = {
  path: "/components",
  component: DashboardLayout,
  meta: {
    IsAuth: true
  },
  redirect: "/components/buttons",
  name: "Components",
  children: [
    {
      path: "buttons",
      name: "Buttons",
      components: {
        default: Buttons
      }
    },
    {
      path: "grid-system",
      name: "Grid System",
      components: {
        default: GridSystem
      }
    },
    {
      path: "panels",
      name: "Panels",
      components: {
        default: Panels
      }
    },
    {
      path: "sweet-alert",
      name: "Sweet Alert",
      components: {
        default: SweetAlert
      }
    },
    {
      path: "notifications",
      name: "Notifications",
      components: {
        default: Notifications
      }
    },
    {
      path: "icons",
      name: "Icons",
      components: {
        default: Icons
      }
    },
    {
      path: "typography",
      name: "Typography",
      components: {
        default: Typography
      }
    }
  ]
};
let formsMenu = {
  path: "/forms",
  component: DashboardLayout,
  redirect: "/forms/regular",
  name: "Forms",
  meta: {
    IsAuth: true
  },
  children: [
    {
      path: "regular",
      name: "Regular Forms",
      components: {
        default: RegularForms
      }
    },
    {
      path: "extended",
      name: "Extended Forms",
      components: {
        default: ExtendedForms
      }
    },
    {
      path: "validation",
      name: "Validation Forms",
      components: {
        default: ValidationForms
      }
    },
    {
      path: "wizard",
      name: "Wizard",
      components: {
        default: Wizard
      }
    }
  ]
};

let tablesMenu = {
  path: "/table-list",
  component: DashboardLayout,
  meta: {
    IsAuth: true
  },
  redirect: "/table-list/regular",
  name: "Tables",

  children: [
    {
      path: "regular",
      name: "Regular Tables",
      components: {
        default: RegularTables
      }
    },
    {
      path: "extended",
      name: "Extended Tables",
      components: {
        default: ExtendedTables
      }
    },
    {
      path: "paginated",
      name: "Pagianted Tables",
      components: {
        default: PaginatedTables
      }
    }
  ]
};

let mapsMenu = {
  path: "/maps",
  component: DashboardLayout,
  name: "Maps",
  meta: {
    IsAuth: true
  },
  redirect: "/maps/google",
  children: [
    {
      path: "google",
      name: "Google Maps",
      components: {
        default: GoogleMaps
      }
    },
    {
      path: "full-screen",
      name: "Full Screen Map",
      meta: {
        hideContent: true,
        hideFooter: true,
        navbarAbsolute: true
      },
      components: {
        default: FullScreenMap
      }
    },
    {
      path: "vector-map",
      name: "Vector Map",
      components: {
        default: VectorMaps
      }
    }
  ]
};

let pagesMenu = {
  path: "/pages",
  component: DashboardLayout,
  name: "",
  meta: {
    IsAuth: true,
    rtlActive: true
  },
  redirect: "/pages/users",
  children: [
    {
      path: "/pages/user",
      name: "",
      components: {
        default: User
      }
    },
    {
      path: "/pages/Permissions",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Permissions
      }
    },
    {
      path: "/pages/Settings",
      name: "",
      components: {
        default: Settings
      },
      meta: {
        rtlActive: true
      }
    },
    {
      path: "/pages/users",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: users
      }
    },
    {
      path: "/pages/organization_structure",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: AdminStructure
      }
    },
    {
      path: "/pages/Job_title",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Jobtitle
      }
    },
    {
      path: "/pages/employees",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: employees
      }
    },
    {
      path: "/pages/employee/info/:id",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: new_employees
      }
    },
    {
      path: "/pages/UserActivities",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: UserActivities
      }
    },

    {
      path: "/pages/employee/Functionaldata/:id",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Functionaldata
      }
    },

    {
      path: "/pages/employee/Financialdata/:id",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Financialdata
      }
    },

    {
      path: "/pages/employee/Certifications/:id",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Qualifications
      }
    },

    {
      path: "/pages/employee/Vacation/:id",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Vacation
      }
    },

    {
      path: "/pages/employee/Assignment/:id",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Assignment
      }
    },

    {
      path: "/pages/employee/EmployeeDocuments/:id",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: EmployeeDocuments
      }
    },

    {
      path: "/pages/end_of_service",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Takedown
      }
    },

    {
      path: "/pages/branch_classification",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Branchclassification
      }
    },

    {
      path: "/pages/job_stages",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: situation
      }
    },

    {
      path: "/pages/Deductions",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Deductions
      }
    },

    {
      path: "/pages/employee_transactions",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: employeeMovements
      }
    },

    {
      path: "/pages/employee_promotion_transactions",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: employeePromotions
      }
    },

    {
      path: "/pages/banks",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: banks
      }
    },

    {
      path: "/pages/Bank branches",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: bankBranches
      }
    },

    {
      path: "/pages/types_of_allowance",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Types_of_bonuses
      }
    },

    {
      path: "/pages/Nationalities",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Nationality
      }
    },

    {
      path: "/pages/types of documents",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: types_of_documents
      }
    },

    {
      path: "/pages/types_of_evaluation",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Types_of_reviews
      }
    },

    {
      path: "/pages/types of vacations",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: types_of_vacations
      }
    },

    {
      path: "/pages/Certifications",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: menus_Qualifications
      }
    },

    {
      path: "/pages/Courts",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Courts
      }
    },

    {
      path: "/pages/shifts",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: shifts
      }
    },

    {
      path: "/pages/vacations",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: holidays
      }
    },

    {
      path: "/pages/vacation/new",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: newHolidays
      }
    },

    {
      path: "/pages/employee_allowances",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: employee_bonuses
      }
    },

    {
      path: "/pages/vacation_requests",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Vacation_requests
      }
    },

    {
      path: "/pages/Rewards",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Rewards
      }
    },
    {
      path: "/pages/holidays",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: State_holidays
      }
    },

    {
      path: "/pages/excuses",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: excuses
      }
    },

    {
      path: "/pages/Excuses/:id",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: newExcuses
      }
    },

    {
      path: "/pages/evaluation",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: reviews
      }
    },

    {
      path: "/pages/evaluation/:id",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: newreviews
      }
    },

    {
      path: "/pages/Committees",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Committees
      }
    },

    {
      path: "/pages/Committees/:id",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: new_Committees
      }
    },

    {
      path: "/pages/Time-sheet",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Attendance_Departure
      }
    },

    {
      path: "/pages/Financial_grades",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Financial_grades
      }
    },

    {
      path: "/pages/salary",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: salary
      }
    },

    {
      path: "/pages/confirm_salary",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: confirm_salary
      }
    },

    {
      path: "/pages/details_salary/:id",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: details_salary
      }
    },

    {
      path: "/pages/OverTime",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Extra_work
      }
    },

    {
      path: "/pages/salary_Table",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: salary_Table
      }
    },

    {
      path: "/pages/differences",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: differences
      }
    },

    {
      path: "/pages/salary_comparison",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: salary_comparison
      }
    },
    {
      path: "/pages/Salary_Reports",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Salary_Reports
      }
    },

    {
      path: "/pages/Salary_Reports/Show",
      name: "",
      meta: {
        rtlActive: true
      },
      components: {
        default: Salary_Reports_Show
      }
    }
  ]
};

let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  meta: {
    IsAuth: false
  },
  children: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },

  
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/pricing",
      name: "Pricing",
      component: Pricing
    },
    {
      path: "/lock",
      name: "Lock",
      component: Lock
    }
  ]
};

// new Router({

const routes = [
  {
    path: "/",
    redirect: "/login"
  },

  componentsMenu,
  formsMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,
  authPages,
  {
    path: "/",
    component: DashboardLayout,
    meta: {
      IsAuth: true
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        components: {
          default: Dashboard
        },
        meta: {
          rtlActive: true,
          IsAuth: true
        }
      },
      {
        path: "calendar",
        name: "Calendar",
        components: {
          default: Calendar
        }
      },
      {
        path: "charts",
        name: "Charts",
        components: {
          default: Charts
        }
      },
      {
        path: "widgets",
        name: "Widgets",
        components: {
          default: Widgets
        }
      }
    ]
  }
];
export default routes;
