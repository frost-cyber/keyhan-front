import vue from 'vue'
import BackToTop from 'vue-backtotop'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import draggable from 'vuedraggable'
import { VueHammer } from 'vue2-hammer'
import { FormWizard, TabContent } from 'vue-form-wizard'
import TreeSelect from '@riophae/vue-treeselect'
import jalaali from 'moment-jalaali'
import jalaliFa from 'moment/src/locale/fa'

function createQuery(object, index = '') {
  let query = ''
  for (const [key, value] of Object.entries(object)) {
    if (value instanceof Object && !Array.isArray(value)) {
      query += createQuery(value, `${index}${index ? `[${key}]` : key}`)
      continue
    }
    if (Array.isArray(value)) {
      value.forEach((val , i) => {
        if (val instanceof Object && !Array.isArray(val)) {

          query += "&" + createQuery(value, `${index}${index ? `[${key}]` : key}`)
          return
        }
        if (Array.isArray(val)) {
          query += "&" + createQuery({[i]:val}, `${index}${index ? `[${key}]` : key}`)
          return
        }

        query += `&${index}${index ? `[${key}][]` : `${key}[]`}=${encodeURIComponent(val)}`
      })
      continue
    }
    query += `&${index}${index ? `[${key}]` : key}=${encodeURIComponent(value)}`
  }
  return query
}

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
  injector('cloneObject' , (object) => JSON.parse(JSON.stringify(object)))
  injector('createQuery' , createQuery)
}

