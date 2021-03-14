
import vue from 'vue'
import vuesax from 'vuesax'
import themeConfig ,{colors} from "@/plugins/themeConfig.js"


vue.use(vuesax, { theme:{ colors }, rtl: themeConfig.rtl })
