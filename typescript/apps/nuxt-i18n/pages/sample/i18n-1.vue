<template>
  <div class="ma-5">
    <div v-for="locale in $i18n.locales" :key="locale.code">
      <v-btn
        class="ml-1 align-self-start"
        @click="toggleLang(locale.code)"
      >
        {{ locale.name }}
      </v-btn>
    </div>
    <div>
      <div>{{ $t($i18nComplements.i18n1.index.title) }}</div>
      <div>{{ $t($i18nComplements.i18n1.index.header) }}</div>
    </div>
    <v-btn class="ml-1 align-self-start" @click="toSample">
      ページ移動
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class LoginPage extends Vue {
  toSample(): void {
    this.$router.push(this.localePath("/sample/i18n-2"));
  }

  async toggleLang(locale: string): Promise<void> {
    await this.$i18n.setLocale(locale);
  }
}
</script>
