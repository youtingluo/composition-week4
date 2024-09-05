import './assets/main.css'
import 'vue-loading-overlay/dist/css/index.css'
import { createApp } from 'vue'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
// 引入 VeeValidate 的驗證規則
import { all } from '@vee-validate/rules'
// 引入 VeeValidate 的 i18n 功能
import { localize, setLocale } from '@vee-validate/i18n'
// 引入 VeeValidate 的繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import App from './App.vue'
import router from './router'

Object.keys(all).forEach((rule) => {
  defineRule(rule, all[rule])
})

// 將當前 VeeValidate 的語系設定為繁體中文
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')

const app = createApp(App)
app.component('VField', Field)
app.component('VForm', Form)
app.component('ErrorMessage', ErrorMessage)
app.use(router)
app.mount('#app')
