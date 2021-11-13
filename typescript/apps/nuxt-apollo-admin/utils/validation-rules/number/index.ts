export const numberRules = {
  required: (v?: number) => !!v || v === 0 || '入力してください',
  numeric: (v?: number) => !v || /^(-?)\d*$/.test(v.toString()) || '入力が不正です',
  positive: (v?: number) => !v || v >= 0 || '正の数で入力してください',
  safeMax: (v?: number) =>
    (v || 0) < Number.MAX_SAFE_INTEGER ||
    `${Number.MAX_SAFE_INTEGER}未満で入力してください`,
} as const
