<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item>
          <v-img
            src="https://newlarisa.pegadaian.co.id/pegadaian.png"
            max-height="120"
            max-width="200"
          />
        </v-list-item>
      </v-list>

      <v-list shaped>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-toolbar-title v-text="title" /> -->
      <v-spacer />
      <v-toolbar-title v-if="$auth.user">{{ $auth.user.name }}</v-toolbar-title>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list nav dense>
          <v-list-item link @click="logout">
            <v-list-item-icon>
              <v-icon>logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import menus from '@/components/nav/menu'
@Component
export default class SideBarComponent extends Vue {
  drawer = true
  items = menus

  logout() {
    this.$auth.logout()
    this.$router.push('/login')
  }
}
</script>

<style scoped></style>
