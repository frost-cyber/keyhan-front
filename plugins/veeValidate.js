import vue from 'vue'
import fa from 'vee-validate/dist/locale/fa';
import VeeValidate, {Validator} from 'vee-validate';

// Install the Plugin.
vue.use(VeeValidate, {locale: 'fa'});
  // Localize takes the locale object as the second argument (optional) and merges it.
Validator.localize('fa', fa);
