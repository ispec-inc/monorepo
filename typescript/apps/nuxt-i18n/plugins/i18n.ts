import { Plugin } from "@nuxt/types";
import { i18nComplements } from "./i18n-complement";

const i18nPlugin: Plugin = (_, inject) => {
  inject("i18nComplements", i18nComplements);
};

export default i18nPlugin;
