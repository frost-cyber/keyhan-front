import vue from 'vue'
import BackToTop from 'vue-backtotop'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import draggable from 'vuedraggable'
import { VueHammer } from 'vue2-hammer'
import { FormWizard, TabContent } from 'vue-form-wizard'
import TreeSelect from '@riophae/vue-treeselect'
import jalaali from 'moment-jalaali'
import jalaliFa from 'moment/src/locale/fa'

import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

vue.use(VueHammer)

vue.component('FormWizard', FormWizard)
vue.component('TabContent', TabContent)
vue.component('BackToTop', BackToTop)
vue.component('VuePerfectScrollbar', VuePerfectScrollbar)
vue.component('Draggable', draggable)
vue.component('TreeSelect', TreeSelect)
export default function (ctx ,injector) {
  jalaali.locale('fa' , jalaliFa)
  jalaali.loadPersian()
  injector('jalaali',jalaali)
}
