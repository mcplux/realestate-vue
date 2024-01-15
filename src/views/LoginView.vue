<script setup>
</script>

<template>
  <v-card flat max-width="600" class="mx-auto">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">
      Login
    </v-card-title>

    <v-card-subtitle>
      Login with your account
    </v-card-subtitle>

    <v-form class="mt-5">
      <v-text-field 
        type="email"
        label="Email"
        bg-color="blue-grey-lighten-5"
      />

      <v-text-field 
        type="password"
        label="Password"
        bg-color="blue-grey-lighten-5"
      />

      <v-btn block flat color="pink-accent-3">
        Login
      </v-btn>
    </v-form>
  </v-card>
</template>
