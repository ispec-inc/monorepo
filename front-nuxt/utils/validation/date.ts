import dayjs from "dayjs";
import { ValidationRuleSchema } from 'vee-validate/dist/types/types'

export const dateMin: ValidationRuleSchema = {
  params: ['min'],

  validate(value: string, args): boolean {
    if (Array.isArray(args)) {
      return false
    }
    return dayjs(value).isAfter(dayjs(args.min))
  },

  message(_, args) {
    if (Array.isArray(args)) {
      return ''
    }

    return `${dayjs(args.min).format('YYYY-MM-DD')}以降の日付を選択してください`
  },
}

export const dateMax: ValidationRuleSchema = {
  params: ['max'],

  validate(value: string, args): boolean {
    if (Array.isArray(args)) {
      return false
    }
    return dayjs(value).isBefore(dayjs(args.max))
  },

  message(_, args) {
    if (Array.isArray(args)) {
      return ''
    }

    return `${dayjs(args.max).format('YYYY-MM-DD')}以前の日付を選択してください`
  },
}
