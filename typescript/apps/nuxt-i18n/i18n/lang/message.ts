import i18n1En from './pages/i18n-1/en'
import i18n1Ja from './pages/i18n-1/ja'
import i18n2En from './pages/i18n-2/en'
import i18n2Ja from './pages/i18n-2/ja'

export default {
  en: {
    ...i18n1En,
    ...i18n2En,
  },
  ja: {
    ...i18n1Ja,
    ...i18n2Ja,
  },
}
