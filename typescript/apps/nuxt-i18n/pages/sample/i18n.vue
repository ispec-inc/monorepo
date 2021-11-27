<template>
  <div>
    <p>{{ $t("system.apptitle") }}</p>
    <div v-for="locale in $i18n.locales" :key="locale.code">
      <v-btn
        :class="{ 'is-active': locale.code === $i18n.locale }"
        :to="switchLocalePath(locale.code)"
      >
        {{ locale.name }}
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.is-active {
  font-weight: bold;
  color: #008181;
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// import $i18n from "~/plugins/i18n"

// type LocalType = {
//   code: string;
//   iso: string;
//   name: string;
//   file: string;
// };

@Component({})
export default class InternalSamplePage extends Vue {
  // availableLocales(): LocalType[] {
  //   return this.$i18n.locales.filter(
  //     (i: LocalType) => i.code !== this.$i18n.locale
  //   );
  // }
  // async changeLocale(locale: LocalType): Promise<void> {
  //   await this.$i18n.setLocale(locale);
  // }
}
</script>
