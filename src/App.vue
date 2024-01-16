<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <v-card elevation="3" max-width="1200" class="mx-auto">
    <v-layout>
      <v-app-bar color="blue-darken-1">
        <template v-slot:prepend>
          <v-btn :to="{name: 'home'}">
            Real Estate Vue
          </v-btn>
        </template>

        <template v-slot:append>
          <div v-if="authStore.isAuth">
            <v-btn :to="{name: 'admin-properties'}">
              Admin
            </v-btn>
            <v-btn @click="authStore.logout">
              Logout
            </v-btn>
          </div>
          <div v-else>
            <v-btn :to="{name: 'home'}">
              Home
            </v-btn>
            <v-btn :to="{name: 'login'}">
              Login
            </v-btn>
          </div>
        </template>
      </v-app-bar>
      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
