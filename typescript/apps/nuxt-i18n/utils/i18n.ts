import { I18n } from "~/i18n/lang/i18n-declare";

declare module "vue/types/vue" {
  interface Vue {
    $i18nComplements: I18n;
  }
}
