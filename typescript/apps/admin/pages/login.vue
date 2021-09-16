<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  label="メール"
                  name="email"
                  :prepend-icon="icons.mdiAccount"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="パスワード"
                  name="password"
                  :prepend-icon="icons.mdiLock"
                  :append-icon="
                    passwordDisplay ? icons.mdiEyeOff : icons.mdiEye
                  "
                  :type="passwordDisplay ? 'text' : 'password'"
                  @click:append="() => (passwordDisplay = !passwordDisplay)"
                ></v-text-field>
              </v-form>
              <!--
              <p class="red--text">
                ユーザ名 またはパスワードが間違っています
              </p>
              -->
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="primary" @click="login()">ログイン</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import { mdiAccount, mdiLock, mdiEye, mdiEyeOff } from '@mdi/js'

@Component({
  layout: 'centered',
})
export default class LoginPage extends Vue {
  passwordDisplay = false
  email = ''
  password = ''
  icons = { mdiAccount, mdiLock, mdiEye, mdiEyeOff }

  async login() {
    try {
      await this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then((res) => {
          localStorage.setItem('email', res.data.id.toString())
        })
      this.$router.push('/place')
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
