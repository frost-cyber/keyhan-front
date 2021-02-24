import vue from 'vue'
import BackToTop from 'vue-backtotop'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import draggable from 'vuedraggable'
import {VueHammer} from 'vue2-hammer'
import { FormWizard, TabContent } from 'vue-form-wizard'

vue.use(VueHammer)

vue.component('FormWizard', FormWizard)
vue.component('TabContent', TabContent)
vue.component('BackToTop', BackToTop)
vue.component('VuePerfectScrollbar', VuePerfectScrollbar)
vue.component('draggable', draggable)
