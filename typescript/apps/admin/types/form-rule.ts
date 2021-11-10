import { VeeValidateRule } from "~/lang/vee-validate/ja";
import * as CustomRules from '~/utils/validation'
import { ExtendedFormRuleName } from '~/utils/validation'

export type FormRule = VeeValidateRule | keyof typeof CustomRules | ExtendedFormRuleName
