<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      :width="300"
    >
      <v-list nav>
        <v-list-item>
          <v-list-item-content class="logo-wrapper"> </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-group
          v-for="children in items"
          :key="children.title"
          :prepend-icon="children.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="children.title" />
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(item, i) in children.items"
            :key="i"
            :to="item.to"
            router
            :exact="$route.name === item.separate"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item @click="logout()">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'ログアウト'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" color="primary" :dark="true" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main class="main">
      <v-container class="main-container">
        <nuxt />
        <snackbar-container ref="snackbarContainer" />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.main {
  background-color: $background-gray;
}

.main-container {
  padding: 20px;
}

.logo-wrapper {
  padding: 16px 40px;
  box-sizing: border-box;
}

.logo {
  display: block;
  width: 100%;
  height: auto;
}

@media (min-width: 960px) {
  .main-container {
    padding: 40px;
  }
}
</style>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator'
import { Subscription } from 'rxjs'
import SnackbarContainer from '~/components/advanced/snackbar-container/index.vue'
import { GlobalEventBus } from '~/surface/event-bus/global'
import { ISnackbarConteiner } from '~/types/snackbar-container'

@Component({
  components: {
    SnackbarContainer,
  },
})
export default class DefaultLayout extends Vue {
  @Ref('snackbarContainer') snackbarContainer!: ISnackbarConteiner

  clipped = false
  drawer = true
  fixed = false
  subscription = new Subscription()
  items = [
    {
      icon: 'mdi-map-marker',
      title: 'サンプル',
      items: [
        {
          icon: 'mdi-format-list-bulleted',
          title: '一覧',
          to: '/',
          separate: 'place-new',
        },
        {
          icon: 'mdi-shape-square-rounded-plus',
          title: '登録',
          to: '/',
        },
      ],
    },
  ]

  miniVariant = false
  title = 'Admin'

  logout(): void {
    this.$auth.logout()
    localStorage.removeItem('userId')
  }

  created(): void {
    this.subscription.add(
      GlobalEventBus.getInstance().snackbarEventStream.subscribe((data) => {
        this.snackbarContainer.addSnackbar(data, data.duration)
      })
    )
  }

  beforeDestroy(): void {
    this.subscription.unsubscribe()
  }
}
</script>
