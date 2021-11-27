import Vue from 'vue'
import { ValidationProvider, ValidationObserver, localize, extend, setInteractionMode } from 'vee-validate'
import * as Rules from 'vee-validate/dist/rules'
import { ValidationRule } from 'vee-validate/dist/types/types'
import ja from '~/lang/vee-validate/ja'
import * as CustomRules from '~/utils/validation'

setInteractionMode('eager')

for (const rule in Rules) {
  extend(rule, (Rules as { [key: string]: ValidationRule })[rule])
}

for (const rule in CustomRules) {
  extend(rule, (CustomRules as { [key: string]: ValidationRule })[rule])
}

// 下記は固定で書く
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
localize('ja', ja)
