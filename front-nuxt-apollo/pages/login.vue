<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-card-text>
              <login-page-form
                :form="form"
                :is-post="true"
                :loading="isAwaitingResponse"
                @submit="login"
              />
              <!--
              <p class="red--text">
                ユーザ名 またはパスワードが間違っています
              </p>
              -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { LoginForm } from '~/form-providers/login-form'
import LoginPageForm from '~/components/pages/login-page-form.vue'
import UseSubscription from '~/components/mixins/use-subscription'
import { pageServicesModule } from '~/store/page-services'
import { LoginPageService } from '~/core/03-service/login'

@Component({
  layout: 'centered',
  components: {
    LoginPageForm
  }
})
export default class LoginPage extends mixins(UseSubscription) {
  readonly service: LoginPageService = pageServicesModule.getService('login')

  form = LoginForm.provideModule()

  created(): void {
    this.service.loginSuccessEventStream
      .subscribeAsDisposable(() => {
        this.pushToIndexPage()
      })
      .disposedBy(this.subscription)
  }

  login(value: LoginForm.AsObject): void {
    this.service.submit(value.email, value.password)
  }

  get errorMessage(): string | null {
    return this.service.postErrorMessage
  }

  get isAwaitingResponse(): boolean | null {
    return this.service.isAwaitingResponse
  }

  get isError(): boolean {
    return !!this.errorMessage
  }

  pushToIndexPage(): void {
    this.$router.push(this.$pagesPath.$url())
  }
}
</script>
