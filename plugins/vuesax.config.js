
import Vue from 'vue'
import Vuesax from 'vuesax'
import themeConfig ,{colors} from "@/plugins/themeConfig.js"
import 'vuesax/dist/vuesax.css'


Vue.use(Vuesax, { theme:{ colors }, rtl: themeConfig.rtl })
