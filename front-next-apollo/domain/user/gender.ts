const GENDER = {
  male: '男性',
  female: '女性',
  genderLess: 'どちらでもない',
  unknown: '答えたくない',
} as const

export type EnumGender = keyof typeof GENDER
export type Gender = Readonly<EnumGender>
