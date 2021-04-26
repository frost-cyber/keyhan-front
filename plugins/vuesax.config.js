import vue from 'vue'
import vuesax from 'vuesax'
import themeConfig ,{colors} from "@/plugins/themeConfig.js"
import 'vuesax/dist/vuesax.css'

vue.use(vuesax, { theme:{ colors }, rtl: themeConfig.rtl })
