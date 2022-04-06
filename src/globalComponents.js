import DropDown from "./components/Dropdown.vue";
import { ValidationProvider } from "vee-validate";
import { ValidationObserver } from "vee-validate";
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component("drop-down", DropDown);
    Vue.component("ValidationProvider", ValidationProvider);
    Vue.component("ValidationObserver", ValidationObserver);
  }
};

export default GlobalComponents;
