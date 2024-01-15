<script setup>
import { useForm, useField } from 'vee-validate'
import { loginSchema as validationSchema } from '../validation/loginSchema'

const { handleSubmit } = useForm({ validationSchema })

const email = useField('email')
const password = useField('password')

const sumbit = handleSubmit(() => {
  console.log('Submit')
})
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
        class="mb-2"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
      />

      <v-text-field 
        type="password"
        label="Password"
        bg-color="blue-grey-lighten-5"
        class="mb-2"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
      />

      <v-btn block flat color="pink-accent-3" @click="sumbit">
        Login
      </v-btn>
    </v-form>
  </v-card>
</template>
